import { Card } from './card';
import { EventEmitter } from '../components/base/Events';
import { Item } from '../types';
import { ensureElement } from '../utils/utils';

export class BasketCard extends Card {
    private deleteButton!: HTMLButtonElement;
    private indexElement!: HTMLElement;

    constructor(container: HTMLElement, emitter: EventEmitter) {
        super(container, emitter);
        this.deleteButton = ensureElement<HTMLButtonElement>('.basket__item-delete', this.container);
        this.indexElement = ensureElement<HTMLElement>('.basket__item-index', this.container);

        this.deleteButton.addEventListener('click', (e) => {
            e.stopPropagation();
            this.emitter.emit('card:remove', { productId: (this as any).id });
        });
    }

    setIndex(index: number) {
        this.indexElement.textContent = String(index + 1);
    }

    override setData(product: Item) {
        super.setData(product);
        Object.assign(this as object, { id: product.id });
    }
}
