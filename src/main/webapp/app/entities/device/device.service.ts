import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Device } from './device.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Device>;

@Injectable()
export class DeviceService {

    private resourceUrl =  SERVER_API_URL + 'api/devices';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(device: Device): Observable<EntityResponseType> {
        const copy = this.convert(device);
        return this.http.post<Device>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(device: Device): Observable<EntityResponseType> {
        const copy = this.convert(device);
        return this.http.put<Device>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Device>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Device[]>> {
        const options = createRequestOption(req);
        return this.http.get<Device[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Device[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Device = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Device[]>): HttpResponse<Device[]> {
        const jsonResponse: Device[] = res.body;
        const body: Device[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Device.
     */
    private convertItemFromServer(device: Device): Device {
        const copy: Device = Object.assign({}, device);
        copy.created = this.dateUtils
            .convertDateTimeFromServer(device.created);
        return copy;
    }

    /**
     * Convert a Device to a JSON which can be sent to the server.
     */
    private convert(device: Device): Device {
        const copy: Device = Object.assign({}, device);

        copy.created = this.dateUtils.toDate(device.created);
        return copy;
    }
}
