const jwt = require("jsonwebtoken");
const axios = require('axios'); // For making HTTP requests
const verifiersModel = require("../models/Verifiers/verifiersModal");

const addVerifier = async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            return res.status(401).json({ mssg: "You are not authenticated" });
        }

        jwt.verify(token, "secret_key", async (err, user) => {
            if (err) return res.status(403).json({ mssg: "Token not valid" });
            req.user = user;

            const createdBy = req.user.id;
            const Name = req.body.name;
            const dummyURL = req.body.dummyURL;
            const proxyList = req.body.proxyList;

            const verfier = await verifiersModel.create({
                Name,
                dummyURL,
                proxyList,
                createdBy,
            });
            if (!verfier) {
                return res.status(400).json({ mssg: "No created" });
            }

            return res.status(200).json({ success: true, message: 'Verifier added successfully' });
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const getAllVerifiers = async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            return res.status(401).json({ mssg: "You are not authenticated" });
        }

        jwt.verify(token, "secret_key", async (err, user) => {
            if (err) return res.status(403).json({ mssg: "Token not valid" });
            req.user = user;

            const verifiers = await verifiersModel.find({ createdBy: req.user.id });
            if (!verifiers) {
                return res.status(400).json({ mssg: "No verifers till now!" });
            }
            res.status(200).json({ verifiers });
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const runVerifier = async (req, res) => {

    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'You are not authenticated' });
        }

        jwt.verify(token, 'secret_key', async (err, user) => {
            if (err) return res.status(403).json({ message: 'Token not valid' });
            req.user = user;

            const verifierId = req.params.verifierId;

            const verifier = await verifiersModel.findById(verifierId);
            if (!verifier) {
                return res.status(404).json({ message: 'Verifier not found' });
            }

            const dummySiteUrl = verifier.dummyURL;
            const proxyList = verifier.proxyList;

            const results = [];

            for (const proxy of proxyList) {
                try {
                    const response = await axios.get(dummySiteUrl, {
                        proxy: {
                            host: proxy.host,
                            port: proxy.port,
                        },
                    });

                    if (response.status === 200) {
                        results.push({ proxy, success: true });
                    } else {
                        results.push({ proxy, success: false });
                    }
                } catch (error) {
                    results.push({ proxy, success: false, error: error.message });
                }
            }

            return res.status(200).json({ results });
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = {
    getAllVerifiers,
    addVerifier,
    runVerifier
};