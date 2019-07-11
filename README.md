# Instructions

Run `npm instal` to install dependencies and the npm start to run the `api`

# List available wifi networks

Do a `GET` request at `localhost:3000/api/networks/list`

This returns an object like this:
```
{
    "networks":[
        {ssid:"foo","in_use":"false","signal":87,security:"WPA1 WPA2"},
        {ssid:"foo2","in_use":"true","signal":56,security:"WPA1 WPA2"}
    ]
}
```

# Connect to a specific wifi

You need to do a `POST` request to `localhost:3000/api/networks/connect`.
In the body of the request you have to pass 2 values:
* ssid (The ssid of the network)
* password

The full documentation is available [here]( https://app.swaggerhub.com/apis-docs/kounelios13/nmcli-api/1.0.0#/default/get_api_networks_list)