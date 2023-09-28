import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-control-navbar',
  templateUrl: './control-navbar.component.html',
  styleUrls: ['./control-navbar.component.css']
})
export class ControlNavbarComponent implements OnInit {

  isControlActive: boolean = false;
  isMappingActive: boolean = false;
  isDatabaseActive: boolean = false;

  constructor(private route: ActivatedRoute) {
    this.route.url.subscribe((segments) => {
      // Periksa rute aktif dan atur variabel berdasarkan rute yang aktif
      this.isControlActive = segments[0].path === 'control';
      this.isMappingActive = segments[0].path === 'mapping';
      this.isDatabaseActive = segments[0].path === 'database';
    });
  }

  ngOnInit(): void {
  }

}
