/**
 * @author Alicia Quek Chik Wen <aque0004@student.monash.edu>
 * @author Foo Kai Yan 33085625 <kfoo0012@student.monash.edu>
 * Represents the main server file
 */

/**
 * Import required packages
 * @constant
 */
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const fs = require("fs"); // may be required for htr
const cookieParser = require("cookie-parser");
const multer = require('multer');
const bodyParser = require('body-parser')
const { spawn } = require('child_process');



/**
 * API Router and Middleware functions
 * @constant
 */
const patientRouter = require("./backend/routes/patient-api.js");
const consultationRouter = require("./backend/routes/consultation-api.js");
const diagnosisRouter = require("./backend/routes/diagnosis-api.js");
const roleRouter = require("./backend/routes/role-api.js");
const authRouter = require("./backend/routes/auth-api.js");
const api_medication = require("./backend/routes/medication-api.js");
const api_prescription = require("./backend/routes/prescription-api.js");
const api_appointment = require("./backend/routes/appointment-api.js");
const api_physician = require("./backend/routes/physician-api.js");

/**
 * Port number
 * @constant
 */
const PORT_NUMBER = 8080;

/**
 * App instance
 * @constant
 */
const app = express();
const server = require('http').Server(app);
const io = require("socket.io")(server);


/**
 * Middleware functions
 * Using express.static built-in middleware function in Express to serve static files
 * @constant
 */
//app.use(express.static(path.join(__dirname, "audio_files")));
//express will server angular as static asset
app.use(express.static(path.join(__dirname, "dist/mds2-ahis")));
app.use(express.static(path.join(__dirname, "data_files")));
app.use(express.json());
app.use(cookieParser());

/**
 * Configure to listen to the specify port number
 * @name listen
 * @function
 * @param {int} PORT_NUMBER - Express port number
 * @param {Function} callback - Express callback
 */
server.listen(PORT_NUMBER, function () {
	console.log(`listening on port ${PORT_NUMBER}`);
});

/**
 * Mongoose URL string which will be used to connect to the database named HealthDB
 * @constant
 */
const url = "mongodb://127.0.0.1:27017/HealthInformationDB";

/**
 * Connect to database
 * @param {string} url - Mongoose URL string to connect to the database
 * @returns - String to indicate that database is successfully connected
 */
async function connect(url) {
	await mongoose.connect(url);
	return "Connected Successfully";
}
connect(url)
  .then(console.log)
  .catch((err) => console.log(err));


/**
 * Middleware functions
 * 
 * using Express.Router to separate the routes for different components, including
 * - patient
 * - medication
 * - prescription
 * - consultation
 * - appointment
 * - diagnosis
 * - physician
 * @constant
 */
app.use("/patient", patientRouter);
app.use("/medication", api_medication);
app.use("/prescription", api_prescription);
app.use("/consultation", consultationRouter);
app.use("/appointment", api_appointment);
app.use("/diagnosis", diagnosisRouter);
app.use("/physician", api_physician);
app.use("/role", roleRouter)
app.use("/auth", authRouter)

/**
 * Configure Multer Storage
 * Define storage using multer.diskStorage.
 */
const storage = multer.diskStorage({
    destination: function (req, file, callBack) {
		// Set the destination to the desired location
        callBack(null, "data_files"); 
    },
    filename: function (req, file, callBack) {
		// Set the filename function to create unique filenames
        callBack(null, "patientRegistrationForm.jpg");  
    }
});

var upload = multer({ storage: storage});

/**
 * Create an Upload Route
 * Create a route (e.g., /upload) to handle file upload requests with POST method.
 * Use upload.single(‘file’) middleware to handle single file uploads with the field name file.
 * In the route handler function, you can access uploaded file details in req.file.
 */
app.post('/file', upload.single('file'), (req, res, next) =>{
	const file = req.file;
	console.log("filename", file.filename);
	if(!file){
		const error = new Error('Please upload a file');
		error.httpStatusCode = 400;
		return next(error)
	}
	console.log('File uploaded successfully.');
	res.send(file);
})

app.get('/patientData', (req, res) => {
	const pathJsonFile = "./data_files/patient_data.json";
	fs.readFile(pathJsonFile, 'utf8', (err, file) => {
		// Read/modify file data here
		// check for any errors
		if (err) {
			console.error('Error while reading the file:', err)
			return
		}
		try {
			const data = JSON.parse(file);
			// output the parsed data
			console.log(data);
			res.send(data)
		} catch (err) {
			console.error('Error while parsing JSON data:', err);
		}
	})
	
})



io.on("connection", (socket) => {
	console.log("new connection made from client with ID=" + socket.id);

	socket.on("cropping", async(data) => {
		var resultData = "";
		// spawn new child process to call the python script
		// Define the path to main.py
		const pythonScriptPath = path.join(__dirname, 'HTR_Model', 'SimpleHTR-master', 'src', 'AHIS_CropModel1.py');
		const python = spawn('python', [pythonScriptPath]);
		console.log('Calling cropping function');

		// collect data from script
		python.stdout.on('data', function (data) {
			console.log('Pipe data from python script ...');
			resultData += data.toString();
			console.log("resultData", resultData);
		});

		// in close event we are sure that stream from child process is closed
		python.on("close", function () {
		console.log("child process end all stdio with code");
		try {
			// send data to browser
			console.log("resultData", resultData);
			io.emit("cropped", resultData)
		} catch (err) {
			console.error('Error sending resultData:', err);
		}
		});
	
	  });

	socket.on("htr", async(data) => {
	var resultData = "HTR completed";
	var dataToSend = "";
	
	// spawn new child process to call the python script
	// Define the path to main.py
	const pythonScriptPath = path.join(__dirname, 'HTR_Model', 'SimpleHTR-master', 'src', 'main.py');
	const python = spawn('python', [pythonScriptPath]);
	console.log('Calling htr function');

	// collect data from script
	python.stdout.on('data', function (data) {
		console.log('Pipe data from python script ...');
		resultData += data.toString();
		console.log("resultData", resultData);
	});

	//in close event we are sure that stream from child process is closed
	python.on("close", function () {
	console.log("child process end all stdio with code");
	try {
		console.log("resultData", resultData);
		dataToSend = resultData;
		console.log("dataToSend", dataToSend);
		io.emit("processed", dataToSend)
	} catch (error) {
		console.error('Error parsing dataToSend:', err);
	}
	});
	});
});
