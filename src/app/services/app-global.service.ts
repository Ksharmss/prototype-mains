import { Injectable, ViewChild } from "@angular/core";
import { CookieService } from "ngx-cookie";
import { BehaviorSubject } from "rxjs";
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';
@Injectable({
    providedIn: 'root'
})

export class AppGlobalService {
    public defaultLangObserve: BehaviorSubject<string> = new BehaviorSubject<string>('ar');
    defaultLang = this.defaultLangObserve.asObservable();
    @ViewChild(ToastContainerDirective) toastContainer: ToastContainerDirective;

    constructor(private cookieService: CookieService, private toaster: ToastrService) {
        this.toaster.overlayContainer = this.toastContainer;
    }

    setLangStatus(defLang: string) {
        this.defaultLangObserve.next(defLang);
    }
    showSucess(successMsg) {
        this.toaster.success(successMsg, '', {
            timeOut: 0,
            extendedTimeOut: 0,
            closeButton: true
        })
    }
}