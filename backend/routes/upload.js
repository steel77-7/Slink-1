const express  = require('express')
const router = express.Router();
const multer = require('multer')

const imageUploads = multer({dest:'../profilePics'})

router.post('/imageUpload',imageUploads.single('file'),(req,res)=>{
    const fileData = {
        path:req.file.path,
        originalName : req.file.originalName
    };


} );

module.exports = router;