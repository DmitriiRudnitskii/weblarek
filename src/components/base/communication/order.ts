import { IApi, Item, IOrder } from '../../../types';

export class ApiCommunication {
    private api: IApi;

    constructor(api: IApi) {
        this.api = api;
    }

    async getItems(): Promise<Item[]> {
        const response = await this.api.get('/product/');
        return response as Item[];
    }

    async placeOrder(order: IOrder): Promise<object> {
        const response = await this.api.post('/order/', order);
        return response as {};
    }
}
