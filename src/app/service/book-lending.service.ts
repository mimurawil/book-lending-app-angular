import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';

// Services
import { MessageService } from './message.service';
import { LoginService } from './login.service';

// Domain & Statics
import { BookLendingDomain } from '../typings/domain';
import BLABook = BookLendingDomain.BLABook;
import { SortTypeEnum, SortDirectionEnum, BookActionEnum } from '../shared/static-data';

@Injectable()
export class BookLendingService {
    private bookList: BLABook[];
    private filteredBooks: BLABook[];
    private sortType: SortTypeEnum;
    private sortDirection: SortDirectionEnum;

    constructor(
        private messageService: MessageService,
        private loginService: LoginService,
        private http: HttpClient
    ) {
        this.bookList = [];
        this.sortType = SortTypeEnum.title;
        this.sortDirection = SortDirectionEnum.asc;
        this.filterBooks('');
    }

    public getBookList(): Observable<boolean> {
        // USE YOUR API HERE. SHOULD BE SOMETHING LIKE 
        // https://<API_ID>.execute-api.<REGION>.amazonaws.com/<ENVIRONMENT>/books
        const url = 'YOUR_API_HERE';
        const options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };

        let myObs$ = new Observable<boolean>(observer => {
            this.http.get(url, options)
                .subscribe(
                    data => {
                        this.bookList = data['Items'];
                        this.filterBooks();
                        observer.next(true);
                        observer.complete();
                    },
                    error => {
                        observer.error();
                        observer.complete();
                    }
                );
        });
        return myObs$;
    }

    public getBooks(): BLABook[] {
        return this.filteredBooks;
    }

    public getSortType(): SortTypeEnum {
        return this.sortType;
    }
    public setSortType(to: SortTypeEnum) {
        this.sortType = to;
    }

    public getSortDirection(): SortDirectionEnum {
        return this.sortDirection;
    }
    public setSortDirection(to: SortDirectionEnum) {
        this.sortDirection = to;
    }

    public filterBooks(filter: string = '') {
        let filteredList: BLABook[] = [];

        // Apply filter
        this.bookList.forEach(book => {
            if (
                book.title.toLowerCase().indexOf(filter.toLowerCase()) !== -1 ||
                book.author.toLowerCase().indexOf(filter.toLowerCase()) !== -1 ||
                book.publisher.toLowerCase().indexOf(filter.toLowerCase()) !== -1 ||
                book.publishDate.toLowerCase().indexOf(filter.toLowerCase()) !== -1
            ) {
                filteredList.push(book);
            }
        });

        let orderType = (this.sortType === SortTypeEnum.publish_date ? 'publishDate' : SortTypeEnum[this.sortType]);
        // Apply order by and direction
        filteredList = _.orderBy(filteredList, book => {
            return book[orderType].toLowerCase();
        }, SortDirectionEnum[this.sortDirection]);

        this.filteredBooks = filteredList;

    }

    public getBook(id: string): Observable<BLABook> {
        return of(
            _.find(this.bookList, function (book) {
                return book.itemId === id;
            })
        );
    }

    public postActionBook(action: BookActionEnum, bookId: string): Observable<any> {
        // USE YOUR API HERE. SHOULD BE SOMETHING LIKE 
        // https://<API_ID>.execute-api.<REGION>.amazonaws.com/<ENVIRONMENT>
        let url = 'YOUR_API_HERE';
        switch (action) {
            case BookActionEnum.borrow:
                url += `/lendings/${bookId}`;
                break;
            case BookActionEnum.reserve:
                url += `/reservations/${bookId}`;
                break;
            case BookActionEnum.return:
                url += `/returnings/${bookId}`;
                break;
        }
        const options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': this.loginService.getCurrentUser().token
            })
        };
        return this.http.post(url, null, options);
    }

}
