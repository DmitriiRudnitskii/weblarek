// Файл: view/cardPreviewModal.ts

import { Card } from './card'; // Убедитесь, что Card импортирован
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
        super.setData(product); // Устанавливает id, title, price, image...
        this.description.textContent = product.description ?? '';
    }

    setInCart(inCart: boolean) {
        if (this.addButton) {
            this.addButton.disabled = inCart;
            this.addButton.textContent = inCart ? 'Уже в корзине' : 'В корзину';
        }
    }

    override render(data?: Partial<Item>): HTMLElement {
        if (data) {
        this.setData(data as Item);
    }
        this.setInCart(false); 
        return this.container;
}
}
