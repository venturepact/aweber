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

#### show : returns all account resources

``` javascript

aweber.account.show()
    .then((result)=>{
        console.log(result);
    }).catch((error)=> {
        console.log(error);
    })

```

## Broadcasts 

#### show : returns list of broadcast messages

``` javascript

aweber.broadcast.show({
        accountId : '< accountId >',
        listId : '< listId >'
    })
    .then((result)=>{
        console.log(result);
    }).catch((error)=> {
        console.log(error);
    })

```

#### create : create a broadcast message

You can create broadcast message by adding all the neccessary properties in second arguments

``` javascript 

aweber.broadcast.create({ 
    accountId : '< accountId >', listId : '< listId >'},{
    body_html : '<body_html>',
    body_text : '<body_text>',
    click_tracking_enabled : '<click_tracking_enabled>',
    exclude_lists : '< List Of List Uris >',
    ....
}).then((result)=>{
    console.log(result);
}).catch((error)=> {
    console.log(error);
})

``` 

## Campaign

#### show : returns collection of Followup or Broadcast Campaigns

``` javascript

aweber.campaign.show({
    accountId : '<accountId>',
    listId : '<listId>'
}).then((result)=>{
    console.log(result);
}).catch((error)=> {
    console.log(error);
})

``` 

#### find : returns collection of Campaign according campaign_type

``` javascript 

aweber.campaign.find({
    accountId : '<accountId>',
    listId : '<listId>'
},{
    campaign_type : '<campaign_type>' // Enum "b", "f"
}).then((result)=>{
    console.log(result);
}).catch((error)=> {
    console.log(error);
})

```

## Click

#### show : returns collection of Click events
``` javascript 
aweber.click.show({
    accountId : '<accountId >',
    listId : '<listId>',
    campaignId : '<campaignId>',
    linkId : '<linkId>'
}).then((result)=>{
    console.log(result);
}).catch((error)=> {
    console.log(error);
})

```

## Component

#### show : returns collection of WebFormSplitTest Components

``` javascript 

aweber.component.show({
    accountId : '<accountId >',
    listId : '<listId>',
    campaignId : '<campaignId>',
    linkId : '<linkId>'
}).then((result)=>{
    console.log(result);
}).catch((error)=> {
    console.log(error);
})

```

## Custom Field

#### show : returns collection of CustomFields for a List

``` javascript
aweber.customField.show({
    accountId : '<accountId>',
    listId : '<listId>'
}).then((result)=>{
    console.log(result);
}).catch((error)=> {
    console.log(error);
})

```

#### create : create a custom field for a list

``` javascript 

aweber.customField.create({
    accountId : '<accountId>',
    listId : '<listId>'
},{
    name : '<name>'  //Name of CustomField
}).then((result)=>{
    console.log(result);
}).catch((error)=> {
    console.log(error);
})

```

## Doc

#### show : return all docs

``` javascript

aweber.doc.show({})

```