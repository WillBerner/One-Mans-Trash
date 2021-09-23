const multer = require('multer');
const Datauri = require('datauri/parser');
const path = require('path');
const storage = multer.memoryStorage();
const multerUploads = multer({storage});
const dUri = new Datauri();


const datauri = req => { 
    console.log(req.files);
    return dUri.format(path.extname(req.files.fileupload.name).toString(), 
    req.files.fileupload.data);
}

module.exports = {multerUploads, datauri }