import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlockPreviewComponent } from './block-preview.component';

const routes: Routes = [
  {
    path: ':id',
    component: BlockPreviewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlockPreviewRoutingModule {}
