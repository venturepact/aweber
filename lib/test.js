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

aweber.list.show({accountId :'1120374'}).then((result)=>{
    console.log(result);
})

// aweber.oauth.requestToken().then((result)=>{
//     console.log(result);
// },(error) => {
//     console.log(error);
// });

