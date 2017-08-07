import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AnanyaKiRasoiUserExtrasModule } from './user-extras/user-extras.module';
import { AnanyaKiRasoiAddressModule } from './address/address.module';
import { AnanyaKiRasoiBillModule } from './bill/bill.module';
import { AnanyaKiRasoiDeliveryTrackModule } from './delivery-track/delivery-track.module';
import { AnanyaKiRasoiOrderModule } from './order/order.module';
import { AnanyaKiRasoiProductModule } from './product/product.module';
import { AnanyaKiRasoiCategoryModule } from './category/category.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        AnanyaKiRasoiUserExtrasModule,
        AnanyaKiRasoiAddressModule,
        AnanyaKiRasoiBillModule,
        AnanyaKiRasoiDeliveryTrackModule,
        AnanyaKiRasoiOrderModule,
        AnanyaKiRasoiProductModule,
        AnanyaKiRasoiCategoryModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AnanyaKiRasoiEntityModule {}
