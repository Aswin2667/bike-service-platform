// Import required modules and libraries
const express = require('express');
const User = require('./models/UserModel'); // Import the User model
const Service = require('./models/ServiceModel'); // Import the Service model
require('dotenv').config({ path: '.env.dev' }); // Load environment variables from a file
const data = require("./datas/DefaultServices.json"); // Load default services data from a JSON file
const bcrypt = require("bcrypt"); // Library for password hashing
const app = express(); // Create an Express application
const cookieParser = require('cookie-parser'); // Middleware for handling cookies
const mongoose = require('mongoose'); // MongoDB ODM
const port = process.env.PORT || 9090; // Define the server port
const userRouter = require('./routes/UserRoutes'); // Import user routes
const MessageRouter = require("./routes/MessageRoutes"); // Import message routes
const bodyParser = require('body-parser'); // Middleware for parsing JSON and URL-encoded data
const serviceRouter = require("./routes/ServiceRoutes"); // Import service routes
const BookingRouter = require("./routes/BookingRoutes"); // Import booking routes
const { specs, swaggerUi } = require('./config/swagger'); // Import Swagger documentation configuration
const jsonParser = bodyParser.json({ limit: 1024 * 1024 * 10, type: 'application/json' }); // JSON body parser middleware
const urlencodedParser = bodyParser.urlencoded({ extended: true, limit: 1024 * 1024 * 10, type: 'application/x-www-form-urlencoded' }); // URL-encoded body parser middleware
app.use(jsonParser); // Use JSON body parser
app.use(urlencodedParser); // Use URL-encoded body parser

const url = process.env.MONGO_DB_URL; // Get the MongoDB connection URL from environment variables
const cors = require('cors'); // Middleware for enabling CORS (Cross-Origin Resource Sharing)
app.use(cookieParser()); // Use cookie parser middleware
mongoose.connect(url, { useNewUrlParser: true }); // Connect to MongoDB using Mongoose
app.use(express.json()); // Enable parsing of JSON request bodies
const con = mongoose.connection; // Create a MongoDB connection object
app.use(cors()); // Enable CORS for the entire application

// Event handler for when the MongoDB connection is open
con.on('open', async () => {
  console.log('Database connected.......'); // Log that the database is connected

  // Check if there is an admin user in the database; if not, create one
  const admin = await User.findOne({ role: "ADMIN" });
  if (!admin) {
    const password = await bcrypt.hash("rootroot", 10); // Hash the admin password
    User.create({
      username: "root",
      email: "admin@gmail.com",
      password: password,
      phonenumber: "1234567891",
      role: "ADMIN"
    }); // Create the admin user
    console.log("Admin has been created")
  }

  // Check if there are any services in the database; if not, insert default services
  const services = await Service.find();
  if (services.length === 0) {
    Service.insertMany(data); // Insert default services
    console.log("Default Services added"); // Log that default services have been added
  }
});

// Define routes for different parts of the application
app.use('/user', userRouter); // User routes
app.use("/service", serviceRouter); // Service routes
app.use("/booking", BookingRouter); // Booking routes
app.use("/chat", MessageRouter); // Message routes

// Swagger API documentation setup
const options = {
  customCss: '.swagger-ui .topbar { display: none } ', // Custom CSS to hide the Swagger topbar
  customSiteTitle: "Bike Service" // Custom title for the Swagger documentation
};
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, options)); // Serve Swagger documentation

// Start the server and listen on the defined port
app.listen(port, () => {
  console.log(`Server started at ${port}`); // Log that the server has started
});
