import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  constructor(private socket: Socket) {}

  sendMessage(msg: string) {
    this.socket.emit('message', msg); // Emit event to server
  }

  getMessages() {
    return this.socket.fromEvent<string>('message'); // Listen for event from server
  }
}
