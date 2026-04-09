import { Component, OnInit, signal, inject } from '@angular/core';
import { WebsocketService, SOCKET_EVENTS } from '../socket.service';
import { ActivatedRoute } from '@angular/router';
import { RoomMessagesResponse } from '../../types';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-room',
  imports: [FormsModule, DatePipe],
  templateUrl: './room.html',
  styleUrl: './room.css',
})
export class Room implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  messages = signal<RoomMessagesResponse[]>([]);
  roomCode = signal<string>('');
  textInput: string = '';
  copiedIndex = signal<number | null>(null);
  urlCopied = signal<boolean>(false);

  constructor(private websocketService: WebsocketService) {
    this.activatedRoute.params.subscribe((params) => {
      this.roomCode.set(params['roomCode']);
    });
    this.websocketService.authenticate(this.roomCode());
  }

  ngOnInit() {
    this.websocketService.getMessages<RoomMessagesResponse[]>(SOCKET_EVENTS.ROOM_JOINED).subscribe((messages) => {
      console.log(messages);
      this.messages.set(messages);
    });
    this.websocketService.getMessages<RoomMessagesResponse>(SOCKET_EVENTS.MESSAGE_NEW).subscribe((messages) => {
      console.log(messages);
      this.messages.update((current) => [...current, messages]);
    });
    this.websocketService.sendMessage(SOCKET_EVENTS.ROOM_JOINED, { room_code: this.roomCode() });
  }

  newMessage() {
    if (!this.textInput.trim()) return;
    this.websocketService.sendMessage(SOCKET_EVENTS.MESSAGE_NEW, { room_code: this.roomCode(), content: this.textInput });
    this.textInput = '';
  }

  isMyMessage(msg: RoomMessagesResponse): boolean {
    return msg.author_token === localStorage.getItem('sessionToken');
  }

  copyMessage(content: string, index: number) {
    navigator.clipboard.writeText(content).then(() => {
      this.copiedIndex.set(index);
      setTimeout(() => this.copiedIndex.set(null), 2000);
    });
  }

  copyRoomUrl() {
    const url = `${window.location.origin}/room/${this.roomCode()}`;
    navigator.clipboard.writeText(url).then(() => {
      this.urlCopied.set(true);
      setTimeout(() => this.urlCopied.set(false), 2000);
    });
  }

  get roomUrl(): string {
    return `${window.location.origin}/room/${this.roomCode()}`;
  }

  handleComposerKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.newMessage();
    }
  }
}
