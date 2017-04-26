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
        ]
    ],
    "doc" : [
        [
            "show",
            "POST",
            "/doc",
            [],
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
        ]
    ],
    "link" : [
        [
            "show",
            "GET",
            "/accounts/:accountId/lists/:listId/campaigns/:campaignId/links",
            ['accountId','listId','campaignId'],
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
        ]
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
        ]
    ],
    "open" : [
        [
            "show",
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
        ]
    ],
    "webFormSplitTest" : [
        [
            "show",
            "GET",
            "/accounts/:accountId/lists/:listId/web_form_split_tests",
            ['accountId','listId'],
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
        ]
    ]

}

module.exports = end_points;