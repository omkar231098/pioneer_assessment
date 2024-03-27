const express = require("express");
const swaggerJSDoc=require("swagger-jsdoc")
const swaggerUi=require("swagger-ui-express")

const app = express();

const { auth } = require("./Routes/auth.route");
const { connection } = require("./Config/db");




require("dotenv").config();


// Check for required environment variables
const requiredEnvVariables = ['DATABASE_URL', 'PORT',"SECRET_KEY"]; // Add your required variables here




// app.use(cors(corsOptions));
app.use("/auth",auth);


const options={
  definition:{
    openapi:"3.0.0",
    info:{
      title:"Pioneer Backend",
      version:"1.0.0"
    },
    servers:[
      {
        url:"http://localhost:8500"
      }
    ]
  },
  apis:[
    "./Routes/*.js"
  ]
}
// specification
const swaggerSpec=swaggerJSDoc(options)

// builiding ui

app.use("/documentations",swaggerUi.serve,swaggerUi.setup(swaggerSpec))

for (const variable of requiredEnvVariables) {
  if (!process.env[variable]) {
    console.error(`Error: Missing required environment variable: ${variable}`);
    process.exit(1); // Exit the process with an error code
  }
}


const port = process.env.PORT || 8500;

app.listen(port, async () => {
  try {
    await connection;
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log("Not able to connect to MongoDB");
    console.error(err);
    process.exit(1); // Exit the process with an error code
  }

  console.log(`Server is running on port ${port}`);
});
