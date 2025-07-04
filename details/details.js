const queryParams = new URLSearchParams(window.location.search);
const id = queryParams.get('id');
const editMode = queryParams.get('edit');
console.log('editMode:', editMode);
const myURL = `https://striveschool-api.herokuapp.com/api/product/${id}`; //aggiornato all'elemento 
const baseURL = 'https://striveschool-api.herokuapp.com/api/product/';
const myToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODVhOThmNDRlZjFiYzAwMTVkZjViMDciLCJpYXQiOjE3NTA3Njc4NjEsImV4cCI6MTc1MTk3NzQ2MX0.TAAwRbaWxFOxRudgBvko5842qwiC8LUg6ypoF-H5sD4';
const row = document.querySelector('#contentRow');

getProductDetails();

async function getProductDetails() {
  const resp = await fetch(myURL,
    {
      headers: {
        'Authorization': myToken
      }
    });
  const product = await resp.json();

  console.log(product);
  const prevPage = editMode ? 'Backoffice' : 'Home';
  setBreadcrumb(product.name, prevPage);
  
  if (editMode) 
    editProduct(product) 
  else {
  renderProduct(product);
  getMoreFromBrand(product.brand);
  }
}

function setBreadcrumb(pName, prevPage) {
  const prevPageEle = document.createElement('li');
  prevPageEle.className = 'breadcrumb-item';
  const linkToPrev = document.createElement('a');
  linkToPrev.href = editMode ? '/backoffice/backoffice.html' : '/index.html';
  linkToPrev.innerText = prevPage;
  prevPageEle.appendChild(linkToPrev);

  const currentPage = document.createElement('li');
  currentPage.className = 'breadcrumb-item active';
  currentPage.setAttribute('aria-current', 'page');
  currentPage.innerText = pName;
  document.querySelector('.breadcrumb').append(prevPageEle, currentPage);
}

function renderProduct(prod) {
  //IMG COL
  const imgCol = document.createElement('div');
  imgCol.className = 'col-sm-12 col-md-4 mb-sm-3 d-flex justify-content-center align-items-center';

  const prodImg = document.createElement('img');
  prodImg.src = prod.imageUrl;
  prodImg.alt = prod.name;
  prodImg.className = 'imgPreview img-fluid rounded';
  imgCol.appendChild(prodImg);

  //  INFO COL
  const infoCol = document.createElement('div');
  infoCol.className = 'col-sm-12 col-md-5 d-flex flex-column justify-content-center py-3 infoCol rounded';

  const bannerWrapper = document.createElement('div');
  bannerWrapper.className = 'd-sm-none d-lg-flex justify-content-end';
  const banner = document.createElement('div');
  banner.className = 'w-25 text-center fs-4 banner';
  banner.innerText = 'AVAILABLE';
  bannerWrapper.appendChild(banner);

  const prodName = document.createElement('h1');
  prodName.innerText = prod.name;
  prodName.className = 'fw-bold primaryTextColor';

  const brandName = document.createElement('h4');
  brandName.innerText = prod.brand;
  brandName.className = 'mb-4 secondaryTextColor';

  const prodDescr = document.createElement('p');
  prodDescr.innerText = prod.description;
  prodDescr.className = 'fs-3 productFont pDescr secondaryTextColor overflow-y-scroll';

  const price = document.createElement('p');
  price.innerText = `Price: ${prod.price}€`;
  price.className = 'fs-4 fw-semibold primaryTextColor'

  infoCol.append(bannerWrapper, prodName, brandName, prodDescr, price);

  row.append(imgCol, infoCol);
}

