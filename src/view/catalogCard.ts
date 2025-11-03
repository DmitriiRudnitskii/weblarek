import { Card } from '../view/card';
import { EventEmitter } from '../components/base/Events';
import { Item } from '../types';
import { ensureElement } from '../utils/utils';

export class CatalogCard extends Card {
    private rootButton: HTMLElement;

    constructor(container: HTMLElement, emitter: EventEmitter) {
        super(container, emitter);
        this.rootButton = ensureElement<HTMLElement>('.card', this.container);
        this.rootButton.addEventListener('click', (e) => {
            this.emitter.emit('card:select', { productId: this.id });
        });
    }

    override setData(product: Item) {
        super.setData(product);
        Object.assign(this as object, { id: product.id });
    }
}

