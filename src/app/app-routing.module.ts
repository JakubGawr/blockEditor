import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DataResolver } from './dataResolver';
import { HomeComponent } from './home/home.component';
import { PartialsResolver } from './partialsResolver';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'block-list',
        loadChildren: () =>
          import('./block-list/block-list.module').then(
            (m) => m.BlockListModule
          ),
        resolve: {
          blocks: DataResolver,
        },
      },
      {
        path: 'partials',
        loadChildren: () =>
          import('./partials/partials.module').then((m) => m.PartialsModule),
        resolve: {
          partials: PartialsResolver,
        },
      },
    ],
  },
  {
    path: 'preview',
    resolve: {
      blocks: DataResolver,
    },
    loadChildren: () =>
      import('./block-preview/block-preview.module').then(
        (m) => m.BlockPreviewModule
      ),
  },

  {
    path: 'partial-preview',
    resolve: {
      blocks: PartialsResolver,
    },
    loadChildren: () =>
      import('./partial-preview/partial-preview.module').then(
        (m) => m.PartialPreviewModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
