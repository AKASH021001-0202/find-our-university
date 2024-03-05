// Function to fetch university data based on search query
function fetchUniversityData(searchQuery) {
    return new Promise((resolve, reject) => {
      const url = `http://universities.hipolabs.com/search?name=${searchQuery}`;
  
      fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          displayUniversityData(data);
          console.log(data);
          resolve(data); // Resolve the promise with the fetched data
        })
        .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
          reject(error); // Reject the promise with the error
        });
    });
  }
  
  // Function to display university data
  function displayUniversityData(data) {
    const resultContainer = document.querySelector("#university-result");
    resultContainer.innerHTML = ''; // Clear previous results
  
    data.forEach(university => {
      const card = document.createElement('div');
      card.classList.add('card');
  
      const name = document.createElement('h2');
      name.textContent = university.name;
  
      const country = document.createElement('p');
      country.textContent = `Country: ${university.country}`;
  
      const webpage = document.createElement('p');
      webpage.textContent = 'Webpage: ';
  
      const link = document.createElement('a');
      link.textContent = university.web_pages[0];
      link.href = university.web_pages[0];
      link.target = '_blank'; // Open link in a new tab
  
      webpage.appendChild(link);
  
      card.appendChild(name);
      card.appendChild(country);
      card.appendChild(webpage);
  
      resultContainer.appendChild(card);
    });
  }
  
  // Get search input and button elements
  const inputSearch = document.querySelector("#inp-search");
  const searchBtn = document.querySelector("#search-btn");
  
  // Add event listener to search button
  searchBtn.addEventListener('click', () => {
    const searchQuery = inputSearch.value.trim(); // Trim whitespace from the input
    if (searchQuery !== '') {
      fetchUniversityData(searchQuery)
        .then(data => {
          // Handle success if needed
          console.log('Data fetched successfully:', data);
        })
        .catch(error => {
          // Handle error if needed
          console.error('Error fetching data:', error);
        });
    }
  });
  