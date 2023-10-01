import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  openNav() {
    var sidenav = document.getElementById("mySidenav")
    var main = document.getElementById("main")
    if(sidenav!=null&&main!=null){
      sidenav.style.width = "250px";
      main.style.marginLeft = "250px";
      document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
    }

  }

  closeNav() {
    var sidenav = document.getElementById("mySidenav")
    var main = document.getElementById("main")
    if(sidenav!=null&&main!=null){
      sidenav.style.width = "0";
      main.style.marginLeft= "0";
      document.body.style.backgroundColor = "white";

    }

  }

}
