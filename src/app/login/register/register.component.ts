import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import 'rxjs/add/operator/takeUntil';
import { Subject } from 'rxjs/Subject'

// Services
import { LoginService } from '../../service/login.service';
import { MessageService } from '../../service/message.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    @Output() onRegisterSuccess = new EventEmitter();

    private ngUnsubscribe$: Subject<any> = new Subject();

    public username: string;
    public password: string;
    public confirmPassword: string;
    public isLoading: boolean;

    constructor(
        private loginService: LoginService,
        private messageService: MessageService
    ) { }

    ngOnInit() { }

    ngOnDestroy() {
        this.ngUnsubscribe$.next();
        this.ngUnsubscribe$.complete();
    }

    // Auxiliary
    private validateForm(): boolean {
        let result: boolean = true;
        if (!this.username || this.username.trim().length === 0) {
            this.messageService.add('Username required!');
            console.log('aaaa')
            result = false;
        }
        if (!this.password || this.password.trim().length === 0) {
            this.messageService.add('Password required!');
            result = false;
        }
        if (!this.password || !this.confirmPassword || this.password !== this.confirmPassword) {
            this.messageService.add('Passwords must match!');
            result = false;
        }
        return result;
    }

    // Event Listeners
    public onRegisterClicked() {
        if (!this.validateForm()) return;

        this.isLoading = true;
        this.loginService.register(this.username, this.password, this.confirmPassword)
            .takeUntil(this.ngUnsubscribe$)
            .subscribe(
                success => {
                    this.onRegisterSuccess.emit();
                    this.messageService.add('Success! You can register now.');
                    this.isLoading = false;
                },
                error => {
                    let msg: string = error;
                    msg = msg[0].toUpperCase() + msg.substr(1);
                    this.messageService.add(msg);
                    this.isLoading = false;
                }
            );
    }

}
