import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { BlocksService } from '../services/blocks.service';
import { Observable } from 'rxjs';
import { BlocksFacade } from '../store/facade';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class DataResolver implements Resolve<boolean> {
  constructor(private service: BlocksService, private facade: BlocksFacade) {}

  resolve(): Observable<any> {
    return this.service.getBlocks().pipe(
      tap((e) => {
        this.facade.setBlocks(e);
      })
    );
  }
}
