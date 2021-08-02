import { Component, OnDestroy, OnInit } from '@angular/core';
import { BlocksService } from '../../services/blocks.service';
import { Router } from '@angular/router';
import { BlocksFacade } from '../../store/facade';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-block-list',
  templateUrl: './block-list.component.html',
  styleUrls: ['./block-list.component.scss'],
})
export class BlockListComponent implements OnInit, OnDestroy {
  blocks$;

  private destroy$ = new Subject();

  constructor(
    private blocksService: BlocksService,
    private blockFacade: BlocksFacade,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.blocks$ = this.blockFacade.blocks$;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  navigateToBlock(id: string) {
    this.router.navigate(['preview', id]);
  }
}
