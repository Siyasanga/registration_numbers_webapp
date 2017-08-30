function radioSubmit(e) {
  console.log(window.location.origin);
  window.location = window.location.origin+"/"+event.srcElement.value;

}
