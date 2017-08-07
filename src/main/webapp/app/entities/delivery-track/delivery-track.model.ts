import { BaseEntity } from './../../shared';

const enum DeliveryStatus {
    'IN_MAKING',
    'ON_WAY',
    'DELIVERED'
}

export class DeliveryTrack implements BaseEntity {
    constructor(
        public id?: number,
        public estimatedTime?: any,
        public status?: DeliveryStatus,
        public bill?: BaseEntity,
        public userExtras?: BaseEntity,
    ) {
    }
}
