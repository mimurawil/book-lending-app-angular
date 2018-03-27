import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    public loginMode: boolean;

    constructor(private location: Location) { }

    ngOnInit() {
        this.loginMode = true;
    }

    // Event Listeners
    public onCloseLogin() {
        this.location.back();
    }

    public onToggleLoginMode(to: boolean) {
        this.loginMode = to;
    }
}
