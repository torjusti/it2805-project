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

function updateCartDisplay(cartValueNode, val) {
  // Function might be called without these on the initial run, so watch out...
  // TODO: split into two functions?
  if (cartValueNode && val) {
    // Make sure we do not allow negative values.
    if (parseInt(cartValueNode.value, 10) + val >= 0) {
      cartValueNode.value = parseInt(cartValueNode.value, 10) + val;
    }

    // Store new value in localStorage if available.
    if (window['localStorage']) {
      let tabId = cartValueNode.parentNode.parentNode.getAttribute('data-tab');
      localStorage['cart-value-' + tabId] = cartValueNode.value;
    }
  }

  // Stores lines of text that will be shown in the textarea.
  let lines = ['Hei. Jeg ønsker gjerne å kjøpe gabioner!'];

  // Loop through all the input boxes in all the tabs.
  for (let i = 0; i < cartValues.length; i++) {
    // Find the value of this input.
    let cartValue = parseInt(cartValues[i].value, 10);
    // Map the tab id of the containing tab to a gabion type.
    let gabionType = gabionTypes[parseInt(cartValues[i].parentNode.parentNode.getAttribute('data-tab'), 10)];

    // Do not add cart value to the result box if the value is 0.
    if (cartValue > 0) {
      // TODO: Can we use ES6 template strings?
      lines.push(`${gabionType}: ${cartValue} gabioner`);
    }
  }

  // If we have more than 1 line, this means the user has selected gabions. Show the container..
  if (lines.length > 1) {
    // Add all lines to textarea with newlines between them.
    cartResults.value = lines.join('\n');
    // Show cart container.
    cartContainer.style.display = 'block';
  } else {
    // Hide cart container.
    cartContainer.style.display = 'none';
  }
}

// Loop through all containes.
for (let i = 0; i < tabContainers.length; i++) {
  let curTab = tabContainers[i];
  let tabKey = curTab.getAttribute('data-tab');
  let cartValue = curTab.getElementsByClassName('cart-val')[0];

  // TODO: does this even do what its supposed to check
  if (window['localStorage'] && localStorage['cart-value-' + tabKey]) {
    cartValue.value = localStorage['cart-value-' + tabKey];
  }

  // Validation - remove all non-int characters from input.
  cartValue.addEventListener('input', function() {
    cartValue.value = cartValue.value.replace(/\D*/g, '');
  });

  // Positive increments.
  curTab.getElementsByClassName('cart-add')[0].addEventListener('click', function() {
    updateCartDisplay(cartValue, 1);
  });

  // Negative increemnts.
  curTab.getElementsByClassName('cart-remove')[0].addEventListener('click', function() {
    updateCartDisplay(cartValue, -1);
  });
}

document.getElementById('send-cart-mail').addEventListener('click', function() {
  // Attempt to open a mail window with a predefined header and body.
  window.open('mailto:kjell@vikre.no?subject=Gabioner&body=' + encodeURI(cartResults.value));
});

document.getElementById('select-cart-contents').addEventListener('click', function() {
  // Select textarea contents for easier copying.
  cartResults.select();
});

// TODO: this is very lol, defer script? all selectors in DOMContentLoaded? something else?
document.addEventListener('DOMContentLoaded', function() {
  // Initial update to cart display. Needs be done, as the cart might be propagated
  // with stored data.
  updateCartDisplay();
});
