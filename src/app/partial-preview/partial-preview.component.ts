import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Block } from '../../store/state';
import { iframeContent } from '../iframeBaseContent';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { BlocksFacade } from '../../store/facade';
import { filter, switchMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-partial-preview',
  templateUrl: './partial-preview.component.html',
  styleUrls: ['./partial-preview.component.scss'],
})
export class PartialPreviewComponent implements OnInit, AfterViewInit {
  private blockId: string;
  private destroy$ = new Subject();
  private iframeLoaded$ = new BehaviorSubject(false);

  partial: Observable<Block>;
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
    this.partial = this.blocksFacade.currentPartial(this.blockId);
  }

  ngAfterViewInit() {
    this.iframeLoaded$
      .pipe(
        filter(Boolean),
        switchMap(() => this.partial),
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

  onBack() {
    this.router.navigate(['partials']);
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
