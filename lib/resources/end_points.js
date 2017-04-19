var end_points = {
    "oauth" : [
       [
        "request_token",
        "POST",
        "/oauth/request_token",
        null,
        false
       ],
       [ 
        "access_token",
        "POST",
        "/oauth/access_token",
        null,
        false
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
    "list" : [
        [
            "show",
            "GET",
            "/accounts/:accountId/lists",
            ['accountId'],
        ]
    ]
    // "integrations" : [],
    // "lists" : [],
    // "subscribers" : [],
    // "campaigns" : [],
    // "web_forms" : [],
    // "web_form_split_tests" : [],
    // "custom_fields" : [],
    // "links" : [],
    // "messages" : [],
    // "stats" : [],
    // "components" : [],
    // "clicks" : [],
    // "opens" : [],
    // "tracked_events" : []
}

module.exports = end_points;