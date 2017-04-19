const aweber = require('./aweber');


let configuration = {
    appId : '92c970d6 ',
    consumer_key : 'Ak5Pq5dyQYVvtxZIFH4aJ5D9',
    consumer_secret : 'BLlcqgfp81GxsDzTXgpyYWXMA29otrnsfjw09ZgC',
    oauth_callback : 'http://app.outgrow.local/authorize/aweber',
    oauth_token : 'AgrvvlaIBg3IoV99Vs0tTYuM',
    oauth_token_secret : 'SUkjjg2n7Ehqdbl8q4lIMnYgjbQjpbEbmKkazMPa',
    oauth_verifier : 'gzz8k4'
}

aweber.configure(configuration);

// aweber.oauth.request_token().request(
//     function(error,response){
//     if(error){
//         //handle error
//         console.log(error);
//     }else{
//         console.log(response.body);
//     }
// });

// aweber.oauth.access_token().request(
//     function(error,response){
//     if(error){
//         //handle error
//         console.log(error);
//     }else{
//         console.log(response.body);
//     }
// });


// aweber.accounts.list().request(
//     function(error,response){
//     if(error){
//         //handle error
//         console.log(error);
//     }else{
//         console.log(response.body);
//     }
// });

aweber.list.show('1120374').request(
    function(error,response){
    if(error){
        //handle error
        console.log(error);
    }else{
        console.log(response.body);
    }
});

// aweber.list.find('1120374','name=hello').request(
//     function(error,response){
//     if(error){
//         //handle error
//         console.log(error);
//     }else{
//         console.log(JSON.parse(response.body));
//     }
// });
