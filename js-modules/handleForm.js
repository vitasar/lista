(function () {

  function handleForm(form, btn) {
    var name = form.getElementsByClassName("js-name"),
        email = form.getElementsByClassName("js-email"),
        phone = form.getElementsByClassName("js-phone"),
        field = form.getElementsByClassName("js-field"),
        close = form.getElementsByClassName("js-close");

    function validateEmail() {
      if (!isValidEmail(email[0].value) || !email[0].value.length) {
        email[0].classList.add("invalid");

        setTimeout(function () {
          email[0].classList.remove("invalid");
        }, 1000);

        return false;
      }
      return true;
    }

    function isValidEmail(email) {
      var pattern = new RegExp(/^[a-z0-9\+_-]+(\.[a-z0-9_\+-]+)*@[a-z0-9_-]+(\.[a-z0-9-]+)*\.[a-z]{2,}$/i);
      return ( pattern.test(email) );
    }

    function isValidName() {
      if (name[0].value.match(/[^a-zA-Zа-яА-ЯёЁ\s\-\.]/g) || name[0].value.replace(/[\s\-\.]+/g, "").length < 2 || name[0].value.match(/^[\s\-\.]+$/g)) {
        name[0].classList.add("invalid");

        setTimeout(function () {
          name[0].classList.remove("invalid");
        }, 1000);

        return false;
      }
      return true;
    }

    function typeVetoName() {
      if (name[0].value.match(/[^a-zA-Zа-яА-ЯёЁ\s\-\.]/g)) {
        var newValue = name[0].value.replace(/[^a-zA-Zа-яА-ЯёЁ\s\-\.]/g, "");
        name[0].value = newValue;
      }
    }

    // check with function to correctness.
    function isValidPhone() {
      if (phone[0].value.match(/[^0-9\+\s\-]/g) || phone[0].value.replace(/[\s\-\+]+/g, "").length > 11 || phone[0].value.replace(/[\s\-\+]+/g, "").length < 6 || phone[0].value.match(/^[\s\-\+]+$/g)) {
        phone[0].classList.add("invalid");

        setTimeout(function() {
          phone[0].classList.remove("invalid");
        },1000);

        return false;
      };
      return true;
    }

    function typeVetoPhone() {
      if (phone[0].value.match(/[^0-9\+\s\-]/g)) {
        var newValue = phone[0].value.replace(/[^0-9\+\s\-]/g, "");
        phone[0].value = newValue;
      }
    }

    // to make an attention to this function
    function isEmptyField() {
      if (!field.value.length) {
        field.classList.add("invalid");

        setTimeout(function () {
          field.classList.remove("invalid");
        }, 1000);

        return false;
      }
      return true;
    }

    function validateEverything() {
      if (field.length) {
        if (!isEmptyField()) {
          return false;
        }
      }

      if (name.length) {
        if (!isValidName()) {
          return false;
        }
      }

      if (email.length) {
        if (!validateEmail()) {
          return false;
        }
      }

      if (name.length) {
        if (!isValidPhone()) {
          return false;
        }
      }

      return true;
    }

    function ValidForm() {
      if (this.classList.contains("invalid")) {
        this.classList.remove("invalid")
        this.classList.add("valid");
      }

      if (this.classList.contains("valid")) {
        setTimeout(function () {
          this.classList.remove("valid");
        }, 1000);
      }

    }

    function submitForm(event) {
      if (!validateEverything()) {
        event.preventDefault();
        return false;
      };
    }

    if (field.length) {
      for (var i = field.length; i--;) {
        field[i].addEventListener("keyup", ValidForm);
        field[i].addEventListener("blur", isEmptyField);
      };
    }

    if (name.length) {
      name[0].addEventListener("blur", isValidName);
      name[0].addEventListener("keyup", ValidForm);
      name[0].addEventListener("keyup", typeVetoName);
    };

    if (phone.length) {
      phone[0].addEventListener("blur", isValidPhone);
      phone[0].addEventListener("keyup", ValidForm);
      phone[0].addEventListener("keyup", typeVetoPhone);
    }

    if (email.length) {
      email[0].addEventListener("blur", validateEmail);
      email[0].addEventListener("keyup", ValidForm);
    }

    if (close.length) {
      close[0].on("click", function(){
        //Todo
      })
    }

    form.addEventListener("submit", submitForm);
    if ("btn" in window) {
      btn.addEventListener("click", function () {
        // todo in vanilla js
        form.submit();
      });
    };

  }

  var form = document.getElementById("feedback");

  handleForm(form);

})();
