# aweber

Aweber API Connection Library for Node.js Applications


## Abstract

aweber, which is designed to be a wrapper of aweber REST API in Node.js, enables aweber application development in event-driven style.
It capsulates the access to REST API end point in asynchronous JavaScript promise call.

## Install

If you are using aweber as an API library in your Node.js project :

<pre>
  $ npm install aweber
</pre>

If you want to get the latest from GitHub :

<pre>
  $ git clone git://github.com/venturepact/aweber.git 
  $ cd aweber
  $ npm link
</pre>

## API Usage

### Authorization

#### Authorization Url

The first part is to get authorization url and oauth_token_secret

```javascript
var aweber =  require('aweber');

var configuration = {
    appId : '<your aweber app id>',
    consumer_key : '<your aweber consumer_key>',
    consumer_secret : '<your aweber consumer_secret>',
    oauth_callback : '<your aweber oauth_callback>',
}
aweber.configure(configuration);

aweber.oauth.authorizeUrl().then((result)=>{
     console.log(result);
},(error) => { 
    console.log(error);
});
```

#### Access_token

```javascript
aweber.oauth.accessToken({
        oauth_token : '<oauth_token that you get after visiting authorize url>',
        oauth_verifier : '<oauth_verifier that you get after visiting authorize url>',
        oauth_token_secret : '<oauth_token_secret that you get from authorizeUrl() function>'
    }).then((result)=>{
    console.log(result);
    }).catch((error)=> {
        console.log(error);
    })
```
The ouptut of this function will be newly generated oauth_token and oauth_token_secret which will be used in configuration to call all aweber rest endpoints. The final configuration object will be like this

``` javascript
var configuration = {
    appId : '<your aweber app id>',
    consumer_key : '<your aweber consumer_key>',
    consumer_secret : '<your aweber consumer_secret>',
    oauth_token : '<newly generated oauth_token from oauth.accessToken() function >',
    oauth_token_secret : '< newly generated in oauth_token_secret from oauth.accessToken() function >'
}
aweber.configure(configuration);
```


# Collections Endpoints

## Accounts

#### show : show all account resources

``` javascript

aweber.accounts.show()
    .then((result)=>{
        console.log(result);
    }).catch((error)=> {
        console.log(error);
    })

```



