const router = require('express').Router()

router.get('/profile',async(req,res,next)=>{
    res.send("profile")
})

module.exports = router