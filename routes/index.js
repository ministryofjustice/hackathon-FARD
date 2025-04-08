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


router.post('/search', validateUser, (req, res) => {
    console.log('Search route hit');
    res.send('Search completed');
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



router.post('/search', validateUser, (req, res) => {
    console.log('Search route hit');
    res.send('Search completed');
});

export default router;
