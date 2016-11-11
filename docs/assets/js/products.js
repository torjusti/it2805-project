/* Wait until the DOM has finished loading. */
document.addEventListener('DOMContentLoaded', function(){
  ajax({
    path: 'assets/data.json',

    success: function(responseText) {
      // Parse JSON data.
      let gabionData = JSON.parse(responseText);

      // fetch rendering containers
      let itemTabs = document.getElementById('item-tabs');
      let itemContainers = document.getElementById('item-containers');

      // Render data. All the this logic is just for rendering the data from JSON and into the dom.
      gabionData.products.forEach(function(product, i) {
        itemTabs.appendChild(createElem({
          'nodeType': 'span',
          'data-tab': i,
          'className': 'item-tab',
          'innerHTML': product.size.join(' x ') + ' cm' + (product.name ? ` (${product.name})` : '')
        }));

        let itemData = createElem({
          'className': 'item-data',
          children: [
            createElem({
              'className': 'item-name',
              'innerHTML': product.size.join(' x ') + ' cm' + (product.name ? ` (${product.name})` : ' (vanlig gabion)')
            }),

            createElem({
              'className': 'item-size',
              'innerHTML': '<span class="info-title">Størrelse:</span> ' + product.size.join(' x ') + ' cm'
            }),

            createElem({
              'className': 'item-weight',
              'innerHTML': '<span class="info-title">Vekt:</span> ' + product.weight + ' kg'
            }),

            createElem({
              'className': 'item-price',
              'innerHTML': '<span class="info-title">Pris:</span> ' + product.price + ' kr'
            }),

            createElem({
              'className': 'thread-thickness',
              'innerHTML': '<span class="info-title">Trådtykkelse:</span> ' + product.threadThickness + ' mm'
            }),
            createElem({
              'className': 'item-mask-size',
              'innerHTML': '<span class="info-title">Maskestørrelse:</span> ' + product.maskSize.join(' x ') + ' mm'
            }),
            createElem({
              'className': 'galvanized-thickness',
              'innerHTML': '<span class="info-title">Galvaniseringstykkelse:</span> ' + product.galvanizedThickness + ' g pr. m²'
            }),

            createElem({
              'className': 'item-extra',
              'innerHTML': product.extra
            }),

            createElem({
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
            })
          ]
        });

        let itemImg = createElem({
          'className': 'item-img',
          'children': [
            createElem({
              'nodeType': 'img',
              'src': `assets/img/produkter/${i + 1}.jpg`,
              'alt': product.size.join(' x ') + ' cm' + (product.name ? ` (${product.name})` : ' (gabion)')
            })
          ]
        });

        itemContainers.appendChild(createElem({
          'className': 'item-container',
          'data-tab': i,
          'children': [itemData, itemImg]
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
      for (let i = 0; i < tabs.length; i++){
       tabs[i].addEventListener('click', function(e){
         // Class handling for mobile phones only.
         productsTab.className = 'tabs-out'
         // Find out the tab code of the clicked tab.
         let tabKey = e.target.getAttribute('data-tab');

         let activeTabs = document.getElementsByClassName('active-tab');

         for (let j = 0; j < activeTabs.length; j++){
           activeTabs[j].classList.remove('active-tab');
         }

         e.target.classList.add('active-tab');

         // Loop through all tabs.
         for (let j = 0; j < tabContainers.length; j++){
           let currentTabContainer = tabContainers[j];

           // If this tab has the same code as the new current tab show it, if not, hide it.
           if (currentTabContainer.getAttribute('data-tab') === tabKey){
             currentTabContainer.style.display = 'flex';
             currentTabContainer.classList.add('active-tab');
           } else{
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
      chooseProduct.addEventListener('click', function(e){
       if (productsTab.className != 'tabs-in'){
         productsTab.className = 'tabs-in'
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
       * @param{Node} elem The element to start searching from.
       * @returns{number} The containing tab key.
       */
      function getTabKey(elem){
        while (!elem.getAttribute('data-tab')) elem = elem.parentNode;
        return parseInt(elem.getAttribute('data-tab'), 10);
      }

      /**
       * Attempt storing a key-value-pair using the localStorage API.
       * @param{string} key The key the value will be stored under.
       * @param{string|number} val The value to be stored.
       */
      function setLocalData(key, val){
        if (window.localStorage){
          localStorage[key] = val;
        }
      }

      /**
       * Attempt fetching a key-value-pair using the localStorage API.
       * @param{string} key The key to fetch the value from.
       * @returns{string|boolean} val The value that was fetched.
       */
      function getLocalData(key){
        if (window.localStorage && localStorage[key]){
          return localStorage[key];
        } else{
          return false;
        }
      }

      /**
       * Updates the value of an input box.
       * @param{Node} cartValueNode The input box that will be updated.
       * @param{number} val The value to add to the value.
       * @param{boolean=} override If true, the cart value is set to val instead of having val added.
       */
      function updateCartValueNode(cartValueNode, val, override){
        // Make sure the value does not go below 0.
        // Also prevent NaN when all text has been removed from the input.
        if (override){
          cartValueNode.value = val;
        } else{
          let updatedValue = Math.max((parseInt(cartValueNode.value, 10) || 0) + val, 0);
          cartValueNode.value = isFinite(updatedValue) ? updatedValue : 0;
        }

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

        // If the cart contain round gabions, which have no specified volume - needs to be warned about in cart
        let containsRoundGabions = false;

        // Loop through all the input boxes in all the tabs.
        for (let i = 0; i < cartValueNodes.length; i++){
          // Find the value of this input.
          let cartValue = parseInt(cartValueNodes[i].value, 10);

          // Do not show the cart value if it is 0.
          if (cartValue > 0){
            // Map the tab id to a couple data pieces.
            let curGabionData = gabionData.products[getTabKey(cartValueNodes[i])];
            let type = curGabionData.size.join(' x ') + ' cm' + (curGabionData.name ? ` (${curGabionData.name})` : '');
            let size = curGabionData.size.join(' x ');
            let weight = curGabionData.weight;
            let price = curGabionData.price;
            let priceSum = price * cartValue;
            // better rounding courtesy of MDN
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round
            let sizeSum = +(Math.round(curGabionData.size.reduce((a, b) => a * b / 100, 1) * cartValue + 'e+2')  + 'e-2');
            let weightSum = weight * cartValue;

            let roundGabion = curGabionData.size.length !== 3;

            // if we have round gabions, don't print size sum
            if (roundGabion) {
              sizeSum = 0;
              containsRoundGabions = true;
            }

            // Add sums to the total sum.
            totalPrice += priceSum;
            totalSize += sizeSum;
            totalWeight += weightSum;

            // Add this line.
            let line = `${type} [${weight} kg]: ${cartValue} stykker til ${price} kr - totalt ${weightSum} kg`;

            // Round gabions have no size, don't write 0 m^2, that's weird
            if (sizeSum) {
              line += ` over ${sizeSum} m^3 til ${priceSum} kroner.`
            }

            line += '\n---------------------------------------------------------';

            lines.push(line);
          }
        }

        // Show the container if we have at least 1 line.
        if (lines.length >= 1){
          // Add the total price.
          lines.push(`Total pris: ${totalPrice} kroner`);
          // Add the total weight.
          lines.push(`Total vekt: ${totalWeight} kg`);
          // Add the total volume.
          // better rounding still courtesy of MDN
          // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round
          lines.push(`Totalt volum: ${+(Math.round(totalSize + 'e+2')  + 'e-2')} m^3`);

          if (containsRoundGabions) {
            lines.push('OBS! Du har runde gabioner i handlekurven din. Disse brukes primært til dekorasjon, volum er derfor ikke lagt til.');
          }

          // Add all lines to textarea with newlines between them.
          cartResults.value = lines.join('\n');
          // Show the shopping cart.
          document.getElementById('shopping-cart').style.display = 'flex';
        } else {
          // Hide shopping cart.
          document.getElementById('shopping-cart').style.display = 'none';
        }
      }

      // Loop through all containes.
      for (let i = 0; i < tabContainers.length; i++){
        // Current container.
        let curTab = tabContainers[i];
        // Current tab key.
        let tabKey = getTabKey(curTab);
        // Current cart value node.
        let cartValueNode = curTab.getElementsByClassName('cart-val')[0];

        cartValueNode.addEventListener('input', function(){
          // Remove all non-integer characters from the input.
          cartValueNode.value = cartValueNode.value.replace(/\D*/g, '');

          updateCartValueNode(cartValueNode, cartValueNode.value, true);
        });

        cartValueNode.addEventListener('blur', function() {
          if (!cartValueNode.value) {
            updateCartValueNode(cartValueNode, 0, true);
          };
        });

        // Positive increments.
        curTab.getElementsByClassName('cart-add')[0].addEventListener('click', function(){
          updateCartValueNode(cartValueNode, 1);
          toast('Gabion lagt til i handlekurv.');
        });

        // Negative increemnts.
        curTab.getElementsByClassName('cart-remove')[0].addEventListener('click', function(){
          updateCartValueNode(cartValueNode, -1);
          toast('Gabion fjernet fra handlekurv.');
        });
      }

      // Send mail button.
      document.getElementById('send-cart-mail').addEventListener('click', function(){
        // Attempt to open a mail window with a predefined header and body.
        window.open('mailto:post@vikre.no?subject=Gabioner&body=' + encodeURI(cartResults.value));
      });

      // Select contents button.
      document.getElementById('copy-cart-contents').addEventListener('click', function(){
        // Select textarea contents for easier copying.
        cartResults.select();

        // Try copying using execCommand and inform the user about the result.
        if (document.execCommand('copy')){
          toast('Tekst kopiert');
        } else{
          toast('Kopiering mislykket')
        }
      });

      // Clear button functionality.
      document.getElementById('clear-cart-contents').addEventListener('click', function(){
        for (let i = 0; i < cartValueNodes.length; i++){
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
