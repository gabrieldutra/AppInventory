import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { DeviceComponent } from './device.component';
import { DeviceDetailComponent } from './device-detail.component';
import { DevicePopupComponent } from './device-dialog.component';
import { DeviceDeletePopupComponent } from './device-delete-dialog.component';

@Injectable()
export class DeviceResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const deviceRoute: Routes = [
    {
        path: 'device',
        component: DeviceComponent,
        resolve: {
            'pagingParams': DeviceResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'appinventoryApp.device.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'device/:id',
        component: DeviceDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'appinventoryApp.device.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const devicePopupRoute: Routes = [
    {
        path: 'device-new',
        component: DevicePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'appinventoryApp.device.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'device/:id/edit',
        component: DevicePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'appinventoryApp.device.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'device/:id/delete',
        component: DeviceDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'appinventoryApp.device.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
