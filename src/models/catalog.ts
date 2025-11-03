import { Item } from "../types";
import { BaseModel } from "./baseModel";
import { IEvents } from "../components/base/Events";

export class Catalog  extends BaseModel {
     items: Item[];
     itemChecked: Item | null = null;

    constructor(events: IEvents, items: Item[], itemChecked: Item | null) {
        super(events);
        this.items = items;
        this.itemChecked = itemChecked;
    }
    saveItems(items: Item[]): void {
         this.items = items;
         this.emitChange('catalog:updated', { items });
    }

    getItems(): Item[] {
         return this.items;
    }

    getItemById(id: string): Item | undefined {
         return this.items.find(item => item.id === id);
    }

    setSelectedProduct(itemChecked: Item | null): void {
         this.itemChecked = itemChecked;
         this.emitChange('catalog:selected', { item: itemChecked });
    }

    getSelectedProduct(): Item | null {
         if (this.itemChecked) {
             return this.itemChecked;
    } 
    return this.itemChecked
}
}
