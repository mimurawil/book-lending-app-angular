import { Component, OnInit } from '@angular/core';

// Service
import { MessageService } from '../service/message.service';

@Component({
    selector: 'app-snack-message',
    templateUrl: './snack-message.component.html',
    styleUrls: ['./snack-message.component.css']
})
export class SnackMessageComponent implements OnInit {
    public messages: string[];

    constructor(private messageService: MessageService) {
        this.messages = this.messageService.getMessages();
    }

    ngOnInit() { }

    // Event Listeners
    public onClose(index: number) {
        // console.log(`removing index ${index}`)
        this.messageService.remove(index);
    }

}