function editProduct(prod) {

  const form = document.createElement('form');
  form.className = 'row mt-5';
  form.id = 'updateForm';

  //da mettere input url e div con anteprima immagine
  const imgCol = document.createElement('div');
  imgCol.className = 'col-5 px-5';

  const imgLabel = document.createElement('label');
  imgLabel.for = 'imgInput';
  imgLabel.innerText = 'Image URL';
  imgLabel.className = 'form-label'

  const imgInput = document.createElement('input');
  imgInput.type = 'text';
  imgInput.id = 'imgInput';
  imgInput.className = 'form-control mb-4 toCheck';
  imgInput.placeholder = prod.imageUrl;
  //imgInput.value strigna vuota!!!
  //console.log('igmvalue: ',typeof imgInput.value);

  const prodImg = document.createElement('img');
  prodImg.src = prod.imageUrl;
  prodImg.alt = prod.name;
  prodImg.className = 'img-fluid rounded';

  imgInput.addEventListener('blur', () => {
    const newURL = imgInput.value.trim();
    if (newURL) {
      prodImg.src = newURL;
    }
  });

  imgCol.append(imgLabel, imgInput, prodImg);

  //da mettere gli altri input
  const infoCol = document.createElement('div');
  infoCol.className = 'col-6 d-flex flex-column justify-content-center';

  const prodName = document.createElement('input');
  prodName.type = 'text';
  prodName.id = 'pName';
  prodName.className = 'fs-1 fw-bold form-control mb-2 toCheck';
  prodName.placeholder = prod.name;

  const brandName = document.createElement('input');
  brandName.type = 'text';
  brandName.id = 'pBrand';
  brandName.placeholder = prod.brand;
  brandName.className = 'form-control fs-4 mb-4 toCheck';

  // const prodDescr = document.createElement('input');
  // prodDescr.type = 'text';
  const prodDescr = document.createElement('textarea');
  prodDescr.rows = '4';
  prodDescr.id = 'pDescr';
  prodDescr.placeholder = prod.description;
  prodDescr.className = 'form-control fs-3 productFont mb-4 toCheck'

  const priceDiv = document.createElement('div');
  priceDiv.className = 'fs-4 fw-semibold mb-4';

  const priceLabel = document.createElement('label');
  priceLabel.htmlFor = 'pPrice';
  priceLabel.innerText = 'Price: ';
  priceLabel.className = 'fs-4';

  const priceInput = document.createElement('input');
  priceInput.type = 'number';
  priceInput.min = '1';
  priceInput.id = 'pPrice';
  priceInput.className = 'form-control ms-2 d-inline w-25 fs-4 toCheck'
  priceInput.placeholder = `${prod.price}€`;

  priceDiv.append(priceLabel, priceInput);

  const btnAndAlert = document.createElement('div');
  btnAndAlert.className = 'row g-1 align-items-center';

  const colBtn = document.createElement('div');
  colBtn.className = 'col-3';
  const updateBtn = document.createElement('button');
  updateBtn.type = 'submit';
  updateBtn.innerText = 'UPDATE';
  updateBtn.className = 'btn fs-4';
  colBtn.append(updateBtn);

  const colAlert = document.createElement('div');
  colAlert.className = 'col-9';
  const alertMsg = document.createElement('div');
  alertMsg.id = 'updateAlert';
  alertMsg.className = 'alert text-center fs-4 fade';
  alertMsg.role = 'alert';
  alertMsg.innerText = 'prova';
  colAlert.append(alertMsg);

  btnAndAlert.append(colBtn, colAlert);

  infoCol.append(prodName, brandName, prodDescr, priceDiv, btnAndAlert);

  form.append(imgCol, infoCol);

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    updateItem(prod);
  });

  row.append(form);
}


