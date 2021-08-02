import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { MatIconModule } from '@angular/material/icon';
import { MenuComponent } from './menu/menu.component';
import { RouterModule } from '@angular/router';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@NgModule({
  declarations: [NavComponent, MenuComponent],
  imports: [CommonModule, MatIconModule, RouterModule, MatButtonToggleModule],
  exports: [NavComponent, MenuComponent],
})
export class UiModule {}
