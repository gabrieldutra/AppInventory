import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppinventorySharedModule } from '../../shared';
import {
    DeviceService,
    DevicePopupService,
    DeviceComponent,
    DeviceDetailComponent,
    DeviceDialogComponent,
    DevicePopupComponent,
    DeviceDeletePopupComponent,
    DeviceDeleteDialogComponent,
    deviceRoute,
    devicePopupRoute,
    DeviceResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...deviceRoute,
    ...devicePopupRoute,
];

@NgModule({
    imports: [
        AppinventorySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DeviceComponent,
        DeviceDetailComponent,
        DeviceDialogComponent,
        DeviceDeleteDialogComponent,
        DevicePopupComponent,
        DeviceDeletePopupComponent,
    ],
    entryComponents: [
        DeviceComponent,
        DeviceDialogComponent,
        DevicePopupComponent,
        DeviceDeleteDialogComponent,
        DeviceDeletePopupComponent,
    ],
    providers: [
        DeviceService,
        DevicePopupService,
        DeviceResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppinventoryDeviceModule {}
