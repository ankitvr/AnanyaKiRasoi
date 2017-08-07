import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Bill } from './bill.model';
import { BillPopupService } from './bill-popup.service';
import { BillService } from './bill.service';
import { Order, OrderService } from '../order';
import { DeliveryTrack, DeliveryTrackService } from '../delivery-track';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-bill-dialog',
    templateUrl: './bill-dialog.component.html'
})
export class BillDialogComponent implements OnInit {

    bill: Bill;
    isSaving: boolean;

    orders: Order[];

    deliverytracks: DeliveryTrack[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private billService: BillService,
        private orderService: OrderService,
        private deliveryTrackService: DeliveryTrackService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.orderService
            .query({filter: 'bill-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.bill.order || !this.bill.order.id) {
                    this.orders = res.json;
                } else {
                    this.orderService
                        .find(this.bill.order.id)
                        .subscribe((subRes: Order) => {
                            this.orders = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.deliveryTrackService.query()
            .subscribe((res: ResponseWrapper) => { this.deliverytracks = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.bill.id !== undefined) {
            this.subscribeToSaveResponse(
                this.billService.update(this.bill));
        } else {
            this.subscribeToSaveResponse(
                this.billService.create(this.bill));
        }
    }

    private subscribeToSaveResponse(result: Observable<Bill>) {
        result.subscribe((res: Bill) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Bill) {
        this.eventManager.broadcast({ name: 'billListModification', content: 'OK'});
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

    trackOrderById(index: number, item: Order) {
        return item.id;
    }

    trackDeliveryTrackById(index: number, item: DeliveryTrack) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-bill-popup',
    template: ''
})
export class BillPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private billPopupService: BillPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.billPopupService
                    .open(BillDialogComponent as Component, params['id']);
            } else {
                this.billPopupService
                    .open(BillDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
