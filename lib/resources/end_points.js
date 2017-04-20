var end_points = {
    "oauth" : [
       [
        "request_token",
        "POST",
        "/oauth/request_token",
        []
       ],
       [ 
        "access_token",
        "POST",
        "/oauth/access_token",
        []
       ],
    ],
    "accounts" : [
        [
            "show",
            "GET",
            "/accounts",
            []
        ]
    ],
    "broadcast" : [
        [
            "show",
            "GET",
            "/accounts/:accountId/lists/:listId/broadcasts",
            ['accountId', 'listId']
        ],
        [
            "create",
            "POST",
            "/accounts/:accountId/lists/:listId/broadcasts",
            ['accountId', 'listId']
        ]
    ],
    "campaign" : [
        [
            "show",
            "GET",
            "/accounts/:accountId/lists/:listId/campaigns",
            ["accountId","listId"]
        ]
    ],
    "click" : [
        [
            "show",
            "GET",
            "accounts/:accountId/lists/:listId/campaigns/:campaignId/links/:linkId/clicks",
            ["accountId","listId","campaignId","linkId"]
        ]
    ],
    "components" : [
        [
            "show",
            "GET",
            "accounts/:accountId/lists/:listId/web_form_split_tests/:webFormSplitTestsId/components",
            ["accountID","listId","webFormSplitTestsId"]
        ]
    ],
    "customField" : [
        [
            "show",
            "GET",
            "/accounts/:accountId/lists/:listId/custom_fields",
            ["accountId", "listId"]
        ],
        [
            "create",
            "POST",
            "/accounts/:accountId/lists/:listId/custom_fields",
            ["accountId", "listId"]
        ]
    ],
    "doc" : [
        [
            "show",
            "POST",
            "/doc",
            []
        ]
    ],
    "integration" : [
        [
            "show",
            "GET",
            "/accounts/:accountId/integrations",
            ['accountId']
        ]
    ],
    "link" : [
        [
            "show",
            "GET",
            "/accounts/:accountId/lists/:listId/campaigns/:campaignId/links",
            ['accountId','listId','campaignId']
        ]
    ],
    "list" : [
        [
            "show",
            "GET",
            "/accounts/:accountId/lists",
            ['accountId'],
        ]
    ],
    "message" : [
        [
            "show",
            "GET",
            "/accounts/:accountId/lists/:listId/campaigns/:campaignId/messages",
            ["accountId","listId","campaignId"]
        ]
    ],
    "open" : [
        [
            "show",
            "GET",
            "/accounts/:accountId/lists/:listId/campaigns/:campaignId/messages/:messageId/opens/:openId",
            ['accountId','listId','campaignId','messageId','openId']
        ]
    ],
    "stat" : [
        [
            "show",
            "GET",
            "/accounts/:accountId/lists/:listId/campaigns/:campaignId/stats",
            ['accountId','listId','campaignId']
        ]
    ],
    "subscriber" : [
        [
            "show",
            "GET",
            "/accounts/:accountId/lists/:listId/subscribers",
            ["accountId","listId"]
        ],
        [
            "create",
            "POST",
            "/accounts/:accountId/lists/:listId/subscribers",
            ["accountId","listId"]
        ]
    ],
    "trackedEvent" : [
        [
            "show",
            "POST",
            "/accounts/:accountId/lists/:listId/campaigns/:campaignId/messages/:messageId/tracked_events",
            ['accountId','listId','campaignId','messageId']
        ]
    ],
    "webFormSplitTest" : [
        [
            "show",
            "GET",
            "/accounts/:accountId/lists/:listId/web_form_split_tests",
            ['accountId','listId']
        ]
    ],
    "webForm" : [
        [
            "show",
            "GET",
            "/accounts/:accountId/lists/:listId/web_forms",
            ['accountId','listId']
        ]
    ]

}

module.exports = end_points;