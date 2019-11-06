const express = require('express');
const router = express.Router();
// const {
//     exec
// } = require('child_process');
const util = require('util');
const fs = require('fs');
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
        }).filter(e => e.ssid.length > 0);
        res.json(networks);
    } catch (e) {
        next(e);
    }
});

router.get('/leases',async (req,res,next)=>{
    try{
        let leaseFileCommand = "cat /var/lib/misc/dnsmasq.leases";

        const {
            stdout,
            stderr
        } = await exec(leaseFileCommand);
        if(stderr){
            throw new Error(stderr);
        }
        let leases = stdout.split('\n').map(line=>{
            const parts = line.split(" ");
            return {
                leaseTime:parts[0],
                staticIp:parts[0]==0,
                macAddress:parts[1],
                ipAddress:parts[2],
                name:parts[3]
            }
        });
        //leases.pop();
        res.json(leases);
    }catch(e){
        next(e);
    }
})

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
