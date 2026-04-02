import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

export const SOCKET_EVENTS = {
  ROOM_JOINED: 'room:joined',
  ROOM_LEFT: 'room:left',
  MESSAGE_NEW: 'message:new',
};

type EventTypes = typeof SOCKET_EVENTS[keyof typeof SOCKET_EVENTS];

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  constructor(private socket: Socket) {}

  sendMessage(key: EventTypes, msg: unknown) {
    this.socket.emit(key, msg);
  }

  getMessages<T>(key: EventTypes) {
    return this.socket.fromEvent<T>(key)
  }
}
