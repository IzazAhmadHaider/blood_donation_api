const ratingModel=require('../models/ratingModel')

const ratingText= async (req, res) => {
    try {
      const { textField } = req.body; // Destructure data from request body
  
      // Validation (optional, but highly recommended)
      if (!textField) {
        return res.status(400).json({ message: 'Missing required field: textField' });
      }
  
      const newRatingtext = await ratingModel.create({ textField }); 
      res.status(201).json(newRatingtext); 
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  
module.exports = {
   ratingText,
   
    post: [
      {
        path: '/api/ratingText',
        method: ratingText,
      },
    ]
    };