import { Router } from '@angular/router';
import { NavigationService } from '../service/navigation.service';
import { Livre } from '../model/livre';
import { Globals } from '../globals';

export abstract class AbstractComponent {

    constructor(public router: Router, public navigationService: NavigationService) { }

    public detailLivre(livre: Livre) {
        this.navigationService.setFromLivre(livre);
        this.router.navigate([Globals.getRoute(Globals.LIVRE), livre.idBook]);
    }

    public navigate(where: string): void {
        if (Globals.otherNavPage.includes(where)) {
            this.navigationService.setCurrentOther(where);
            this.router.navigate([Globals.getRoute(where)]);
        } else {
            console.log('Navigation impossible vers ' + where);
        }
    }

    public getDisplayable(str: string): string {
        return Globals.getDisplayableName(str);
    }
}
