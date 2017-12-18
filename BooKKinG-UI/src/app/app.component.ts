import { Component } from '@angular/core';
import { Globals } from './globals';
import { RouterModule } from '@angular/router/src/router_module';
import { Router } from '@angular/router';
import { ConnectionService } from './service/connection.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {

  private readonly title = 'BooKKinG';

  constructor(private connService: ConnectionService, private router: Router) { }

  get isAdmin(): boolean {
    return this.connService.getCurrentUser().admin;
  }

  private goToAdmin(): void {
    this.router.navigate([Globals.getRoute(Globals.ADMIN)]);
  }
}
