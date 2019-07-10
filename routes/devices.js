const express = require('express');
const router = express.Router();

const {
    exec
} = require('child_process');
router.get('/list', (req, res, next) => {
    const commandString = ` nmcli -t  --fields=DEVICE,TYPE,STATE,CONNECTION d`;
    exec(commandString, (err, std, stderr) => {
        if (err || stderr) {
            return next(err || stderr);

        }
        const lines = std.split('\n').filter(line => !!line);
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
    });
});
module.exports = router;