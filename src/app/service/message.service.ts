import { Injectable } from '@angular/core';

@Injectable()
export class MessageService {

  private messages: string[];

  constructor() {
    this.messages = [];
  }

  public add(message: string) {
    this.messages.push(message);
  }

  public remove(index: number) {
    this.messages.splice(index, 1);
  }

  public getMessages(): string[] {
    return this.messages;
  }

}
