import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager  } from 'ng-jhipster';

import { UserExtras } from './user-extras.model';
import { UserExtrasService } from './user-extras.service';

@Component({
    selector: 'jhi-user-extras-detail',
    templateUrl: './user-extras-detail.component.html'
})
export class UserExtrasDetailComponent implements OnInit, OnDestroy {

    userExtras: UserExtras;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private userExtrasService: UserExtrasService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInUserExtras();
    }

    load(id) {
        this.userExtrasService.find(id).subscribe((userExtras) => {
            this.userExtras = userExtras;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInUserExtras() {
        this.eventSubscriber = this.eventManager.subscribe(
            'userExtrasListModification',
            (response) => this.load(this.userExtras.id)
        );
    }
}
