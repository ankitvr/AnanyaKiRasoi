import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { DeliveryTrack } from './delivery-track.model';
import { DeliveryTrackService } from './delivery-track.service';

@Injectable()
export class DeliveryTrackPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private deliveryTrackService: DeliveryTrackService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.deliveryTrackService.find(id).subscribe((deliveryTrack) => {
                    deliveryTrack.estimatedTime = this.datePipe
                        .transform(deliveryTrack.estimatedTime, 'yyyy-MM-ddThh:mm');
                    this.ngbModalRef = this.deliveryTrackModalRef(component, deliveryTrack);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.deliveryTrackModalRef(component, new DeliveryTrack());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    deliveryTrackModalRef(component: Component, deliveryTrack: DeliveryTrack): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.deliveryTrack = deliveryTrack;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
