import './scss/styles.scss';

import { Api } from './components/base/Api';
import { ApiCommunication } from './communication/ApiComunication';
import { EventEmitter } from './components/base/Events';
import { Catalog } from './models/catalog';
import { Cart } from './models/cart';
import { Customer } from './models/customer';
import { GalleryView } from './view/gallery';
import { Header } from './view/header';
import { Modal } from './view/modal';
import { PreviewCardModal } from './view/cardPreviewModal';
import { CatalogCard } from './view/catalogCard'; 
import { Basket } from './view/basketModal';
import { BasketCard } from './view/cardBasket';
import { OrderForm } from './view/paymentModal';
import { ContactsForm } from './view/contactsModal';
import { SuccessView } from './view/aggreementModal';
import { API_URL} from './utils/constants';
import { cloneTemplate, ensureElement } from './utils/utils';
import { Item, IOrder, TItemsResponse } from './types';


const events = new EventEmitter();
const baseApi = new Api(API_URL);
const apiCom = new ApiCommunication(baseApi);

const catalog = new Catalog(events, [], null);
const cart = new Cart(events, []);
const customer = new Customer(events);

const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');

const galleryContainer = ensureElement<HTMLElement>('.gallery');
const headerContainer = ensureElement<HTMLElement>('.header');
const modalContainer = ensureElement<HTMLElement>('#modal-container');

const galleryView = new GalleryView(galleryContainer);
const header = new Header(headerContainer, events);
const modal = new Modal(modalContainer, events);

apiCom.getItems()
    .then((response: TItemsResponse) => {
    return catalog.saveItems(response.items);
  })
    .catch(err => {
        console.error(err);
    });


events.on('catalog:updated', () => {
    galleryView.clear();
    const cards: HTMLElement[] = [];
   
    for (const item of catalog.getItems()) {
        const cardInstance = new CatalogCard(cloneTemplate(cardCatalogTemplate));
        
        const cardElement = cardInstance.render(item);
        
        cardElement.addEventListener('click', () => {
            catalog.setSelectedProduct(item);
        });
        
        cards.push(cardElement);
    }
    galleryView.render(cards);
});

events.on('catalog:selected', (data: { item: Item | null }) => {
    if (data.item) {
        const item = data.item;
        const previewCard = new PreviewCardModal(cloneTemplate(cardPreviewTemplate), events);
        
        const isInCart = cart.hasItemById(item.id);
        const cardElement = previewCard.render(item);
        
        const addButton = cardElement.querySelector<HTMLButtonElement>('.card__button');
        if (addButton) {
            addButton.disabled = isInCart;
            if (isInCart) {
                addButton.textContent = 'Уже в корзине';
            }
        }
        
        modal.open(cardElement);
    } else {
        modal.close();
    }
});

events.on('card:addToCart', (data: { productId: string }) => {
    const item = catalog.getItemById(data.productId);
    if (item) {
        cart.addItem(item);
        modal.close();
    }
});

events.on('cart:changed', () => {
  console.log('--- main.ts: Получил событие cart:changed ---');
    header.setCounter(cart.getItemCounter());
    
});



events.on('header:openBasket', () => {
    const basketView = new Basket(cloneTemplate(basketTemplate), events);
    const items = cart.getItems();
    const basketCards: HTMLElement[] = [];
    
    items.forEach((item, index) => {
        const basketCard = new BasketCard(cloneTemplate(cardBasketTemplate), events);
        basketCard.setIndex(index);
        basketCard.setData(item);
        basketCards.push(basketCard.render());
    });
    
    const basketElement = basketView.render({
        items: basketCards,
        total: cart.getTotalPrice()
    });
    
  

    modal.open(basketElement);
});

events.on('card:remove', (data: { productId: string }) => {
    const item = catalog.getItemById(data.productId); // Или cart.getItemById, если бы он был
    if (item) {
        cart.removeItem(item);
        events.emit('header:openBasket');
    }
});

events.on('basket:order', () => {
    const orderForm = new OrderForm(cloneTemplate(orderTemplate), events);
    modal.open(orderForm.render());
});

events.on('order:next', (data: { address: string, payment: string }) => {
    customer.updateData({ 
        address: data.address, 
        payment: data.payment as 'card' | 'cash' 
    });
    
    const contactsForm = new ContactsForm(cloneTemplate(contactsTemplate), events);
    modal.open(contactsForm.render());
});


events.on('contacts:submit', async (data: { email: string, phone: string }) => {
    customer.updateData({
        email: data.email,
        phone: data.phone
    });

    const validation = customer.validateData();
    if (!validation.valid) {
        console.error("Данные клиента невалидны:", validation.errors);
        return;
    }

    const customerData = customer.getAllData();

    const orderPayload: IOrder = {
        total: cart.getTotalPrice(),
        items: cart.getItems().map(item => item.id),

        payment: customerData.payment,
        email: customerData.email,
        phone: customerData.phone,
        address: customerData.address
    };
    
    try {
        const response = await apiCom.placeOrder(orderPayload);
        

        const successView = new SuccessView(cloneTemplate(successTemplate), events);
        successView.setMessage(response.total);
        modal.open(successView.render());
        
        cart.clearCart();
        customer.clearData();
        
    } catch (error) {
        console.error("Ошибка при оформлении заказа:", error);
        console.log("Отправленный payload (который вызвал 400):", orderPayload);
        console.log("Ответ сервера (400):", error);
    }
});
events.on('success:close', () => {
    modal.close();
});

events.on('modal:close', () => {
    catalog.setSelectedProduct(null);
});







    
