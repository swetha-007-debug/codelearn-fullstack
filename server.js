const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "../public")));

mongoose.connect("mongodb://localhost:27017/codelearn")
.then(() => {
    console.log("MongoDB Connected");
})
.catch(err => {
    console.log(err);
});

const studentSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    course: String,
    message: String
});

const Student = mongoose.model("Student", studentSchema);

app.post("/register", async (req, res) => {

    try {

        const student = new Student(req.body);

        await student.save();

        res.json({
            message: "Registration Successful"
        });

    } catch (error) {

        res.status(500).json({
            message: "Error Saving Data"
        });
    }

});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});