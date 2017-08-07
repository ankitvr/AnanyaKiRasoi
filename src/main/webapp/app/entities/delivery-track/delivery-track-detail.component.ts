import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager  } from 'ng-jhipster';

import { DeliveryTrack } from './delivery-track.model';
import { DeliveryTrackService } from './delivery-track.service';

@Component({
    selector: 'jhi-delivery-track-detail',
    templateUrl: './delivery-track-detail.component.html'
})
export class DeliveryTrackDetailComponent implements OnInit, OnDestroy {

    deliveryTrack: DeliveryTrack;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private deliveryTrackService: DeliveryTrackService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDeliveryTracks();
    }

    load(id) {
        this.deliveryTrackService.find(id).subscribe((deliveryTrack) => {
            this.deliveryTrack = deliveryTrack;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDeliveryTracks() {
        this.eventSubscriber = this.eventManager.subscribe(
            'deliveryTrackListModification',
            (response) => this.load(this.deliveryTrack.id)
        );
    }
}
