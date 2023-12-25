const multer = require('multer');
const router = require('express').Router();
const ProblemReport = require('../models/report'); // Adjust the path accordingly

// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // specify the directory where you want to store uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // specify how the file should be named
  },
});

// Create the multer instance
const upload = multer({ storage: storage });

// ... (rest of your code)

router.post('/user', upload.single('image'), async (req, res) => {
  // Handle the form submission and save user data to the database

  // Create a new problem report
  const newReport = new ProblemReport({
    description: req.body.description,
    title: req.body.title,
    image: req.file.filename,
  });

  // Save the report to the database
  try {
    await ProblemReport.insertMany([newReport]);
    res.render('home');
  } catch (error) {
    res.status(500).send('Error submitting report');
  }
});

// ... (rest of your code)

module.exports = router;
