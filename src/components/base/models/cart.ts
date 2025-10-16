import { Item } from "../../../types/index";

export class Cart {
    items: Item[] ;

  constructor(itemsChecked: Item[]) {
    this.items = itemsChecked;
  }

  getItems(): Item[] {
    return this.items;
  }

  addItem(product: Item): void {
    this.items.push(product);
  }

  removeItem(item: Item): void {
    const index = this.items.indexOf(item);
    if (index !== -1) {
      this.items.splice(index, 1);
    }
  }

  clearCart(): void {
    this.items = [];
  }

  getTotalPrice(): number | null {
    return this.items.reduce((total, item) => total + item.price, 0);
  }

  getItemCounter(): number {
    return this.items.length;
  }

  hasItemById(id: string): boolean {
    return this.items.some(item => item.id === id);
  }
}