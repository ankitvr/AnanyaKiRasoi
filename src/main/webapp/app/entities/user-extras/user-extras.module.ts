import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AnanyaKiRasoiSharedModule } from '../../shared';
import {
    UserExtrasService,
    UserExtrasPopupService,
    UserExtrasComponent,
    UserExtrasDetailComponent,
    UserExtrasDialogComponent,
    UserExtrasPopupComponent,
    UserExtrasDeletePopupComponent,
    UserExtrasDeleteDialogComponent,
    userExtrasRoute,
    userExtrasPopupRoute,
    UserExtrasResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...userExtrasRoute,
    ...userExtrasPopupRoute,
];

@NgModule({
    imports: [
        AnanyaKiRasoiSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        UserExtrasComponent,
        UserExtrasDetailComponent,
        UserExtrasDialogComponent,
        UserExtrasDeleteDialogComponent,
        UserExtrasPopupComponent,
        UserExtrasDeletePopupComponent,
    ],
    entryComponents: [
        UserExtrasComponent,
        UserExtrasDialogComponent,
        UserExtrasPopupComponent,
        UserExtrasDeleteDialogComponent,
        UserExtrasDeletePopupComponent,
    ],
    providers: [
        UserExtrasService,
        UserExtrasPopupService,
        UserExtrasResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AnanyaKiRasoiUserExtrasModule {}
