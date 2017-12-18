import { Subject } from 'rxjs/Subject';
import { TestBed, inject } from '@angular/core/testing';

import { NotifService } from './notif.service';

describe('NotifService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotifService]
    });
  });

  it('should be created', inject([NotifService], (service: NotifService) => {
    expect(service).toBeTruthy();
  }));

  it('test subject', inject([NotifService], (service: NotifService) => {
    let subject = "toto";
    service.publish(subject);
    let sRecup : Subject<string> = service.getSubject();
    let sAttendu : Subject<string> = new Subject<string>();
    sAttendu.next(subject); 
    expect(sRecup).toEqual(sAttendu);
  }));



});
