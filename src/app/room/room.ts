import { Component, OnInit, signal, inject } from '@angular/core';
import { WebsocketService, SOCKET_EVENTS } from '../socket.service';
import { ActivatedRoute } from '@angular/router';
import { RoomMessagesResponse } from '../../types';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideLink, lucideCopy } from '@ng-icons/lucide';
import { ZardButtonComponent } from '../shared/components/button/button.component';
import { ZardInputDirective } from '../shared/components/input/input.directive';
import { toast } from 'ngx-sonner';
import { QRCodeComponent } from 'angularx-qrcode';

@Component({
  selector: 'app-room',
  imports: [FormsModule, DatePipe, ZardButtonComponent, NgIcon, QRCodeComponent, ZardInputDirective],
  templateUrl: './room.html',
  styleUrl: './room.css',
  viewProviders: [provideIcons({ lucideLink, lucideCopy })],
})
export class Room implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  messages = signal<RoomMessagesResponse[]>([]);
  roomCode = signal<string>('');
  textInput: string = '';

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
      toast.success('Message copied to clipboard', {
        position: 'top-center',
      });
    });
  }

  copyRoomUrl() {
    const url = `${window.location.origin}/room/${this.roomCode()}`;
    navigator.clipboard.writeText(url).then(() => {
      toast.success('URL copied to clipboard', {
        position: 'top-center',
      });
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
