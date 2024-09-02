// Custom validation middleware for email
const validateEmail = (req, res, next) => {
    const email = req.body;
    const trimemail=email.trim();
    const errors = [];
 
    if (!isValidEmail(trimemail)) {
      errors.push({ msg: 'Invalid email address' });
    }
 
    // Assign the errors to req.validationErrors
    req.validationErrors = req.validationErrors || [];
    req.validationErrors.push(...errors);
 
    next();
  };
  const ValidateConfirmpassword = (req,res,next) =>{
    const confirm=req.body.confirmpassword;
    const password = req.body.password;
    const errors=[];

    if(!isvalidConfirmpassword(confirm,password))
      {
        errors.push({msg:"password and confirm password doesn't match"})
      }
    req.validationErrors = req.validationErrors || [];
    req.validationErrors.push(...errors);
    next();
  }
 
  // Custom validation middleware for password
  const validatePassword = (req, res, next) => {
    const password =req.body.password;
    console.log('password not get',password,typeof(password))
    const errors = [];
 
    if (!isValidPassword(password)) {
      errors.push({ msg: 'Password must meet certain criteria' });
    }
 
    // Assign the errors to req.validationErrors
    req.validationErrors = req.validationErrors || [];
    req.validationErrors.push(...errors);
 
    next();
    console.log(req.validationErrors,"hi 45 custom")
  };
 


// Custom email validation logic
const isValidEmail = (email) => {
  // Implement your custom email validation logic here
  // Example: Check if the email follows a specific format using regular expression
  console.log("email",email)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};


// Custom password validation logic
const isValidPassword = (password) => {
  // Implement your custom password validation logic here
  // Example: Check if the password is at least 8 characters long
  return password.length >= 8;
};

const  isvalidConfirmpassword = (confirm,password) =>
  {
    return password==confirm;
  }
const isAuthenticated = (req,res,next) =>{
  if(req.session && req.session.userEmail)
    {
      return next();
    }
    res.redirect('/')
}
const isAuthenticateddomain = (allowedDomain) => (req,res,next) =>{
    if(req.session && req.session.userEmail)
      {
        const userEmail = req.session.userEmail;
        console.log('User Email :',userEmail);
        if(!allowedDomain || userEmail.endsWith(allowedDomain))
          {
            return next();
          }else{
            return res.status(403).send('unauthorized')
          }
      }
      console.log('user email not found in session',req.session);
      res.redirect('/')
}
// for verifying token for protected route
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  var check=token.split(' ')[1]
  console.log("token 97 custom",token,"oj",check,typeof(check));
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized - Missing token' });
  }

  jwt.verify(token.split(' ')[1],process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log(err)
      return res.status(401).json({ message: 'Unauthorized - Invalid token' });
    }
    console.log(req.userId,"ff",decoded.userId)
    req.userId = decoded.userId;
    next();
  });
};
module.exports = { validateEmail, validatePassword,ValidateConfirmpassword,isAuthenticated,isAuthenticateddomain,verifyToken };