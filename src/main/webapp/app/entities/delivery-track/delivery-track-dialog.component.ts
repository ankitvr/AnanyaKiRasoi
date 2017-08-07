import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { DeliveryTrack } from './delivery-track.model';
import { DeliveryTrackPopupService } from './delivery-track-popup.service';
import { DeliveryTrackService } from './delivery-track.service';
import { Bill, BillService } from '../bill';
import { UserExtras, UserExtrasService } from '../user-extras';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-delivery-track-dialog',
    templateUrl: './delivery-track-dialog.component.html'
})
export class DeliveryTrackDialogComponent implements OnInit {

    deliveryTrack: DeliveryTrack;
    isSaving: boolean;

    bills: Bill[];

    userextras: UserExtras[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private deliveryTrackService: DeliveryTrackService,
        private billService: BillService,
        private userExtrasService: UserExtrasService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.billService
            .query({filter: 'deliverytrack-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.deliveryTrack.bill || !this.deliveryTrack.bill.id) {
                    this.bills = res.json;
                } else {
                    this.billService
                        .find(this.deliveryTrack.bill.id)
                        .subscribe((subRes: Bill) => {
                            this.bills = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.userExtrasService.query()
            .subscribe((res: ResponseWrapper) => { this.userextras = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.deliveryTrack.id !== undefined) {
            this.subscribeToSaveResponse(
                this.deliveryTrackService.update(this.deliveryTrack));
        } else {
            this.subscribeToSaveResponse(
                this.deliveryTrackService.create(this.deliveryTrack));
        }
    }

    private subscribeToSaveResponse(result: Observable<DeliveryTrack>) {
        result.subscribe((res: DeliveryTrack) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: DeliveryTrack) {
        this.eventManager.broadcast({ name: 'deliveryTrackListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError(error) {
        try {
            error.json();
        } catch (exception) {
            error.message = error.text();
        }
        this.isSaving = false;
        this.onError(error);
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }

    trackBillById(index: number, item: Bill) {
        return item.id;
    }

    trackUserExtrasById(index: number, item: UserExtras) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-delivery-track-popup',
    template: ''
})
export class DeliveryTrackPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private deliveryTrackPopupService: DeliveryTrackPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.deliveryTrackPopupService
                    .open(DeliveryTrackDialogComponent as Component, params['id']);
            } else {
                this.deliveryTrackPopupService
                    .open(DeliveryTrackDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
