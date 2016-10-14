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
