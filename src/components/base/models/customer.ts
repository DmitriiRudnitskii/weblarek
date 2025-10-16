import { ICustomer, Tpayment } from "../../../types/index";

export class Customer implements ICustomer {
    protected paymentMethod: Tpayment;
    protected address: string | null = null;
    protected phone: string | null = null;
    protected email: string | null = null;
    
    constructor(paymentMethod: Tpayment = '') {
        this.paymentMethod = paymentMethod;
    }
    updateData(paymentMethod?: Tpayment, address?: string, phone?: string, email?: string): void {
        if (paymentMethod !== undefined) this.paymentMethod = paymentMethod;
        if (address !== undefined) this.address = address;
        if (phone !== undefined) this.phone = phone;
        if (email !== undefined) this.email = email;
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
    
    validateData(): { valid: boolean, errorMessage: string } {
        let valid = true;
        let errorMessage = '';

        if (!this.paymentMethod) {
            valid = false;
            errorMessage += 'Не выбран вид оплаты';
        }
        if (!this.address) {
            valid = false;
            errorMessage += 'Укажите адрес.';
        }
        if (!this.phone) {
            valid = false;
            errorMessage += 'Укажите телефон.';
        }
        if (!this.email) {
            valid = false;
            errorMessage += 'Укажите email.';
        }

        return { valid, errorMessage };
    }
}
