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

#### showById : returns integrations_collection_link and lists_collection_link associated to account Id

``` javascript

aweber.account.showById({
    accountId : '<accountId>'
}).then((result)=>{
    console.log(result);
}).catch((error)=> {
    console.log(error);
})

```

#### findSubscribers : returns a Collection of all Subscribers on any List in the Account that matches the search parameters

``` javascript

aweber.account.findSubscribers({
    accountId : '<accountId>'
},{
    ad_tracking : '<ad_tracking>',
    area_code : '<area_code>',
    city : '<city>',
    country : '<country>',
    custom_fields : '<custom_fields>', // json object of CustomField ,
    name : '<name>',
    email : '<email>'
    // ... for more fields refer https://labs.aweber.com/docs/reference/1.0#account_entry
}).then((result)=>{
    console.log(result);
}).catch((error)=> {
    console.log(error);
})

```

#### getWebForms : returns a list of all active WebForms for all Lists on this Account.

``` javascript

aweber.account.getWebForms({
    accountId : '<accountId>'
}).then((result)=>{
    console.log(result);
}).catch((error)=> {
    console.log(error);
})

```

#### getWebFormSplitTests : returns a list of all active WebForm Split Tests for all Lists on this Account

``` javascript

aweber.account.getWebFormSplitTests({
    accountId : '<accountId>'
}).then((result)=>{
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

#### showById : returns Broadcast message details by it's id

``` javascript 
aweber.broadcast.showById({
        accountId : '< accountId >',
        listId : '< listId >',
        broadcastId : '<broadcastId>'
    })
    .then((result)=>{
        console.log(result);
    }).catch((error)=> {
        console.log(error);
    })

```

#### delete : delete a broadcast message

``` javascript 
aweber.broadcast.delete({
        accountId : '< accountId >',
        listId : '< listId >',
        broadcastId : '<broadcastId>'
    })
    .then((result)=>{
        console.log(result);
    }).catch((error)=> {
        console.log(error);
    })

```

#### update : Update Broadcast message 

``` javascript 
aweber.broadcast.delete({
        accountId : '< accountId >',
        listId : '< listId >',
        broadcastId : '<broadcastId>'
    },{
        body_html : '<body_html>',
        body_text : '<body_text>',
        subject : '<subject>',
        notify_on_send : '<notify_on_send>',
        facebook_integration : '<facebook_integration>'
        // for more parameters refer https://labs.aweber.com/docs/reference/1.0#broadcast_entry
    })
    .then((result)=>{
        console.log(result);
    }).catch((error)=> {
        console.log(error);
    })

```

## Broadcast Campaign

#### showById : Represents a Broadcast Campaign

``` javascript 
aweber.broadcastCampaign.showById({
        accountId : '< accountId >',
        listId : '< listId >',
        broadcastId : '<broadcastId>'
    })
    .then((result)=>{
        console.log(result);
    }).catch((error)=> {
        console.log(error);
    })

