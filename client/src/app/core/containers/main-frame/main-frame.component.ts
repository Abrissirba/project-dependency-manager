import { Component, OnInit } from '@angular/core';
import { SidenavItem } from '../../components/sidenav/sidenav.component';

@Component({
  selector: 'app-main-frame',
  templateUrl: './main-frame.component.html',
  styleUrls: ['./main-frame.component.scss']
})
export class MainFrameComponent implements OnInit {

  sidenavItems: SidenavItem[] = [{
    title: 'Projects',
    route: ['projects']
  }, {
    title: 'Project Locations',
    route: ['project-locations']
  }, {
    title: 'Project Dependencies',
    route: ['project-dependencies']
  }, {
    title: 'Dependencies',
    route: ['dependencies']
  }]

  isSidenavOpen = true;

  constructor() { }

  ngOnInit() {
  }

}
