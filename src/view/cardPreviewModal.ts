
import { Card } from './card';
import { EventEmitter } from '../components/base/Events';
import { Item } from '../types';
import { ensureElement } from '../utils/utils';

export class PreviewCardModal extends Card {
    private description!: HTMLElement;
    private addButton!: HTMLButtonElement;
    
    private _isInCart: boolean = false;

    constructor(container: HTMLElement, emitter: EventEmitter) {
        super(container, emitter);
        this.description = ensureElement<HTMLElement>('.card__text', this.container);
        this.addButton = ensureElement<HTMLButtonElement>('.card__button', this.container);

        this.addButton.addEventListener('click', (e) => {
            e.stopPropagation();
            
            if (this._isInCart) {
                this.emitter.emit('card:remove', { productId: this.id });
            } else {
                this.emitter.emit('card:addToCart', { productId: this.id });
            }
        });
    }

    override setData(product: Item) {
        super.setData(product);
        this.description.textContent = product.description ?? '';
    }

    
    setInCart(inCart: boolean) {
        this._isInCart = inCart; 
        if (this.addButton) {
            this.addButton.textContent = inCart ? 'Удалить из корзины' : 'В корзину';
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
