var end_points = {
    "oauth" : [
       [
        "authorizeUrl",
        "POST",
        "/oauth/request_token",
        [],
        null
       ],
       [ 
        "accessToken",
        "POST",
        "/oauth/access_token",
        [],
        null
       ],
    ],
    "account" : [
        [
            "show",
            "GET",
            "/accounts",
            [],
            null
        ],
        //Entry Endpoints
        [
            "showById",
            "GET",
            "/accounts/:accountId",
            ['accountId'],
            null
        ],
        [
            "findSubscribers",
            "GET",
            "/accounts/:accountId",
            ['accountId'],
            'findSubscribers'
        ],
        [
            "getWebForms",
            "GET",
            "/accounts/:accountId",
            ['accountId'],
            'getWebForms'
        ],
        [
            "getWebFormSplitTests",
             "GET",
            "/accounts/:accountId",
            ['accountId'],
            'getWebFormSplitTests'
        ]

    ],
    "broadcast" : [
        [
            "show",
            "GET",
            "/accounts/:accountId/lists/:listId/broadcasts",
            ['accountId', 'listId'],
            null
        ],
        [
            "create",
            "POST",
            "/accounts/:accountId/lists/:listId/broadcasts",
            ['accountId', 'listId'],
            null
        ],
        // Entry Endpoints
        [
            "showById",
            "GET",
            "/accounts/:accountId/lists/:listId/broadcasts/:broadcastId",
            ['accountId', 'listId','broadcastId'],
            null
        ],
        [
            "delete",
            "DELETE",
            "/accounts/:accountId/lists/:listId/broadcasts/:broadcastId",
            ['accountId', 'listId','broadcastId'],
            null
        ],
        [
            "update",
            "PUT",
            "/accounts/:accountId/lists/:listId/broadcasts/:broadcastId",
            ['accountId', 'listId','broadcastId'],
            null
        ]
    ],
    "broadcastCampaign" : [
        [
            "showById",
            "GET",
            "accounts/:accountId/lists/:listId/campaigns/:broadcastId"
            ['accountId', 'listId','broadcastId'],
            null
        ]
    ],
    "broadcastScheduler" : [
        [
            "schedule",
            "POST",
            "/accounts/:accountId/lists/:listId/broadcasts/:broadcastId/schedule"
            ['accountId', 'listId','broadcastId'],
            null
        ]
    ],
    "campaign" : [
        [
            "show",
            "GET",
            "/accounts/:accountId/lists/:listId/campaigns",
            ["accountId","listId"],
            null
        ],
        [
            "find",
            "GET",
            "/accounts/:accountId/lists/:listId/campaigns",
            ["accountId","listId"],
            "find"
        ],
        // Entry Endpoint
        [
            "showById",
            "GET",
            "/accounts/:accountId/lists/:listId/campaigns/:campaignId",
            ["accountId","listId","campaignId"],
            null
        ]
    ],
    "cancelBroadcast" : [
        [
            "cancel",
            "POST",
            "/accounts/:accountId/lists/:listId/broadcasts/:broadcastId/cancel",
            ["accountId","listId",":broadcastId"],
            null
        ]
    ],
    "click" : [
        [
            "show",
            "GET",
            "accounts/:accountId/lists/:listId/campaigns/:campaignId/links/:linkId/clicks",
            ["accountId","listId","campaignId","linkId"],
            null
        ],
        //entry 
        [
            "showById",
            "GET",
            "accounts/:accountId/lists/:listId/campaigns/:campaignId/links/:linkId/clicks/:clickId",
            ["accountId","listId","campaignId","linkId","clickId"],
            null
        ]
    ],
    "component" : [
        [
            "show",
            "GET",
            "accounts/:accountId/lists/:listId/web_form_split_tests/:webFormSplitTestsId/components",
            ["accountID","listId","webFormSplitTestsId"],
            null
        ],
        //Entry
        [
            "showById",
            "GET",
            "accounts/:accountId/lists/:listId/web_form_split_tests/:webFormSplitTestsId/components/:componentId",
            ["accountId","listId","webFormSplitTestsId","componentId"],
            null
        ]
    ],
    "customField" : [
        [
            "show",
            "GET",
            "/accounts/:accountId/lists/:listId/custom_fields",
            ["accountId", "listId"],
            null
        ],
        [
            "create",
            "POST",
            "/accounts/:accountId/lists/:listId/custom_fields",
            ["accountId", "listId"],
            "create"
        ],
        //Entry
        [
            "showById",
            "GET",
            "/accounts/:accountId/lists/:listId/custom_fields/:customFieldId",
            ["accountId", "listId","customFieldId"],
            null
        ],
        [
            
            "update",
            "PATCH",
            "/accounts/:accountId/lists/:listId/custom_fields/:customFieldId",
            ["accountId", "listId","customFieldId"],
            null
        ],
        [
            
            "delete",
            "DELETE",
            "/accounts/:accountId/lists/:listId/custom_fields/:customFieldId",
            ["accountId","listId","customFieldId"],
            'delete'
        ]
        
    ],
    "doc" : [
        [
            "show",
            "POST",
            "/doc",
            [],
            null
        ],
        [
            "showById",
            "POST",
            "/doc/:docId",
            ['docId'],
            null
        ]
    ],
    "integration" : [
        [
            "show",
            "GET",
            "/accounts/:accountId/integrations",
            ['accountId'],
            null
        ],
        [
            "showById",
            "GET",
            "/accounts/:accountId/integrations/:integrationId",
            ['accountId','integrationId'],
            null
        ]
    ],
    "link" : [
        [
            "show",
            "GET",
            "/accounts/:accountId/lists/:listId/campaigns/:campaignId/links",
            ['accountId','listId','campaignId'],
            null
        ],
        [
            "showById",
            "GET",
            "/accounts/:accountId/lists/:listId/campaigns/:campaignId/links/:linkId",
            ['accountId','listId','campaignId','linkId'],
            null
        ]
    ],
    "list" : [
        [
            "show",
            "GET",
            "/accounts/:accountId/lists",
            ['accountId'],
            null
        ],
        [
            "find",
            "GET",
            "/accounts/:accountId/lists",
            ['accountId'],
            "find"
        ],
         [
            "showById",
            "GET",
            "/accounts/:accountId/lists/:listId",
            ['accountId','listId'],
            null
        ],
    ],
    "message" : [
        [
            "show",
            "GET",
            "/accounts/:accountId/lists/:listId/campaigns/:campaignId/messages",
            ["accountId","listId","campaignId"],
            null
        ],
        [
            "getSubscribers",
            "GET",
            "/accounts/:accountId/lists/:listId/campaigns/:campaignId/messages",
            ["accountId","listId","campaignId"],
            "get_subscribers"
        ],
        [
            "showById",
            "GET",
            "/accounts/:accountId/lists/:listId/campaigns/:campaignId/messages/:messageId",
            ["accountId","listId","campaignId","messageId"],
            null
        ],
    ],
    "open" : [
        [
            "show",
            "GET",
            "/accounts/:accountId/lists/:listId/campaigns/:campaignId/messages/:messageId/opens",
            ['accountId','listId','campaignId','messageId'],
            null
        ],
        [
            "showById",
            "GET",
            "/accounts/:accountId/lists/:listId/campaigns/:campaignId/messages/:messageId/opens/:openId",
            ['accountId','listId','campaignId','messageId','openId'],
            null
        ]
    ],
    "stat" : [
        [
            "show",
            "GET",
            "/accounts/:accountId/lists/:listId/campaigns/:campaignId/stats",
            ['accountId','listId','campaignId'],
            null
        ],
        [
            "showById",
            "GET",
            "/accounts/:accountId/lists/:listId/campaigns/:campaignId/stats/:statId",
            ['accountId','listId','campaignId','statId'],
            null
        ]
    ],
    "subscriber" : [
        [
            "show",
            "GET",
            "/accounts/:accountId/lists/:listId/subscribers",
            ["accountId","listId"],
            null
        ],
        [
            "find",
            "GET",
            "/accounts/:accountId/lists/:listId/subscribers",
            ["accountId","listId"],
            "find"
        ],
        [
            "create",
            "POST",
            "/accounts/:accountId/lists/:listId/subscribers",
            ["accountId","listId"],
            "create"
        ]
    ],
    "trackedEvent" : [
        [
            "show",
            "POST",
            "/accounts/:accountId/lists/:listId/campaigns/:campaignId/messages/:messageId/tracked_events",
            ['accountId','listId','campaignId','messageId'],
            null
        ],
        [
            "showById",
            "POST",
            "/accounts/:accountId/lists/:listId/campaigns/:campaignId/messages/:messageId/tracked_events/:trackEventId",
            ['accountId','listId','campaignId','messageId','trackEventId'],
            null
        ]
    ],
    "webFormSplitTest" : [
        [
            "show",
            "GET",
            "/accounts/:accountId/lists/:listId/web_form_split_tests",
            ['accountId','listId'],
            null
        ],
        [
            "showById",
            "GET",
            "/accounts/:accountId/lists/:listId/web_form_split_tests/:webFormSplitTestId",
            ['accountId','listId','webFormSplitTestId'],
            null
        ]
    ],
    "webForm" : [
        [
            "show",
            "GET",
            "/accounts/:accountId/lists/:listId/web_forms",
            ['accountId','listId'],
            null
        ],
        [
            "showById",
            "GET",
            "/accounts/:accountId/lists/:listId/web_forms/:webFormId",
            ['accountId','listId','webFormId'],
            null
        ]
    ]

}

module.exports = end_points;