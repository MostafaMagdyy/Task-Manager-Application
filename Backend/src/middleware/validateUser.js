const validateUser = (req, res, next) => {
    const { name, email, password } = req.body;
  
    if (!name || name.trim().length < 2) {
      return res.status(400).send({ error: 'Name must be at least 2 characters long.' });
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return res.status(400).send({ error: 'Invalid email format.' });
    }
  
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;
    if (!password || password.length < 8 || !passwordRegex.test(password)) {
      return res.status(400).send({
        error: 'Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, and one digit.'
      });
    }
  
    next(); 
  };
  
  module.exports = validateUser;