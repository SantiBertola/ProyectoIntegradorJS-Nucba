// Referencias al HTML

const products = document.querySelector('.nov-cards-container')
const productsCart = document.querySelector('.cart-conten')
const productsTittle = document.querySelector('.nov-tittle')
const cartTotal = document.querySelector('.total')
const categories = document.querySelector('.categories')
const categoriesList = document.querySelectorAll('.category')
const btnLoad = document.querySelector('.btn-load')
const buyBtn = document.querySelector('.btn-buy')
const cartNumber = document.querySelector('.cart-number')
const cartBtn = document.querySelector('.cart-label')
const cartMenu = document.querySelector('.cart')
const barsButton = document.querySelector('.menu-label')
const barsMenu = document.querySelector('.navbar-links')
const successModal = document.querySelector('.add-modal')
const deleteBtn = document.querySelector('.btn-delete')

// LocalStorage

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const saveLocalStorage = (cartList) => {
    localStorage.setItem("cart", JSON.stringify(cartList));
};

// Renderizar las cards

const renderProduct = ({ id, name, product, price, cardImg }) => {
    return ` 
    <div class="cards-cointainer">
    <a href="login.html">
        <div class="cards-img">
            <img src=${cardImg} alt=${name}>
        </div>
        <div class="cards-tittle">
            <h3>${name}</h3>
            <h4>${product}</h4>
        </div>
    </a>    
        <div class="cards-price">
            <button class="btn-add"
                    data-id='${id}'
                    data-name='${name}'
                    data-price='${price}'
                    data-img='${cardImg}'>
                        $${price}</button>
        </div>
</div>
`;
}

const renderFilteredProducts = category => {
    const productsList = productsData.filter((product) => product.category === category)
    products.innerHTML = productsList.map(renderProduct).join('');

}

const renderDividedProducts = (index = 0) => {
    const productsToRender = productsController.dividedProducts[index]
    products.innerHTML += productsToRender.map(renderProduct).join('')
}


const renderProducts = (index = 0, category = null) => {
    if (!category) {
        renderDividedProducts(index)
    } else {
        renderFilteredProducts(category)
    }

}

// Funcion del boton ver más

const isLastIndex = () => productsController.nextProductsIndex === productsController.productsLimits;

const showMoreProducts = () => {
    renderProducts(productsController.nextProductsIndex);
    productsController.nextProductsIndex++;
    if (isLastIndex()) {
        btnLoad.classList.add('none')
    }
}


const changeButtonActivated = (selectedCategory) => {
    const categories = [...categoriesList];
    categories.forEach((categoryBtn) => {
        if (categoryBtn.dataset.category !== selectedCategory) {
            categoryBtn.classList.remove("active");
        } else {
            categoryBtn.classList.add("active");
        }
    });
};


const changeShowMoreButton = (selectedCategory) => {
    if (!selectedCategory) {
        btnLoad.classList.remove('none')
        return
    } else if (selectedCategory.length >= 6) {
      btnLoad.classList.add('none')  
    }    

}


const changeFilterState = (selectedCategory) => {
    changeButtonActivated(selectedCategory)
    changeShowMoreButton(selectedCategory)  
}

const apllyFilter = (e) => {
    if (!e.target.classList.contains('category')) return;
    const categoryCLicked = e.target.dataset.category;
    changeFilterState(categoryCLicked)
    if (!categoryCLicked) {
        products.innerHTML = '';
        renderProducts()
    } else {
        renderProducts(0, categoryCLicked);
        productsController.nextProductsIndex = 1;
    }
    if (categoryCLicked === 'Novedades') {
        return productsTittle.innerHTML =
            `<div class="nov-tittle">
        <h2>⚡️ Novedades ⚡️</h2>
        <p>¡Todo lo nuevo para la temporada 2022-23!</p>
        </div>`
    } else if (categoryCLicked === 'Hombres') {
        return productsTittle.innerHTML =
            `<div class="nov-tittle">
        <h2>🙋🏼‍♂️ Ropa de Hombres 🙋🏼‍♂️</h2>
        <p>¡Todo lo nuevo para la temporada 2022-23 para ellos!</p>
        </div>`
    } else if (categoryCLicked === 'Mujeres') {
        return productsTittle.innerHTML =
            `<div class="nov-tittle">
        <h2>🙋🏼‍♀️ Ropa de Mujeres 🙋🏼‍♀️</h2>
        <p>¡Todo lo nuevo para la temporada 2022-23 para ellas!</p>
        </div>`
    } else if (categoryCLicked === 'Accesorios') {
        return productsTittle.innerHTML =
            `<div class="nov-tittle">
        <h2>👓 Accesorios 👓</h2>
        <p>¡Personaliza tus outfits al mejor estilo NBA!</p>
        </div>`
    } else {
        return productsTittle.innerHTML = `
        <div class="nov-tittle">
        <h2>😎Nuestro stock😎</h2>
         <p>¡Todo lo nuevo para la temporada 2022-23!</p>
         </div>`
    }
}



// Carrito y Menu funcionando

const toggleMenu = () => {
    barsMenu.classList.toggle("open-menu");
    if (cartMenu.classList.contains("open-cart")) {
        cartMenu.classList.remove("open-cart");
        return;
    }
}

