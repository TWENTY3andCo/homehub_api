const express = require('express');
const router = express.Router();
const {
    exec
} = require('child_process');

router.get('/list', (req, res, next) => {
    exec(' nmcli -f SSID,IN-USE,SIGNAL,SECURITY -t dev wifi list', (err, std, stderr) => {
        if (err || stderr) {
            return nexr(err || stderr);
        }
        console.log(std)
        let networks = std.split("\n");
        networks = networks.map(line => {
            const parts = line.split(":");
            return {
                ssid: parts[0],
                in_use: parts[1] == "*",
                signal: parts[2],
                security: parts[3]
            }
        }).filter(e => e.ssid.length > 0);
        res.json({
            networks
        });
    });
});

router.post('/connect', (req, res, next) => {
    const {
        ssid,
        password
    } = req.body;
    const commandString = `nmcli device wifi connect "${ssid}" password "${password}"`;
    console.log(commandString)
    exec(commandString, (err, std, stderr) => {
        if (err || stderr) {
            return next(err || stderr);
        }
        console.log({
            err,
            std,
            stderr
        });
        res.json({
            std
        });
    })
});
module.exports = router;