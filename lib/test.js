const aweber = require('./aweber');

let configuration = {
    appId : '92c970d6 ',
    consumer_key : 'Ak5Pq5dyQYVvtxZIFH4aJ5D9',
    consumer_secret : 'BLlcqgfp81GxsDzTXgpyYWXMA29otrnsfjw09ZgC',
    oauth_callback : 'http://app.outgrow.local/authorize/aweber',
    oauth_token_secret: 'hvmyZfKRSPxYEToDlRqDROWVXl3WLAT6q1kQdufv',
    oauth_token: 'AgMNi0SdDSsP8hM6bE1xd2ip'
}

aweber.configure(configuration);

aweber.list.show({accountId :'1120374'}).then((result)=>{
    console.log(result);
});

// aweber.oauth.authorizeUrl().then((result)=>{
//     console.log(result);
// },(error) => { 
//     console.log(error);
// });

// aweber.oauth.accessToken({
//         oauth_token : 'AquFkwnRVItSTbvQ8U44cVbD',
//         oauth_verifier : 'hhbd20',
//         oauth_token_secret : 'snLXq1RZnOrYHhU8r6hfhjBQ8yq6VRgM4tg5ZFTK'
//     }).then((result)=>{
//     console.log(result);
//     }).catch((error)=> {
//         console.log(error);
//     })

