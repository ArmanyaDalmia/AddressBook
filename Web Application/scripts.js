(function (global) {
    var AddressBook = function (name, tel, email) {
      return new AddressBook.init(name, tel, email);
    };
  
    AddressBook.prototype = {
      //default functions
      data: [
        //add data here
      ],
      addNewContact: function (name, tel, email) {
        this.data.push({
          name: name,
          tel: tel,
          email: email
        });
        return this;
      },
      save: function () {
        //save to local storage. This isn't hugely necessary
      },
      returnAll: function () {
        return this.data;
      },
      displayData: function () {
        this.log(this.data);
        return this;
      },
      log: function (data) {
        console.log(data);
        return this;
      }
    };
  
    AddressBook.init = function (name, tel, email) {
      var self = this;
      //set up the address book
      if (name || tel || email) {
        self.addNewContact(name || "", tel || "", email || "");
      }
    };
  
    AddressBook.init.prototype = AddressBook.prototype;
  
    global.AddressBook = $ab = AddressBook;
  })(window);
  
  if (!window.contactList) {
    //check if we already have a contact list
    window.contactList = $ab();
  }
  
  var form = document.getElementById("contact");
  form.addEventListener("submit", function () {
    if (!window.contactList) {
      //check if we already have a contact list
      window.contactList = $ab(
        form.person.value,
        form.tel.value,
        form.email.value
      );
    } else {
      //saves new values rather than deleting old ones as well
      contactList.addNewContact(
        form.person.value,
        form.tel.value,
        form.email.value
      );
    }
  
    form.person.value = "";
    form.tel.value = "";
    form.email.value = "";
  
    event.preventDefault();
  });
  
  document.getElementById("js-show-all").addEventListener("click", function () {
    if (window.contactList) {
      //check if we already have a contact list
      document.getElementById("show-panel").innerHTML = "";
      var contacts = contactList.returnAll();
      console.log(contacts);
      if (contacts.length > 0) {
        for (var i = 0; i < contacts.length; i++) {
          document.getElementById("show-panel").innerHTML +=
            '<div class="contact-item">Name:' +
            contacts[i].name +
            "<br>Phone:" +
            contacts[i].tel +
            "<br>Email:" +
            contacts[i].email +
            "</div><hr>";
        }
      } else {
        document.getElementById("show-panel").innerHTML +=
          '<center>You have no contacts. Why not add  a few?</center><hr>';
      }
    }
    document.getElementById("show-panel").style.display = "block";
    document.getElementById("contact-panel").style.display = "none";
  });
  
  document.getElementById("js-add-new").addEventListener("click", function () {
    document.getElementById("show-panel").style.display = "none";
    document.getElementById("contact-panel").style.display = "block";
  });
  