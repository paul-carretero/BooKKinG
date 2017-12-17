import { Component, OnInit } from '@angular/core';
import { Globals } from './globals';
import { RouterModule } from '@angular/router/src/router_module';
import { Router } from '@angular/router';
import { NavigationService } from './service/navigation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit {

  private readonly title = 'BooKKinG';

  constructor(private router: Router, private navService: NavigationService) { }

  ngOnInit(): void {
    if (this.router.url === '/') {
      this.navService.setCurrentOther(Globals.HOME);
      this.router.navigate([Globals.getRoute(Globals.HOME)]);
    }
  }
}
