import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { NotifService } from '../../../service/notif.service';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-notif',
  templateUrl: './notif.component.html',
  styleUrls: ['./notif.component.css'],
})
export class NotifComponent implements OnInit, OnDestroy {

  private static readonly displayTime = 5000;

  private static readonly menuY = 250;

  private static getSubject: Subject<string>;

  public observableEvent: Subject<string>;

  private timeout: any;

  public override = '';

  @HostListener('window:scroll', ['$event'])
  track(event) {
    if (event.pageY > NotifComponent.menuY) {
      this.override = 'override';
    } else {
      this.override = '';
    }
  }

  constructor(private notifService: NotifService) {
    this.observableEvent = this.notifService.getSubject();
    NotifComponent.getSubject = this.observableEvent;
  }

  ngOnInit() {
    this.observableEvent.subscribe(
      str => {
        if (str != null && str !== '') {
          clearTimeout(this.timeout);
          this.timeout = setTimeout(this.hide, NotifComponent.displayTime);
        }
      }
    );
  }

  ngOnDestroy() {
    this.observableEvent.unsubscribe();
  }

  private hide(): void {
    NotifComponent.getSubject.next();
  }
}
