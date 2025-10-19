import { Item } from "../types";
export class Catalog  {
     items: Item[];
     itemChecked: Item | null = null;

    constructor(items: Item[], itemChecked: Item | null) {
        this.items = items;
        this.itemChecked = itemChecked;
    }
    saveItems(items: Item[]): void {
         this.items = items;
    }

    getItems(): Item[] {
         return this.items;
    }

    getItemById(id: string): Item | undefined {
         return this.items.find(item => item.id === id);
    }

    setSelectedProduct(itemChecked: Item | null): void {
         this.itemChecked = itemChecked;
    }

    getSelectedProduct(): Item | null {
         if (this.itemChecked) {
             return this.itemChecked;
    } 
    return this.itemChecked
}
}
