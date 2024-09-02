document.querySelector('.form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting the default way

    // Retrieve the values from the input fields
    const articletitle = document.getElementById('articletitle').value;
    const about = document.getElementById('about').value;
    const articlesummary = document.getElementById('articlesummary').value;
    const tags = document.getElementById('tags').value;
    var usertoken = window.localStorage.getItem('userconduit');
    console.log(usertoken.token,"nmfjj")
    usertoken = JSON.parse(usertoken);
    console.log(usertoken.token,"nm1")
    // Now use these variables in the fetch request
    fetch('http://localhost:3000/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' ,'Authorization':"Bearer "+usertoken.token},
        body: JSON.stringify({ articletitle, about,articlesummary,tags }),
    })
    .then(response => {
        return response.json().then(data => {
            if (response.ok) {
                // Login successful
                console.log(data);
                
                alert("artcle created successful!");
                
                // You can now use the token or redirect the user, etc.
            } 
        });
    })
    .catch(error => {
        console.log('Error:', error);
        alert('An error occurred during article.');
    });
});
function Logout()
{
    window.localStorage.removeItem('userconduit');
    var usertoken = window.localStorage.getItem('userconduit');
    console.log(usertoken,"nmf")
    window.location.href='http://127.0.0.1:5500/Home/home.html'
}