import { Inject, Injectable } from '@angular/core';
import { Block, BlockState } from './state';

@Injectable({ providedIn: 'root' })
export class BlocksFacade {
  blocks$ = this.blocksState.blocks;
  partials$ = this.blocksState.partials;
  constructor(private blocksState: BlockState) {}

  setBlocks(blocks: Block[]) {
    this.blocksState.setBlocks(blocks);
  }

  setPartials(partials: []) {
    this.blocksState.setPartials(partials);
  }

  currentBlock(id: string) {
    return this.blocksState.currentBlock(id);
  }

  currentPartial(id: string) {
    return this.blocksState.currentPartial(id);
  }
}
