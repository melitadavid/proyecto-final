/* fetch('https://api.escuelajs.co/api/v1/products')
.then(res => res.json())
.then(datos => console.log(datos));
 */

//Operadores avanzados
let nombre = prompt("ingresa tu nombre")
let edad = prompt("ingresa tu edad");
//libreria
edad >= 18 ? Swal.fire(
    'Bienvenido',
    `Hola ${nombre} te damos la bienvenida a nuestra app online`,
  ) : 
Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: `${nombre} Lo sentimos tienes que ser mayor de 18 años.`,
   
  })



// var iniciales
let shoppingCartArray = [];
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
                        <button class="btn btn-primary shop-item-button" type="button">AGREGAR</button>
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
        
        //agrego productos al carro 

        //buscatr id del  producto
        
        let actualID = parseInt(Event.target.parentNode.parentNode.id)
        console.log(actualID);

        let actualProduct = productsArray.find(item => item.id == actualID)

        if(actualProduct.quantity === undefined){
            actualProduct.quantity = 1;
        }


        
 

      
        let existe = false

        shoppingCartArray.forEach(productos =>{
            if (actualID == productos.id) {
                existe = true
            }
          

        })

        if(existe){
            console.log('aumentado')
            actualProduct.quantity++
        }else{
            shoppingCartArray.push(actualProduct)
        }
        
        console.log(shoppingCartArray);
       
        drawItems()

        
       getTotal()

        updateNumberOfItems()

        removeItems()
        
    });
});

function getTotal() {

    let sumTotal
    let total = shoppingCartArray.reduce((sum, item)=> {

        sumTotal = sum + item.quantity*item.price
        return sumTotal
    } , 0);

    totalElemet.innerText = `$${total}`
}
 

function drawItems() {

    cartContainer.innerHTML ='';
    shoppingCartArray.forEach(item =>{
     
     cartContainer.innerHTML +=`
     <div class="cart-row">
                 <div class="cart-item cart-column">
                     <img class="cart-item-image" src="${item.images[0]}" width="100" height="100">
                     <span class="cart-item-title">${item.title}</span>
                 </div>
                 <span class="cart-price cart-column">$${item.price}</span>
                 <div class="cart-quantity cart-column">
                     <input class="cart-quantity-input" min="1" type="number" value="${item.quantity}">
                     <button class="btn btn-danger" type="button">BORRAR</button>
                 </div>
             </div>
     `


    });
    removeItems()
    
}

function updateNumberOfItems() {
        let inputNumber = document.querySelectorAll('.cart-quantity-input')
        
        inputNumber = [...inputNumber];
        
    inputNumber.forEach(item => {

        item.addEventListener('click', Event=>{
        let actualBookTitle = Event.target.parentElement.parentElement.childNodes[1].innerText;
            let actualBookQuantity = parseInt(Event.target.value);
            console.log(actualBookQuantity);

    
        let actualBookObject = shoppingCartArray.find(item =>item.title == actualBookTitle)
            console.log(actualBookObject);

                actualBookObject.quantity = actualBookQuantity;


                getTotal();
        });
    });
}

function removeItems() {
        let removeBtns = document.querySelectorAll('.btn-danger');
        removeBtns = [...removeBtns];
        removeBtns.forEach(btn => {
        btn.addEventListener('click', Event =>{
        
            let actualBookTitle = Event.target.parentElement.parentElement.childNodes[1].innerText

            let actualBookObject = shoppingCartArray.find(item =>item.title == actualBookTitle)

            shoppingCartArray = shoppingCartArray.filter(item => item != actualBookObject)
            console.log(shoppingCartArray);

            drawItems()

            
            getTotal()
            updateNumberOfItems()
        });

    });
}


 



