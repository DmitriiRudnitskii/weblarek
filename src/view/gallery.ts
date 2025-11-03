import { Component } from '../components/base/Component';

export class GalleryView extends Component<void> {
    private container!: HTMLElement;

    constructor(container: HTMLElement) {
        super(container);
        this.container = container;
    }

    render(cards: HTMLElement[]) {
        this.container.replaceChildren(...cards);
        return super.render();
    }

    clear() {
        this.container.textContent = '';
    }
}
