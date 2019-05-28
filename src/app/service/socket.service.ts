import { Injectable, EventEmitter } from '@angular/core';
import { EnvService } from 'src/app/service/env.service';

@Injectable()
export class SocketService {

  private socket: WebSocket;
  private listener: EventEmitter<any> = new EventEmitter();

  public constructor(
    private env: EnvService,
  ) {

    this.socket = new WebSocket(this.env.api.socket);
   
    this.socket.onopen = event => {
      this.listener.emit({"type": "open", "data": event});
    }
    this.socket.onclose = event => {
      this.listener.emit({"type": "close", "data": event});
    }
    this.socket.onmessage = event => {
      this.listener.emit({"type": "message", "data": JSON.parse(event.data)});
    }
  }

  public send(user:string, data: string) {

    let message = "<strong>["+user+"]: </strong>"+data

    this.socket.send(message);
  }

  public close() {
    this.socket.close();
  }

  public getEventListener() {
    return this.listener;
  }

}
