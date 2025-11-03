import { Form } from './form';
import { EventEmitter } from '../components/base/Events';
import { ensureElement } from '../utils/utils';

export interface IContactsForm {
    email: string;
    phone: string;
}

export class ContactsForm extends Form<IContactsForm> {
    private emailInput!: HTMLInputElement;
    private phoneInput!: HTMLInputElement;

    constructor(container: HTMLElement, emitter: EventEmitter) {
        super(container, emitter);
        this.emailInput = ensureElement<HTMLInputElement>('[name="email"]', this.form);
        this.phoneInput = ensureElement<HTMLInputElement>('[name="phone"]', this.form);

        this.onInput();
    }

    protected onInput() {
        const valid = this.validate();
        this.submitButton.disabled = !valid;
    }

    protected validate(): boolean {
        const email = this.emailInput.value.trim();
        const phone = this.phoneInput.value.trim();
        return email.length > 3 && phone.length > 3;
    }

    protected onSubmit() {
        const data: IContactsForm = {
            email: this.emailInput.value.trim(),
            phone: this.phoneInput.value.trim()
        };
        this.emitter.emit('contacts:submit', data);
    }
}
