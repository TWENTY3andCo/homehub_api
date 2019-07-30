const express = require('express');
const router = express.Router();
const util = require('util');

const exec = util.promisify(require('child_process').exec);
router.get('/list', async (req, res, next) => {
    try {
        const cmdString = `nmcli -t -f NAME,UUID,TYPE,ACTIVE,DEVICE,STATE connection`;
        const {
            stdout,
            stderr
        } = await exec(cmdString);
        if (stderr) {
            throw new Error(stderr);
        }
        const lines = stdout.split('\n');
        const connections = lines.map(line => {
            const parts = line.split(':');
            const connection = {
                name: parts[0],
                uuid: parts[1],
                type: parts[2],
                active: parts[3] == 'yes',
                device: parts[4]
            };
            return connection;
        }).filter(connection => !!connection.name);
        res.json(connections);
    } catch (e) {
        next(e);
    }
});
module.exports = router;