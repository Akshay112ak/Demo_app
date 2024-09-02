document.addEventListener('DOMContentLoaded', () => {
    // Load global feed by default on page load
    globalfeed();
});

function Logout() {
    window.localStorage.removeItem('userconduit');
    window.location.href = 'http://127.0.0.1:5500/Home/home.html';
}

function yourfeed() {
    const usertoken = JSON.parse(window.localStorage.getItem('userconduit'));
    if (usertoken) {
        fetch(`http://localhost:3000/users/getyourfeed/${encodeURIComponent(usertoken.userid)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + usertoken.token,
            },
        })
        .then(response => response.json())
        .then(data => {
            if (data.your) {
                yourfeeddata = data.your;
                displayFeed(yourfeeddata);
            }
        })
        .catch(error => console.error('Error:', error));
    }
}

function globalfeed() {
    const usertoken = JSON.parse(window.localStorage.getItem('userconduit'));
    if (usertoken) {
        fetch('http://localhost:3000/users/globalfeed/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + usertoken.token,
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
