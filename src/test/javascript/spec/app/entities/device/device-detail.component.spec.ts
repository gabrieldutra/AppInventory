/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AppinventoryTestModule } from '../../../test.module';
import { DeviceDetailComponent } from '../../../../../../main/webapp/app/entities/device/device-detail.component';
import { DeviceService } from '../../../../../../main/webapp/app/entities/device/device.service';
import { Device } from '../../../../../../main/webapp/app/entities/device/device.model';

describe('Component Tests', () => {

    describe('Device Management Detail Component', () => {
        let comp: DeviceDetailComponent;
        let fixture: ComponentFixture<DeviceDetailComponent>;
        let service: DeviceService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AppinventoryTestModule],
                declarations: [DeviceDetailComponent],
                providers: [
                    DeviceService
                ]
            })
            .overrideTemplate(DeviceDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DeviceDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DeviceService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Device(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.device).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
