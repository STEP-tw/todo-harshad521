const displayWelcomeNote = function() {
  let name = this.responseText;
  document.getElementById("welcomeNote").innerText = `Welcome ${name}`;
}
const getUser = function(){
  xmlReq = new XMLHttpRequest();
  xmlReq.addEventListener('load',displayWelcomeNote);
  xmlReq.open("GET",'userName');
  xmlReq.send();
}



window.onload = getUser;
