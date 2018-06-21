import { BaseEntity } from './../../shared';

export class Device implements BaseEntity {
    constructor(
        public id?: number,
        public vendor?: string,
        public version?: string,
        public model?: string,
        public serialNumber?: string,
        public computerName?: string,
        public systemType?: string,
        public owner?: string,
        public notes?: string,
        public created?: any,
    ) {
    }
}
