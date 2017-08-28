function radioSubmit(e) {
  console.log(event.srcElement.value);
  window.location = "http://localhost:3000/"+event.srcElement.value;

}
