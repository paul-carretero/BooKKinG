import { Component } from '@angular/core';
import { Globals } from './globals';
import { RouterModule } from '@angular/router/src/router_module';
import { Router } from '@angular/router';
import { NavigationService } from './service/navigation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {

  private readonly title = 'BooKKinG';

  constructor() { }

}
