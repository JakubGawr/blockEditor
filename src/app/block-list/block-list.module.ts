import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlockListRoutingModule } from './block-list-routing.module';
import { BlockListComponent } from './block-list.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { UiModule } from '../ui/ui.module';

@NgModule({
  declarations: [BlockListComponent],
  imports: [
    CommonModule,
    BlockListRoutingModule,
    MatCardModule,
    MatButtonModule,
    UiModule,
  ],
})
export class BlockListModule {}
