let leftPart = document.querySelector('.left-part-container');

let categoriesContainer = document.querySelector('.categories');

let categories = document.querySelectorAll('.categories-list li');


let goods = document.querySelector('.goods');

let goodsList = document.querySelectorAll('.goods ul');

let itemsGoods = document.querySelectorAll('.goods li');


let infoPart = document.querySelector('.info');

let itemsInfo = document.querySelectorAll('.info li');

let buyBtn = document.querySelector('.btn-buy');


let ordering = document.querySelector('.ordering');


let testName = new RegExp('^[\\w]+\\s+[\\w]+\\s+[\\w]+$','i');
let nameInput = document.querySelector('.ordering__name');

let testCity = new RegExp('.');
let cityInput = document.querySelector('.ordering__city');

let testNovaPoshta = new RegExp('^[\\w\\d\\s]+$','i');
let poshtaInput = document.querySelector('.ordering__nova-poshta');

let cashInput = document.querySelector('.payment-method__cash');
let bankCardInput = document.querySelector('.payment-method__bank-card');

let testQuantity = new RegExp('^[1-9]\\d{0,}$');
let numberProduct = document.querySelector('.ordering__quantity-products');

let orderingPayment = document.querySelector('.ordering__payment-method');


let errorEmpty = 'This is a required field.';
let errorName = 'Please, enter your full name completely and in Latin.';
let errorCity = 'Оберіть місто.'
let errorPoshta = 'Please, enter nova poshta warehouse in Latin.';
let errorQuantity = 'The product is sold in quantities of at least 1.';
let errorPayment = 'Choose payment method.';


let container = document.querySelector('.purchased');

let btnInPurchased = document.querySelector('.btn-purchased');

let basket = document.querySelector('.basket');


let myOrdersBtn = document.querySelector('.my-orders-btn');



if (localStorage.getItem('basket')) {
    basket.innerHTML = localStorage.getItem('basket');
};



categoriesContainer.addEventListener('click', (e) => {
    for (let i = 0; i < categories.length; i++) {
        if (e.target === categories[i]) {
            categories[i].classList.add('active');
            goods.classList.add('active');
            goodsList[i].classList.add('active');
        } else {
            categories[i].classList.remove('active');
            goodsList[i].classList.remove('active');
            };
    };
});


        let elementsOfItemGoods;

goods.addEventListener('click', (e) => {
    for (let i = 0; i < itemsGoods.length; i++) {
        if (e.target.closest('li') === itemsGoods[i]) {
            itemsGoods[i].classList.add('active');
            infoPart.classList.add('active');
            itemsInfo[i].classList.add('active');
            elementsOfItemGoods = itemsGoods[i].childNodes;

                for (let j = 0; j < elementsOfItemGoods.length; j++) {
                    if (elementsOfItemGoods[j].className != undefined) {
                        elementsOfItemGoods[j].classList.add('active');
                    }
                };

        } else {
            itemsGoods[i].classList.remove('active');
            elementsOfItemGoods = itemsGoods[i].childNodes;
                for (let j = 0; j < elementsOfItemGoods.length; j++) {
                    if (elementsOfItemGoods[j].className != undefined) {
                        elementsOfItemGoods[j].classList.remove('active');
                    }
                };
            itemsInfo[i].classList.remove('active');
        };
    };
});



buyBtn.addEventListener('click', () => {
        ordering.classList.add('active');
});


function createErrorElement(elementBefore) {
        let errorElement = document.createElement('p');
        elementBefore.after(errorElement);
};


function validation(input, test, error) {

    let inputTrim = input.value.trim();
    let testResult = test.test(inputTrim);

    if (!testResult) {
        input.classList.add('error');
        if (input.nextElementSibling.tagName != 'P') {
            createErrorElement(input);
        };
        if (input.nextElementSibling.tagName === 'P') {
            if (input.value === '') {
            input.nextElementSibling.textContent = errorEmpty;
            } else {
            input.nextElementSibling.textContent = '';
            input.nextElementSibling.textContent = error;
        };
    };
    } else {
        input.classList.remove('error');
        if (input.nextElementSibling.tagName === 'P') {
            input.nextElementSibling.remove();
        };
    };
    return testResult;
};


function validationPayment() {

    if (!cashInput.checked && !bankCardInput.checked) {
        cashInput.classList.add('error');
        bankCardInput.classList.add('error');
        if (orderingPayment.nextElementSibling.tagName != 'P') {
            createErrorElement(orderingPayment);
        };
        orderingPayment.nextElementSibling.textContent = errorPayment;
        return false;
    } else if (orderingPayment.nextElementSibling.tagName === 'P') {
        orderingPayment.nextElementSibling.remove();
    } 
    if (cashInput.checked || bankCardInput.checked) {
        cashInput.classList.remove('error');
        bankCardInput.classList.remove('error');
        return true;
    };
};



