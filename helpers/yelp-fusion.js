const request = require('request');

async function search(term, location){
    console.log("inside yelp search")
    return new Promise((resolve, reject)=>{
        request({
            method: 'GET',
            uri: `${process.env.YELP_API_BASE}businesses/search`,
            'auth': {
                'bearer': process.env.YELP_API_KEY
            },
            qs:{
                term: term,
                location: location,
                sort_by: 'rating',
                limit: 5
            }
        }, function(err, response, body){
            if( err ){

                reject(err)
            } else {

                resolve(JSON.parse(body).businesses);
            }
        });
    });
}

async function getReview(id){
    console.log("getReview ", id);
    return new Promise((resolve, reject)=>{
        request({
            method: 'GET',
            uri: `${process.env.YELP_API_BASE}businesses/${id}/reviews`,
            'auth': {
                'bearer': process.env.YELP_API_KEY
            }
        }, function(err, response, body){
            if( err ){

                reject(err)
            } else {
                
                resolve(JSON.parse(body).reviews);
            }
        });
    });
}

module.exports = {
    search,
    getReview
}