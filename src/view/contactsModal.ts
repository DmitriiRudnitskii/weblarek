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

    }

    
    protected onInput() {
        const data: IContactsForm = {
            email: this.emailInput.value.trim(),
            phone: this.phoneInput.value.trim()
        };
        this.emitter.emit('contacts:input', data);
    }

   
    setValid(isValid: boolean) {
        this.submitButton.disabled = !isValid;
    }

    
    setErrors(errors: { [key: string]: string }) {
        const emailError = errors.email || '';
        const phoneError = errors.phone || '';
        this.errors.textContent = [emailError, phoneError].filter(Boolean).join('; ');
    }

    

    protected onSubmit() {
        this.emitter.emit('contacts:submit');
    }
}
