(function(){
  'use strict';
  // Cats Model to hold the list of cats and
  // the selected cat to click on
  var model = {
    cats: [
        {
          id: 0,
          name: "Romulus",
          description: "A cuddly cat",
          url: "./romulus.jpg",
          clicks: 0
        },
        {
          id: 1,
          name: "Remus",
          description: "A fierce cat",
          url: "./remus.jpg",
          clicks: 0
        },
        {
          id: 2,
          name: "Brutus",
          description: "He's very brutal and not very loyal",
          url: "./brutus.jpg",
          clicks: 0
        },
        {
          id: 3,
          name: "Caesar",
          description: "A leader of cats",
          url: "./caesar.jpg",
          clicks: 0
        },
        {
          id: 4,
          name: "Octavian",
          description: "The people's cat",
          url: "./octavian.jpg",
          clicks: 0
        }
      ],
    selectedCat: {}
  };
  
  var controller = {
    selectCat: function(cat) {
      if(model.selectedCat !== cat) {
        model.selectedCat = cat;
        var clickedCat = this.createCatTemplate(cat, function(){
          cat.clicks++;
        });
        // selectedCat.append(clickedCat);
        views.clickArea.render();
      }
    },
    updateCat: function(cat) {
      model.cats.forEach(function(currCat){
        if(model.selectedCat.id === currCat.id) {
          model.selectedCat.name = currCat.name = cat.name;
          model.selectedCat.url = currCat.url = cat.url;
          model.selectedCat.clicks = currCat.clicks = cat.clicks;
        }
      });
      views.clickArea.render();
      // views.clickArea.update(model.selectedCat);
      views.list.render();
    },
    createCatTemplate: function(cat, eventListener) {
      // Create Div to put image and counter in
      var div = document.createElement("div");

      // Add class to change CSS styles
      div.classList.add("image");

      // Create text for cat name and number of clicks
      var header = document.createElement("h2");
      header.classList.add("cat-header-" + cat.id);
      header.innerText = this.createImageHeader(cat);

      var image = this.createImage(cat);

      // Append header and image elements to div
      div.appendChild(header);
      div.appendChild(image);

      // Add Event listener to image
      image.addEventListener("click", eventListener);

      return div;
    },
    createImage: function(cat) {
      // Create Image element with id and other attributes
      var image = document.createElement("img");
      // image.id = "cat-" + cat.id;
      image.src = cat.url;
      image.alt = cat.description;
      return image;
    },
    createImageHeader: function(cat) {
      return cat.name + " - " + cat.clicks + " clicks";
    },
    clearForm: function() {
      views.admin.adminForm.elements.name.value = '';
      views.admin.adminForm.elements.url.value = '';
      views.admin.adminForm.elements.clicks.value = '';
    },
    toggleVisibility: function() {
      views.admin.adminPanel.classList.toggle("hidden");
    },
    editCat: function() {
      views.admin.adminForm.elements.name.value = model.selectedCat.name;
      views.admin.adminForm.elements.url.value = model.selectedCat.url;
      views.admin.adminForm.elements.clicks.value = model.selectedCat.clicks;
      controller.toggleVisibility();
    },
    init: function() {
      views.init();
    }
  };

  var views = {
    list: {
      init: function() {
        this.catList = document.getElementById("cat-list");
        this.render();
      },
      render: function() {
        var that = this;
        while(that.catList.lastChild) {
          that.catList.removeChild(that.catList.lastChild);
        }
        model.cats.forEach(function(cat) {
          var newCat = controller.createCatTemplate(cat, function() {
            if (Object.keys(model.selectedCat).length === 0) {
              views.admin.adminButton.classList.remove('hidden');
            }
            controller.selectCat(cat);
          });

          // Add to HTML
          that.catList.appendChild(newCat);
        });
      }
    },
    clickArea: {
      init: function() {
        this.catContainer = document.getElementById("selected-cat");
        this.render();
      },
      render: function() {
        // Render the selectedCat
        if (Object.keys(model.selectedCat).length !== 0) {
          var selectedCatHtml = controller.createCatTemplate(model.selectedCat, function(){
            model.selectedCat.clicks++;
            views.clickArea.update(model.selectedCat);
          });
          while(this.catContainer.lastChild) {
            this.catContainer.removeChild(this.catContainer.lastChild);
          }
          this.catContainer.appendChild(selectedCatHtml);
        }
      },
      update: function(cat) {
        var catHeadersToUpdate = document.getElementsByClassName("cat-header-" + cat.id);
        var header = controller.createImageHeader(cat);
        for(var i = 0; i < catHeadersToUpdate.length; i++) {
          catHeadersToUpdate[i].innerText = header;
        }
      }
    },
    admin: {
      init: function() {
        this.formValue = document.getElementById("admin-form");
        this.adminPanel = document.getElementById("admin-panel");
        this.adminButton = document.getElementById("admin-button");
        this.cancelButton = document.getElementById("cancel-button");
        this.adminForm = document.getElementById("admin-form");

        this.adminButton.addEventListener('click', function(){
          controller.editCat();
        });
        this.cancelButton.addEventListener('click', function(){
          controller.clearForm();
          controller.toggleVisibility();
        });
        this.formValue.addEventListener('submit', function(event) {
          event.preventDefault();
          var newCat = {
            name: event.target.elements.name.value,
            url: event.target.elements.url.value,
            clicks: event.target.elements.clicks.value
          };
          controller.updateCat(newCat);
          controller.clearForm();
          controller.toggleVisibility();
        });
      }
    },
    init: function() {
      this.clickArea.init();
      this.list.init();
      this.admin.init();
    }
  };
  
  controller.init();
})();