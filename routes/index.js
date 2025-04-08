import express from 'express';
const router = express.Router();
import validateUser from '../middleware/searchForm.js';


/* GET home page. */
router.get('/', (req, res) => {
  res.render('main/index');
});


router.post('/search', validateUser, (req, res) => {
  console.log("hitting search page")
  // // Extract form data from the request body
  // const { duckName, location, duckCategory } = req.body;
  

  // // Prepare query string
  // const queryString = new URLSearchParams({
  //   duckName,
  //   location,
  //   duckCategory: Array.isArray(duckCategory) ? duckCategory.join(',') : duckCategory
  // }).toString();

  // // Redirect to the results page with query parameters
  // res.redirect(`/results?${queryString}`);

  res.redirect('/results');
});

// GET results page
router.get('/results', async (req, res) => {
  console.log("hitting results page")
  // Call API with user inputs
  try {
    const response = await req.axiosMiddleware.get(
      '/api',
      {
        email_address: formData.email,
        template_id: templateId,
        personalisation: { 
          name: formData.yourName, 
          typeOfProblem: formData.problemDescription, 
          moreDetail: formData.moreDetail || "No additional information entered"
        }, 
      },
    );

    res.render('main/results', response);
  } catch  {
    console.log('error')
  }
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

  res.json(ducks);
});

export default router;
