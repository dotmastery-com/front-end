import { TestBed } from '@angular/core/testing';

import { SocketService } from './socket.service';

describe('SocketService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [SocketService]
  }));

  it('should be created yadda', () => {
    const service: SocketService = TestBed.get(SocketService);
    expect(service).toBeTruthy();
  });
});
