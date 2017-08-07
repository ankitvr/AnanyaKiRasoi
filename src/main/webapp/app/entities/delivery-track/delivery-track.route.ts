import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { DeliveryTrackComponent } from './delivery-track.component';
import { DeliveryTrackDetailComponent } from './delivery-track-detail.component';
import { DeliveryTrackPopupComponent } from './delivery-track-dialog.component';
import { DeliveryTrackDeletePopupComponent } from './delivery-track-delete-dialog.component';

export const deliveryTrackRoute: Routes = [
    {
        path: 'delivery-track',
        component: DeliveryTrackComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ananyaKiRasoiApp.deliveryTrack.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'delivery-track/:id',
        component: DeliveryTrackDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ananyaKiRasoiApp.deliveryTrack.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const deliveryTrackPopupRoute: Routes = [
    {
        path: 'delivery-track-new',
        component: DeliveryTrackPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ananyaKiRasoiApp.deliveryTrack.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'delivery-track/:id/edit',
        component: DeliveryTrackPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ananyaKiRasoiApp.deliveryTrack.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'delivery-track/:id/delete',
        component: DeliveryTrackDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ananyaKiRasoiApp.deliveryTrack.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
