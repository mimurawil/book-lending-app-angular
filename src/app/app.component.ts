import { Component } from '@angular/core';
import 'rxjs/add/operator/takeUntil';
import { Subject } from 'rxjs/Subject';

// Services
import { LoginService } from './service/login.service';

// Domains
import { BookLendingDomain } from './typings/domain';
import BLAUser = BookLendingDomain.BLAUser;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    private ngUnsubscribe$: Subject<any> = new Subject();

    public user: BLAUser;

    constructor(private loginService: LoginService) { }

    ngOnInit() {
        this.user = this.loginService.getCurrentUser();
    }

    ngOnDestroy() {
        this.ngUnsubscribe$.next();
        this.ngUnsubscribe$.complete();
    }

    // Event Listeners
    public onLogoutClick(e) {
        e.target.disabled = true;
        this.loginService.logout()
            .takeUntil(this.ngUnsubscribe$)
            .subscribe(
                success => {
                    e.target.disabled = false;
                }
            );
    }

}
