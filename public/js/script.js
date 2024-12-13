(function () {
  'use strict';

  // Fetch all forms with the 'needs-validation' class
  var forms = document.querySelectorAll('.needs-validation');

  // Loop through each form
  Array.prototype.slice.call(forms).forEach(function (form) {
      form.addEventListener('submit', function (event) {
          // Prevent submission if form is invalid
          if (!form.checkValidity()) {
              event.preventDefault();
              event.stopPropagation();
          }

          // Add Bootstrap validation classes
          form.classList.add('was-validated');
      }, false);
  });
})();