nameInput.addEventListener('focusout', () => {
    validation(nameInput, testName, errorName);
});

cityInput.addEventListener('blur', () => {
    validation(cityInput, testCity, errorCity);
});

poshtaInput.addEventListener('focusout', () => {
    validation(poshtaInput, testNovaPoshta, errorPoshta);
});

numberProduct.addEventListener('focusout', () => {
    validation(numberProduct, testQuantity, errorQuantity);
});

cashInput.addEventListener('click',validationPayment);
bankCardInput.addEventListener('click', validationPayment);




ordering.addEventListener('submit', (e) => {
    e.preventDefault();
       let nameValidation = validation(nameInput, testName, errorName);
       let validationCity = validation(cityInput, testCity, errorCity);
       let poshtaValidation = validation(poshtaInput, testNovaPoshta, errorPoshta);
       validationPayment();
       let quantityValidation = validation(numberProduct, testQuantity, errorQuantity);

        if (nameValidation && validationCity && poshtaValidation && validationPayment && quantityValidation) {


            let selectedProduct = document.querySelector('.info li.active');
            let selectedProductCopy = selectedProduct.cloneNode(true);
            basket.appendChild(selectedProductCopy);
            let basketElementText = selectedProductCopy.querySelector('p');
            let basketElementPrice = selectedProductCopy.querySelector('span');
            selectedProductCopy.insertBefore(basketElementPrice, basketElementText);
            let date = formatDate(new Date());
            let dateEl = document.createElement('span');
            dateEl.className = 'date';
            dateEl.innerHTML = date;
            basketElementPrice.after(dateEl);
            let deleteEl = document.createElement('button');
            deleteEl.textContent = 'remove';
            selectedProductCopy.appendChild(deleteEl);
            let quantitySelectedProduct = ordering.querySelector('.ordering .ordering__quantity-products').cloneNode(true);
            let quantityAddedProduct = document.createElement('span');
            quantityAddedProduct.className = 'quantity';
            quantityAddedProduct.textContent = 'Quantity: ' + quantitySelectedProduct.value;
            selectedProductCopy.querySelector('p').after(quantityAddedProduct);
            infoPart.classList.remove('active');
            if (leftPart.contains(document.querySelector('.empty-el'))) {
                document.querySelector('.empty-el').remove();
            };


            let elementsInBasket = basket.innerHTML;
            localStorage.setItem(`basket`, elementsInBasket);
            
        };
});



function formatDate(date) {

    let day = date.getDate();
    if (day < 10) {
        day = '0' + day;
    };
    let month = date.getMonth() + 1;
    if (month < 10) {
        month = '0' + month;
    };
    let year = date.getFullYear() % 100;
    if (year < 10) {
        year = '0' + year;
    };
  
    return `${day}.${month}.${year}`;
  };




myOrdersBtn.addEventListener('click', () => {
    myOrdersBtn.classList.toggle('categories-btn');
    basket.classList.toggle('active');
    categoriesContainer.classList.toggle('d-none');

        if (basket.classList[1] === 'active') {
            myOrdersBtn.textContent = 'Categories';
        } else {
            myOrdersBtn.textContent = 'My orders';
        };

        if (! basket.hasChildNodes() && categoriesContainer.classList[1] === 'd-none') {
            if (! leftPart.contains(document.querySelector('.empty-el'))) {
                let emptyEl = document.createElement('p');
                emptyEl.className = 'empty-el';
                emptyEl.textContent = 'No orders yet';
                leftPart.appendChild(emptyEl);
            };
        } else if (leftPart.contains(document.querySelector('.empty-el'))){
            document.querySelector('.empty-el').remove();
        };

});


basket.addEventListener('click', (e) => {
    if (basket.hasChildNodes()) {
    let productsInBasket = document.querySelectorAll('.basket li');
    let deleteBtn = document.querySelectorAll('.basket button');
        for (i = 0; i < productsInBasket.length; i++) {
            if (e.target.closest('li') === productsInBasket[i]) {
                productsInBasket[i].classList.toggle('with-description');
            };
            if (e.target === deleteBtn[i]) {
                productsInBasket[i].remove();
                if (! basket.hasChildNodes()) {
                    basket.classList.remove('active');
                    myOrdersBtn.classList.remove('categories-btn');
                    categoriesContainer.classList.remove('d-none');
                    myOrdersBtn.textContent = 'My orders';
                };

                let changeBasket = basket.innerHTML;
                localStorage.setItem('basket', changeBasket);
            }; 
        };
    };
});
