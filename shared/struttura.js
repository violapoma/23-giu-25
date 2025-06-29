console.log('linking struttura.js');
/**
 * **************** SPINNER E BOTTONE BACKOFFICE DISABILITATO ********************
 */
window.addEventListener('load', () => {
  // console.log('[SPINNER]')
  const spinner = document.getElementById('spinnerOverlay');
  spinner.classList.add('fade-out');
  setTimeout(() => {
    spinner.classList.add('d-none');
  }, 500);

  //disabilito il bottone finché non si logga l'admin
  backofficeBtn.classList.add('d-none');
  
  handleButtons();
});


/**
 * *************** PER TORNARE ALLA INDEX FACENDO CLICK SUL NOME DEL SITO ********
 */
function backHome() {
  console.log('[backHome]');
  window.location.href = '/index.html';
}

/**
 * ************** GESTIONE ADMIN LOGIN; USERNAME=admin, PASSWORD=admin *************
 */
const notLoggedIcon = '<i class="bi bi-person-badge"></i>';
const loggedIcon = '<i class="bi bi-box-arrow-right"></i>';

const logInBtn = document.querySelector('#logInBtn');
const backofficeBtn = document.querySelector('#goToBackoffice');
const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('pwField');
const usernameInput = document.getElementById('username');
const logInForm = document.querySelector('#loginForm');
const adminLogInModal = document.querySelector('#adminLogIn');

togglePassword.addEventListener('click', function () {
  const isPassword = passwordInput.type === 'password';
  //cambio il tipo dell'input per far vedere il testo o i pallini
  passwordInput.type = isPassword ? 'text' : 'password';
  //cambio icona 
  this.innerHTML = isPassword ? '<i class="bi bi-eye-slash"></i>' : '<i class="bi bi-eye"></i>';
});

//logIn
adminLogInModal.addEventListener('shown.bs.modal', function () {
  console.log('[handling logIn]');
  console.log('login Form',logInForm);
  logInForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    if (!logInForm.checkValidity()) { //campi non pieni    
      evt.stopPropagation();
    } else { //controllo se i campi sono corretti
      usernameInput.classList.remove('is-invalid');
      passwordInput.classList.remove('is-invalid');
      const alertLI = document.querySelector('#alertLogIn');

      if (usernameInput.value === 'admin' && passwordInput.value === 'admin') {
        sessionStorage.setItem('adminLogged', JSON.stringify(true));        
        alertLI.classList.add('alert-success','show');
        alertLI.innerText = 'Now logged in as ADMIN';
        setTimeout(() => {
          alertLI.classList.remove('alert-success','show');
          const modalInstance = bootstrap.Modal.getInstance(adminLogIn);
          modalInstance.hide();
        }, 1000);

        handleButtons();
        logInForm.classList.add('was-validated');

      } else { //campi sbagliati
        alertLI.classList.add('alert-danger', 'show');
        alertLI.innerText = 'Error';
        if (usernameInput.value !== 'admin') {
          usernameInput.classList.add('is-invalid');
        }
        if (passwordInput.value !== 'admin') {
          passwordInput.classList.add('is-invalid');
        }
      }
    }
  });
  console.log('[handling logIn] DONE');
}, {once:true});

//logOut
function logOut(){
  console.log('[handling logOut]');
  sessionStorage.setItem('adminLogged', JSON.stringify(false));
  backofficeBtn.classList.add('d-none');
  window.location.href='/index.html'; //torna alla index dovunque sia
  logInBtn.removeEventListener('click', logOut);
  
  handleButtons();
  console.log('[handling logOut] DONE');
}

function handleButtons(){
  const isLogged = JSON.parse(sessionStorage.getItem('adminLogged'));
  console.log('isLogged', isLogged, 'typeof', typeof isLogged);
  if (isLogged) {
    backofficeBtn.classList.remove('d-none');
    logInBtn.removeAttribute('data-bs-toggle');
    logInBtn.innerHTML = loggedIcon;
    logInBtn.addEventListener('click', logOut);
  } else  {
    backofficeBtn.classList.add('d-none');
    logInBtn.setAttribute('data-bs-toggle', 'modal');
    logInBtn.innerHTML = notLoggedIcon;
  }
}

