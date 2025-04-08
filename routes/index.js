import express from 'express';
const router = express.Router();

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


export default router;
