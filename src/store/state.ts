import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Block {
  id: string;
  html: string;
  js: string;
  css: string;
  tag: string;
  name: string;
}
export interface State {
  blocks: Block[];
  partials: [];
}

const initialState: State = {
  blocks: [],
  partials: [],
};

@Injectable({ providedIn: 'root' })
export class BlockState {
  private state = new BehaviorSubject<State>(initialState);

  get currentState() {
    return this.state.value;
  }

  get partials() {
    return this.state.pipe(map((current) => current.partials));
  }

  get blocks() {
    return this.state.pipe(map((current) => current.blocks));
  }
  currentBlock(id: string) {
    return this.blocks.pipe(
      map((current) => current.find((block) => block.id === id))
    );
  }

  currentPartial(name: string) {
    return this.partials.pipe(
      map((current) => current.find((partial: any) => partial.name === name))
    );
  }

  setBlocks(blocks: Block[]) {
    this.state.next({
      ...this.currentState,
      blocks,
    });
  }

  setPartials(partials: []) {
    this.state.next({
      ...this.currentState,
      partials,
    });
  }
}
