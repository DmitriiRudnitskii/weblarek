import { Component } from '../components/base/Component';
import { EventEmitter } from '../components/base/Events';
import { ensureElement } from '../utils/utils';

interface IHeader {
    counter: number;
}

export class Header extends Component<IHeader> {
    protected basketButton!: HTMLButtonElement;
    protected counter!: HTMLElement;
    protected emitter: EventEmitter;

    constructor(container: HTMLElement, emitter: EventEmitter) {
        super(container);
        this.emitter = emitter;
        this.basketButton = ensureElement<HTMLButtonElement>('.header__basket', this.container);
        this.counter = ensureElement<HTMLElement>('.header__basket-counter', this.container);

        this.basketButton.addEventListener('click', () => {
            this.emitter.emit('header:openBasket');
        });
    }

    setCounter(count: number) {
        this.counter.textContent = String(count);
    }
}
