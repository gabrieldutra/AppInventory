import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { Device } from './device.model';
import { DeviceService } from './device.service';

@Component({
    selector: 'jhi-device-detail',
    templateUrl: './device-detail.component.html'
})
export class DeviceDetailComponent implements OnInit, OnDestroy {

    device: Device;
    deviceNotes: HTMLElement;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private deviceService: DeviceService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDevices();
    }

    createList(element) {
        const listElement = document.createElement('ul');

        for (const value in element) {
            if (Array.isArray(element)) {
                const liElement = document.createElement('li');
                const childList = this.createList(element[value]);

                liElement.appendChild(childList);
                listElement.appendChild(liElement);
            } else {
                const liElement = document.createElement('li');

                liElement.innerText = value + ': ' + element[value];
                listElement.appendChild(liElement);
            }
        }
        return listElement;
    }

    load(id) {
        this.deviceService.find(id)
            .subscribe((deviceResponse: HttpResponse<Device>) => {
                this.device = deviceResponse.body;

                this.deviceNotes = document.createElement('div');
                const notesJson = JSON.parse(this.device.notes);
                for (const note in notesJson) {
                    if (notesJson[note] != null) {
                        const name = document.createElement('dt');
                        const value = this.createList(notesJson[note].value);
                        name.innerText = notesJson[note].name;
                        this.deviceNotes.appendChild(name);
                        this.deviceNotes.appendChild(value);
                    }
                }
            });
    }
    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDevices() {
        this.eventSubscriber = this.eventManager.subscribe(
            'deviceListModification',
            (response) => this.load(this.device.id)
        );
    }
}
