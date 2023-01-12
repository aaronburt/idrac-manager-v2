import IDRAC from "./idrac.js";
import express from 'express';
const { idrac_hostname, idrac_username, idrac_password, debug } = process.env;
const idracConnection = new IDRAC(idrac_hostname || '0.0.0.0', idrac_username || 'root', idrac_password || 'calvin');
const router = express();
router.get('/status', async (req, res) => {
    try {
        const idracStatus = await idracConnection.status();
        return res.json({ "online": idracStatus ? true : false });
    }
    catch (err) {
        console.log(err);
        if (debug)
            return res.status(400).send(err.toString());
        return res.sendStatus(400);
    }
});
router.get('/shutdown', async (req, res) => {
    try {
        await idracConnection.shutdown();
        return res.sendStatus(200);
    }
    catch (err) {
        console.log(err);
        if (debug)
            return res.status(400).send(err.toString());
        return res.sendStatus(400);
    }
});
router.get('/fanspeed/:speed', async (req, res) => {
    try {
        const speed = parseInt(req.params.speed);
        if (isNaN(speed))
            throw new Error('Speed param is not a valid number');
        if (speed <= 0 && speed >= 100)
            throw new Error('Speed param must be between 0 & 100');
        await idracConnection.fanspeed(speed);
        return res.sendStatus(200);
    }
    catch (err) {
        console.log(err);
        if (debug)
            return res.status(400).send(err.toString());
        return res.sendStatus(400);
    }
});
router.get('/startup', async (req, res) => {
    try {
        await idracConnection.startup();
        return res.sendStatus(200);
    }
    catch (err) {
        console.log(err);
        if (debug)
            return res.status(400).send(err.toString());
        return res.sendStatus(400);
    }
});
router.listen(8080, () => { console.log(`Service started at ${Intl.DateTimeFormat('en-gb', { "dateStyle": "full", "timeStyle": "long" }).format(new Date())}`); });
