import { BaseEntity } from './../../shared';

export class UserExtras implements BaseEntity {
    constructor(
        public id?: number,
        public telephone?: string,
        public deliveryTrack?: BaseEntity,
        public addresses?: BaseEntity[],
    ) {
    }
}
