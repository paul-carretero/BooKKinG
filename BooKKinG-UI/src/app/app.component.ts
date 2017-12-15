import { Component } from '@angular/core';
import { Globals } from './globals';
import { RouterModule } from '@angular/router/src/router_module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  title = 'BooKKinG';
  get getEtatPayer():boolean{
    return Globals.payer;
  }
}
