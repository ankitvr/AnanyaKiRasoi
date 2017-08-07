import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { UserExtras } from './user-extras.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class UserExtrasService {

    private resourceUrl = 'api/user-extras';

    constructor(private http: Http) { }

    create(userExtras: UserExtras): Observable<UserExtras> {
        const copy = this.convert(userExtras);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(userExtras: UserExtras): Observable<UserExtras> {
        const copy = this.convert(userExtras);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<UserExtras> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            return res.json();
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }

    private convert(userExtras: UserExtras): UserExtras {
        const copy: UserExtras = Object.assign({}, userExtras);
        return copy;
    }
}
