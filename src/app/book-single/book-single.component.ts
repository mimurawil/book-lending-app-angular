import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

// Domain
import { BookLendingDomain } from '../typings/domain';
import BLABook = BookLendingDomain.BLABook;

// Services
import { LoginService } from '../service/login.service';

@Component({
    selector: 'app-book-single',
    templateUrl: './book-single.component.html',
    styleUrls: ['./book-single.component.css']
})
export class BookSingleComponent implements OnInit {

    @Input() book: BLABook;
    public canBorrow: boolean;
    // public canReturn: boolean;
    public canReserve: boolean;
    public hasAttention: boolean;

    constructor(
        private router: Router,
        private loginService: LoginService
    ) { }

    ngOnInit() {
        this.evaluateActions();
    }

    // Auxiliary
    private evaluateActions() {
        // GET button
        this.canBorrow = this.book.borrowedTo ? false : true;

        // RSV button
        this.canReserve = (this.book.borrowedTo && !this.book.reservedBy) ? true : false;

        // ATT button
        if (!this.book.returnDate) {
            this.hasAttention = false;
        } else {
            const today = new Date();
            const returnDate = new Date(this.book.returnDate);
            this.hasAttention = today > returnDate ? true : false;
        }

    }

    public canReturn(): boolean {
        return this.book.borrowedTo && this.loginService.getCurrentUser().userId && this.book.borrowedTo === this.loginService.getCurrentUser().userId;
    }

    // Event Listeners
    public onBorrowClick(id: string) {
        this.router.navigate(['lendings', id])
    }

    public onReturnClick(id: string) {
        this.router.navigate(['returns', id])
    }

    public onReserveClick(id: string) {
        this.router.navigate(['reservations', id])
    }

    public onDetailClick(id: string) {
        this.router.navigate(['books', id])
    }

}
