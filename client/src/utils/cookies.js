
function setCookie(name, value, hours){
	if(typeof hours !== 'number'){ hours = 1 }
	let date = new Date(new Date().getTime() + hours * 60 * 60 * 1000);
	document.cookie = name + "=" + value + '; path=/; expires=' + date.toUTCString();
}

function getCookie(name){
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : null;
}

function deleteCookie(name) {
  setCookie(name, "", {
    expires: -1
  })
}

export { setCookie, getCookie, deleteCookie }