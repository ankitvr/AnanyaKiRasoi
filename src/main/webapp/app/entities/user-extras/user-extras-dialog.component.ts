import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { UserExtras } from './user-extras.model';
import { UserExtrasPopupService } from './user-extras-popup.service';
import { UserExtrasService } from './user-extras.service';
import { DeliveryTrack, DeliveryTrackService } from '../delivery-track';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-user-extras-dialog',
    templateUrl: './user-extras-dialog.component.html'
})
export class UserExtrasDialogComponent implements OnInit {

    userExtras: UserExtras;
    isSaving: boolean;

    deliverytracks: DeliveryTrack[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private userExtrasService: UserExtrasService,
        private deliveryTrackService: DeliveryTrackService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.deliveryTrackService
            .query({filter: 'userextras-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.userExtras.deliveryTrack || !this.userExtras.deliveryTrack.id) {
                    this.deliverytracks = res.json;
                } else {
                    this.deliveryTrackService
                        .find(this.userExtras.deliveryTrack.id)
                        .subscribe((subRes: DeliveryTrack) => {
                            this.deliverytracks = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.userExtras.id !== undefined) {
            this.subscribeToSaveResponse(
                this.userExtrasService.update(this.userExtras));
        } else {
            this.subscribeToSaveResponse(
                this.userExtrasService.create(this.userExtras));
        }
    }

    private subscribeToSaveResponse(result: Observable<UserExtras>) {
        result.subscribe((res: UserExtras) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: UserExtras) {
        this.eventManager.broadcast({ name: 'userExtrasListModification', content: 'OK'});
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

    trackDeliveryTrackById(index: number, item: DeliveryTrack) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-user-extras-popup',
    template: ''
})
export class UserExtrasPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private userExtrasPopupService: UserExtrasPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.userExtrasPopupService
                    .open(UserExtrasDialogComponent as Component, params['id']);
            } else {
                this.userExtrasPopupService
                    .open(UserExtrasDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
