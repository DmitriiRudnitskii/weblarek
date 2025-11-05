
import { Form } from './form';
import { EventEmitter } from '../components/base/Events';
import { ensureElement } from '../utils/utils';
import { Tpayment } from '../types';

export interface IOrderForm {
    address: string;
    payment: string; 
}

export class OrderForm extends Form<IOrderForm> {
    private addressInput!: HTMLInputElement;
    private paymentButtonsContainer!: HTMLElement;
    private paymentButtons!: NodeListOf<HTMLButtonElement>;

  constructor(container: HTMLElement, emitter: EventEmitter) {
        super(container, emitter);
        this.addressInput = ensureElement<HTMLInputElement>('[name="address"]', this.form);
        this.paymentButtonsContainer = ensureElement<HTMLElement>('.order__buttons', this.form);
        this.paymentButtons = this.paymentButtonsContainer.querySelectorAll('button');

        this.paymentButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const target = e.currentTarget as HTMLButtonElement;
                const payment = target.getAttribute('name') as Tpayment;

                this.onInput(payment); 
            });
        });
    }   
    
    protected onInput(payment?: Tpayment) {
        
        const currentPayment = payment ?? 
            Array.from(this.paymentButtons).find(b => b.classList.contains('button_alt-active'))?.getAttribute('name') ?? '';
        
        const data: IOrderForm = {
            address: this.addressInput.value.trim(),
            payment: currentPayment
        };
        
        this.emitter.emit('order:input', data);
    }

    
    setPayment(payment: Tpayment) {
        this.paymentButtons.forEach(b => {
            b.classList.toggle('button_alt-active', b.getAttribute('name') === payment);
        });
    }

    
    
    setValid(isValid: boolean) {
        this.submitButton.disabled = !isValid;
    }

    setErrors(errors: { [key: string]: string }) {
        const addressError = errors.address || '';
        const paymentError = errors.payment || '';
        this.errors.textContent = [addressError, paymentError].filter(Boolean).join('; ');
    }

    protected onSubmit() {
        this.emitter.emit('order:next');
    }
}