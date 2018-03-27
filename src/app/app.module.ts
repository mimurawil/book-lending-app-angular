import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Routing 
import { AppRoutingModule } from './app-routing.module';

// Services
import { MessageService } from './service/message.service';
import { BookLendingService } from './service/book-lending.service';
import { LoginService } from './service/login.service';

// Guards
import { AuthGuard } from './service/auth.guard';

// Components
import { AppComponent } from './app.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookSingleComponent } from './book-single/book-single.component';
import { LoginComponent } from './login/login.component';
import { SignInComponent } from './login/sign-in/sign-in.component';
import { RegisterComponent } from './login/register/register.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { SnackMessageComponent } from './snack-message/snack-message.component';
import { BookSearchComponent } from './book-search/book-search.component';
import { LoadingComponent } from './loading/loading.component';
import { PopupDialogComponent } from './popup-dialog/popup-dialog.component';


@NgModule({
    declarations: [
        AppComponent,
        BookListComponent,
        BookSingleComponent,
        LoginComponent,
        SignInComponent,
        RegisterComponent,
        BookDetailComponent,
        SnackMessageComponent,
        BookSearchComponent,
        LoadingComponent,
        PopupDialogComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule, // import this after BorwserModule
        FormsModule,
        AppRoutingModule
    ],
    providers: [
        MessageService,
        BookLendingService,
        LoginService,
        AuthGuard
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
