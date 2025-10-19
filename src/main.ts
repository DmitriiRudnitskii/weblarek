import './scss/styles.scss';
import {Cart} from './models/cart';
import {Catalog} from './models/catalog';
import {Customer} from './models/customer';
import { apiProducts } from './utils/data';
import { Item } from './types';
import { ApiCommunication } from './communication/ApiComunication';
import { Api } from './components/base/Api';
import { API_URL } from './utils/constants';


const initialItems: Item [] = [];
const cartModel = new Cart(initialItems);
const catalogModel = new Catalog(apiProducts.items, null);
const customerModel = new Customer();
const api = new Api(API_URL);
const order = new ApiCommunication(api);

console.log('Массив товаров, находящихся в корзине:',  cartModel.getItems());
cartModel.addItem(apiProducts.items[0]);
cartModel.addItem(apiProducts.items[1]);
console.log('Добавляем товар в корзину:', apiProducts.items[0], apiProducts.items[1], cartModel.getItems());
cartModel.removeItem(apiProducts.items[0]);
console.log('Удаляем товар из корзины:', apiProducts.items[0], cartModel.getItems());
console.log('Получаем итоговую стоимость всех товаров в корзине:',  cartModel.getTotalPrice());
cartModel.getItemCounter();
console.log('Количество товаров в корзине:',  cartModel.getItemCounter());
console.log('Проверяем наличие товара по его id:',  apiProducts.items[1].id, cartModel.hasItemById(apiProducts.items[1].id));
cartModel.clearCart();
console.log('Очищаем корзину:', cartModel.getItems());


catalogModel.saveItems(apiProducts.items);
console.log('Cохранение массива товаров из каталога:',  apiProducts.items, catalogModel.getItems());
console.log('Массив товаров из каталога:', catalogModel.getItems());
console.log('Получение одного товара по его id:', apiProducts.items[0].id,  catalogModel.getItemById(apiProducts.items[0].id));
catalogModel.setSelectedProduct(apiProducts.items[0])
console.log('Сохранение товара для подробного отображения:', apiProducts.items[0], catalogModel.getSelectedProduct());


console.log('Получаем все данные, введенные покупателем:',  customerModel.getAllData());
customerModel.updateData('card','г. Санкт-Петербург, ул. Конюшенная, 25 ' ,'+79992688546', 'maxim.dorokhov@mail.ru');
console.log('Сохраняем введенные данные:',  customerModel.getAllData());
console.log('Валидируем данные введенные покупателем:',  customerModel.validateData());
customerModel.clearData();
console.log('Очищаем введенные покупателем данные:', customerModel.getAllData());



order.getItems()
  .then((items: Item[]) => {
    return catalogModel.saveItems(items);
  })
  .catch((error) => {
    console.error('Ошибка при получении товаров:', error);
  });
console.log('Товары, полученные с сервера:', catalogModel.getItems());


    
