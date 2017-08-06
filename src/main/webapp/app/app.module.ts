import './vendor.ts';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2Webstorage } from 'ng2-webstorage';

import { AnanyaKiRasoiSharedModule, UserRouteAccessService } from './shared';
import { AnanyaKiRasoiHomeModule } from './home/home.module';
import { AnanyaKiRasoiAdminModule } from './admin/admin.module';
import { AnanyaKiRasoiAccountModule } from './account/account.module';
import { AnanyaKiRasoiEntityModule } from './entities/entity.module';

import { customHttpProvider } from './blocks/interceptor/http.provider';
import { PaginationConfig } from './blocks/config/uib-pagination.config';

// jhipster-needle-angular-add-module-import JHipster will add new module here

import {
    JhiMainComponent,
    LayoutRoutingModule,
    NavbarComponent,
    FooterComponent,
    ProfileService,
    PageRibbonComponent,
    ActiveMenuDirective,
    ErrorComponent
} from './layouts';

@NgModule({
    imports: [
        BrowserModule,
        LayoutRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-'}),
        AnanyaKiRasoiSharedModule,
        AnanyaKiRasoiHomeModule,
        AnanyaKiRasoiAdminModule,
        AnanyaKiRasoiAccountModule,
        AnanyaKiRasoiEntityModule,
        // jhipster-needle-angular-add-module JHipster will add new module here
    ],
    declarations: [
        JhiMainComponent,
        NavbarComponent,
        ErrorComponent,
        PageRibbonComponent,
        ActiveMenuDirective,
        FooterComponent
    ],
    providers: [
        ProfileService,
        customHttpProvider(),
        PaginationConfig,
        UserRouteAccessService
    ],
    bootstrap: [ JhiMainComponent ]
})
export class AnanyaKiRasoiAppModule {}
