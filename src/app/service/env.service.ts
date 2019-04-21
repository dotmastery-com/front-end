import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EnvService {
  public api = {
    data: 'http://localhost:7000',
    socket: 'ws://localhost:12345/ws',
  };

  constructor() { }
}
