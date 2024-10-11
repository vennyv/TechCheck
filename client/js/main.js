// client/js/main.js

const apiUrl = 'http://localhost:5000/api/items';

document.addEventListener('DOMContentLoaded', () => {
  const itemsList = document.querySelector('#items-list ul');
  const itemDetails = document.getElementById('item-details');
  const backButton = document.getElementById('back-button');
  
  // Fetch and display all items
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      data.forEach(item => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = '#';
        a.textContent = item.title;
        a.addEventListener('click', (e) => {
          e.preventDefault();
          showItemDetails(item.id);
        });
        li.appendChild(a);
        itemsList.appendChild(li);
      });
    })
    .catch(error => {
      console.error('Error fetching items:', error);
      itemsList.innerHTML = '<li>Error loading items.</li>';
    });
  
  // Show item details
  function showItemDetails(id) {
    fetch(`${apiUrl}/${id}`)
      .then(response => {
        if (!response.ok) throw new Error('Item not found');
        return response.json();
      })
      .then(item => {
        document.getElementById('item-title').textContent = item.title;
        document.getElementById('item-image').src = item.image_url;
        document.getElementById('item-image').alt = item.title;
        document.getElementById('item-text').textContent = item.text;
        document.getElementById('item-submitted-by').textContent = item.submitted_by;
        
        document.getElementById('items-list').hidden = true;
        itemDetails.hidden = false;
      })
      .catch(error => {
        console.error('Error fetching item details:', error);
        alert('Error fetching item details.');
      });
  }
  
  // Back button handler
  backButton.addEventListener('click', () => {
    itemDetails.hidden = true;
    document.getElementById('items-list').hidden = false;
  });
});
