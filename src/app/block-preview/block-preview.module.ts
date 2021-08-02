import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlockPreviewRoutingModule } from './block-preview-routing.module';
import { BlockPreviewComponent } from './block-preview.component';

import { MatButtonModule } from '@angular/material/button';
import { UiModule } from '../ui/ui.module';

@NgModule({
  declarations: [BlockPreviewComponent],
  imports: [CommonModule, BlockPreviewRoutingModule, MatButtonModule, UiModule],
})
export class BlockPreviewModule {}
