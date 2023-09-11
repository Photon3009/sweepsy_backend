const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const cors = require('cors')
const userRouter = require("./routes/usersRoute");
const { default: mongoose } = require("mongoose");
const emailRoute = require("./routes/emailRoutes");
const addressRoute = require("./routes/addressRoutes");
const proxyRoutes = require("./routes/proxyRoutes");
const taskRoute = require("./routes/taskRoutes");
const verifiersRoute = require("./routes/verifiersRoutes");
const app = express();

app.use(cors());
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.sendStatus(200);
});

dotenv.config();
app.use(cookieParser());
app.use(bodyParser.json());
port = process.env.PORT || 4000;
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
//routes
app.use("/api/users", userRouter);
app.use("/api/emails", emailRoute);
app.use("/api/proxies", proxyRoutes);
app.use("/api/tasks", taskRoute);
app.use("/api/addresses", addressRoute);
app.use("/api/verifiers",verifiersRoute)

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on:  ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

