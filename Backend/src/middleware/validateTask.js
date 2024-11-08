const validateTask = (req, res, next) => {
    const { title, description, completed } = req.body;
  
    if (!title || title.trim().length === 0) {
      return res.status(400).send({ error: "Title cannot be empty." });
    }
  
    if (!description || description.trim().length === 0) {
      return res.status(400).send({ error: "Description cannot be empty." });
    }
  
    if (completed !== undefined && typeof completed !== 'boolean') {
      return res.status(400).send({ error: "Completed must be a boolean." });
    }
  
    next();
  };
  
  module.exports = validateTask;