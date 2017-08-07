import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { UserExtras } from './user-extras.model';
import { UserExtrasPopupService } from './user-extras-popup.service';
import { UserExtrasService } from './user-extras.service';

@Component({
    selector: 'jhi-user-extras-delete-dialog',
    templateUrl: './user-extras-delete-dialog.component.html'
})
export class UserExtrasDeleteDialogComponent {

    userExtras: UserExtras;

    constructor(
        private userExtrasService: UserExtrasService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.userExtrasService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'userExtrasListModification',
                content: 'Deleted an userExtras'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-user-extras-delete-popup',
    template: ''
})
export class UserExtrasDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private userExtrasPopupService: UserExtrasPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.userExtrasPopupService
                .open(UserExtrasDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
