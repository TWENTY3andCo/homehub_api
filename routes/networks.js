const express = require('express');
const router = express.Router();
// const {
//     exec
// } = require('child_process');
const util = require('util');

const exec = util.promisify(require('child_process').exec);
router.get('/list', async (req, res, next) => {
    const commandString = `nmcli -f SSID,IN-USE,SIGNAL,SECURITY -t dev wifi list`;
    try {
        const {
            stdout,
            stderr
        } = await exec(commandString);
        if (stderr) {
            throw new Error(stderr);
        }
        let networks = stdout.split("\n");
        networks = networks.map(line => {
            const parts = line.split(":");
            return {
                ssid: parts[0],
                in_use: parts[1] == "*",
                signal: parts[2],
                security: parts[3]
            }
        }).filter(e => !!e.ssid);
        res.json(networks);
    } catch (e) {
        next(e);
    }
});

router.post('/connect', async (req, res, next) => {
    const {
        ssid,
        password
    } = req.body;
    const commandString = `nmcli device wifi connect "${ssid}" password "${password}"`;
    try {
        const {
            stdout,
            stderr
        } = await exec(commandString);
        if (stderr) {
            throw new Error(stderr);
        }
        res.json({
            stdout
        });
    } catch (e) {
        next(e);
    }
});
module.exports = router;