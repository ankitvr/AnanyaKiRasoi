import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiLanguageService, JhiAlertService } from 'ng-jhipster';

import { DeliveryTrack } from './delivery-track.model';
import { DeliveryTrackService } from './delivery-track.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-delivery-track',
    templateUrl: './delivery-track.component.html'
})
export class DeliveryTrackComponent implements OnInit, OnDestroy {
deliveryTracks: DeliveryTrack[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private deliveryTrackService: DeliveryTrackService,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.deliveryTrackService.query().subscribe(
            (res: ResponseWrapper) => {
                this.deliveryTracks = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInDeliveryTracks();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: DeliveryTrack) {
        return item.id;
    }
    registerChangeInDeliveryTracks() {
        this.eventSubscriber = this.eventManager.subscribe('deliveryTrackListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
