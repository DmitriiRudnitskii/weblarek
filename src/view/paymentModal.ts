import { Form } from './form';
import { EventEmitter } from '../components/base/Events';
import { ensureElement } from '../utils/utils';

export interface IOrderForm {
    address: string;
    payment: string;
}


export class OrderForm extends Form<IOrderForm> {
    private addressInput!: HTMLInputElement;
    private paymentButtons!: NodeListOf<HTMLButtonElement>;

    constructor(container: HTMLElement, emitter: EventEmitter) {
        super(container, emitter);
        this.addressInput = ensureElement<HTMLInputElement>('[name="address"]', this.form);
        this.paymentButtons = this.form.querySelectorAll('.order__buttons button');

        this.paymentButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.paymentButtons.forEach(b => b.classList.remove('button_alt-active'));
                (e.currentTarget as HTMLElement).classList.add('button_alt-active');
                this.onInput();
            });
        });

        this.onInput(); // initial
    }

    protected onInput() {
        const valid = this.validate();
        this.submitButton.disabled = !valid;
    }

    protected validate(): boolean {
        return this.addressInput.value.trim().length > 0;
    }

    protected onSubmit() {
        const payment = Array.from(this.paymentButtons).find(b => b.classList.contains('button_alt-active'))?.getAttribute('name') ?? 'card';
        const data: IOrderForm = {
            address: this.addressInput.value.trim(),
            payment
        };
        this.emitter.emit('order:next', data);
    }
}
