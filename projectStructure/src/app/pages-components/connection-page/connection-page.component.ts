import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-connection-page',
  templateUrl: './connection-page.component.html',
  styleUrls: ['./connection-page.component.css']
})
export class ConnectionPageComponent implements OnInit {

  constructor(private routeur : Router) { }

  ngOnInit() {
  }

}
