import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

// Services
import { LoginService } from './login.service';
import { MessageService } from './message.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private loginService: LoginService,
        private messageService: MessageService,
        private router: Router
    ) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        if (this.loginService.getCurrentUser().isLoggedIn) {
            return true;
        } else {
            this.messageService.add('You need to login first.');
            this.router.navigate(['login']);
            return false;
        }
    }
}
