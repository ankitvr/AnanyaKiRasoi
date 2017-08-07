import { BaseEntity } from './../../shared';

const enum OrderType {
    'ONLINE',
    'TELEPHONIC'
}

export class Order implements BaseEntity {
    constructor(
        public id?: number,
        public orderType?: OrderType,
        public products?: BaseEntity[],
        public bill?: BaseEntity,
    ) {
    }
}
