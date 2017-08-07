import { BaseEntity } from './../../shared';

export class Bill implements BaseEntity {
    constructor(
        public id?: number,
        public billTime?: any,
        public amount?: number,
        public discount?: number,
        public order?: BaseEntity,
        public deliveryTrack?: BaseEntity,
    ) {
    }
}
