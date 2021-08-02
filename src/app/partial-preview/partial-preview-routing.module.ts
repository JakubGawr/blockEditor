import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PartialPreviewComponent } from './partial-preview.component';

const routes: Routes = [
  {
    path: ':id',
    component: PartialPreviewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PartialPreviewRoutingModule {}
