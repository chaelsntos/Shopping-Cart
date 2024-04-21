$(document).ready(function(){

    //Update Cart Hover and Cart Page Quantities
    $('.cart-number').html(localStorage.length);
    $('.js-quantity').html(localStorage.length);

    function cartPage(){

        //Set Total Price
        totalPrice = 0;
        
        //Loop through localstorage and append items on Cart Page
        for (i=0; i<localStorage.length; i++){
            let key = localStorage.key(i);  
            let parseProduct = JSON.parse(localStorage.getItem(key));
            $('.cart-page__card-wrapper').append(
                `
                <div class="cart-list-${parseProduct['id']}">
                    <div class="cart-modal__card">
                        <div class="cart-image">
                            <img src="${parseProduct['image']}" />
                        </div>
                        <p class="cart-modal__title">${parseProduct['title']}</p>
                        <p class="cart-modal__price">$${parseProduct['price']}</p>
                        <a href="#" class="cta-black remove-btn-cart" data-id="${parseProduct['id']}">
                            Remove Item
                        </a>
                    </div>
                </div>
                `
            );

            //Loop through and Add the integers
            totalPrice += parseFloat(parseProduct['price']);
            
        }

        //Last item of array and Final Sum
        $('.sum').html(`$${totalPrice.toFixed(2)}`);

    }

    function cartItems(){
        //Loop through localstorage and append items on Cart Modal
        for (i=0; i<localStorage.length; i++){
            let key = localStorage.key(i);  
            let parseProduct = JSON.parse(localStorage.getItem(key));
            $('.cart-modal ul').append(
                `
                <li class="cart-list-${parseProduct['id']}">
                    <div class="cart-modal__card">
                        <div class="cart-image" style="background-image: url(${parseProduct['image']})"></div>
                        <p class="cart-modal__title">${parseProduct['title']}</p>
                        <p class="cart-modal__price">$${parseProduct['price']}</p>
                    </div>
                </li>
                `
            );

            //Check if Item is already added then change button from buy item to remove item button
            if (localStorage.getItem(`id-${parseProduct['id']}`) === null){
                $(`.js-add-btn-${parseProduct['id']}`).fadeIn();
                $(`.js-remove-btn-${parseProduct['id']}`).fadeOut();
            } else {
                $(`.js-add-btn-${parseProduct['id']}`).fadeOut();
                $(`.js-remove-btn-${parseProduct['id']}`).fadeIn();
            }
        }

    }

    $('.js-add-btn').on('click', function(e1){
        e1.preventDefault();

        //Set Item Data
        let dataId    = $(this).attr('data-id');
        let itemTitle = $(this).attr('data-title');
        let itemPrice = $(this).attr('data-price');
        let itemImage = $(this).attr('data-image');

        //Convert Data to Array
        let productDetails = {"title": itemTitle, "price": itemPrice, "image": itemImage, "id":dataId};

        //Convert array to string
        let stringProductDetails = JSON.stringify(productDetails)

        //Save data to localstorage
        localStorage.setItem(`id-${dataId}`, stringProductDetails);

        //Get ID
        let getTitle = localStorage.getItem(`id-${dataId}`);

        //Convert string to Array
        let parseProduct = JSON.parse(getTitle);

        //Check if working
        console.log(parseProduct['title']);

        //Update Cart Number
        $('.cart-number').html(localStorage.length);

        //Append Item to Cart Modal
        $('.cart-modal ul').append(
            `
            <li class="cart-list-${parseProduct['id']}">
                <div class="cart-modal__card">
                    <div class="cart-image" style="background-image: url(${parseProduct['image']})"></div>
                    <p class="cart-modal__title">${parseProduct['title']}</p>
                    <p class="cart-modal__price">$${parseProduct['price']}</p>
                </div>
            </li>
            `
        );

        //Check if Item is already added then change button from buy item to remove item button
        if (localStorage.getItem(`id-${dataId}`) === null){
            $(`.js-add-btn-${dataId}`).fadeIn();
            $(`.js-remove-btn-${dataId}`).fadeOut();
        } else {
            $(`.js-add-btn-${dataId}`).fadeOut();
            $(`.js-remove-btn-${dataId}`).fadeIn();
        }
    });

    $('.js-remove-btn').on('click', function(e2){
        e2.preventDefault();

        //Set Item Data
        let dataId    = $(this).attr('data-id');
        let itemTitle = $(this).attr('data-title');
        let itemPrice = $(this).attr('data-price');
        let itemImage = $(this).attr('data-image');

        //Remove HTML of item
        $(`.cart-list-${dataId}`).remove();

        //Remove from localstorage
        localStorage.removeItem(`id-${dataId}`);

        //Update Cart Number
        $('.cart-number').html(localStorage.length);

        //Check if Item is already added then change button from buy item to remove item button
        if (localStorage.getItem(`id-${dataId}`) === null){
            $(`.js-add-btn-${dataId}`).fadeIn();
            $(`.js-remove-btn-${dataId}`).fadeOut();
        } else {
            $(`.js-add-btn-${dataId}`).fadeOut();
            $(`.js-remove-btn-${dataId}`).fadeIn();
        }

    });

    //Run Functions
    cartItems();
    cartPage();

    //Remove Cart Items on Cart Page
    $('.remove-btn-cart').on('click', function(remove){
        remove.preventDefault();

        //Get Data
        let dataId    = $(this).attr('data-id');
        let itemTitle = $(this).attr('data-title');
        let itemPrice = $(this).attr('data-price');
        let itemImage = $(this).attr('data-image');

        //Remove HTML of item 
        $(`.cart-list-${dataId}`).remove();

        //Remove from Local Storage
        localStorage.removeItem(`id-${dataId}`);

        $('.cart-number').html(localStorage.length);
        $('.js-quantity').html(localStorage.length);

        console.log(dataId);

        //Set total Price
        totalPrice = 0;
        
        //Loop through and Add the integers
        for (i=0; i<localStorage.length; i++){
            let key = localStorage.key(i);  
            let parseProduct = JSON.parse(localStorage.getItem(key));
            totalPrice += parseFloat(parseProduct['price']);
            
        }
        //Final Price
        $('.sum').html(`$${totalPrice.toFixed(2)}`);

    });

});