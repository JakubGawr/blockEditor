import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, share } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PartialsService {
  constructor(private http: HttpClient) {}

  getPartials() {
    return this.http
      .get('blocks-content/partials.json', { responseType: 'text' as any })
      .pipe(map((e: any) => JSON.parse(e), share())) as Observable<[]>;
  }
}
