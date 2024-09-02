document.querySelector('.form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting the default way

    // Retrieve the values from the input fields
    const email = document.querySelector('.emailinput').value;
    const password = document.querySelector('.passwordinput').value;
    // Now use these variables in the fetch request
    fetch('http://localhost:3000/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    })
    .then(response => {
        return response.json().then(data => {
            if (response.ok) {
                // Login successful
                console.log(data);
                window.localStorage.setItem('userconduit',JSON.stringify(data))
                var usertoken = window.localStorage.getItem('userconduit');
                usertoken = JSON.parse(usertoken);
                alert("Login successful!");
                console.log( usertoken["id"],usertoken.token)
                window.location.href='http://127.0.0.1:5500/Getarticle/getarticle.html'
                // You can now use the token or redirect the user, etc.
            } else {
                // Handle errors (e.g., incorrect username/password)
                alert(data.errors[0].msg);
            }
        });
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred during login.');
    });
});