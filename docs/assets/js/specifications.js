// Wait until the DOM has finished loading.
document.addEventListener('DOMContentLoaded', function() {
  /* ---------------------------
   * Shopping cart functionality
   * ---------------------------
   */

  // Map tab keys to the name of a gabion type.
  // Object and not an array purely because of code clarity.
  const gabionTypes = {
    0: 'L Gabion',
    1: 'XL Gabion',
    2: 'XXL Gabion Super'
  };

  // Fetch elements from the DOM.
  const cartValues = document.getElementsByClassName('cart-val');
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
    while (!elem.getAttribute('data-tab')) elem = elem.parentNode
    return elem.getAttribute('data-tab');
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
   * Optionally updates the value of an input box and then updates the result field.
   * @param {Node=} cartValueNode The input box that will be updated.
   * @param {number=} val The value to update the input box with.
   */
  function updateCart(cartValueNode, val) {
    // Update the input box if both an input box and a value is provided.
    if (cartValueNode && val) {
      // Make sure the value does not go below 0.
      cartValueNode.value = Math.max(parseInt(cartValueNode.value, 10) + val, 0);

      // Attempt storing the new value locally.
      setLocalData('cart' + getTabKey(cartValueNode), cartValueNode.value);
    }

    // Store lines of text that will be shown in the textarea.
    let lines = ['Hei. Jeg ønsker gjerne å kjøpe gabioner!'];

    // Loop through all the input boxes in all the tabs.
    for (let i = 0; i < cartValues.length; i++) {
      // Find the value of this input.
      let cartValue = parseInt(cartValues[i].value, 10);

      // Map the tab id of the containing tab to a gabion type.
      let gabionType = gabionTypes[getTabKey(cartValues[i])];

      // Do not show the cart value if it is 0.
      if (cartValue > 0) {
        lines.push(`${gabionType}: ${cartValue} gabioner`);
      }
    }

    // Show the container if we have more than 1 line.
    if (lines.length > 1) {
      // Add all lines to textarea with newlines between them.
      cartResults.value = lines.join('\n');
      // Show the cart container.
      cartContainer.style.display = 'block';
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
      cartValue.value = storedValue;
    }

    // Remove all non-integer characters from the input.
    cartValue.addEventListener('input', function() {
      cartValue.value = cartValue.value.replace(/\D*/g, '');
    });

    // Positive increments.
    curTab.getElementsByClassName('cart-add')[0].addEventListener('click', function() {
      updateCart(cartValue, 1);
    });

    // Negative increemnts.
    curTab.getElementsByClassName('cart-remove')[0].addEventListener('click', function() {
      updateCart(cartValue, -1);
    });
  }

  // Send mail button.
  document.getElementById('send-cart-mail').addEventListener('click', function() {
    // Attempt to open a mail window with a predefined header and body.
    window.open('mailto:kjell@vikre.no?subject=Gabioner&body=' + encodeURI(cartResults.value));
  });

  // Select contents button.
  document.getElementById('select-cart-contents').addEventListener('click', function() {
    // Select textarea contents for easier copying.
    cartResults.select();
  });

  // Initial update to cart display to fetch locally stored data.
  updateCart();

  /**
   * -----------------
   * Tab functionality
   * -----------------
   */

  // Fetch elements from the DOM.
  const tabs = document.getElementsByClassName('tab');
  const tabContainers = document.getElementsByClassName('tab-container');

  // Show the first tab by default.
  tabContainers[0].style.display = 'block';

  // Loop through all tabs.
  for (let i = 0; i < tabs.length; i++) {
   tabs[i].addEventListener('click', function(e) {
     // Find out the tab code of the clicked tab.
     let activeTab = e.target.getAttribute('data-tab');

     // Loop through all tabs.
     for (let j = 0; j < tabContainers.length; j++) {
       let currentTabContainer = tabContainers[j];

       // If this tab has the same code as the new current tab show it, if not, hide it.
       if (currentTabContainer.getAttribute('data-tab') === activeTab) {
         currentTabContainer.style.display = 'block';
       } else {
         currentTabContainer.style.display = 'none';
       }
     }
   });
  }
});
