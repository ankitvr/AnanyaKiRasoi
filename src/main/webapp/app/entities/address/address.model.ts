import { BaseEntity } from './../../shared';

export class Address implements BaseEntity {
    constructor(
        public id?: number,
        public address1?: string,
        public address2?: string,
        public city?: string,
        public postcode?: string,
        public country?: string,
        public userExtras?: BaseEntity,
    ) {
    }
}
