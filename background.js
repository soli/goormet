function myLoad() {
   chrome.contextMenus.create(
         {
            'title': 'Insert SpamGourmet address',
            'contexts': ['editable'],
            'onclick': doSG
         }
   );
};
function doSG(info, tab) {
   var user = localStorage['user'];
   if (user == undefined || user == '') {
      chrome.tabs.create({'url': 'options.html'});
      return;
   }
   var domain = localStorage['domain'];
   if (domain == undefined) {
      domain = 'spamgourmet.com';
   }
   var prefix = localStorage['prefix'];
   if (prefix == undefined || prefix == '') {
      prefix = '';
   } else {
      prefix += '.';
   }
   var num = localStorage['num'];
   if (num == undefined || num == '0') {
      num = '';
   } else {
      num += '.';
   }
   var word;
   var site = info.pageUrl.split('/', 3)[2].split('.');
   switch (localStorage['word']) {
      case 'site':
         word = site.join('');
         break;
      case 'random':
         var chars = new Array(8);
         var a = "a".charCodeAt(0);
         for (var i=0; i<8; ++i) {
            chars[i] = String.fromCharCode(
                  Math.floor(Math.random()*26) + a);
         }
         word = chars.join('');
         break;
      case 'aword':
         word = words[Math.floor(Math.random()*words.length)];
         break;
      default:
         //word = site[site.length - 2];
         word = site.join('-').replace(/^(www-)?(.*?)(-[A-z0-9]{2,3})?(-[A-z0-9]{2,3})$/ig,'$2');
   }
   var email = prefix + word +
      "." + num + user + '@' + domain;
   if (localStorage['copy'] !== 'false') {
      myDiv = document.getElementById('myDiv')
      myDiv.innerHTML = email;
      var range = document.createRange();
      range.selectNodeContents(myDiv);
      var selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      document.execCommand('copy', false, '');
   }
   chrome.tabs.executeScript(
         null,
         {
            'allFrames': true,
            'code': "document.execCommand('insertHTML', false, '" +
               email + "');"
         }
      );
};
document.addEventListener('DOMContentLoaded', myLoad);
