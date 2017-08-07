/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { AnanyaKiRasoiTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { DeliveryTrackDetailComponent } from '../../../../../../main/webapp/app/entities/delivery-track/delivery-track-detail.component';
import { DeliveryTrackService } from '../../../../../../main/webapp/app/entities/delivery-track/delivery-track.service';
import { DeliveryTrack } from '../../../../../../main/webapp/app/entities/delivery-track/delivery-track.model';

describe('Component Tests', () => {

    describe('DeliveryTrack Management Detail Component', () => {
        let comp: DeliveryTrackDetailComponent;
        let fixture: ComponentFixture<DeliveryTrackDetailComponent>;
        let service: DeliveryTrackService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AnanyaKiRasoiTestModule],
                declarations: [DeliveryTrackDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    DeliveryTrackService,
                    JhiEventManager
                ]
            }).overrideTemplate(DeliveryTrackDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DeliveryTrackDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DeliveryTrackService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new DeliveryTrack(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.deliveryTrack).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
