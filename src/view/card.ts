import { Component } from '../components/base/Component';
import { Item } from '../types';
import { CDN_URL,categoryMap } from '../utils/constants';
import { ensureElement } from '../utils/utils';
import { EventEmitter } from '../components/base/Events';

export abstract class Card extends Component<Item> {
    protected id!: string;
    protected title!: HTMLElement;
    protected price!: HTMLElement;
    protected category!: HTMLElement;
    protected image!: HTMLImageElement;
    protected emitter: EventEmitter;

    constructor(container: HTMLElement, emitter: EventEmitter) {
        super(container);
        this.emitter = emitter;

        this.title = ensureElement<HTMLElement>('.card__title', this.container);
        this.price = ensureElement<HTMLElement>('.card__price', this.container);
        this.category = ensureElement<HTMLElement>('.card__category', this.container);
        this.image = ensureElement<HTMLImageElement>('.card__image', this.container);
    }

    setData(product: Item) {
        this.id = product.id;
        this.title.textContent = product.title;
        this.price.textContent = `${product.price} синапсов`;
        const mapClass = categoryMap[product.category] ?? '';
        Array.from(this.category.classList).forEach(c => {
            if (c.startsWith('card__category_')) {
                this.category.classList.remove(c);
            }
        });
        if (mapClass) {
            this.category.classList.add(mapClass);
        } else {
        }
        this.category.textContent = product.category;
        this.setImage(this.image, `${CDN_URL}/${product.image}`, product.title);
    }

}
