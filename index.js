/*
 * Write your client-side JS code in this file.  Don't forget to include your
 * name and @oregonstate.edu email address below.
 *
 * Name: Maximillian LaBruno
 * Email: labrunom@oregonstate.edu
 */

document.addEventListener('DOMContentLoaded', function() {
    // Selecting elements for modal
    const sellButton = document.getElementById("sell-something-button");
    const modalBackdrop = document.getElementById("modal-backdrop");
    const modal = document.getElementById("sell-something-modal");
    const closeButton = document.getElementById("modal-close");
    const cancelButton = document.getElementById("modal-cancel");
    const createPostButton = document.getElementById("modal-accept");
    const postContainer = document.querySelector("#posts");
  
    // Filter inputs
    const filterTextInput = document.getElementById("filter-text");
    const filterMinPriceInput = document.getElementById("filter-min-price");
    const filterMaxPriceInput = document.getElementById("filter-max-price");
    const filterCitySelect = document.getElementById("filter-city");
    const filterConditionCheckboxes = document.querySelectorAll("input[name='filter-condition']");
  
    // Modal show and hide functions
    function showModal() {
      modal.classList.remove("hidden");
      modalBackdrop.classList.remove("hidden");
    }
  
    function hideModal() {
      modal.classList.add("hidden");
      modalBackdrop.classList.add("hidden");
      clearModalInputs();
    }
  
    // Clear modal inputs
    function clearModalInputs() {
      document.getElementById("post-text-input").value = "";
      document.getElementById("post-photo-input").value = "";
      document.getElementById("post-price-input").value = "";
      document.getElementById("post-city-input").value = "";
      document.getElementById("post-condition-new").checked = true; // Default the condition to "New"
    }
  
    
    sellButton.addEventListener("click", showModal);
    closeButton.addEventListener("click", hideModal);
    cancelButton.addEventListener("click", hideModal);
  
    // Create a new post
    function createNewPost() {
      const itemDescription = document.getElementById("post-text-input").value;
      const photoURL = document.getElementById("post-photo-input").value;
      const price = document.getElementById("post-price-input").value;
      const city = document.getElementById("post-city-input").value;
      const condition = document.querySelector('input[name="post-condition"]:checked').value;
  
      // Check inputs
      if (!itemDescription || !photoURL || !price || !city || !condition) {
        alert("All fields must be filled out to create a post.");
        return;
      }
  
      // Create the post
      const postElement = document.createElement("div");
      postElement.classList.add("post");
      postElement.setAttribute("data-price", price);
      postElement.setAttribute("data-city", city);
      postElement.setAttribute("data-condition", condition);
  
      postElement.innerHTML = `
        <div class="post-contents">
          <div class="post-image-container">
            <img src="${photoURL}" alt="${itemDescription}">
          </div>
          <div class="post-info-container">
            <a href="#" class="post-title">${itemDescription}</a> 
            <span class="post-price">$${price}</span> 
            <span class="post-city">(${city})</span>
          </div>
        </div>
      `;
  
      postContainer.appendChild(postElement);
  
      // Hide modal and clear inputs after posting
      hideModal();
    }
  
    
    createPostButton.addEventListener("click", createNewPost);
  
    // Apply filters to the posts
    function filterPosts() {
      const filterText = filterTextInput.value.toLowerCase();
      const minPrice = parseFloat(filterMinPriceInput.value) || 0;
      const maxPrice = parseFloat(filterMaxPriceInput.value) || Infinity;
      const selectedCity = filterCitySelect.value.toLowerCase();
      const selectedConditions = Array.from(filterConditionCheckboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);
  
      const posts = document.querySelectorAll(".post");
  
      posts.forEach(post => {
        const description = post.querySelector(".post-title").textContent.toLowerCase();
        const price = parseFloat(post.getAttribute("data-price"));
        const city = post.getAttribute("data-city").toLowerCase();
        const condition = post.getAttribute("data-condition");
  
        const matchesText = description.includes(filterText);
        const matchesMinPrice = price >= minPrice;
        const matchesMaxPrice = price <= maxPrice;
        const matchesCity = selectedCity ? city === selectedCity : true;
        const matchesCondition = selectedConditions.length ? selectedConditions.includes(condition) : true;
  
        // Display or hide post based on all filters
        if (matchesText && matchesMinPrice && matchesMaxPrice && matchesCity && matchesCondition) {
          post.style.display = "";
        } else {
          post.style.display = "none";
        }
      });
    }
  
    
    document.getElementById("filter-update-button").addEventListener("click", filterPosts);
  });