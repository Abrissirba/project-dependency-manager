import { Component, Input, OnInit } from '@angular/core';

export interface SidenavItem {
  title: string;
  route: string[];
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  @Input() items: SidenavItem[];

  constructor() { }

  ngOnInit() {
  }

}
