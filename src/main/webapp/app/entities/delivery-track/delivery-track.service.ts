import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils } from 'ng-jhipster';

import { DeliveryTrack } from './delivery-track.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class DeliveryTrackService {

    private resourceUrl = 'api/delivery-tracks';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(deliveryTrack: DeliveryTrack): Observable<DeliveryTrack> {
        const copy = this.convert(deliveryTrack);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    update(deliveryTrack: DeliveryTrack): Observable<DeliveryTrack> {
        const copy = this.convert(deliveryTrack);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    find(id: number): Observable<DeliveryTrack> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
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
        for (let i = 0; i < jsonResponse.length; i++) {
            this.convertItemFromServer(jsonResponse[i]);
        }
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }

    private convertItemFromServer(entity: any) {
        entity.estimatedTime = this.dateUtils
            .convertDateTimeFromServer(entity.estimatedTime);
    }

    private convert(deliveryTrack: DeliveryTrack): DeliveryTrack {
        const copy: DeliveryTrack = Object.assign({}, deliveryTrack);

        copy.estimatedTime = this.dateUtils.toDate(deliveryTrack.estimatedTime);
        return copy;
    }
}
