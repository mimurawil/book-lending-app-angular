import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
// import { Router } from '@angular/router';
// import {takeUntil} from 'rxjs/operators'; // for rxjs ^5.5.0 lettable operators
import 'rxjs/add/operator/takeUntil';
import { Subject } from 'rxjs/Subject';


// Services
import { LoginService } from '../../service/login.service';
import { MessageService } from '../../service/message.service';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
    private ngUnsubscribe$: Subject<any> = new Subject();

    public username: string;
    public password: string;
    public isLoading: boolean;

    constructor(
        private loginService: LoginService,
        private messageService: MessageService,
        private location: Location,
        // private router: Router
    ) {
        this.isLoading = false;
    }

    ngOnInit() { }

    ngOnDestroy() {
        this.ngUnsubscribe$.next();
        this.ngUnsubscribe$.complete();
    }

    // Event Listeners
    public onLoginClicked() {
        this.isLoading = true;
        this.loginService.login(this.username, this.password)
            .takeUntil(this.ngUnsubscribe$)
            .subscribe(
                success => {
                    this.isLoading = false;
                    this.location.back();
                    // this.router.navigate(['/']);
                },
                error => {
                    this.isLoading = false;
                    this.messageService.add('Invalid username/password.');
                }
            );
    }

}
