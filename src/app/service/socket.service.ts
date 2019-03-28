import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class SocketService {

  private socket: WebSocket;
  private listener: EventEmitter<any> = new EventEmitter();

  public constructor() {
    this.socket = new WebSocket("ws://messageservice:12345/ws");
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
