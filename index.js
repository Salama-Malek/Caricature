const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const fs = require("fs");
const dbConnection = require("./config/db_config");

// Routes
const artistsRouter = require("./routes/admin_routes/artists");
const authorsRouter = require("./routes/admin_routes/authors");
const caricaturesRouter = require("./routes/admin_routes/caricatures");
const usersRouter = require("./routes/admin_routes/users");
const contactsRouter = require("./routes/admin_routes/contact");
const charactersRouter = require("./routes/admin_routes/characters");
const registration_routes = require("./routes/all_users/registration_routes");
const adminMiddleware = require("./middleware/admin_middleware");
const PORT = process.env.PORT;
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('frontend'));
/*** IMAGE MIDDLEWARE ***/
const imagesDir = "assets/upload";
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir);
}
app.use(`/${imagesDir}`, express.static(imagesDir));


app.use(
  morgan(
    '"Method: :method - URL: :url - STATUS: :status - RESPONSE TIME: :response-time ms - DATE: :date[clf]"',
    {
      stream: fs.createWriteStream("./logs/logs.txt", { flags: "a" }),
    }
  )
);


app.use("/admin", adminMiddleware, [artistsRouter, authorsRouter, caricaturesRouter, charactersRouter, usersRouter, contactsRouter]);
app.use("/", [registration_routes]);



// Error handling middleware
app.use((err, req, res, next) => {
  res.status(500).send({ message: "Some data are missing" });
});

// const PORT = config.port;
app.listen(PORT, (err) => {
  if (!err) {
    console.log(
      `*-----------------Server running on ${PORT}------------------*`
    );

    dbConnection;

  } else {
    console.log(`*-----------------Error in Server---------------*`);
  }
});

