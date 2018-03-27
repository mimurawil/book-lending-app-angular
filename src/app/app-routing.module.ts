import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Guards
import { AuthGuard } from './service/auth.guard';

// Components
import { PopupDialogComponent } from './popup-dialog/popup-dialog.component';
import { LoginComponent } from './login/login.component';
import { BookDetailComponent } from './book-detail/book-detail.component';

const routes: Routes = [
    {
        path: 'login',
        component: PopupDialogComponent,
        children: [
            {
                path: '',
                component: LoginComponent
            }
        ]
    },
    {
        path: 'books',
        component: PopupDialogComponent,
        children: [
            {
                path: ':id',
                component: BookDetailComponent
            }
        ]
    },
    {
        path: 'lendings',
        component: PopupDialogComponent,
        children: [
            {
                path: ':id',
                component: BookDetailComponent,
                canActivate: [AuthGuard]
            }
        ]
    },
    {
        path: 'returns',
        component: PopupDialogComponent,
        children: [
            {
                path: ':id',
                component: BookDetailComponent,
                canActivate: [AuthGuard]
            }
        ]
    },
    {
        path: 'reservations',
        component: PopupDialogComponent,
        children: [
            {
                path: ':id',
                component: BookDetailComponent,
                canActivate: [AuthGuard]
            }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
