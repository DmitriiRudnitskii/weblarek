import { Component } from '../components/base/Component';
import { EventEmitter } from '../components/base/Events';
import { ensureElement } from '../utils/utils';

export class Modal extends Component<void> {
    private content!: HTMLElement;
    private closeButton!: HTMLButtonElement;
    private root!: HTMLElement;

    constructor(container: HTMLElement, private emitter: EventEmitter) {
        super(container);
        this.root = container;
        this.content = ensureElement<HTMLElement>('.modal__content', this.container);
        this.closeButton = ensureElement<HTMLButtonElement>('.modal__close', this.container);

        this.closeButton.addEventListener('click', () => this.close());
        this.root.addEventListener('click', (e) => {
            if (e.target === this.root) this.close();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.close();
        });
    }

    open(inner: HTMLElement) {
        this.content.replaceChildren(inner);
        this.root.classList.add('modal_active');
        this.emitter.emit('modal:open');
    }

    close() {
        this.root.classList.remove('modal_active');
        this.emitter.emit('modal:close');
    }

}
