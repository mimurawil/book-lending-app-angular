# Book Lending App (Angular)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.8.

This repo is part of the tiny project/demo/portfolio for a **Super Simple Book Lending App**.

It is responsible for creating the graphical user interface, managing the API calls, and control user access in each action (borrow, reserve, return).

## How to install
Assuming you already have [Angular CLI](https://github.com/angular/angular-cli) and you already installed and deployed the repos [book-lending-app-auth](https://github.com/mimurawil/book-lending-app-auth) and [book-lending-app-api](https://github.com/mimurawil/book-lending-app-api), the following steps will explain how to install this project on your machine.

1. Clone this repo
2. Install the dependent modules
3. Open the file `src/app/service/login.service.ts` and update the **urls** of the API call to the one you created installing the repo [book-lending-app-auth](https://github.com/mimurawil/book-lending-app-auth).
4. Open the file `src/app/service/book-lending.service.ts` and update the **url** of the API call in the methods **getBookList()** and **postActionBook()** to the one you created installing the repo [book-lending-app-api](https://github.com/mimurawil/book-lending-app-api).
    1. **For the method postActionBook() don't paste the entire url. This method is dynamically taking the last two path parameters, the first one is the utility (reservations/lendings/returnings), and the second one is the id of the book.**
5. To execute in local mode run `ng serve --open`.

## How to uninstall
Just delete the entire folder.
