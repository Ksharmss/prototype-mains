import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class DataService {
    private data: any;
    private paymentDate: any;

    setData(data: any): void {
        this.data = data;
    }

    getData(): any {
        return this.data;
    }
    setPaymentDate(date: any): void {
        this.paymentDate = date;
    }
    getPaymentDate(): any {
        return this.paymentDate;
    }
}
