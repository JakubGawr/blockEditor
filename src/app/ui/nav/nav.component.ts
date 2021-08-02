import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  @Input() name: string;
  @Input() tag: string;
  @Output() back = new EventEmitter();
  @Output() breakpointChange = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  onChange({ value }) {
    this.breakpointChange.emit(value);
  }
}
