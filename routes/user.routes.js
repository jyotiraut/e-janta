const router = require('express').Router()

router.get('/alert',async(req,res,next)=>{
    res.send("alert")
})



module.exports = router