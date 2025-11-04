import { Component } from '../components/base/Component';
import { EventEmitter } from '../components/base/Events';
import { ensureElement } from '../utils/utils';

interface IBasketViewData {
    items: HTMLElement[];
    total: number;
}
export class Basket extends Component<IBasketViewData> {
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

    render(data?: Partial<IBasketViewData>): HTMLElement {
        
        const { items, total } = data as IBasketViewData;

        this.list.replaceChildren(...items);
        this.totalPrice.textContent = `${total} синапсов`;
        
        this.orderButton.disabled = items.length === 0;

        return this.container;
    }
}
