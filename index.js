const express = require('express');
const app = express();

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

let images = [];
// get images
apiRouter.get('/images', (req, res) =>{
    res.send(images);
});

//submit image
apiRouter.post('/images', (req,res) => {
    updateImages(req.body);
    res.send(images);
});

//updateImages
function updateImages(newImage) {
    images.push(newImage);
    if (images.length > 5) {
        images.length = 5;
    }
}

// Return the application's default page if the path is unknown
app.use((_req, res) => {
    res.sendFile('index.html', {root: 'public'});
});
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});