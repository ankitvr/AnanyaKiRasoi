import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { DeliveryTrack } from './delivery-track.model';
import { DeliveryTrackPopupService } from './delivery-track-popup.service';
import { DeliveryTrackService } from './delivery-track.service';

@Component({
    selector: 'jhi-delivery-track-delete-dialog',
    templateUrl: './delivery-track-delete-dialog.component.html'
})
export class DeliveryTrackDeleteDialogComponent {

    deliveryTrack: DeliveryTrack;

    constructor(
        private deliveryTrackService: DeliveryTrackService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.deliveryTrackService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'deliveryTrackListModification',
                content: 'Deleted an deliveryTrack'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-delivery-track-delete-popup',
    template: ''
})
export class DeliveryTrackDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private deliveryTrackPopupService: DeliveryTrackPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.deliveryTrackPopupService
                .open(DeliveryTrackDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
