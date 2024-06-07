const donateBloodModel = require("../models/donateBlood");

const postDonateBlood = async (req, res) => {
    try {
        const { bloodType, location } = req.body;
        // Validate request data
        if (!bloodType || !location) {
            return res.status(400).json({ error: 'Blood type and location are required fields' });
        }

        // Create donateBloodDetails record
        const donateBloodDetails = await donateBloodModel.create({
            bloodType,
            location
        });

        res.status(201).json(donateBloodDetails);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error in postDonateBlood, donateBloodController.js' });
    }
}

const getAllDonateBlood = async (req, res) => {
    try {
        
        
        const getDonateBloodDetails = await donateBloodModel.findAll();

        // Respond with the retrieved data
        res.status(200).json(getDonateBloodDetails);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error in getAllDonateBlood, donateBloodController.js' });
    }
}
module.exports={
    postDonateBlood,getAllDonateBlood,
    post:[
        {
            path:"/api/donateBlood",
            method: postDonateBlood
        }
    ],
    get:[
        {
            path:"/api/getBlood",
            method: getAllDonateBlood
        }
    ]
}

