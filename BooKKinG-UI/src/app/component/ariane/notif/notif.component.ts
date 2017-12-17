import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotifService } from '../../../service/notif.service';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-notif',
  templateUrl: './notif.component.html',
  styleUrls: ['./notif.component.css']
})
export class NotifComponent implements OnInit, OnDestroy {

  private static readonly displayTime = 6000;

  private static getSubject: Subject<string>;

  private observableEvent: Subject<string>;

  constructor(private notifService: NotifService) {
    this.observableEvent = this.notifService.getSubject();
    NotifComponent.getSubject = this.observableEvent;
  }

  ngOnInit() {
    this.observableEvent.subscribe(
      str => {
        if (str != null && str !== '') {
          setTimeout(this.hide, NotifComponent.displayTime);
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
