/* Wait until the DOM has finished loading. */
document.addEventListener('DOMContentLoaded', function() {
  ajax({
    path: 'assets/data.json',

    success: function(responseText) {
      // Parse JSON data.
      let gabionData = JSON.parse(responseText);

      let itemTabs = document.getElementById('item-tabs');
      let itemContainers = document.getElementById('item-containers');

      // Render data.
      gabionData.products.forEach(function(product, i) {
        itemTabs.appendChild(createElem({
          'nodeType': 'span',
          'data-tab': i,
          'className': 'item-tab',
          'innerHTML': product.name
        }));

        let itemData = createElem({
          'className': 'item-data',
          children: [
            createElem({
              'className': 'item-name',
              'innerHTML': product.name
            }),

            createElem({
              'className': 'item-size',
              'innerHTML': 'Størrelse: ' + product.size.join(' x ') + ' cm'
            }),

            createElem({
              'className': 'item-weight',
              'innerHTML': 'Vekt: ' + product.weight + ' kg'
            }),

            createElem({
              'className': 'item-price',
              'innerHTML': 'Pris: ' + product.price + ' kr'
            }),

            createElem({
              'className': 'item-extra',
              'innerHTML': product.extra
            }),

          ]
        });

        let itemImg = createElem({
          'className': 'item-img',
          'children': [
            createElem({
              'nodeType': 'img',
              'src': `assets/img/produkter/${product.size.join('x')}/1.JPG`,
              'alt': product.name
            })
          ]
        });
        let cartControls = createElem({
          'className': 'cart-controls',

          children: [
            createElem({
            'nodeType': 'button',
            'className': 'cart-add',
            'innerHTML': '+'
            }),

            createElem({
              'nodeType': 'input',
              'className': 'cart-val',
              'type': 'text',
              'value': getLocalData('cart-value' + i) || 0 // Use stored value if it exists
            }),

            createElem({
              'nodeType': 'button',
              'className': 'cart-remove',
              'innerHTML': '-'
            })
          ]
        });

        itemContainers.appendChild(createElem({
          'className': 'item-container',
          'data-tab': i,
          'children': [cartControls, itemData, itemImg]
        }));
      });

      /**
       * -----------------
       * Tab functionality
       * -----------------
       */

      // Fetch elements from the DOM.
      const tabs = document.getElementsByClassName('item-tab');
      const tabContainers = document.getElementsByClassName('item-container');
      const chooseProduct = document.getElementById('choose-product');
      const productsTab = document.getElementById('item-tabs');


      // Show the first tab by default. Ensure it has the clicked-tab-styling.
      tabContainers[0].style.display = 'flex';
      tabContainers[0].classList.add('active-tab');
      tabs[0].classList.add('active-tab');


      // Loop through all tabs.
      for (let i = 0; i < tabs.length; i++) {
       tabs[i].addEventListener('click', function(e) {
         // Class handling for mobile phones only.
         productsTab.className = "tabs-out"
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
             currentTabContainer.classList.add('active-tab');
           } else {
             currentTabContainer.style.display = 'none';
             currentTabContainer.classList.remove('active-tab');
           }
         }
       });
      }

      /* ---------------------------
       * Shopping cart functionality
       * ---------------------------
       */


      // Some extra logic for the mobile menu.
      chooseProduct.addEventListener('click', function(e) {
       if (productsTab.className != "tabs-in") {
         productsTab.className = "tabs-in"
       }
      });

      // Fetch elements from the DOM.
      const cartValueNodes = document.getElementsByClassName('cart-val');
      const cartResults = document.getElementById('cart-results');

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
       * @param {boolean=} override If true, the cart value is set to val instead of having val added.
       */
      function updateCartValueNode(cartValueNode, val, override) {
        // Make sure the value does not go below 0.
        // Also prevent NaN when all text has been removed from the input.
        cartValueNode.value = override ? val : Math.max((parseInt(cartValueNode.value, 10) || 0) + val, 0);

        // Attempt storing the new value locally.
        setLocalData('cart-value' + getTabKey(cartValueNode), cartValueNode.value);

        // Cart value node updates should always update the cart.
        updateCart();
      }

      /**
       * Updates the result textarea.
       */
      function updateCart() {
        // Store lines of text that will be shown in the textarea.
        //let lines = ['Hei. Jeg ønsker gjerne å kjøpe gabioner!\n'];
        let lines = [];

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
            let curGabionData = gabionData.products[getTabKey(cartValueNodes[i])];
            let type = curGabionData.name;
            let size = curGabionData.size.join(' x ');
            let weight = curGabionData.weight;
            let price = curGabionData.price;
            let priceSum = price * cartValue;
            let sizeSum = +(Math.round(curGabionData.size.reduce((a, b) => a * b / 100, 1) * cartValue + 'e+2')  + 'e-2');
            let weightSum = weight * cartValue;

            // Add sums to the total sum.
            totalPrice += priceSum;
            totalSize += sizeSum;
            totalWeight += weightSum;

            // Add this line.
            lines.push(`${type} (${size}, ${weight} kg): ${cartValue} stykker til ${price} kr - totalt ${weightSum} kg over ${sizeSum} m^3 til ${priceSum} kroner.\n---------------------------------------------------------`);
          }
        }

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round

        // Show the container if we have at least 1 line.
        if (lines.length >= 1) {
          // Add the total price.
          lines.push(`Total pris: ${totalPrice} kroner`);
          // Add the total weight.
          lines.push(`Total vekt: ${totalWeight} kg`);
          // Add the total volume.
          lines.push(`Totalt volum: ${totalSize} m^3`);
          // Add all lines to textarea with newlines between them.
          cartResults.value = lines.join('\n');
          // Show the shopping cart.
          document.getElementById('shopping-cart').style.display = 'flex';
          /*setInterval(function(){
            if (document.getElementsByTagName("BODY")[0].scrollTop != window.innerHTML){
            document.getElementsByTagName("BODY")[0].scrollTop = document.getElementsByTagName("BODY")[0].scrollTop + 10
          }
        }, 15);*/ // SMOOTH SCROLL TO THE BOTTOM.
        } else {
          // Hide shopping cart.
          document.getElementById('shopping-cart').style.display = 'none';
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

        cartValueNode.addEventListener('input', function() {
          // Remove all non-integer characters from the input.
          cartValueNode.value = cartValueNode.value.replace(/\D*/g, '');

          updateCartValueNode(cartValueNode, cartValueNode.value, true);
        });

        // Positive increments.
        curTab.getElementsByClassName('cart-add')[0].addEventListener('click', function() {
          updateCartValueNode(cartValueNode, 1);
          toast('Gabion lagt til i handlekurv.');
        });

        // Negative increemnts.
        curTab.getElementsByClassName('cart-remove')[0].addEventListener('click', function() {
          updateCartValueNode(cartValueNode, -1);
          toast('Gabion fjernet fra handlekurv.');
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
        }

        // Display the changes.
        updateCart();

        toast('Handlekurven din er nå tom.');
      });

      // Initial cart update.
      updateCart();
    },

    error: function(xhr) {
      toast('Error loading data')
    }
  });
});
