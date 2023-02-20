const mongoose = require("mongoose");
const { User } = require("./User");
const { Persons } = require("./User");
const dotenv = require("dotenv");
dotenv.config();
URI = process.env.MONGO_URI;

const database = (module.exports = () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  try {
    mongoose.connect(URI);
    console.log("database connected successfully");
  } catch (error) {
    console.log(error);
  }
});

database();

//Create a person
async function run() {
  const user = new User({
    name: "Gus",
    age: 26,
    favoriteFoods: ["Beef", "Chicken"],
  });
  await user.save();
}
run();

//Create Many Records
Persons.createCollection()
  .then(function (arrayOfPeople) {
    console.log(arrayOfPeople);
  })
  .then(
    Persons.insertMany([
      {
        name: "Patches",
        age: 32,
        favoriteFoods: ["Kebab", "Salami", "Hotdogs", "burritos"],
      },
      {
        name: "Gherman",
        age: 79,
        favoriteFoods: ["Meatballs", "burritos"],
      },
      {
        name: "Sekiro",
        age: 29,
        favoriteFoods: ["Sushi", "Fish", "burritos"],
      },
      {
        name: "Ludwig",
        age: 45,
        favoriteFoods: [
          "Meatloaf",
          "Mashed potato",
          "Beef",
          "Salmon",
          "burritos",
        ],
      },
      {
        name: "Seigurd",
        age: 32,
        favoriteFoods: ["Roasted turkey", "Rabbit meat"],
      },
    ])
  );

//find
Persons.find({ name: "Ludwig" }, function (err, res) {
  if (err) {
    console.log(err);
  } else {
    console.log("Result : ", res);
  }
});

//findOne
Persons.findOne({ name: "Seigurd" }, function (err, res) {
  if (err) {
    console.log(err);
  } else {
    console.log("Result : ", res);
  }
});

//findById
Persons.findById("63f3268a292e51bd27b08353", function (err, res) {
  if (err) {
    console.log(err);
  } else {
    console.log("Result : ", res);
  }
});

//Classic Updates Find, Edit, then Save
Persons.findOne({ name: "Ludwig" }).then((user) => {
  user.favoriteFoods.push("Hamburger");
  user.markModified("favoriteFoods");
  user.save((err) => console.log(err));
});

//findOneAndUpdate
Persons.findOneAndUpdate(
  { name: "Gherman" },
  { name: "Tarnished" },
  null,
  function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log("Original Doc : ", docs);
    }
  }
);

//findByIdAndRemove
Persons.findByIdAndRemove("63f32d8a7ac8f62fb085d755", function (err, docs) {
  if (err) {
    console.log(err);
  } else {
    console.log("Deleted User : ", docs);
  }
});

//Delete Many Documents
Persons.remove({ name: "Sekiro" }).then((result) => {
  console.log(result);
});

//Chain Search Query Helpers

Persons.find({ favoriteFoods: "burritos" })
  .sort({ name: "asc" })
  .limit(2)
  .select("-age")
  .exec()
  .then((result) => {
    console.log(result);
  });
