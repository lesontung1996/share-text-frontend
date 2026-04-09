import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

export const SOCKET_EVENTS = {
  ROOM_JOINED: 'room:joined',
  ROOM_LEFT: 'room:left',
  MESSAGE_NEW: 'message:new',
  AUTH: 'authenticate',
};

type EventTypes = typeof SOCKET_EVENTS[keyof typeof SOCKET_EVENTS];

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  constructor(private socket: Socket) {
    this.socket.fromEvent(SOCKET_EVENTS.AUTH).subscribe((data) => {
      console.log('Authentication successful:', data);
      const {sessionToken} = data as { sessionToken: string };
      if (sessionToken) {
        localStorage.setItem('sessionToken', sessionToken);
      }
    });
  }

  authenticate(roomCode: string) {
    const sessionToken = localStorage.getItem('sessionToken');
    this.socket.emit(SOCKET_EVENTS.AUTH, { roomCode, sessionToken });
  }

  sendMessage(key: EventTypes, msg: unknown) {
    this.socket.emit(key, msg);
  }

  getMessages<T>(key: EventTypes) {
    return this.socket.fromEvent<T>(key)
  }
}
