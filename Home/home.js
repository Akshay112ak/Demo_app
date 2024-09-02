document.addEventListener('DOMContentLoaded', () => {
    // Load global feed by default on page load
    globalfeed();
});
function globalfeed() {
   
        fetch('http://localhost:3000/globalfeed/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then(data => {
            if (data.global) {
                globalfeeddata = data.global;
                displayFeed(globalfeeddata);
            }
        })
        .catch(error => console.error('Error:', error));
  
}

function displayFeed(feedData) {
    const feedContainer = document.getElementById('feed-container');
    feedContainer.innerHTML = ''; // Clear previous content
    feedData.forEach(data => {
        const articleDiv = document.createElement('div');
        articleDiv.className = 'article';
        articleDiv.innerHTML = `
            <h3 class="articleh3"><img src="" height="23" width="23">
            althaf</h3>
            <h3 class="headinrendring">${data.about}<span class="likebutton"><button>Like</button></span></h3>
            <p class="articlrenderingp">${data.articlesummary}</p>
        `;
        feedContainer.appendChild(articleDiv);
    });
}
