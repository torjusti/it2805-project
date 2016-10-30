/* Wait until the DOM has finished loading.*/
document.addEventListener('DOMContentLoaded', function() {
  ajax({
    path: 'assets/data.json',

    success: function(responseText) {
      // Parse JSON data.
      let gabionData = JSON.parse(responseText);

      // Fetch elements from the DOM.
      const tabs = document.getElementsByClassName('tab');
      const tabContainers = document.getElementsByClassName('item-container');

      // Render data.
      for (var i = 0; i < gabionData.article_item.length; i++) {
        tabs[i].innerText = gabionData.article_item[i].name;
        var size = document.createElement("div");
        var weight = document.createElement("div");
        var price = document.createElement("div");
        size.className = "size";
        weight.className = "weight";
        price.className = "price";
        var sizeText = document.createTextNode(gabionData.article_item[i].size.join(' x '));
        var weightText = document.createTextNode(gabionData.article_item[i].weight);
        var priceText = document.createTextNode(gabionData.article_item[i].price);
        size.appendChild(sizeText);
        weight.appendChild(weightText);
        price.appendChild(priceText);
        tabContainers[i].childNodes[1].appendChild(size);
        tabContainers[i].childNodes[1].appendChild(weight);
        tabContainers[i].childNodes[1].appendChild(price);
      }

      /**
       * -----------------
       * Tab functionality
       * -----------------
       */
       const chooseProduct = document.getElementById('choose-product');
       const productsTab = document.getElementById('tabs');
      // Show the first tab by default. Ensure it has the clicked-tab-styling.
      tabContainers[0].style.display = 'flex';
      tabContainers[0].classList.add('active-tab');
      tabs[0].classList.add('active-tab');

      // Loop through all tabs.
      for (let i = 0; i < tabs.length; i++) {
       tabs[i].addEventListener('click', function(e) {
         // Find out the tab code of the clicked tab.
         let tabKey = e.target.getAttribute('data-tab');

         let activeTabs = document.getElementsByClassName('active-tab');

         for (let j = 0; j < activeTabs.length; j++) {
           activeTabs[j].classList.remove('active-tab');
         }

         e.target.classList.add('active-tab');

         // Loop through all tabs.
         for (let j = 0; j < tabContainers.length; j++) {
           let currentTabContainer = tabContainers[j];
           // If this tab has the same code as the new current tab show it, if not, hide it.
           if (currentTabContainer.getAttribute('data-tab') === tabKey) {
             currentTabContainer.style.display = 'flex';
             productsTab.className = 'tabs-out';
             currentTabContainer.classList.add('active-tab');
           } else {
             currentTabContainer.style.display = 'none';
           }
         }
       });
      }



      chooseProduct.addEventListener('click', function(e) {

        if (productsTab.style.display === 'none' || !productsTab.style.display) {
          productsTab.className = 'tabs-in';
        } else {
          productsTab.className = 'tabs-out';
        }
      });


      /* ---------------------------
       * Shopping cart functionality
       * ---------------------------
       */

      // Fetch elements from the DOM.
      const cartValueNodes = document.getElementsByClassName('cart-val');
      const cartResults = document.getElementById('cart-results');
      const cartContainer = document.getElementById('cart-container');

      /**
       * Only the tab container stores the tab number. This method
       * exists because we often want to find the tab number from
       * a child element such as a button. This method travels
       * up the DOM tree searching for the tab number and returns it.
       * @param {Node} elem The element to start searching from.
       * @returns {number} The containing tab key.
       */
      function getTabKey(elem) {
        while (!elem.getAttribute('data-tab')) elem = elem.parentNode;
        return parseInt(elem.getAttribute('data-tab'), 10);
      }

      /**
       * Attempt storing a key-value-pair using the localStorage API.
       * @param {string} key The key the value will be stored under.
       * @param {string|number} val The value to be stored.
       */
      function setLocalData(key, val) {
        if (window.localStorage) {
          localStorage[key] = val;
        }
      }

      /**
       * Attempt fetching a key-value-pair using the localStorage API.
       * @param {string} key The key to fetch the value from.
       * @returns {string|boolean} val The value that was fetched.
       */
      function getLocalData(key) {
        if (window.localStorage && localStorage[key]) {
          return localStorage[key];
        } else {
          return false;
        }
      }

      /**
       * Updates the value of an input box.
       * @param {Node} cartValueNode The input box that will be updated.
       * @param {number} val The value to add to the value.
       */
      function updateCartValueNode(cartValueNode, val) {
        // Make sure the value does not go below 0.
        // Also prevent NaN when all text has been removed from the input.
        cartValueNode.value = Math.max((parseInt(cartValueNode.value, 10) || 0) + val, 0);
        // Attempt storing the new value locally.
        setLocalData('cart-value' + getTabKey(cartValueNode), cartValueNode.value);
      }

      /**
       * Optionally updates the value of an input box and then updates the result field.
       * @param {Node=} cartValueNode The input box that will be updated.
       * @param {number=} val The value to update the input box with.
       */
      function updateCart(cartValueNode, val) {
        // Update the input box if both an input box and a value is provided.
        if (cartValueNode && val) {
          updateCartValueNode(cartValueNode, val);
        }

        // Store lines of text that will be shown in the textarea.
        let lines = ['Hei. Jeg ønsker gjerne å kjøpe gabioner!'];

        // Store some global sums.
        let totalPrice = 0;
        let totalSize = 0;
        let totalWeight = 0;

        // Loop through all the input boxes in all the tabs.
        for (let i = 0; i < cartValueNodes.length; i++) {
          // Find the value of this input.
          let cartValue = parseInt(cartValueNodes[i].value, 10);

          // Do not show the cart value if it is 0.
          if (cartValue > 0) {
            // Map the tab id to a couple data pieces.
            let curGabionData = gabionData.article_item[getTabKey(cartValueNodes[i])];
            let type = curGabionData.name;
            let size = curGabionData.size.join(' x ');
            let weight = curGabionData.weight;
            let price = curGabionData.price;
            let priceSum = price * cartValue;
            let sizeSum = curGabionData.size.reduce((a, b) => a + b, 0) * cartValue;
            let weightSum = weight * cartValue;

            // Add sums to the total sum.
            totalPrice += priceSum;
            totalSize += sizeSum;
            totalWeight += weightSum;

            // Add this line.
            lines.push(`${type} (${size}, ${weight} kg): ${cartValue} stykker til ${price} kr - totalt ${weightSum} kg over ${sizeSum} m^3 til ${priceSum} kroner.`);
          }
        }

        // Show the container if we have more than 1 line.
        if (lines.length > 1) {
          // Add the total price.
          lines.push(`Total pris: ${totalPrice} kroner.`);
          // Add the total weight.
          lines.push(`Total vekt: ${totalWeight} kg.`);
          // Add the total volume.
          lines.push(`Totalt volum: ${totalSize} m^2`);
          // Add all lines to textarea with newlines between them.
          cartResults.value = lines.join('\n');
          // Show the cart container.
          cartContainer.style.display = 'flex';

        } else {
          // Hide cart container.
          cartContainer.style.display = 'none';
        }
      }

      // Loop through all containes.
      for (let i = 0; i < tabContainers.length; i++) {
        // Current container.
        let curTab = tabContainers[i];
        // Current tab key.
        let tabKey = getTabKey(curTab);
        // Current cart value node.
        let cartValueNode = curTab.getElementsByClassName('cart-val')[0];

        // Attempt to fetch a locally stored value and display it.
        var storedValue = getLocalData('cart-value' + tabKey);

        if (storedValue) {
          cartValueNode.value = storedValue;
        }

        cartValueNode.addEventListener('input', function() {
          // Remove all non-integer characters from the input.
          cartValueNode.value = cartValueNode.value.replace(/\D*/g, '');
        });

        // Positive increments.
        curTab.getElementsByClassName('cart-add')[0].addEventListener('click', function() {
          updateCart(cartValueNode, 1);
        });

        // Negative increemnts.
        curTab.getElementsByClassName('cart-remove')[0].addEventListener('click', function() {
          updateCart(cartValueNode, -1);
        });
      }

      // Send mail button.
      document.getElementById('send-cart-mail').addEventListener('click', function() {
        // Attempt to open a mail window with a predefined header and body.
        window.open('mailto:kjell@vikre.no?subject=Gabioner&body=' + encodeURI(cartResults.value));
      });

      // Select contents button.
      document.getElementById('copy-cart-contents').addEventListener('click', function() {
        // Select textarea contents for easier copying.
        cartResults.select();

        // Try copying using execCommand and inform the user about the result.
        if (document.execCommand('copy')) {
          toast('Tekst kopiert');
        } else {
          toast('Kopiering mislykket')
        }
      });

      // Clear button functionality.
      document.getElementById('clear-cart-contents').addEventListener('click', function() {
        for (let i = 0; i < cartValueNodes.length; i++) {
          // Remove the current value from itself as the API does not currently allow better.
          updateCartValueNode(cartValueNodes[i], -parseInt(cartValueNodes[i].value, 10));
          toast('Handlekurven er nå tom.');
        }

        // Display the changes.
        updateCart();
      });

      // Initial cart update.
      updateCart();
    },

    error: function(xhr) {
      toast('Error loading data')
    }
  });
});
