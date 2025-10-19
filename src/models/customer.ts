import { ICustomer, Tpayment, IValidationResult } from "../types/index";

export class Customer implements ICustomer {
    protected paymentMethod: Tpayment;
    protected address: string | null = null;
    protected phone: string | null = null;
    protected email: string | null = null;
    
    constructor(paymentMethod: Tpayment = '') {
        this.paymentMethod = paymentMethod;
    }
    updateData(data: Partial<ICustomer>): void {
        if (data.paymentMethod !== undefined) this.paymentMethod = data.paymentMethod;
        if (data.address !== undefined) this.address = data.address;
        if (data.phone !== undefined) this.phone = data.phone;
        if (data.email !== undefined) this.email = data.email;
    }

    getAllData(): { paymentMethod: Tpayment, address: string | null, phone: string | null, email: string | null } {
        return {
            paymentMethod: this.paymentMethod,
            address: this.address,
            phone: this.phone,
            email: this.email
        };
    }

    clearData(): void {
        this.paymentMethod = '';
        this.address = null;
        this.phone = null;
        this.email = null;
    }

    validateData(): IValidationResult {
    let valid = true;
    const errors: { [key: string]: string } = {};

    if (!this.paymentMethod) {
        valid = false;
        errors.paymentMethod = 'Не выбран вид оплаты';
    }
    if (!this.address) {
        valid = false;
        errors.address = 'Укажите адрес.';
    }
    if (!this.phone) {
        valid = false;
        errors.phone = 'Укажите телефон.';
    }
    if (!this.email) {
        valid = false;
        errors.email = 'Укажите email.';
    }

    return { valid, errors };
}
