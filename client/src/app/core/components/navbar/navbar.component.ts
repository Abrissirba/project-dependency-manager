import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() hasSecondToolbar = false;

  @Output() menuClick = new EventEmitter();

  constructor(
  ) { 
  }

  ngOnInit() {
  }

  onMenuClick() {
    this.menuClick.next();
  }

}
