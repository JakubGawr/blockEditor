import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BlocksFacade } from '../store/facade';
import { tap } from 'rxjs/operators';
import { PartialsService } from '../services/partials.service';

@Injectable({ providedIn: 'root' })
export class PartialsResolver implements Resolve<boolean> {
  constructor(private service: PartialsService, private facade: BlocksFacade) {}

  resolve(): Observable<any> {
    return this.service.getPartials().pipe(
      tap((e) => {
        this.facade.setPartials(e);
      })
    );
  }
}
