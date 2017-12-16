import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class NotifService {

  private readonly event: Subject<string>;

  constructor() {
    this.event = new Subject<string>();
  }

  public getSubject(): Subject<string> {
    return this.event;
  }

}
