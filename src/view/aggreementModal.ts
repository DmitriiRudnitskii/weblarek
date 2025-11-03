import { Component } from '../components/base/Component';
import { EventEmitter } from '../components/base/Events';
import { ensureElement } from '../utils/utils';

export class SuccessView extends Component<void> {
    private title!: HTMLElement;
    private description!: HTMLElement;
    private closeButton!: HTMLButtonElement;
    private emitter: EventEmitter;

    constructor(container: HTMLElement, emitter: EventEmitter) {
        super(container);
        this.emitter = emitter;
        this.title = ensureElement<HTMLElement>('.order-success__title', this.container);
        this.description = ensureElement<HTMLElement>('.order-success__description', this.container);
        this.closeButton = ensureElement<HTMLButtonElement>('.order-success__close', this.container);

        this.closeButton.addEventListener('click', () => {
            this.emitter.emit('success:close');
        });
    }

    setMessage(total: number) {
        this.description.textContent = `Списано ${total} синапсов`;
    }
}
