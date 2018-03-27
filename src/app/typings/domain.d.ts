export namespace BookLendingDomain {

    interface BLABook {
        itemId: string,
        author: string,
        publishDate: string,
        publisher: string,
        title: string,
        borrowedTo?: string,
        returnDate?: string,
        reservedBy?: string
    }

    interface BLAUser {
        isLoggedIn: boolean,
        userId?: string,
        token?: string
    }

}