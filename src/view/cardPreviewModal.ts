import { Card } from './card';
import { EventEmitter } from '../components/base/Events';
import { Item } from '../types';
import { ensureElement } from '../utils/utils';

export class PreviewCardModal extends Card {
    private description!: HTMLElement;
    private addButton!: HTMLButtonElement;

    constructor(container: HTMLElement, emitter: EventEmitter) {
        super(container, emitter);
        this.description = ensureElement<HTMLElement>('.card__text', this.container);
        this.addButton = ensureElement<HTMLButtonElement>('.card__button', this.container);

        this.addButton.addEventListener('click', (e) => {
            e.stopPropagation();
            this.emitter.emit('card:addToCart', { productId: this.id });
        });
    }

    override setData(product: Item) {
        super.setData(product);
        this.description.textContent = product.description ?? '';
        Object.assign(this as object, { id: product.id });
    }

    override render(data?: Partial<Item>) {
        if (data) {
            this.setData(data as Item);
        }
        return super.render(data);
    }
}
