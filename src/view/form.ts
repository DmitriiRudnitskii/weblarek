import { Component } from '../components/base/Component';
import { EventEmitter } from '../components/base/Events';
import { ensureElement } from '../utils/utils';

export abstract class Form<T> extends Component<T> {
    protected form!: HTMLFormElement;
    protected submitButton!: HTMLButtonElement;
    protected errors!: HTMLElement;
    protected emitter: EventEmitter;

    constructor(container: HTMLElement, emitter: EventEmitter) {
        super(container);
        this.emitter = emitter;
        this.form = container as HTMLFormElement;
        this.submitButton = ensureElement<HTMLButtonElement>('button[type="submit"]', this.form);
        this.errors = ensureElement<HTMLElement>('.form__errors', this.form);

        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (this.validate()) {
                this.onSubmit();
            }
        });
        this.form.addEventListener('input', () => {
            // Валидация и обновление состояния кнопки (логика в дочерних классах)
            this.onInput();
        });
    }

    protected onInput() {
        // дочерние классы могут переопределить
    }

    protected validate(): boolean {
        return true;
    }

    protected onSubmit() {
        // дочерние классы должны вызвать emitter.emit нужного события
    }
}
