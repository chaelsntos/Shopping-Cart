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
        let dataId    = $(this).attr('data-id');
        let itemTitle = $(this).attr('data-title');
        let itemPrice = $(this).attr('data-price');
        let itemImage = $(this).attr('data-image');

        let productDetails = {"title": itemTitle, "price": itemPrice, "image": itemImage, "id":dataId};

        let stringProductDetails = JSON.stringify(productDetails)

        localStorage.setItem(`id-${dataId}`, stringProductDetails);

        let getTitle = localStorage.getItem(`id-${dataId}`);

        let parseProduct = JSON.parse(getTitle);

        console.log(parseProduct['title']);

        $('.cart-number').html(localStorage.length);

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

        let dataId    = $(this).attr('data-id');
        let itemTitle = $(this).attr('data-title');
        let itemPrice = $(this).attr('data-price');
        let itemImage = $(this).attr('data-image');

        $(`.cart-list-${dataId}`).remove();

        localStorage.removeItem(`id-${dataId}`);

        $('.cart-number').html(localStorage.length);

        if (localStorage.getItem(`id-${dataId}`) === null){
            $(`.js-add-btn-${dataId}`).fadeIn();
            $(`.js-remove-btn-${dataId}`).fadeOut();
        } else {
            $(`.js-add-btn-${dataId}`).fadeOut();
            $(`.js-remove-btn-${dataId}`).fadeIn();
        }

        

        console.log(dataId);

    });


    cartItems();
    cartPage();

    $('.remove-btn-cart').on('click', function(remove){
        remove.preventDefault();

        let dataId    = $(this).attr('data-id');
        let itemTitle = $(this).attr('data-title');
        let itemPrice = $(this).attr('data-price');
        let itemImage = $(this).attr('data-image');

        $(`.cart-list-${dataId}`).remove();

        localStorage.removeItem(`id-${dataId}`);

        $('.cart-number').html(localStorage.length);
        $('.js-quantity').html(localStorage.length);

        console.log(dataId);


        totalPrice = 0;
        
        for (i=0; i<localStorage.length; i++){
            let key = localStorage.key(i);  
            let parseProduct = JSON.parse(localStorage.getItem(key));
            totalPrice += parseFloat(parseProduct['price']);
            
        }

        $('.sum').html(`$${totalPrice.toFixed(2)}`);

    });

});