const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());
mongoose.set("strictQuery", true);

//APIs
const roleRoute = require("./routes/role.route");
const permissionRoute = require("./routes/permission.route");
const userRoute = require("./routes/user.route");
const taskRoute = require("./routes/task.route");
const taskTypesRoute = require("./routes/taskType.route");
const taskStatusRoute = require("./routes/taskStatus.route")
const commentsRoute = require('./routes/comment.route')

//Connection to Mongo DB
mongoose
  .connect(
    "mongodb+srv://sarah_henia:cherrimongoli21S@clustersh.2ptpd2k.mongodb.net/Taskify?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to Database");
  })
  .catch(() => {
    console.log("Failed To connect to Database");
  });
// /Connection to Mongo DB

//templating 
//app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, "www")));
// app.get('/', (req, res) => {
//   res.render('pages/index')
// })

app.use("/roles", roleRoute);
app.use("/permissions", permissionRoute);
app.use("/users", userRoute);
app.use("/tasks", taskRoute);
app.use("/task-types", taskTypesRoute)
app.use("/task-status", taskStatusRoute)
app.use("/comments", commentsRoute)

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
