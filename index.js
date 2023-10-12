import {menuArray} from './data.js'

const container_ProductsEl = document.getElementById('container-products')
const order_ContainerEl = document.getElementById('order-container')
const total_ContainerEl = document.getElementById('total-container')
const orderBtn = document.querySelector('.order-btn')
const modal_pay = document.getElementById('modal-pay')
// const pay_button  = document.getElementById('pay-btn')
const FormPay = document.getElementById('pay-form')

 

const {name,ingredients, id, price, emoji} = menuArray

let totalSum = 0

menuArray.forEach((food)=>{
    

    
    

container_ProductsEl.innerHTML += `<div id="inner-Container">
         
                                                    <div id="separate">
                                                        <h1 id="foods-emoji">${food.emoji}</h1>
                                                    
                                                            <div id="info-food">
                                                                <h2> ${food.name}</h2>
                                                                <p> ${food.ingredients}</p>
                                                                <h2> $${food.price}</h2>                                                                                             
                                                            </div>
                                                    </div>

                                                    <div id="button-add-container">
                                                        <button class="add-btn" data-id="${food.id}">+</button>
                                                    </div>
                                                    

                                                
                                    </div>`

                                            })

const AddButtonEl = document.querySelectorAll('.add-btn')

// Crear un objeto para mantener el seguimiento de los precios por ID
const pricesById = {};

AddButtonEl.forEach((button) => {
  button.addEventListener('click', function () {
    const itemId = button.getAttribute('data-id');
    menuArray.forEach((item) => {
      if (item.id === parseInt(itemId, 10)) {
        document.getElementById('title-order').style.display = 'flex';
        order_ContainerEl.innerHTML += `
          <div class="order-info" id="order-info-${item.id}">
            <div id="info-1">
              <h2>${item.name}</h2>
              <button class="remove-btn" data-price="${item.price}">remove</button>
            </div>
            <h2>$${item.price}</h2>
          </div>`;
        document.querySelector('.order-btn').style.display = "flex";

        // Parsea el precio como un número y agrégalo al objeto de seguimiento.
        const itemPrice = parseFloat(item.price);
        if (!isNaN(itemPrice)) {
          if (pricesById[item.id]) {
            pricesById[item.id] += itemPrice;
          } else {
            pricesById[item.id] = itemPrice;
          }

          totalSum = Object.values(pricesById).reduce((acc, price) => acc + price, 0);
          total_ContainerEl.innerHTML = `
            <div id="info-total">
              <h2>Total price:</h2>
              <h2>$${totalSum.toFixed(2)}</h2>
            </div>`;
        }
      }
    });
  });
});

order_ContainerEl.addEventListener('click', function (e) {
  if (e.target.classList.contains('remove-btn')) {
    const orderInfoEl = e.target.closest('.order-info');
    if (orderInfoEl) {
      const itemId = orderInfoEl.getAttribute('id').split('-')[2];
      const itemPriceText = e.target.getAttribute('data-price');
      
      // Parsea el precio del producto eliminado como un número.
      const itemPrice = parseFloat(itemPriceText);
      
      if (!isNaN(itemPrice)) {
        totalSum -= itemPrice;
        total_ContainerEl.innerHTML = `
          <div id="info-total">
            <h2>Total price:</h2>
            <h2>$${totalSum.toFixed(2)}</h2>
          </div>`;
        orderInfoEl.remove();
        delete pricesById[itemId];
      }
    }
  }
});
orderBtn.addEventListener('click', function(){
  modal_pay.style.display = 'flex'
})

FormPay.addEventListener('submit', function(e){

  e.preventDefault()
  const feedbackContainer = document.getElementById('Feedback-container')
  const FormPayData = new FormData(FormPay)
  const name = FormPayData.get('full-Name')
  feedbackContainer.style.display='flex'
  feedbackContainer.innerHTML = `<h1 id="feedback-text">Thanks, ${name}! Your order is on its way!!</h1>`
  modal_pay.style.display = 'none'
  order_ContainerEl.style.display = "none"
  total_ContainerEl.style.display = 'none'
  orderBtn.style.display = 'none'

//   setTimeout(function(){
//  feedbackContainer.remove()
//   },1000)
})








   





                                 
                               

