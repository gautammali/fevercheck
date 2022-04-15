const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
// const redis = require("redis");
const UserForm = require("./models/formData");
const foodList = require("./models/foodlist");
const app = express();
require("dotenv").config();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/upload_pics", express.static(path.join("backend/upload_pics")));
//============BAckend caching REdis
// let client;
// (async () => {
//   try {
//     client = redis.createClient("redis://127.0.0.1:6379");
//     client.on("error", (err) => console.log("Redis Client Error", err));
//     await client.connect();
//     // console.log("Connected -----------");
//   } catch (err) {
//     console.log("Errror", err);
//   }
// })();

//MimE_type_check image

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};

//mongoDB atlass connection
mongoose
  .connect(process.env.DATABASE_CONNECTION)
  .then(() => {
    console.log("connected successfully");
  })
  .catch((err) => {
    console.warn("failed in connection");
    console.error(err);
  });

//=============================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("invalid mime type");
    if (isValid) error = null;
    cb(null, "backend/upload_pics/");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "_" + Date.now() + "." + ext);
  },
});
const upload = multer({ storage: storage });
//=============================

//main raiuetr======================
app.get("/", (req, res) => {
  res.send("hiii");
});
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,PATCH,DELETE,OPTIONS"
  );
  next();
});
//CROS origin request===========================

app.get("/send", (req, res) => {
  res.send("send to backend");
});

app.post("/send", upload.single("image"), async (req, res) => {
  try {
    const url = req.protocol + "://" + req.get("host");
    const FormData = new UserForm({
      email: req.body.email,
      date: req.body.date,
      gender: req.body.gender,
      fever: req.body.fever,
      chBox: req.body.chBox,
      img: url + "/upload_pics/" + req.file.filename,
    });
    // await client.del("formData");
    FormData.save();
    res.status(201).json({
      message: "success",
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/data", async (req, res) => {
  try {
    // console.log("---- Before Calling ----");
    // let re_data = await client.get("formData");
    // if (re_data) {
    //   return res.send(JSON.parse(re_data));
    // }
    // console.log("i am call beacause no data in redis data");
    UserForm.find({ email: req.query.email || "" }).then(async (records) => {
      // let d = await client.set("formData", JSON.stringify(records), "EX", 60);
      // console.log("===", d);
      return res.status(201).json(records);
    });
  } catch (err) {
    console.log("Err", err);
    return res.status(404).json(err);
  }
});

app.put("/form/:id", upload.single("image"), async (req, res) => {
  let formData;
  // await client.del("formData");
  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    formData = new UserForm({
      _id: req.params.id,
      email: req.body.email,
      date: req.body.date,
      gender: req.body.gender,
      fever: req.body.fever,
      chBox: req.body.chBox,
      img: url + "/upload_pics/" + req.file.filename,
    });
  } else {
    formData = req.body;
  }
  UserForm.updateOne({ _id: req.params.id || "" }, formData, {
    new: true,
  })
    .then((records) => {
      res.status(201).json(records);
    })
    .catch((err) => console.log(err));
});

app.delete("/form/:id", async (req, res) => {
  // await client.del("formData");
  UserForm.findByIdAndDelete(req.params.id)
    .then((form) => {
      if (!form) {
        return res.status(404).send();
      } else {
        // console.log("deleted succesfully");
        res.send({ message: "Deleted Successfully" });
      }
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

//fodlist form admin

app.post("/foodlist", (req, res) => {
  console.log(req.body);
  let FoodList = new foodList({
    email: req.body.email,
    drink: req.body.food,
  });
  FoodList.save();
});

app.get("/foolists", (req, res) => {
  foodList
    .find()
    .then((ress) => {
      res.status(201).json(ress);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.delete("/food/:id", (req, res) => {
  foodList
    .findByIdAndDelete(req.params.id)
    .then((result) => {
      if (!result) {
        return res.status(404).send();
      } else {
        console.log("deleted succesfully");
        res.send({ message: "Deleted Successfully" });
      }
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.put("/foodlist/upadte", (req, res) => {
  let foodUpdate = {
    drink: req.body.drink,
  };
  foodList
    .updateOne({ _id: req.body._id || "" }, foodUpdate, {
      new: true,
    })
    .then((records) => {
      res.status(201).json(records);
    })
    .catch((err) => console.log(err));
});

app.get("/logout", (req, res) => {
  try {
    // client.del("formData");
    res.redirect("back");
    // res.redirect("back");
    // res.redirect("http://localhost:4200/login");
    return;
  } catch (err) {
    console.log("redis err========>>" + err);
  }
});
module.exports = app;
