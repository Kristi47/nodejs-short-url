var express = require('express')
const shortid = require('shortid');
const {Url} = require('./../models/url.js');
const {checkUrl} = require('./../../helper/helper.js');
var router = express.Router();

router.get('/short',(req,res) => {
    
    let newUrl = req.query.url;
    newUrl = checkUrl(newUrl);
    console.log(newUrl);
    Url.find({originalUrl:newUrl}).then((url) => {
        
        if(url.length){
            return res.status(200).json({message: 'This URL already exists',status: 'exist'});
        }

        let urlData = new Url({
            originalUrl:newUrl,
            shortUrl: shortid.generate()
        });

        urlData.save().then((url) => {
            res.status(200).json({ message: `http://localhost:3000/${url.shortUrl}`,status: 'success'});
        }).catch(err => {
            return res.status(200).json({ message: 'Not a valid URL',status: 'invalid'});
        });

    }).catch(err => {
        return res.status(400).json({ message: '',status: 'problem'});
    });
});

router.get('/',(req,res) => {
   res.redirect('/home');
});

router.get('/home',(req,res) => {
    res.render("home.hbs",{
        pageTitle:"Short URL"
    });
});

router.get('/list',(req,res) => {
    Url.find().then((all_url)=>{
        return res.status(200).jsonp({ message: all_url,status: 'success'});
    }).catch(err => {
        return res.status(400).jsonp({ message: 'There was a problem loading the URLs',status: 'problem'});
    })
});

router.get('/:shortUrl',(req,res) =>{

    Url.find({shortUrl: req.params.shortUrl}).then((oldUrl) => {
       if(oldUrl.length){
            res.redirect(`https://${oldUrl[0].originalUrl}`);
       }
    }).catch(err => {
        res.status(400).send();
    });

});

module.exports = router;