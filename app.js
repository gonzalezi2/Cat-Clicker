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
    changeCat: function(cat) {

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
        model.cats.forEach(function(cat) {
          var newCat = controller.createCatTemplate(cat, function() {
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

        this.adminButton.addEventListener('click', views.admin.toggleVisibility.bind(this));
        this.formValue.addEventListener('submit', function(event) {
          event.preventDefault();
          var name = event.target.elements.name.value;
          var url = event.target.elements.url.value;
          var clicks = event.target.elements.clicks.value;
        });
      },
      toggleVisibility: function() {
        this.adminPanel.classList.toggle("hidden");
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