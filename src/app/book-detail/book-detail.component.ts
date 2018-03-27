import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';

// Services
import { BookLendingService } from '../service/book-lending.service';
import { MessageService } from '../service/message.service';
import { LoginService } from '../service/login.service';

// Domains & Static
import { BookLendingDomain } from '../typings/domain';
import BLABook = BookLendingDomain.BLABook;
import { BookActionEnum } from '../shared/static-data';

@Component({
    selector: 'app-book-detail',
    templateUrl: './book-detail.component.html',
    styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {

    public ACTION_BORROW: number = BookActionEnum.borrow;
    public ACTION_RETURN: number = BookActionEnum.return;
    public ACTION_RESERVE: number = BookActionEnum.reserve;
    public isLoading: boolean;
    public book: BLABook;
    public availabilityText: string;
    public role: string;
    public isLate: boolean;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private location: Location,
        private bookService: BookLendingService,
        private messageService: MessageService,
        private loginService: LoginService
    ) { }

    ngOnInit() {
        this.isLoading = true;
        this.evaluateRole();
        this.route.paramMap.switchMap((params: ParamMap) => this.bookService.getBook(params.get('id')))
            .subscribe(result => {
                this.book = result;
                this.evaluateAvailability();
                this.verifyLateReturnDate();
                this.isLoading = false;
                return;
            });
    }

    private evaluateRole() {
        let thisPath: string[] = this.router.url.substr(1).split('/');
        this.role = thisPath[0];
    }

    private evaluateAvailability() {
        if (this.book.borrowedTo) {
            if (this.book.reservedBy) {
                this.availabilityText = `This book is borrowed and reserved. Sorry.`;
            } else {
                this.availabilityText = `This book is borrowed, but you can reserve it.`;
            }
        } else {
            this.availabilityText = `This book is available.`;
        }
    }

    private verifyLateReturnDate() {
        const today = new Date();
        const returnDate = new Date(this.book.returnDate);
        this.isLate = today > returnDate ? true : false;
    }

    private displaySuccessMessage(action: BookActionEnum) {
        switch (action) {
            case BookActionEnum.borrow:
                const returnDate = new Date(new Date().getTime() + (7 * 24 * 60 * 60 * 1000));
                this.messageService.add(`Book borrowed! Return until ${returnDate.toDateString()}`);
                break;
            case BookActionEnum.return:
                this.messageService.add('Book returned!');
                break;
            case BookActionEnum.reserve:
                this.messageService.add('Book reserved!');
                break;
        }
    }

    public canBorrow(): boolean {
        return !this.book.borrowedTo ? true : false;
    }
    public canReturn(): boolean {
        if (this.loginService.getCurrentUser().isLoggedIn &&
            this.loginService.getCurrentUser().userId === this.book.borrowedTo) {
            return true;
        } else {
            return false;
        }
    }
    public canReserve(): boolean {
        return this.book.borrowedTo && !this.book.reservedBy ? true : false;
    }

    // Event Listeners
    public onCloseDetail() {
        this.location.back();
    }

    public onActionClicked(action: BookActionEnum) {
        this.isLoading = true;
        this.bookService.postActionBook(action, this.book.itemId)
            .subscribe(
                success => {
                    this.displaySuccessMessage(action);
                    this.bookService.getBookList()
                        .subscribe(
                            success => {
                                this.isLoading = false;
                                this.location.back();
                            }
                        );
                },
                error => {
                    if (error.status === 400) {
                        this.messageService.add(error.error[0].toUpperCase() + error.error.substr(1));
                    } else {
                        this.messageService.add('Session expired. Please login again.');
                        this.loginService.logout(0);
                        this.router.navigate(['login']);
                    }
                    this.isLoading = false;
                }
            );
    }



}
