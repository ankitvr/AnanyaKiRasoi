import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserExtrasComponent } from './user-extras.component';
import { UserExtrasDetailComponent } from './user-extras-detail.component';
import { UserExtrasPopupComponent } from './user-extras-dialog.component';
import { UserExtrasDeletePopupComponent } from './user-extras-delete-dialog.component';

@Injectable()
export class UserExtrasResolvePagingParams implements Resolve<any> {

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

export const userExtrasRoute: Routes = [
    {
        path: 'user-extras',
        component: UserExtrasComponent,
        resolve: {
            'pagingParams': UserExtrasResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ananyaKiRasoiApp.userExtras.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'user-extras/:id',
        component: UserExtrasDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ananyaKiRasoiApp.userExtras.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const userExtrasPopupRoute: Routes = [
    {
        path: 'user-extras-new',
        component: UserExtrasPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ananyaKiRasoiApp.userExtras.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'user-extras/:id/edit',
        component: UserExtrasPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ananyaKiRasoiApp.userExtras.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'user-extras/:id/delete',
        component: UserExtrasDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ananyaKiRasoiApp.userExtras.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
