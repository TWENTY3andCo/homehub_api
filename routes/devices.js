const express = require('express');
const router = express.Router();
const util = require('util');

const exec = util.promisify(require('child_process').exec);
router.get('/list', async (req, res, next) => {
    const commandString = ` nmcli -t  --fields=DEVICE,TYPE,STATE,CONNECTION d`;
    try {
        const {
            stdout,
            stderr
        } = await exec(commandString);

        if (stderr) {
            throw new Error(stderr);

        }
        const lines = stdout.split('\n').filter(line => !!line);
        const devices = lines.map(line => {
            const parts = line.split(':');
            return {
                device: parts[0],
                type: parts[1],
                state: parts[2],
                connection: parts[3]
            };
        });

        res.json(devices);
    } catch (e) {
        next(e);
    }
});
module.exports = router;