import { Component, OnInit } from '@angular/core';
import { BlocksFacade } from '../../store/facade';
import { Router } from '@angular/router';

@Component({
  selector: 'app-partials',
  templateUrl: './partials.component.html',
  styleUrls: ['./partials.component.scss'],
})
export class PartialsComponent implements OnInit {
  constructor(private blockFacade: BlocksFacade, private router: Router) {}
  partials$;
  ngOnInit(): void {
    this.partials$ = this.blockFacade.partials$;
  }

  navigateToPartial(id: string) {
    this.router.navigate(['partial-preview', id]);
  }
}
