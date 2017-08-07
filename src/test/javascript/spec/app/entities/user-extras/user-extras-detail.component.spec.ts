/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { AnanyaKiRasoiTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { UserExtrasDetailComponent } from '../../../../../../main/webapp/app/entities/user-extras/user-extras-detail.component';
import { UserExtrasService } from '../../../../../../main/webapp/app/entities/user-extras/user-extras.service';
import { UserExtras } from '../../../../../../main/webapp/app/entities/user-extras/user-extras.model';

describe('Component Tests', () => {

    describe('UserExtras Management Detail Component', () => {
        let comp: UserExtrasDetailComponent;
        let fixture: ComponentFixture<UserExtrasDetailComponent>;
        let service: UserExtrasService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AnanyaKiRasoiTestModule],
                declarations: [UserExtrasDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    UserExtrasService,
                    JhiEventManager
                ]
            }).overrideTemplate(UserExtrasDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UserExtrasDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserExtrasService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new UserExtras(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.userExtras).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
