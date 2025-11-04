import { Item } from "../types/index";
import { BaseModel } from "./baseModel";
import { IEvents } from "../components/base/Events";

export class Cart extends BaseModel {
    private items: Item[] ;

  constructor(events: IEvents, itemsChecked: Item[]) {
    super(events);
    this.items = itemsChecked;
  }

  getItems(): Item[] {
    return this.items;
  }


  addItem(product: Item): void {
    this.items.push(product);
    this.emitChange('cart:changed', { items: this.items });
  }

  removeItem(item: Item): void {
    const index = this.items.indexOf(item);
    if (index !== -1) {
      this.items.splice(index, 1);
      this.emitChange('cart:changed', { items: this.items });
    }
  }

  clearCart(): void {
    this.items = [];
    console.log('--- Cart.ts: Отправляю событие cart:changed ---');
    this.emitChange('cart:changed', { items: this.items });
  }

  getTotalPrice(): number  {
    return this.items.reduce((total, item) => total + item.price, 0);
  }

  getItemCounter(): number {
    return this.items.length;
  }

  hasItemById(id: string): boolean {
    return this.items.some(item => item.id === id);
  }
}