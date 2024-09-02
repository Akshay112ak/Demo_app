document.querySelector('.form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting the default way

    // Retrieve the values from the input fields
    const email = document.querySelector('.emailinput').value;
    const username = document.querySelector('.usernameinput').value;
    const password = document.querySelector('.passwordinput').value;
    var users={email:email,username:username,password:password};
    // Now use these variables in the fetch request
    fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email,username,password} ),
    })
    .then(response =>{ 
        return response.json().then(data => {
            if (response.ok) {
                // Login successful
                console.log(data);
                alert("signup successful!");
                // You can now use the token or redirect the user, etc.
            } else {
                // Handle errors (e.g., incorrect username/password)
                
                alert(data.errors[0].msg);
            }
        });
    })
    .catch((error) => console.log(error, "error"));
});