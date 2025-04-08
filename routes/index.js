import express from 'express';
const router = express.Router();
import validateUser from '../middleware/searchForm.js';


/* GET home page. */
router.get('/', (req, res) => {
  res.render('main/index');
});

// GET a simulated api call
router.get('/api', (req, res) => {
  const ducks = [
    { image: "/assets/images/duck_boots.png", name: 'Mallard duck', location: 'Mercury', category: 'Mallard duck' },
    { image: "/assets/images/duck_fishing.png", name: 'Mallard duck', location: 'Venus', category: 'Mallard duck' },
    { image: "/assets/images/duck_glasses.png", name: 'Mallard duck', location: 'Earth', category: 'Mallard duck' },
    { image: "/assets/images/duck_scooter.png", name: 'Mallard duck', location: 'Mars', category: 'Mallard duck' },
    { image: "/assets/images/duck_boots.png", name: 'Mallard duck', location: 'Jupiter', category: 'Mallard duck' },
    { image: "/assets/images/duck_fishing.png", name: 'Mallard duck', location: 'Saturn', category: 'Mallard duck' },
    { image: "/assets/images/duck_glasses.png", name: 'Mallard duck', location: 'Uranus', category: 'Mallard duck' },
    { image: "/assets/images/duck_scooter.png", name: 'Mallard duck', location: 'Neptune', category: 'Mallard duck' },
    { image: "/assets/images/duck_boots.png", name: 'Mallard duck', location: 'Pluto', category: 'Mallard duck' },
    { image: "/assets/images/duck_fishing.png", name: 'Mallard duck', location: 'Moon', category: 'Hooded Merganser duck' },
  ];

  if (req.headers.accept.includes('application/json')) {
    return res.json(ducks);
  }

  res.render('main/results', {ducks});
});


// GET results page
router.get('/results', (req, res, next) => {
  // Call API with user inputs
  try {
    const { image, duckName, location, duckCategory } = req.query;
    console.log(req.query, "QUERY")

    const result = [
      {
        image: image,
        name: duckName,
        location: location,
        category: duckCategory.split(',')
      }
    ];
    console.log(result, "RESULT")

    res.render('main/results', { result });
  } catch (error) {
    next(error);
  }
});


router.post('/search', validateUser, (req, res) => {
  console.log('Search route hit with validator');

  // Extract form data from the request body
  const { duckName, location, duckCategory } = req.body;

  // Prepare query string
  const queryString = new URLSearchParams({
    duckName,
    location,
    duckCategory: Array.isArray(duckCategory) ? duckCategory.join(',') : duckCategory
  }).toString();

  // Redirect to the results page with query parameters
  res.redirect(`/results?${queryString}`);
});

export default router;
