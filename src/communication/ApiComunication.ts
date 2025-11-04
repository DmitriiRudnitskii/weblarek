import { IApi,IOrder, TOrderResponse, TItemsResponse } from '../types';

export class ApiCommunication {
    private api: IApi;

    constructor(api: IApi) {
        this.api = api;
    }

    async getItems(): Promise<TItemsResponse> {
        const response = await this.api.get<TItemsResponse>(`/product/`);
        return response;
    }

    async placeOrder(order: IOrder): Promise<TOrderResponse> {
        const response = await this.api.post<TOrderResponse>(`/order/`, order);
        return response;
    }
        
}
