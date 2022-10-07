/* fetch('https://api.escuelajs.co/api/v1/products')
.then(res => res.json())
.then(datos => console.log(datos));
 */
// var iniciales
let shoppongCartArray = [];
let total = 0;
let productContainer = document.querySelector('.shop-items');
let totalElemet = document.querySelector('.cart-total-title');

//peticion de preoductos al servidor
let res = await fetch('https://api.escuelajs.co/api/v1/products')
let data = await res.json()

//limitamos a 4 productos
let productsArray = data.slice(0,5)
console.log(productsArray)

//imprimimos productos en pantalla
productsArray.forEach(product => {

     productContainer.innerHTML += `
     <div class="shop-item" id="${product.id}">
                    <span class="shop-item-title">${product.title}</span>
                    <img class="shop-item-image" src="${product.images[0]}">
                    <div class="shop-item-details">
                        <span class="shop-item-price">$${product.price}</span>
                        <button class="btn btn-primary shop-item-button" type="button">ADD TO CART</button>
                    </div>
     </div>
     `

});
//escucho cuando se hace click en un bonton add
let addBtns = document.querySelectorAll('.shop-item-button');

addBtns = [...addBtns];

let cartContainer = document.querySelector('.cart-items')

addBtns.forEach(btn=>{
    btn.addEventListener('click', Event=>{
        console.log('click')
        //agrego productos al carro 

        //buscatr id del  producto
        
        let actualID = parseInt(Event.target.parentNode.parentNode.id)
        console.log(actualID);

        let actualProduct = productsArray.find(item => item.id == actualID)

        if(actualProduct.quantity === undefined){
            actualProduct.quantity = 1;
        }


        console.log(actualProduct.id);
 //preguntar si el producto ya existe

      
        let existe = false

        shoppongCartArray.forEach(productos =>{
            if (actualID == productos.id) {
                existe = true
            }
          

        })

        if(existe){
            console.log('aumentado')
            actualProduct.quantity++
        }else{
            shoppongCartArray.push(actualProduct)
        }
        
        console.log(shoppongCartArray);
       
        drawItems()

        
        //actualizar el valor total
        total = getTotal()

        updateNumberOfItems();
        console.log(total);
    });
});

function getTotal() {

    let sumTotal
    let total = shoppongCartArray.reduce((sum, item)=> {

        sumTotal = sum + item.quantity*item.price
        return sumTotal
    } , 0);

    totalElemet.innerHTML = `$${total}`
}
 

function drawItems() {

    cartContainer.innerHTML ='';
    shoppongCartArray.forEach(item =>{
     
     cartContainer.innerHTML +=`
     <div class="cart-row">
                 <div class="cart-item cart-column">
                     <img class="cart-item-image" src="${item.images[0]}" width="100" height="100">
                     <span class="cart-item-title">${item.title}</span>
                 </div>
                 <span class="cart-price cart-column">$${item.price}</span>
                 <div class="cart-quantity cart-column">
                     <input class="cart-quantity-input" min="1" type="number" value="${item.quantity}">
                     <button class="btn btn-danger" type="button">REMOVE</button>
                 </div>
             </div>
     `


    });
    
}

function updateNumberOfItems() {
    let inputNumber = document.querySelector('.cart-quantity-imput')
    
    inputNumber = [...inputNumber]
    
inputNumber.forEach(item => {

    item.addEventListener('click', Event=>{
       let actualBookTitle = Event.target.parentElement.parentElement.childNodes[1].innerText;


    });
});
}








