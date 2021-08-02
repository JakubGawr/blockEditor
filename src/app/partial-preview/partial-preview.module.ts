import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PartialPreviewRoutingModule } from './partial-preview-routing.module';
import { PartialPreviewComponent } from './partial-preview.component';
import { UiModule } from '../ui/ui.module';

@NgModule({
  declarations: [PartialPreviewComponent],
  imports: [CommonModule, PartialPreviewRoutingModule, UiModule],
})
export class PartialPreviewModule {}
