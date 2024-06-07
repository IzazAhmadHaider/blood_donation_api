const express=require('express');
const cors =require('cors');
const cookieParser = require('cookie-parser');
const {userRoute,donateBloodRoute,createRequestRoute,ratingRoute}=require('./routes/index');
const sequelize = require('./config/config');
const swaggerUi = require('swagger-ui-express');

require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 5001;
app.use(cookieParser());

app.get('/', (req,res)=>{
    res.send("getting ")
})

sequelize.sync({ force: true })
  .then(() => {
    console.log('Database synchronized');
  })
  .catch(err => {
    console.error('An error occurred while synchronizing the database:', err);
  });


//swagger Api's
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(require('./swagger_output.json')));

//signin route
app.use('/', userRoute)

//donateBloodRoute
app.use('/', donateBloodRoute) 

//createRequestRoute
app.use('/', createRequestRoute)

//ratingRoute
app.use('/', ratingRoute)


  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });




