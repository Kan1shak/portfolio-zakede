let absUrl = window.location.href.split('/');
absUrl.shift();
absUrl.shift();
absUrl.shift();
absUrl = absUrl.join('/');
document.querySelector('#redirectfld').attributes[3].value = absUrl;