console.log('linking index.js');

const myURL = 'https://striveschool-api.herokuapp.com/api/product/';
const myToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODVhOThmNDRlZjFiYzAwMTVkZjViMDciLCJpYXQiOjE3NTA3Njc4NjEsImV4cCI6MTc1MTk3NzQ2MX0.TAAwRbaWxFOxRudgBvko5842qwiC8LUg6ypoF-H5sD4';
const productsRow = document.querySelector('#productsRow');

/* STRUTTURA PRODOTTO
  {
    "name": "",
    "description": "",
    "brand": "",
    "imageUrl": "",
    "price": 
  } 
*/
const productsArray = [
  {
    "name": "Tab P12",
    "description": "RAM 8GB, Memory: 256GB, Display 12.7inch, pen included",
    "brand": "Lenovo",
    "imageUrl": "https://m.media-amazon.com/images/I/511ShM48COL._AC_SX679_.jpg",
    "price": 379
  },
  {
    "name": "Happy Seedlings",
    "description": "Cute lego botanicals",
    "brand": "LEGO",
    "imageUrl": "https://m.media-amazon.com/images/I/81JGnQochGL._AC_SX679_.jpg",
    "price": 16
  },
  {
    "name": "MacBook Pro M1",
    "description": "Chip M1, display 13inch, 512SSD",
    "brand": "Apple",
    "imageUrl": "https://m.media-amazon.com/images/I/31I2mbeJ0FL._AC_SX679_.jpg",
    "price": 942
  },
  {
    "name": "Nothing Phone 2a",
    "description": "12+256GB - Smartphone with Nothing OS 2.5 - Milk White",
    "brand": "Nothing",
    "imageUrl": "https://m.media-amazon.com/images/I/519KVc-h8xL._AC_SX679_.jpg",
    "price": 274
  },
  {
    "name": "Redmi Buds 6 Lite",
    "description": "Bluetooth In-Ear Headphones, Noise Cancellation, Dual Microphone, High Audio Quality, USB-C Charging Case, 38h Battery Life",
    "brand": "Xiaomi",
    "imageUrl": "https://m.media-amazon.com/images/I/61pzQJFZBAL._AC_SX679_.jpg",
    "price": 19
  }
]
/* NON SI SVUOTA, questa non serve, ma la tengo da parte */
// async function postProducts() {
//   try {
//     const richieste = productsArray.map(async post => 
//       await fetch(myURL, {
//         method:'POST',
//         headers: {
//           'Authorization': myToken,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(post)
//       })
//      .then(data => data.json())
//   );
//   console.log('richieste:', richieste); //promise
//     const prodotti = await Promise.all(richieste);
//     console.log('prodotti:', prodotti); //undefined
//   } catch(error) {
//     console.log(error);
//   }
// }
// postProducts();

getProducts();

async function getProducts() {
  console.log('[getProducts] STARTING');
  try {
    const resp = await fetch(myURL, {
      headers: {
        Authorization: myToken
      }
    });
    const products = await resp.json();

    console.log(products);
    fillPage(products); 

  } catch (error) {
    console.log(error);
  }
  console.log('[getProducts] DONE');
}


//un prodotto 
function createProductCard(prod){
  // console.log('[createProductCard] STARTING');

  const col = document.createElement('div');
  col.className = 'col-3 g-3';

  const card = document.createElement('div');
  card.className = 'card h-100 justify-content-between p-2'; 

  const cardImg = document.createElement('img');
  cardImg.src = prod.imageUrl; 
  cardImg.alt = prod.name; 
  cardImg.className = 'd-block w-100 h-100 imgPreview'; 

  const cardBody = document.createElement('div');
  cardBody.className = 'card-body mt-3 cardBodyStyle';

  const prodName = document.createElement('h5');
  prodName.innerText = prod.name;
  prodName.className = 'card-title fs-3'; 
  
  const prodDescr = document.createElement('p');
  prodDescr.innerText = prod.description; 
  prodDescr.className = 'card-text ellipsis fs-4';

  const prodPrice = document.createElement('p'); 
  prodPrice.innerText = `Price: ${prod.price}€`;
  prodPrice.className = 'card-text fw-bold fs-4';

  const goToDetails = document.createElement('a');
  goToDetails.href = `/details/details.html?id=${prod._id}`;
  goToDetails.innerText = 'Show more';


  cardBody.append(prodName, prodDescr, prodPrice, goToDetails);

  card.append(cardImg, cardBody);
  col.appendChild(card);

  // console.log('[createProductCard] DONE');
  return col; 
}
/** card structure
 <div class="card">
    <img src="___imageUrl___" class="card-img-top" alt="___name___">
    <div class="card-body">
      <h5 class="card-title">___name___</h5>
      <p class="card-text">___description___</p>
      <p class="card-text">___price___</p>
      <a href="/details?id=___id___" class="btn">Show more</a>
    </div>
  </div>
*/

function fillPage(products) {
  console.log('[fillPage] STARTING');
  productsRow.innerHTML = ''; 
  const productCards = products.map(prod => createProductCard(prod));

  productsRow.append(...productCards);
  console.log('[fillPage] DONE');
}

/** da mettere nella POST
"name": "",
"description": "",
"brand": "",
"imageUrl": "",
"price":
*/
// tutte le post qui sotto

