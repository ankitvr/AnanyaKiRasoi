import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AnanyaKiRasoiSharedModule } from '../../shared';
import {
    DeliveryTrackService,
    DeliveryTrackPopupService,
    DeliveryTrackComponent,
    DeliveryTrackDetailComponent,
    DeliveryTrackDialogComponent,
    DeliveryTrackPopupComponent,
    DeliveryTrackDeletePopupComponent,
    DeliveryTrackDeleteDialogComponent,
    deliveryTrackRoute,
    deliveryTrackPopupRoute,
} from './';

const ENTITY_STATES = [
    ...deliveryTrackRoute,
    ...deliveryTrackPopupRoute,
];

@NgModule({
    imports: [
        AnanyaKiRasoiSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        DeliveryTrackComponent,
        DeliveryTrackDetailComponent,
        DeliveryTrackDialogComponent,
        DeliveryTrackDeleteDialogComponent,
        DeliveryTrackPopupComponent,
        DeliveryTrackDeletePopupComponent,
    ],
    entryComponents: [
        DeliveryTrackComponent,
        DeliveryTrackDialogComponent,
        DeliveryTrackPopupComponent,
        DeliveryTrackDeleteDialogComponent,
        DeliveryTrackDeletePopupComponent,
    ],
    providers: [
        DeliveryTrackService,
        DeliveryTrackPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AnanyaKiRasoiDeliveryTrackModule {}