```

## Broadcast Scheduler

#### schedule : allows the scheduling of broadcast messages

``` javascript 
aweber.broadcastScheduler.schedule({
        accountId : '< accountId >',
        listId : '< listId >',
        broadcastId : '<broadcastId>'
    },{
        scheduled_for : '<scheduled_for>' // DateTime ISO 8601 format (Scheduled time for sending broadcast message.)
    })
    .then((result)=>{
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

#### showById : a followup or Broadcast Campaign 

``` javascript

aweber.campaign.showById({
    accountId : '<accountId>',
    listId : '<listId>',
    broadcastId : '<broadcastId>'
}).then((result)=>{
    console.log(result);
}).catch((error)=> {
    console.log(error);
})

``` 

## Cancel Broadcast 

#### cancel : canceling of broadcast messages

``` javascript

aweber.cancelBroadcast.cancel({
    accountId : '<accountId>',
    listId : '<listId>',
    broadcastId : '<broadcastId>'
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

#### showById : returns event where a Subscriber clicks a Link in a Message.
``` javascript 
aweber.click.showById({
    accountId : '<accountId >',
    listId : '<listId>',
    campaignId : '<campaignId>',
    linkId : '<linkId>',
    clickId : '<clickId>'
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

#### showById : return a Component of a WebFormSplitTest

``` javascript 

aweber.component.showById({
    accountId : '<accountId >',
    listId : '<listId>',
    campaignId : '<campaignId>',
    linkId : '<linkId>',
    componentId : '<componentId>'
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
.then((result)=>{
    console.log(result);
}).catch((error)=> {
    console.log(error);
})

```

## Integration

#### show : returns collection of 3rd Party Service Integrations

``` javascript

aweber.integration.show({accountId : '<accountId>'})
.then((result)=>{
    console.log(result);
}).catch((error)=> {
    console.log(error);
})

```

## Link

#### show : return collection of Links appearing in a Campaign 

``` javascript

aweber.link.show({
    accountId : '<accountId>',
    listId : '<linkId>',
    campaignId : '<campaignId>'
}).then((result)=>{
    console.log(result);
}).catch((error)=> {
    console.log(error);
})

```

## List 

#### show : returns collection of Subscriber Lists

``` javascript

aweber.list.show({
    accountId : '<accountId>'
}).then((result)=>{
    console.log(result);
}).catch((error)=> {
    console.log(error);
})

```

#### find :  returns collection of Lists matching the given search parameters present in second argument

``` javascript

aweber.list.find({
    accountId : '<accountId>'
},{
    name : '<name of list>'
}).then((result)=>{
    console.log(result);
}).catch((error)=> {
    console.log(error);
})

```

## Message

#### show : returns collection of sent message events

``` javascript

aweber.message.show({
    accountId : '<accountId>',
    listId : '<listId>',
    campaignId : '<campaignId>'
}).then((result)=>{
    console.log(result);
}).catch((error)=> {
    console.log(error);
})

```

#### getSubscribers : returns a collection of Subscribers that were sent this Campaign

``` javascript

aweber.message.getSubscribers({
    accountId : '<accountId>',
    listId : '<listId>',
    campaignId : '<campaignId>'
}).then((result)=>{
    console.log(result);
}).catch((error)=> {
    console.log(error);
})

```


## Open

#### show : returns collection of Open events

``` javascript

aweber.open.show({
    accountId : '<accountId>',
    listId : '<listId>',
    campaignId : '<campaignId>',
    messageId : '<messageId>',
    openId : '<openId>'
}).then((result)=>{
    console.log(result);
}).catch((error)=> {
    console.log(error);
})

```

## Stat

#### show : returns collection of Broadcast Campaign Stats

``` javascript

aweber.stat.show({
    accountId : '<accountId>',
    listId : '<listId>',
    campaignId : '<campaignId>'
}).then((result)=>{
    console.log(result);
}).catch((error)=> {
    console.log(error);
})

```

## Subscriber

#### show : return collection of subscribers


``` javascript

aweber.subscriber.show({
    accountId : '<accountId>',
    listId : '<listId>',
}).then((result)=>{
    console.log(result);
}).catch((error)=> {
    console.log(error);
})

```

#### find : returns a collection of Subscribers that matches the given search parameters

``` javascript

aweber.subscriber.find({
    accountId : '<accountId>',
    listId : '<listId>',
},{
    ad_tracking : '<ad_tracking>',
    area_code : '<area_code>',
    city : '<city>',
    country : '<country>',
    custom_fields : '<custom_fields>' // in json object Custom Field Data,
    status : '<status>',
    name : '<name>'
    // ... and other Subscriber collection field please refer https://labs.aweber.com/docs/reference/1.0#subscriber_collection
}).then((result)=>{
    console.log(result);
}).catch((error)=> {
    console.log(error);
})

```

#### create : add a subscriber to a list

``` javascript

aweber.subscriber.create({
    accountId : '<accountId>',
    listId : '<listId>',
},{
    custom_fields : '<custom_fields>' // in json object Custom Field Data,
    tags : '<tags>',
    name : '<name>'
    // ... and other Subscriber collection field please refer https://labs.aweber.com/docs/reference/1.0#subscriber_collection
}).then((result)=>{
    console.log(result);
}).catch((error)=> {
    console.log(error);
})

```

## Tracked Event 

#### show : returns A collection of TrackedEvents

``` javascript

aweber.trackedEvent.show({
    accountId : '<accountId>',
    listId : '<listId>',
    campaignId : '<campaignId>',
    messageId : '<messageId>'
}).then((result)=>{
    console.log(result);
}).catch((error)=> {
    console.log(error);
})

```

## WebFormSplitTests

#### show : returns collection of WebFormSplitTests


``` javascript

aweber.webFormSplitTest.show({
    accountId : '<accountId>',
    listId : '<listId>',
}).then((result)=>{
    console.log(result);
}).catch((error)=> {
    console.log(error);
})

```

## WebForm Collection

#### show : returns collection of WebForms 


``` javascript

aweber.webForm.show({
    accountId : '<accountId>',
    listId : '<listId>',
}).then((result)=>{
    console.log(result);
}).catch((error)=> {
    console.log(error);
})

```

