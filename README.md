# Compito di fine modulo
## IMPORTANTE:
Per accedere alla parte backoffice serve un identificativo, sono già inseriti per comodità. Comunque username = admin, password = admin
## STRUTTURA CARTELLE
- shared\
  Contiene il css e lo script condiviso tra tutti i file.\
  \
  <ins>**struttura.js contiene**</ins>
  - spinner
  - click sul nome del sito per tornare alla index
  - gestione dei bottoni in base al logIn
  - gestione logIn / logOut
  
  <ins>**struttura.css contiene**</ins>
  - le variabili per il colore di testi e sfondi
  - tutte le classi in comune, comprese quelle sovrascritte di bootstrap
  
- index\
  Contiene il css e il js della pagina index, che invece rimane fuori da tutte le cartelle.\
  Dalla pagina index si può accedere solo alla pagina di dettaglio di un prodotto se non si è loggati come admin.
- backoffice\
  Contiene l'html, il css e il js della pagina backoffice.\
  Da backoffice.html l'admin può gestire i prodotti.\
  Per la pagina di modifica ho riciclato la pagina di dettaglio, passando un paramtro in più `edit=on` per gestire poi la funzione di rendering della pagina (vedi poi).
- details\
  Contiene l'html, il css e il js della pagina di dettaglio del prodotto.\
  Tramite il parametro `edit=on` la pagina si apre in modalià edit, quindi un nuvoo form per modificare il prodotto corrente.\
  Se il paramentro non è presente, viene invedce renderizzata la pagina completa. Rispetto alla versione edit, è presente un banner puramente riempitivo, che dice che il prodotto è disponibile, e una colonna che fa vedere al massimo altri tre prodotti dello stesso brand, escluso quello corrente; se il prodotto è l'unico di quel brand, viene mostrato il messaggio 'More coming soon. 
## LOGIN
L'ho gestito con sessionStorage tramite il parametro `adminLogged`.\
Una volta loggato, l'amministratore può accedere al backoffice tramite apposito tasto, che compare solo se appunto si è loggato.
