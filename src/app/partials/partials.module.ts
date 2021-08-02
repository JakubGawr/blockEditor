import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartialsComponent } from './partials.component';
import { PartialsRoutingModule } from './partials-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [PartialsComponent],
  imports: [
    CommonModule,
    PartialsRoutingModule,
    MatCardModule,
    MatButtonModule,
  ],
})
export class PartialsModule {}
