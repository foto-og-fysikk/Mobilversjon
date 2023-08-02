// Selecting the container div from the document
const container = document.querySelector('.container');

// Creating a new div element to act as a modal for clicked images
const modal = document.createElement('div');

// Adding 'modal' as a class to the newly created div
modal.classList.add('modal');

// Adding the modal div to the body of the document
document.body.appendChild(modal);

// Adding an event listener to the modal, setting its display to 'none' when clicked
// This will hide the modal when you click outside of the image
modal.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Function to generate a masonry grid layout for posts. Takes the number of columns and the posts data as input
function generateMasonryGrid(columns, posts) {
  // Clears the container's HTML
  container.innerHTML = '';
  
  // Initializes an object to store columns
  let columnWrappers = {};

  // Creates arrays within the columnWrappers object for each column
  for (let i = 0; i < columns; i++) {
      columnWrappers[`column${i}`] = [];
  }

  // Populates the columnWrappers with posts data, distributing posts across columns
  for (let i = 0; i < posts.length; i++) {
      const column = i % columns;
      columnWrappers[`column${column}`].push(posts[i]);
  }

  // Creates the HTML structure for each column and post
  for(let i = 0; i < columns; i++) {
      // Gets the posts for this column
      let columnPosts = columnWrappers[`column${i}`];

      // Creates a new div for this column
      let div = document.createElement('div');

      // Adds the 'column' class to the column div
      div.classList.add('column');

      // For each post in this column
      columnPosts.forEach(post => {
          // Create the post div, image, and overlay
          let postDiv = document.createElement('div');
          postDiv.classList.add('post');
          
          let image = document.createElement('img');
          image.src = post.image;
          image.classList.add('masonry-image'); // This ensures the photo in the masonry grid has the class masonry-image
          
          let overlay = document.createElement('div');
          overlay.classList.add('overlay');

          // Create the post title
          let title = document.createElement('h3');
          title.innerText = post.title;
          overlay.appendChild(title);

          // Append the image and overlay to the post div
          postDiv.append(image, overlay);
          
          // Append the post div to the column div
          div.appendChild(postDiv);

          // Event listener for clicking on a post
          postDiv.addEventListener('click', (event) => {
              // Prevents the click event from reaching the modal
              event.stopPropagation(); 

              // Create and append new image, title, and subtitle to the modal
              let modalImg = document.createElement('img');
              modalImg.src = post.image;
              let modalTitle = document.createElement('h3');
              modalTitle.innerText = post.title;
              let modalSubtitle = document.createElement('h4');
              modalSubtitle.innerText = post.subtitle;

              // Clear modal content and append new content
              modal.innerHTML = ''; 
              modal.append(modalImg, modalTitle, modalSubtitle);

              // Show the modal
              modal.style.display = 'flex'; 
          });
      });

      // Append the column div to the container div
      container.appendChild(div);
  }
}




// Stores the width of the window when the script runs
let previousScreenSize = window.innerWidth;

// Adds an event listener to the window that will execute when the window size changes
window.addEventListener('resize', () => {
  if (window.innerWidth < 600 && previousScreenSize >= 600) {
    // If the window width is less than 600px and it previously wasn't, 
    // generate a new masonry grid with 1 column
    generateMasonryGrid(1, posts);
  } else if (window.innerWidth >= 600 && window.innerWidth < 1000 && (previousScreenSize < 600 || previousScreenSize >= 1000)) {
    // If the window width is between 600px and 999px and it previously wasn't, 
    // generate a new masonry grid with 2 columns
    generateMasonryGrid(2, posts);
  } else if (window.innerWidth >= 1000 && previousScreenSize < 1000) {
    // If the window width is greater than or equal to 1000px and it previously wasn't, 
    // generate a new masonry grid with 3 columns
    generateMasonryGrid(3, posts);
  }
  // Update the previousScreenSize to the current window width
  previousScreenSize = window.innerWidth;
});

// This logic generates an initial masonry grid based on the window size when the page loads
if (previousScreenSize < 600) {
  // If the window width is less than 600px, generate a masonry grid with 1 column
  generateMasonryGrid(1, posts);
} else if (previousScreenSize >= 600 && previousScreenSize < 1000) {
  // If the window width is between 600px and 999px, generate a masonry grid with 2 columns
  generateMasonryGrid(2, posts);
} else {
  // If the window width is greater than or equal to 1000px, generate a masonry grid with 3 columns
  generateMasonryGrid(3, posts);
}

// Selects all project items from the document
const projectItems = document.querySelectorAll('.project-item-topbar, .project-item-sidebar');



// Adds a click event listener to each project item
projectItems.forEach(function (item) {
  item.addEventListener('click', function () {
      const itemId = item.getAttribute('id');
      let projectData;

      // Selects the appropriate project data based on the id of the clicked project item
      switch (itemId) {
          case 'Portugal': projectData = Portugal; break;
          case 'portretter': projectData = portretter; break;
          case 'Ravnedalen': projectData = Ravnedalen; break;
          case 'Kjellandsheia': projectData = Kjellandsheia; break;
          default: return; // Exit if none of the above
      }

      // Creates posts from the selected project data
      let projectPosts = createPostsFromData(projectData);

      // Generates a new masonry grid with 2 columns, based on the current window size
      if (previousScreenSize < 600) {
          generateMasonryGrid(1, projectPosts);
      } else {
          generateMasonryGrid(2, projectPosts);
      }
  });
});


// Adds a click event listener to each project item
projectItems.forEach(function (item) {
  item.addEventListener('click', function () {
      const itemId = item.getAttribute('id');
      let projectData;

      // Selects the appropriate project data based on the id of the clicked project item
      switch (itemId) {
          case 'sommer': projectData = sommer; break;
          case 'vinter': projectData = vinter; break;
          case 'vår': projectData = vår; break;
          case 'høst': projectData = høst; break;
          default: return; // Exit if none of the above
      }

      // Creates posts from the selected project data
      let projectPosts = createPostsFromData(projectData);

      // Generates a new masonry grid with 3 columns, based on the current window size
      if (previousScreenSize < 600) {
          generateMasonryGrid(1, projectPosts);
      } else {
          generateMasonryGrid(3, projectPosts);
      }
  });
});




// Function to create post objects from the project data
function createPostsFromData(data) {
  let posts = []; // Array to store the created posts
  let dataIndex = data.length - 1; // Index for data traversal

  // Creating post objects for each data item
  for (let i = 1; i <= data.length; i++) {
    let item = {
        title: '',
        id: i,
        image: '',
    };

    // If the data item is an array, get the image, title, and subtitle
    if (Array.isArray(data[dataIndex])) {
        item.title = data[dataIndex][1];
        item.image = data[dataIndex][0];
        item.subtitle = data[dataIndex][2] || '';
    } else {
        // If the data item is not an array, just get the image
        item.image = data[dataIndex];
    }
    // Push the created post to the posts array
    posts.push(item);
    dataIndex--;

    // If dataIndex is less than 0, set it to the last index of the data
    if (dataIndex < 0)
        dataIndex = data.length - 1; 
  }
  
  // Return the created posts
  return posts;
}


const fotoboksenElements = document.querySelectorAll('.header-text-sidebar h2, .header-text-topbar h2');
fotoboksenElements.forEach(element => {
    element.addEventListener('click', function() {
        location.reload();
    });
});







