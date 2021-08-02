import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, share } from 'rxjs/operators';
import { Block } from '../store/state';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BlocksService {
  constructor(private http: HttpClient) {}

  getBlocks() {
    return this.http
      .get('blocks-content/main.json', { responseType: 'text' as any })
      .pipe(map((e: any) => JSON.parse(e), share())) as Observable<Block[]>;
  }
}
