import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { finalize, Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class LoadingInterceptor implements HttpInterceptor {

    private countRequest = 0;
    constructor(private spinner: NgxSpinnerService) {}
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        this.spinner.show();
        this.countRequest++;
        return next.handle(req)
            .pipe(finalize( () => {
                this.countRequest--;
                if (!this.countRequest) {
                    this.spinner.hide();
                }
            }))
        
    }

}