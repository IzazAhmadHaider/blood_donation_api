const createRequestModel = require("../models/createRequestModel");

const createRequest=async (req,res)=>{
    try {
        const { bloodForMyself, patientName, age, bloodType, requiredUnit, requiredDate, hospital, location } = req.body
        const createNewRequest=await createRequestModel.create({
            bloodForMyself, patientName, age, bloodType, requiredUnit, requiredDate, hospital, location
        })
        res.status(201).json(createNewRequest);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error in createRequest, createRequestController.js' });
    }
}

const viewRequest = async (req,res)=>{
    try {
        const viewRequest = await createRequestModel.findAll()
        res.json(viewRequest);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error in viewRequest, createRequestController.js' });
    }
}


module.exports={
    createRequest,viewRequest,
    post:[
        {
            path:'/api/createRequest',
            method:createRequest
        }
    ],
    get:[
        {
            path:'/api/viewRequest',
            method:viewRequest  
        }
    ]
}