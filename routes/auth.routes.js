const multer = require('multer');
const router = require('express').Router();
const ProblemReport = require('../models/report'); // Adjust the path accordingly

const User1 = require('../models/user.models')
const {authSchema} = require('../helpers/auth_schema')
const CreateHttpError = require('http-errors')

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
    try{
        const result = await authSchema.validateAsync(req.body)
        const user = await User.findOne({email:result.email})
        if(!user) throw CreateHttpError.NotFound("Invalid email")

        const isMatch =  await user.isValidPassword(result.password)
        if(!isMatch) throw CreateHttpError.Unauthorized("Username/password invalid")
       
        //const accessToken =  await signAccessToken(user.id)
        console.log("working")

       res.redirect('./home')
   
    }

    catch(error){
        if(error.isJoi === true) {
        return next(CreateHttpError.BadRequest("Invalid email/password"))
        }
        next(error)
    }
// })



router.get('/register',async(req,res,next)=>{
    res.render("register")
})

router.post('/register',async(req,res,next)=>{

    try{
   const {email,password} = req.body   

   const result = await authSchema.validateAsync(req.body) 
     
    console.log(result)

    //if(!email||!password) throw CreateError.BadRequest()

   const doesExist = await User1.findOne({'email':result.email})
    if(doesExist) throw CreateHttpError.Conflict(`${result.email} already exist`)

    const user = new User1(result)
   const savedUser = await user.save()
   //const accessToken = await signAccessToken(savedUser.id)
   res.redirect('/home')
     }
    catch(error){
        
       next(error)
   }
})

router.get('/user',async(req,res,next)=>{
    res.render('report')
})

router.get('/logout',async(req,res,next)=>{
    req.logout()
    res.redirect('/')
})


module.exports = router
