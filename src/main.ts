import './scss/styles.scss';
import {Cart} from './components/base/models/cart';
import {Catalog} from './components/base/models/catalog';
import {Customer} from './components/base/models/customer';
import { apiProducts } from './utils/data';
import { Item } from './types';

const initialItems: Item [] = [];
const cartModel = new Cart(initialItems);
const catalogModel = new Catalog(apiProducts.items, null);
const customerModel = new Customer();

cartModel.getItems();
cartModel.addItem(apiProducts.items[0]);
cartModel.removeItem(apiProducts.items[0]);
cartModel.clearCart();
cartModel.getTotalPrice();
cartModel.getItemCounter();
cartModel.hasItemById(apiProducts.items[0].id);

catalogModel.saveItems(apiProducts.items);
catalogModel.getItems();
catalogModel.getItemById(apiProducts.items[0].id);
catalogModel.setSelectedProduct(apiProducts.items[0]);
catalogModel.getSelectedProduct();

customerModel.updateData('card','г. Санкт-Петербург, ул. Конюшенная, 25 ' ,'+79992688546', 'maxim.dorokhov@mail.ru');
customerModel.getAllData();
customerModel.clearData();
customerModel.validateData();

console.log(`Массив товаров из каталога:  ${catalogModel.getItems()}`);
console.log(`Cохранение массива товаров из каталога:  ${catalogModel.saveItems(apiProducts.items)}`);
console.log(`Получение одного товара по его id:  ${catalogModel.getItemById(apiProducts.items[0].id)}`);
console.log(`Сохранение товара для подробного отображения:  ${catalogModel.setSelectedProduct(apiProducts.items[0])}`);
console.log(`Получение товара для подробного отображения:  ${catalogModel.getSelectedProduct()}`);
console.log(`Массив товаров, находящихся в корзине:  ${cartModel.getItems()}`);
console.log(`Добавляем товар в корзину:  ${cartModel.addItem(apiProducts.items[0])}`);
console.log(`Удаляем товар из корзины:  ${cartModel.removeItem(apiProducts.items[0])}`);
console.log(`Очищаем корзину:  ${cartModel.clearCart()}`);
console.log(`Получаем итоговую стоимость всех товаров в корзине:  ${cartModel.getTotalPrice()}`);
console.log(`Количество товаров в корзине:  ${cartModel.getItemCounter()}`);
console.log(`Проверяем наличие товара по его id:  ${cartModel.hasItemById(apiProducts.items[0].id)}`);
console.log(`Массив товаров из каталога:  ${customerModel.updateData('card','г. Санкт-Петербург, ул. Конюшенная, 25 ' ,'+79992688546', '')}`);
console.log(`Массив товаров из каталога:  ${customerModel.getAllData()}`);
console.log(`Массив товаров из каталога:  ${customerModel.clearData()}`);
console.log(`Массив товаров из каталога:  ${customerModel.validateData()}`);



