const express = require('express');
const router = express.Router();
const util = require('util');

const exec = util.promisify(require('child_process').exec);
router.post('/reboot',(req,res)=>{
   res.status(201).json({message:'will perform reboot'});
    exec('reboot now');
});

module.exports = router;