async function updateItem(item) {
  //console.log('[updateItem]: Starting...');
  const prodImgURL = document.querySelector('#imgInput');
  const prodName = document.querySelector('#pName');
  const prodBrand = document.querySelector('#pBrand');
  const prodDescr = document.querySelector('#pDescr');
  const prodPrice = document.querySelector('#pPrice');

  //variabile wrapper per gestire l'alert
  let changedFields = false;
  document.querySelectorAll('.toCheck').forEach(field => {
    console.log('field:', field, field.value);
    if (field.value !== '') {
      changedFields = true;
      return;
    }
  });

  const updatedItem = { //oggetto per la put
    name: prodName.value === '' ? item.name : prodName.value,
    description: prodDescr.value === '' ? item.description : prodDescr.value,
    brand: prodBrand.value === '' ? item.brand : prodBrand.value,
    imageUrl: prodImgURL.value === '' ? item.imageUrl : prodImgURL.value,
    price: prodPrice.value === '' ? item.price : prodPrice.value
  }

  for (const key in updatedItem) {
    if (updatedItem.hasOwnProperty(key)) { //le sue, non quelle del prototype
      console.log(key, updatedItem[key]);
    }
  }

  try {
    const res = await fetch(myURL, {
      method: 'PUT',
      headers: {
        Authorization: myToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedItem)
    });
  } catch (error) {
    console.log(error);
  }
  console.log('[updateItem]: changedFields dopo la PUT:', changedFields);
  const alert = document.querySelector('#updateAlert');
  alert.classList.add('show');
  if (changedFields) {
    alert.classList.add('alert-success');
    alert.innerText = 'Item updated successfully!'
  } else {
    alert.classList.add('alert-info');
    alert.innerText = 'Nothing changed';
  }
  const operationOutcome = setTimeout(() => {
    if (alert.classList.contains('alert-success')) {
      alert.classList.remove('alert-success');
    }
    if (alert.classList.contains('alert-info')) {
      alert.classList.remove('alert-info');
    }
    window.location = '/backoffice/backoffice.html';
    alert.classList.remove('show');
  }, 2000);
}


function renderMoreFromBrand(sameBrand){
  const sameWithout = sameBrand.filter((elem)=>elem._id!==id);
  const maxLength = Math.max(sameBrand.length, 3); //metto al massimo tre elementi
  const sliced = sameWithout.slice(0, maxLength); 

  const mappedElems = sliced.map(elem => renderElementBrand(elem));

  const wrapper = document.createElement('div');
  wrapper.className = 'col-sm-12 col-md-2 cardBg moreWrapper mx-2 rounded py-1';

  const cardContainer = document.createElement('div');
  cardContainer.className = 'moreCardCont';

  const title = document.createElement('h2');
  title.className = 'moreTitle cardBg text-center';
  title.innerText = 'More from the same brand';

  cardContainer.append(title, ...mappedElems);
  wrapper.appendChild(cardContainer);
  row.append(wrapper);
}

function renderElementBrand(elem) {
  const card = document.createElement('div');
  card.className ='card text-center';

  const imgLink = document.createElement('a');
  imgLink.href = `/details/details.html?id=${elem._id}`; 
  console.log(imgLink.href);

  const img = document.createElement('img');
  img.className = 'card-img-top moreCardImg';
  img.src=elem.imageUrl;
  img.alt=elem.name;
  
  imgLink.append(img);

  const cardBody = document.createElement('div');
  cardBody.className = 'card-body cardBodyStyle';

  const prodName = document.createElement('h2');
  prodName.innerText = elem.name;
  prodName.className = 'card-title fs-4';
  
  const prodPrice = document.createElement('p'); 
  prodPrice.innerText = `Price: ${elem.price}€`;
  prodPrice.className = 'card-text fw-bold fs-4';

  cardBody.append(prodName, prodPrice);

  card.append(imgLink, cardBody);

  return card;
}

async function getMoreFromBrand(brand){
  try{
    const resp = await fetch(baseURL, {
      headers: {
        Authorization: myToken
      }
    });
    const prods = await resp.json();
    console.log('prods dentro getMore', prods);

    //array lungo almeno 1, cioè c'è solo quel prodotto
    const sameBrand = prods.filter((prod) => prod.brand === brand);
    console.log('sameBrand', sameBrand);
  
    if (sameBrand.length > 1) //1 == c'è solo quel prodotto -> niente
      renderMoreFromBrand(sameBrand);
    else 
      fillTheGap();
  } catch (error) {
    console.log(error);
  }
}

function fillTheGap(){
  const wrapper = document.createElement('div');
  wrapper.className = 'col-sm-12 col-md-2 moreWrapper mx-2 rounded py-1 fillTheGap d-flex align-items-center';
  wrapper.innerText = 'More content soon';
 
  row.append(wrapper);
}
