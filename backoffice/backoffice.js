const myURL = 'https://striveschool-api.herokuapp.com/api/product/';
const myToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODVhOThmNDRlZjFiYzAwMTVkZjViMDciLCJpYXQiOjE3NTA3Njc4NjEsImV4cCI6MTc1MTk3NzQ2MX0.TAAwRbaWxFOxRudgBvko5842qwiC8LUg6ypoF-H5sD4';

const tBody = document.querySelector('tbody');
const [prodName, prodBrand, prodPrice, prodDescr, prodImgURL] = document.querySelectorAll('.product-field');
const addProductform = document.querySelector('#addProductForm');

///////////////////// EVENT LISTENERS /////////////////
addProductform.addEventListener('submit', evt => {
  if (!addProductform.checkValidity()) {
    evt.preventDefault();
    evt.stopPropagation();
  } else {
    // Se valido, procedi con aggiunta
    evt.preventDefault();
    addProduct();
    fetchProducts();
    document.querySelector('#addFormAlert').classList.add('show');
    const operationOutcome = setTimeout(() => {
      document.querySelectorAll('input').forEach(field => field.value = '');
      document.querySelector('#addFormAlert').classList.remove('show');
      document.querySelector('#formDiv').classList.remove('show');
      addProductform.reset();
      addProductform.classList.remove('was-validated');
    }, 2000);
  }
  addProductform.classList.add('was-validated');
}, false);

document.querySelector('#deleteModalBtn').addEventListener('click', () => {
  const idToDelete = document.querySelector('#deleteModalBtn').getAttribute('data-id');
  removeItem(idToDelete);
});


fetchProducts();

///////////////////// FUNZIONI ////////////////////////
//fetch prodotti e riempimento tabella
async function fetchProducts() {
  try {
    const resp = await fetch(myURL, {
      headers: {
        Authorization: myToken
      }
    });
    const products = await resp.json();

    console.log('[fetchProducts]: prodotti:', products);
    fillTable(products);
  } catch (error) {
    console.log(error);
  }
}

//ret una riga
function createTableRow(prod) {
  const row = document.createElement('tr');

  const tdImage = document.createElement('td');
  tdImage.className = 'truncate truncate-sm';
  tdImage.innerText = prod.imageUrl;

  const tdName = document.createElement('td');
  tdName.innerText = prod.name;

  const tdBrandName = document.createElement('td');
  tdBrandName.innerText = prod.brand;

  const tdPrice = document.createElement('td');
  tdPrice.innerText = prod.price;

  /**
   * l'idea per editBtn è:
   * manda sulla pagina del prodotto selezionato già in modalità modifica, quindi nella stringa poi passa un parametro edit=on e da li modifica la pagina con la sua struttura originale
   */
  const tdAction = document.createElement('td');
  const editBtn = document.createElement('a');
  editBtn.innerHTML = '<i class="bi bi-pencil-square"></i>';
  editBtn.className = 'btn';
  editBtn.href = `/details/details.html?id=${prod._id}&edit=on`;
  const deleteBtn = document.createElement('button');
  deleteBtn.innerHTML = '<i class="bi bi-trash"></i>';
  deleteBtn.className = 'btn';
  deleteBtn.setAttribute('data-bs-toggle', 'modal');
  deleteBtn.setAttribute('data-bs-target', '#deleteModal');
  //passo l'id dell'elemento delezionato al bottone della modale
  deleteBtn.addEventListener('click', () => {
    const deleteModalBtn = document.querySelector('#deleteModalBtn');
    deleteModalBtn.removeAttribute('data-id');
    deleteModalBtn.setAttribute('data-id', prod._id);
    deleteModalBtn.setAttribute('data-bs-dismiss', 'modal');
  });
  tdAction.append(editBtn, deleteBtn);

  row.append(tdName, tdImage, tdBrandName, tdPrice, tdAction);
  return row;
}

function fillTable(products) {
  tBody.innerHTML = '';

  const mappedRows = products.map(prod => createTableRow(prod));
  tBody.append(...mappedRows);
}

//aggiungi prodotto
async function addProduct() {
  console.log('[addProduct]: STARTING....');

  //pieno per forza (validazione HTML)
  const payload = { //oggetto per la post
    name: prodName.value,
    description: prodDescr.value,
    brand: prodBrand.value,
    imageUrl: prodImgURL.value,
    price: prodPrice.value
  }

  console.log('[addProduct]:payload: ', payload);

  try {
    const resp = await fetch(myURL, {
      method: 'POST',
      headers: {
        Authorization: myToken,
        'Content-Type': 'application/json' //il dash spezza il nome della porpr, vanno messi ''
      },
      body: JSON.stringify(payload)
    });
    const product = await resp.json();

    console.log('[addProduct]:aggiunto:', product);
    fetchProducts();
  } catch (error) {
    console.log(error);
  }

}

//questa la lancio dalla modale di conferma
async function removeItem(id) {
  try {
    const resp = await fetch(myURL + id, {
      method: 'DELETE',
      headers: {
        Authorization: myToken
      },
    });
    fetchProducts();
  } catch (error) {
    console.log(error);
  }
}

