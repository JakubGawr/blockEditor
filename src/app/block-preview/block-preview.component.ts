import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlocksFacade } from '../../store/facade';
import { Block } from '../../store/state';
import { BehaviorSubject, merge, Observable, Subject } from 'rxjs';
import { filter, switchMap, takeUntil } from 'rxjs/operators';
import { iframeContent } from '../iframeBaseContent';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-block-preview',
  templateUrl: './block-preview.component.html',
  styleUrls: ['./block-preview.component.scss'],
})
export class BlockPreviewComponent implements OnInit, AfterViewInit, OnDestroy {
  private blockId: string;
  private destroy$ = new Subject();
  private iframeLoaded$ = new BehaviorSubject(false);

  block: Observable<Block>;
  element = this.sanitizer.bypassSecurityTrustHtml(iframeContent);
  src: SafeResourceUrl;
  @ViewChild('iframe', { read: ElementRef }) iframeElement: ElementRef;

  get iframeDoc() {
    return (
      this.iframeElement.nativeElement?.contentWindow ||
      this.iframeElement.nativeElement?.documentWindow
    )?.document;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private blocksFacade: BlocksFacade,
    public sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.src = this.sanitizer.bypassSecurityTrustResourceUrl(
      './iframeBaseContent.ts'
    );
    this.blockId = this.route.snapshot.paramMap.get('id');
    this.block = this.blocksFacade.currentBlock(this.blockId);
  }

  ngAfterViewInit() {
    this.iframeLoaded$
      .pipe(
        filter(Boolean),
        switchMap(() => this.block),
        takeUntil(this.destroy$)
      )
      .subscribe((data) => {
        const $styleContent = this.iframeDoc.head.querySelector('#base-styles');
        const $htmlContent = this.iframeDoc.body.querySelector('#content');
        if ($styleContent) {
          $htmlContent.innerHTML = data.html;
          $styleContent.innerHTML = data.css;
        }
      });
  }

  setBreakpoint(e) {
    this.iframeElement.nativeElement.style.width = e;
  }

  onBack() {
    this.router.navigate(['block-list']);
  }

  applyHtml() {}

  onIframeLoad() {
    this.iframeLoaded$.next(true);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    console.log('destroy');
  }
}
