# TWENTY3 HomeHub API
>API made for the Debian Backend of HomeHub.
>Implements nmclip for Wifi Search and Config

[![License: CC BY-NC-ND 4.0](https://img.shields.io/badge/License-CC%20BY--NC--ND%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-nd/4.0/) [![License: CC BY-NC-ND 4.0](https://licensebuttons.net/l/by-nc-nd/4.0/80x15.png)](https://creativecommons.org/licenses/by-nc-nd/4.0/) [![Release](https://badgen.net/github/release/TWENTY3andCo/homehub_api)](https://badgen.net/github/release/TWENTY3andCo/homehub_api) [![Last Commit](https://badgen.net/github/last-commit/TWENTY3andCo/homehub_api)](https://badgen.net/github/last-commit/TWENTY3andCo/homehub_api) [![NPM Version](https://badgen.net/npm/v/express)](https://badgen.net/npm/v/express)

## Instructions

Run `npm instal` to install dependencies and the npm start to run the `api`

## List available wifi networks

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

## Connect to a specific wifi

You need to do a `POST` request to `localhost:3000/api/networks/connect`.
In the body of the request you have to pass 2 values:
* ssid (The ssid of the network)
* password

## Made By
* **Manos Karadimos** - [GitHub] (https://github.com/thetechgeekster)
* **Manos Kounelakis** - [GitHub] (https://github.com/kounelios13)
