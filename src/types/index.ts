export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export type TItemsResponse = {
    total: number;
    items: Item[];
};

export type TOrderResponse = {
    id: string;
    total: number;
} 
export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

export interface Item {
    id:string;
    title: string;
    image: string;
    category: string;
    description: string;
    price: number | null;
}
export type Tpayment = 'card' | 'cash'| '';

export interface ICustomer {
    paymentMethod: Tpayment;
    email: string | null;
    phone: string | null;
    address: string | null;
}
export interface IOrder {
    customer: ICustomer;
    items: Item[];
}

export interface IValidationResult {
    valid: boolean;
    errors: { [key: string]: string };
}

export interface IBasketItem extends Item {
    quantity?: number;
}

export interface IBasketData {
    items: IBasketItem[];
    total: number;
}

