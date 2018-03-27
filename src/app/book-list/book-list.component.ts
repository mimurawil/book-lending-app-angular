import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/takeUntil';
import { Subject } from 'rxjs/Subject';

// Services
import { BookLendingService } from '../service/book-lending.service';
import { MessageService } from '../service/message.service';

// Domains & Shared
import { BookLendingDomain } from '../typings/domain';
import BLABook = BookLendingDomain.BLABook;

@Component({
    selector: 'app-book-list',
    templateUrl: './book-list.component.html',
    styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
    private ngUnsubscribe$: Subject<any> = new Subject();

    // public books: BLABook[];
    public isLoading: boolean;

    constructor(
        public bookService: BookLendingService,
        private messageService: MessageService
    ) {
        this.isLoading = false;
    }

    ngOnInit() {
        // this.getBooks();
        this.loadBooks();
    }

    ngOnDestrou() {
        this.ngUnsubscribe$.next();
        this.ngUnsubscribe$.complete();
    }

    // Auxiliary
    public loadBooks() {
        this.isLoading = true;
        this.bookService.getBookList()
            .takeUntil(this.ngUnsubscribe$)
            .subscribe(
                success => {
                    // this.books = books;
                    this.isLoading = false;
                },
                error => {
                    this.messageService.add('Could not retrieve book list.');
                    this.isLoading = false;
                }
            );
    }

    // Event Listeners & Bindings
    public getBooks() {
        // this.books = this.bookService.getBooks();
    }

}
