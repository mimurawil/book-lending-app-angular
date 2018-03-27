import { Component, OnInit, Output, EventEmitter } from '@angular/core';

// Services
import { BookLendingService } from '../service/book-lending.service';

// Static Data
import { SortTypeEnum, SortDirectionEnum } from '../shared/static-data';

@Component({
    selector: 'app-book-search',
    templateUrl: './book-search.component.html',
    styleUrls: ['./book-search.component.css']
})
export class BookSearchComponent implements OnInit {

    @Output('onSearchFinish') onSearchFinish = new EventEmitter();

    public sortType: SortTypeEnum;
    public sortDirection: SortDirectionEnum;
    public searchText: string;

    constructor(private bookService: BookLendingService) {
        this.sortType = bookService.getSortType();
        this.sortDirection = bookService.getSortDirection();
    }

    ngOnInit() { }

    // Public Auxiliaries
    public isSortTitle(): boolean {
        return this.sortType === SortTypeEnum.title;
    }
    public isSortAuthor(): boolean {
        return this.sortType === SortTypeEnum.author;
    }
    public isSortPublisher(): boolean {
        return this.sortType === SortTypeEnum.publisher;
    }
    public isSortPublishDate(): boolean {
        return this.sortType === SortTypeEnum.publish_date;
    }
    public isSortAsc(): boolean {
        return this.sortDirection === SortDirectionEnum.asc;
    }
    public isSortDesc(): boolean {
        return this.sortDirection === SortDirectionEnum.desc;
    }

    // Event Listeners
    public onChangeSortType(to: string) {
        this.sortType = SortTypeEnum[to];
        this.bookService.setSortType(this.sortType);
        this.bookService.filterBooks(this.searchText);
        this.onSearchFinish.emit();
    }
    public onChangeSortDirection(to: string) {
        this.sortDirection = SortDirectionEnum[to];
        this.bookService.setSortDirection(this.sortDirection);
        this.bookService.filterBooks(this.searchText);
        this.onSearchFinish.emit();
    }
    public onSearch() {
        this.bookService.filterBooks(this.searchText);
        this.onSearchFinish.emit();
    }

}
