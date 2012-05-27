//      margin: 0px auto;
//      opacity: 0;
// Saves options to localStorage.
function save_options() {
   localStorage['user'] = document.getElementById('user').value;

   localStorage['prefix'] = document.getElementById('prefix').value;

   localStorage['copy'] = document.getElementById('copy').checked;

   localStorage['num'] = document.getElementById('num').selectedIndex;

   var domain = document.getElementById('domain');
   localStorage['domain'] = domain.options[domain.selectedIndex].value;

   var words = document.getElementById('form').word;
   for (var i=words.length-1 ; i >= 0 ; i--) {
      if (words[i].checked) {
         localStorage['word'] = words[i].value;
      }
   }

   // Update status to let user know options were saved.
   var stat = document.getElementById('status');
   stat.style.left = -80;
   setTimeout(
      function() {
         stat.style.left = -200;
      }, 2000);
}

// Restores select box state to saved value from localStorage.
function restore_options() {
   var user = document.getElementById('user');
   user.value = localStorage['user'] || '';
   user.focus();
   document.getElementById('prefix').value = localStorage['prefix'] || '';
   document.getElementById('num').selectedIndex =
      parseInt(localStorage['num']) || 0;
   var domain = document.getElementById('domain');
   var i = domain.options.length - 1;
   while (i >= 0 && domain.options[i].value != localStorage['domain'])
      i--;
   if (i < 0)
      i = 0;
   domain.selectedIndex = i;

   var words = document.getElementById('form').word;
   if (localStorage['word'] == undefined) {
      localStorage['word'] = 'site';
   }
   for (var i=words.length-1 ; i >= 0 ; i--) {
      if (localStorage['word'] == words[i].value) {
         words[i].checked = 1;
      }
   }

   document.getElementById('copy').checked =
      (localStorage['copy'] !== 'false');
}
document.addEventListener('DOMContentLoaded', function () {
   restore_options();
   document.getElementById('user').addEventListener('change', save_options);
   document.getElementById('prefix').addEventListener('change', save_options);
   document.getElementById('num').addEventListener('change', save_options);
   document.getElementById('domain').addEventListener('change', save_options);
   document.getElementById('copy').addEventListener('change', save_options);
   document.getElementById('site').addEventListener('change', save_options);
   document.getElementById('dom').addEventListener('change', save_options);
   document.getElementById('random').addEventListener('change', save_options);
   document.getElementById('aword').addEventListener('change', save_options);
});