const toggleCart = () => {
    cartMenu.classList.toggle("open-cart");
    if (barsMenu.classList.contains('open-menu')) {
        barsMenu.classList.remove('open-menu');
        return;
    }

}

const closeOnClick = (e) => {
    if (!e.target.classList.contains('navbar-links')) return
    barsMenu.classList.remove('open-menu')
}

const renderCartProduct = ({ id, name, price, img, quantity }) => {
    return `
    <div class="cart-item">
        <img src=${img} />
         <div class="item-info">
            <h3 class="item-title">${name}</h3>
            <p class="item-bid">Precio final</p>
            <span class="item-price">$${price}</span>
        </div>
        <div class="item-handler">
            <span class="quantity-handler down" data-id=${id}>-</span>
            <span class="item-quantity">${quantity}</span>
            <span class="quantity-handler up" data-id=${id}>+</span>
        </div>
    </div> 
    `
}


const renderCart = () => {
    if (!cart.length) {
        productsCart.innerHTML = `<p class="no-products">El carrito está vacío.</p>`
        return;
    }
    productsCart.innerHTML = cart.map(renderCartProduct).join('')
}

const getCartTotal = () => {
    return cart.reduce((accum, currentValue) => accum + Number(currentValue.price) * currentValue.quantity, 0)
}

const showTotal = () => {
    cartTotal.innerHTML = `$${getCartTotal().toFixed(3)}`
}

const isCartProduct = ({ id }) => cart.some((product) => product.id === id)

const createCardProduct = (product) => {
    cart = [...cart, { ...product, quantity: 1 }]
}



const showSuccessModal = message => {
    successModal.classList.add('active-modal')
    successModal.textContent = message;
    setTimeout(() => {
        successModal.classList.remove('active-modal');
    }, 2000);
}

disableBtn = btn => {
    if (!cart.length) {
        btn.classList.add('disabled')
    } else {
        btn.classList.remove('disabled')
    }
}

const checkCartState = () => {
    saveLocalStorage(cart);
    renderCart();
    showTotal();
    disableBtn(buyBtn)
    disableBtn(deleteBtn)
    renderCartBubble()
}

const addUniToProduct = (product) => {
    cart = cart.map(cartProduct => cartProduct.id === product.id ?
        { ...cartProduct, quantity: cartProduct.quantity + 1 } : cartProduct)
}



const addProduct = (e) => {
    if (!e.target.classList.contains('btn-add')) return;
    const { id, name, price, img } = e.target.dataset;

    const product = { id, name, price, img }
    if (isCartProduct(product)) {
        addUniToProduct(product)
        showSuccessModal('Se agegó otra unidad al carrito.');
    } else {
        createCardProduct(product)
        showSuccessModal('El producto fue agregado al carrito.')

    }
    checkCartState()
};

const resetCart = () => {
    cart = []
    checkCartState()
}

const completeCartAction = (confirmMesagge, successMesagge) => {
    if(!cart.length) return;
    if(window.confirm(confirmMesagge)) {
        resetCart()
        alert(successMesagge)
    }
}

const renderCartBubble = () => {
    cartNumber.textContent = cart.reduce((accum, currentValue) => accum +currentValue.quantity, 0)
}

const completeBuy = () => {
    completeCartAction("¿Quiere completar su compra?", "Debes iniciar sesión para completar tu compra.")
}

const deleteCart = () => {
    completeCartAction("¿Quiere vaciar el carrito?", "El carrito ahora está vacío")
}


const handPlusBtnEvente = (id) => {
    const existingProduct = cart.find(product => product.id === id)
    addUniToProduct(existingProduct)
}

const removeProductFromCart = ({id}) => {
    cart = cart.filter(product => product.id !== id)
    checkCartState()
}

const subtractProductUnit = ({id}) => {
    cart = cart.map((product) => product.id === id ? { ...product, quantity: product.quantity - 1} : product)
} 

const handMinusBtnEvent = (id) => {
    const existingProduct = cart.find(product => product.id === id)
    
    if (existingProduct.quantity === 1) {
        if (window.confirm('¿Desea eliminar el producto del carrito?')) {
        removeProductFromCart(existingProduct)
        return    
        }
    } else {
        subtractProductUnit(existingProduct) 
    }
}

const handQuantity = (e) => {
    if (e.target.classList.contains('down')){
        handMinusBtnEvent(e.target.dataset.id)
    } else if (e.target.classList.contains('up')) {
        handPlusBtnEvente(e.target.dataset.id)
    }
    checkCartState()
}


const init = () => {
    renderProducts();
    btnLoad.addEventListener('click', showMoreProducts)
    categories.addEventListener('click', apllyFilter)

    barsButton.addEventListener('click', toggleMenu)
    cartBtn.addEventListener('click', toggleCart)

    barsMenu.addEventListener('click', closeOnClick)


    document.addEventListener('DOMContentLoaded', renderCart)
    document.addEventListener('DOMContentLoaded', showTotal)

    productsCart.addEventListener('click', handQuantity)
    products.addEventListener('click', addProduct)
    buyBtn.addEventListener('click', completeBuy)
    deleteBtn.addEventListener('click', deleteCart)
    disableBtn(buyBtn)
    disableBtn(deleteBtn)
    renderCartBubble()


}
init();
