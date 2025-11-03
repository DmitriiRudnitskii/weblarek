import { Component } from '../components/base/Component';
import { EventEmitter } from '../components/base/Events';
import { ensureElement } from '../utils/utils';

export class BasketView extends Component<void> {
    private list!: HTMLElement;
    private totalPrice!: HTMLElement;
    private orderButton!: HTMLButtonElement;
    private emitter: EventEmitter;

    constructor(container: HTMLElement, emitter: EventEmitter) {
        super(container);
        this.emitter = emitter;
        this.list = ensureElement<HTMLElement>('.basket__list', this.container);
        this.totalPrice = ensureElement<HTMLElement>('.basket__price', this.container);
        this.orderButton = ensureElement<HTMLButtonElement>('.basket__button', this.container);

        this.orderButton.addEventListener('click', () => {
            this.emitter.emit('basket:order');
        });
    }

    render(items: HTMLElement[], total: number) {
        this.list.replaceChildren(...items);
        this.totalPrice.textContent = `${total} синапсов`;
        return super.render();
    }
}
