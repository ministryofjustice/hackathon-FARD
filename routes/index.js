import express from 'express';
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('main/index');
});

// Make an API call with `Axios` and `middleware-axios`
// GET users from external API
router.get('/users', async (req, res, next) => {
  try {
      // Use the Axios instance attached to the request object
      const response = await req.axiosMiddleware.get('https://jsonplaceholder.typicode.com/users');
      res.json(response.data);
  } catch (error) {
      next(error);
  }
});

// GET results page
router.get('/results', (req, res, next) => {
  try {
    const { image, name, location, category } = req.query;

    const result = [
      {
        image: image || "/images/default-duck.png",
        name: name || "No Name Provided",
        location: location || "No Location Provided",
        category: category || ["No Categories Provided"]
      }
    ];

    res.render('main/results', { result });
  } catch (error) {
    next(error);
  }
});

 

export default router;
