const menuData = [

{
name:"Mutton Gawakadi Thali",
price:599,
category:"mutton"
},

{
name:"Mutton Special Thali",
price:499,
category:"mutton"
},

{
name:"Mutton Thali",
price:379,
category:"mutton"
},

{
name:"Chicken Gawakadi Thali",
price:449,
category:"chicken"
},

{
name:"Chicken Special Thali",
price:379,
category:"chicken"
},

{
name:"Chicken Thali",
price:299,
category:"chicken"
},

{
name:"Chicken Dum Biryani",
price:250,
category:"biryani"
},

{
name:"Chicken Tikka Biryani",
price:280,
category:"biryani"
},

{
name:"Mutton Biryani",
price:320,
category:"biryani"
},

{
name:"Chicken Noodles",
price:180,
category:"chinese"
},

{
name:"Chicken Fried Rice",
price:190,
category:"chinese"
},

{
name:"Chicken Pizza",
price:350,
category:"pizza"
}

];

function loadTodaySpecial(){

const special =
menuData.find(
item => item.category === "biryani"
);

if(!special) return;

document.getElementById(
"specialName"
).innerText =
special.name;

document.getElementById(
"specialPrice"
).innerText =
"₹" + special.price;

}

function updateMenuCount(){

document.getElementById(
"menuCount"
).innerText =
menuData.length +
" Delicious Items Available";

}


function loadMenu(){

const menuContainer =
document.getElementById(
"menuContainer"
);

let html = "";

menuData.forEach(item=>{

html += `

<div class="menu-item">

<div>

<h3>${item.name}</h3>

<p>${item.category}</p>

</div>

<div>

<p>₹${item.price}</p>

<button
onclick="addToCart(
'${item.name}',
${item.price}
)">
Add
</button>

</div>

</div>

`;

});

menuContainer.innerHTML =
html;

}



let cart = [];

let orderNumber =
localStorage.getItem("orderNumber") || 1001;

function toggleCart() {
    document
        .getElementById("cartSidebar")
        .classList
        .toggle("active");
}

function addToCart(name, price) {

    let item = cart.find(
        p => p.name === name
    );

    if (item) {
        item.qty++;
    } else {
        cart.push({
            name,
            price,
            qty: 1
        });
    }

    updateCart();
	showToast();
}

function increaseQty(index) {
    cart[index].qty++;
    updateCart();
}

function decreaseQty(index) {

    cart[index].qty--;

    if (cart[index].qty <= 0) {
        cart.splice(index, 1);
    }

    updateCart();
}

function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
}

function showSearchResult(
count
){

const result =
document.getElementById(
"searchResult"
);

if(count===0){

result.innerHTML =
"❌ No Menu Item Found";

}
else{

result.innerHTML =
"✅ " +
count +
" Item(s) Found";

}

}


function updateCart() {

    const cartItems =
        document.getElementById("cartItems");

    const cartCount =
        document.getElementById("cartCount");

    const cartTotal =
        document.getElementById("cartTotal");

    cartItems.innerHTML = "";

    let total = 0;
    let count = 0;

    cart.forEach((item, index) => {

        total += item.price * item.qty;
        count += item.qty;

        cartItems.innerHTML += `

        <div class="cart-item">

            <h4>${item.name}</h4>

            <p>
                ₹${item.price}
            </p>

            <div class="qty-box">

                <button
                onclick="decreaseQty(${index})">
                -
                </button>

                <span>
                ${item.qty}
                </span>

                <button
                onclick="increaseQty(${index})">
                +
                </button>

            </div>

            <p>
                Subtotal:
                ₹${item.price * item.qty}
            </p>

            <button
            class="remove-btn"
            onclick="removeItem(${index})">
            Remove
            </button>

            <hr>

        </div>

        `;
    });

    cartCount.innerText = count;
	cartCount.classList.add("bounce");

setTimeout(()=>{

cartCount.classList.remove(
"bounce"
);

},300);
    cartTotal.innerText = total;
	
	localStorage.setItem(
    "swadishtCart",
    JSON.stringify(cart)
);
	
}



function placeWhatsAppOrder() {

    if (cart.length === 0) {
        alert("Cart is empty.");
        return;
    }

    const name =
        document.getElementById(
            "customerName"
        ).value;

    const mobile =
        document.getElementById(
            "customerMobile"
        ).value;

    const address =
        document.getElementById(
            "customerAddress"
        ).value;

    const notes =
    document.getElementById(
    "customerNotes"
    ).value;

    const payment =
    document.querySelector(
    'input[name="payment"]:checked'
    ).value;


    if (
        name.trim() === "" ||
        mobile.trim() === "" ||
        address.trim() === ""
    ) {
        alert(
            "Please enter Name, Mobile and Address."
        );
        return;
    }

    let total = 0;

    let message =
`🍗 SWADISHT ORDER

Order No: #${orderNumber}

Customer Name: ${name}

Mobile: ${mobile}

Address:
${address}

Notes:
${notes}


Payment:
${payment}


------------------

ORDER ITEMS

`;

    cart.forEach(item => {

        total += item.price * item.qty;

        message +=
`${item.name}
Qty: ${item.qty}
Price: ₹${item.price}

`;
    });

    message +=
`------------------

TOTAL = ₹${total}

Thank You
`;

    const phone =
    "919923095522";

    const whatsappURL =
    `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    localStorage.setItem(
    "orderNumber",
    parseInt(orderNumber) + 1
    );

    window.open(
        whatsappURL,
        "_blank"
    );
}

function showCategory(category){

const sections =
document.querySelectorAll(
'.menu-category'
);

sections.forEach(section=>{

if(
category==="all"
){
section.style.display="block";
}
else{

if(
section.dataset.category===category
){
section.style.display="block";
}
else{
section.style.display="none";
}

}

});

}

function filterMenu(){

let input =
document
.getElementById("menuSearch")
.value
.toLowerCase()
.trim();

let categories =
document.querySelectorAll(
".menu-category"
);

let foundItems = 0;

categories.forEach(category=>{

let items =
category.querySelectorAll(
".menu-item"
);

let hasVisibleItem = false;

items.forEach(item=>{

let text =
item.innerText.toLowerCase();

if(
text.includes(input)
){

item.style.display =
"grid";

hasVisibleItem = true;

foundItems++;

}
else{

item.style.display =
"none";

}

});

category.style.display =
hasVisibleItem
? "block"
: "none";

});

showSearchResult(
foundItems
);

}

function showToast(){

const toast =
document.getElementById("toast");

toast.classList.add("show");

setTimeout(()=>{

toast.classList.remove("show");

},1500);

}

const savedCart =
localStorage.getItem(
"swadishtCart"
);

if(savedCart){

cart = JSON.parse(savedCart);

updateCart();

}

function clearCart(){

if(
confirm(
"Are you sure you want to clear the cart?"
)
){

cart = [];

localStorage.removeItem(
"swadishtCart"
);

updateCart();

}

}


function scrollToTop(){

window.scrollTo({
top:0,
behavior:"smooth"
});

}

window.onscroll = function(){

const btn =
document.getElementById(
"topBtn"
);

if(
document.documentElement
.scrollTop > 300
){

btn.style.display =
"block";

}
else{

btn.style.display =
"none";

}

};

loadMenu();
loadTodaySpecial();
updateMenuCount();