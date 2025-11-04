import { Component } from '../components/base/Component';
import { Item } from '../types';
import { CDN_URL, categoryMap } from '../utils/constants';

export class CatalogCard extends Component<Item> {
    
    
    constructor(container: HTMLElement) {
        super(container);
    }

    
    render(data?: Partial<Item>): HTMLElement {
        
      
        const item = data as Item;

        const img = this.container.querySelector<HTMLImageElement>('.card__image');
        const category = this.container.querySelector<HTMLElement>('.card__category');
        const title = this.container.querySelector<HTMLElement>('.card__title');

        if (img) this.setImage(img, `${CDN_URL}/${item.image}`, item.title);
        if (title) title.textContent = item.title;
        
        if (category) {
            category.className = 'card__category';
            
            const categoryClass = categoryMap[item.category];
            if (categoryClass) {
                category.classList.add(categoryClass);
            }
        }

        return this.container;
    }
}

