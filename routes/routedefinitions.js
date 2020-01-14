const express = require('express');
const router = express.Router();

const yelpFusion = require('./../helpers/yelp-fusion');

router.get('/', async function(req, res){
    let term = req.query.term;
    let location = req.query.location;

    let businesses = null;

    try{
        if(term && location){

            businesses = await yelpFusion.search(term, location);
            businesses = await Promise.all(
                businesses.map(async function(business){
                    business.reviews = await yelpFusion.getReview(business.id);
                    return business;
                })
            );

            console.log(businesses[0].reviews[0].user)
        }

        res.render('index',{
            title: 'Yelp fusion demonstration',
            businesses: businesses
        });
    }catch(err){
        res.render('error',{
            message: err.message
        })
    }
});

module.exports = router;