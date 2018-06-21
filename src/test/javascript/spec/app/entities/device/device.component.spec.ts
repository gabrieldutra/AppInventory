/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { AppinventoryTestModule } from '../../../test.module';
import { DeviceComponent } from '../../../../../../main/webapp/app/entities/device/device.component';
import { DeviceService } from '../../../../../../main/webapp/app/entities/device/device.service';
import { Device } from '../../../../../../main/webapp/app/entities/device/device.model';

describe('Component Tests', () => {

    describe('Device Management Component', () => {
        let comp: DeviceComponent;
        let fixture: ComponentFixture<DeviceComponent>;
        let service: DeviceService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AppinventoryTestModule],
                declarations: [DeviceComponent],
                providers: [
                    DeviceService
                ]
            })
            .overrideTemplate(DeviceComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DeviceComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DeviceService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Device(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.devices[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
