const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const moment = require("moment");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("./models/user");
const Game = require("./models/game");
const Venue = require("./models/venue");
const crypto = require("crypto");

const app = express();
const port = process.env.BACKEND_PORT || 6000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Couldn't connect to MongoDB", err);
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.post("/register", async (req, res) => {
  try {
    const userData = req.body;

    const newUser = new User(userData);
    await newUser.save();

    const secretKey = crypto.randomBytes(32).toString("hex");
    const token = jwt.sign({ userId: newUser._id }, secretKey);
    res.status(201).json({ token });
  } catch (err) {
    console.log("Error Creating User", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid Email" });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid Password" });
    }
    const secretKey = crypto.randomBytes(32).toString("hex");
    const token = jwt.sign({ userId: user._id }, secretKey);
    res.status(200).json({ token });
  } catch (err) {
    console.log("Error Logging In User", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const venues = [
  {
    name: "147 One Four Seven Snooker, Billiards and Pool Sports Academy",
    rating: 4,
    deferLink: "https://playo.page.link/ry8TT",
    fullLink:
      "https://playo.co/venue/?venueId=4ec5b58f-d58f-4ce1-8c84-2caa63007ecc",
    avgRating: 4,
    ratingCount: 3,
    lat: 12.9341796,
    lng: 77.6101537,
    icon: "https://maps.google.com/mapfiles/kml/paddle/4-lv.png",
    filter_by: ["Pool", "Snooker"],
    sportsAvailable: [
      {
        id: "10",
        name: "Badminton",
        icon: "badminton",
        price: 500,
        courts: [
          {
            id: "10",
            name: "Standard synthetic court 1",
            number: 1,
          },
          {
            id: "11",
            name: "Standard synthetic court 2",
            number: 2,
          },
          {
            id: "12",
            name: "Standard synthetic court 3",
            number: 3,
          },
        ],
      },

      {
        id: "11",
        name: "Cricket",
        icon: "cricket",
        price: 1100,
        courts: [
          {
            id: "10",
            name: "Full Pitch 1",
            number: 1,
          },
          {
            id: "11",
            name: "Full Pitch 2",
            number: 2,
          },
        ],
      },
      {
        id: "12",
        name: "Tennis",
        icon: "tennis",
        price: 900,
        courts: [
          {
            id: "10",
            name: "Court 1",
            number: 1,
          },
          {
            id: "11",
            name: "Court 2",
            number: 2,
          },
        ],
      },
    ],
    image:
      "https://playo.gumlet.io/FIGURINEFITNESSINDIRANAGAR/SnookerRoom1652349575145.jpeg?mode=crop&crop=smart&h=200&width=450&q=75",
    location:
      "No. 27, Museum Rd, Shanthala Nagar, Ashok Nagar, Bengaluru, Karnataka",
    address: "AVS Compound, 1st Floor, 1st Cross",
    bookings: [],
  },
  {
    name: "OvalNet Badminton Academy - Sahakar Nagar",
    rating: 4,
    deferLink: "https://z34v4.app.goo.gl/MAAX",
    fullLink:
      "https://playo.co/venue/?venueId=afbe7186-2f86-4215-8715-4b967f166b09",
    avgRating: 4,
    ratingCount: 3,
    lat: 13.059883,
    lng: 77.582389,
    icon: "https://maps.google.com/mapfiles/kml/paddle/4-lv.png",
    filter_by: ["Pool", "Snooker"],
    sportsAvailable: [
      {
        id: "10",
        name: "Badminton",
        icon: "badminton",
        price: 500,
        courts: [
          {
            id: "10",
            name: "Standard synthetic court 1",
            number: 1,
          },
          {
            id: "11",
            name: "Standard synthetic court 2",
            number: 2,
          },
          {
            id: "12",
            name: "Standard synthetic court 3",
            number: 3,
          },
        ],
      },

      {
        id: "11",
        name: "Cricket",
        icon: "cricket",
        price: 1100,
        courts: [
          {
            id: "10",
            name: "Full Pitch 1",
            number: 1,
          },
          {
            id: "11",
            name: "Full Pitch 2",
            number: 2,
          },
        ],
      },
      {
        id: "12",
        name: "Tennis",
        icon: "tennis",
        price: 900,
        courts: [
          {
            id: "10",
            name: "Court 1",
            number: 1,
          },
          {
            id: "11",
            name: "Court 2",
            number: 2,
          },
        ],
      },
    ],
    image:
      "https://playo.gumlet.io/OVALNETBADMINTONACADEMY/OvalNetBadmintonAcademy6.jpg?mode=crop&crop=smart&h=200&width=450&q=75",
    location:
      "No. 27, Museum Rd, Shanthala Nagar, Ashok Nagar, Bengaluru, Karnataka",
    address: "No. 3/1, Kodigehalli Main Road, Adjacent to Cauvery College",
    bookings: [],
  },
  {
    name: "OvalNet Badminton Academy - Sahakar Nagar",
    rating: 4,
    deferLink: "https://z34v4.app.goo.gl/MAAX",
    fullLink:
      "https://playo.co/venue/?venueId=afbe7186-2f86-4215-8715-4b967f166b09",
    avgRating: 4,
    ratingCount: 3,
    lat: 13.059883,
    lng: 77.582389,
    icon: "https://maps.google.com/mapfiles/kml/paddle/4-lv.png",
    filter_by: ["Pool", "Snooker"],
    sportsAvailable: [
      {
        id: "10",
        name: "Badminton",
        icon: "badminton",
        price: 500,
        courts: [
          {
            id: "10",
            name: "Standard synthetic court 1",
            number: 1,
          },
          {
            id: "11",
            name: "Standard synthetic court 2",
            number: 2,
          },
          {
            id: "12",
            name: "Standard synthetic court 3",
            number: 3,
          },
        ],
      },

      {
        id: "11",
        name: "Cricket",
        icon: "cricket",
        price: 1100,
        courts: [
          {
            id: "10",
            name: "Full Pitch 1",
            number: 1,
          },
          {
            id: "11",
            name: "Full Pitch 2",
            number: 2,
          },
        ],
      },
      {
        id: "12",
        name: "Tennis",
        icon: "tennis",
        price: 900,
        courts: [
          {
            id: "10",
            name: "Court 1",
            number: 1,
          },
          {
            id: "11",
            name: "Court 2",
            number: 2,
          },
        ],
      },
    ],
    image:
      "https://playo.gumlet.io/OVALNETBADMINTONACADEMY/OvalNetBadmintonAcademy6.jpg?mode=crop&crop=smart&h=200&width=450&q=75",
    location:
      "No. 27, Museum Rd, Shanthala Nagar, Ashok Nagar, Bengaluru, Karnataka",
    address: "No. 3/1, Kodigehalli Main Road, Adjacent to Cauvery College",
    bookings: [],
  },
  {
    name: "Play Zone - Sahakarnagar (Shree Vayu Badminton Arena)",
    rating: 4,
    fullLink:
      "https://playo.co/venue?venueId=6bb450c0-318b-49e5-b7c0-c02a37d34ef8",
    deferLink: "https://z34v4.app.goo.gl/4Kqo",
    avgRating: 4,
    ratingCount: 3,
    lat: 13.053750730700056,
    lng: 77.57626923775621,
    icon: "https://maps.google.com/mapfiles/kml/paddle/4-lv.png",
    filter_by: ["Pool", "Snooker"],
    sportsAvailable: [
      {
        id: "10",
        name: "Badminton",
        icon: "badminton",
        price: 500,
        courts: [
          {
            id: "10",
            name: "Standard synthetic court 1",
            number: 1,
          },
          {
            id: "11",
            name: "Standard synthetic court 2",
            number: 2,
          },
          {
            id: "12",
            name: "Standard synthetic court 3",
            number: 3,
          },
        ],
      },

      {
        id: "11",
        name: "Cricket",
        icon: "cricket",
        price: 1100,
        courts: [
          {
            id: "10",
            name: "Full Pitch 1",
            number: 1,
          },
          {
            id: "11",
            name: "Full Pitch 2",
            number: 2,
          },
        ],
      },
      {
        id: "12",
        name: "Tennis",
        icon: "tennis",
        price: 900,
        courts: [
          {
            id: "10",
            name: "Court 1",
            number: 1,
          },
          {
            id: "11",
            name: "Court 2",
            number: 2,
          },
        ],
      },
    ],
    image:
      "https://playo.gumlet.io/PLAYZONESAHAKARNAGARSHREEVAYUBADMINTONARENA20231206074712995440/PlayZoneSahakarnagarShreeVayuBadmintonArena1701880566748.jpeg?mode=crop&crop=smart&h=200&width=450&q=75",
    location:
      "No. 27, Museum Rd, Shanthala Nagar, Ashok Nagar, Bengaluru, Karnataka",
    address:
      "Sahakar Nagar road, Adjacent to AMCO layout and Tata Nagar, Hebbal",
    bookings: [],
  },
  {
    name: "VIN Badminton",
    rating: 4,
    deferLink: "https://z34v4.app.goo.gl/RTF4",
    fullLink:
      "https://playo.co/venue/?venueId=37f3675b-dfd2-4f30-8506-a3883abef902",
    avgRating: 4,
    ratingCount: 3,
    lat: 13.071497063988476,
    lng: 77.58706385591489,
    icon: "https://maps.google.com/mapfiles/kml/paddle/4-lv.png",
    filter_by: ["Pool", "Snooker"],
    sportsAvailable: [
      {
        id: "10",
        name: "Badminton",
        icon: "badminton",
        price: 500,
        courts: [
          {
            id: "10",
            name: "Standard synthetic court 1",
            number: 1,
          },
          {
            id: "11",
            name: "Standard synthetic court 2",
            number: 2,
          },
          {
            id: "12",
            name: "Standard synthetic court 3",
            number: 3,
          },
        ],
      },

      {
        id: "11",
        name: "Cricket",
        icon: "cricket",
        price: 1100,
        courts: [
          {
            id: "10",
            name: "Full Pitch 1",
            number: 1,
          },
          {
            id: "11",
            name: "Full Pitch 2",
            number: 2,
          },
        ],
      },
      {
        id: "12",
        name: "Tennis",
        icon: "tennis",
        price: 900,
        courts: [
          {
            id: "10",
            name: "Court 1",
            number: 1,
          },
          {
            id: "11",
            name: "Court 2",
            number: 2,
          },
        ],
      },
    ],
    image:
      "https://playo.gumlet.io/VINI5BADMINTONARENA20240226042742110513/Vini5BadmintonArena1709376498394.jpg?mode=crop&crop=smart&h=200&width=450&q=75",
    location:
      "No. 27, Museum Rd, Shanthala Nagar, Ashok Nagar, Bengaluru, Karnataka",
    address: "Vini5 badminton arena, 5th main road, Canara bank layout",
    bookings: [],
  },
  {
    name: "Serve & Smash Badminton Academy",
    rating: 4,
    fullLink:
      "https://playo.co/venue?venueId=a0c6ceb4-d09b-4fcf-bafd-6c949a55590c",
    deferLink: "https://z34v4.app.goo.gl/3k9a",
    avgRating: 4,
    ratingCount: 3,
    lat: 13.045735,
    lng: 77.572929,
    icon: "https://maps.google.com/mapfiles/kml/paddle/4-lv.png",
    filter_by: ["Pool", "Snooker"],
    sportsAvailable: [
      {
        id: "10",
        name: "Badminton",
        icon: "badminton",
        price: 500,
        courts: [
          {
            id: "10",
            name: "Standard synthetic court 1",
            number: 1,
          },
          {
            id: "11",
            name: "Standard synthetic court 2",
            number: 2,
          },
          {
            id: "12",
            name: "Standard synthetic court 3",
            number: 3,
          },
        ],
      },

      {
        id: "11",
        name: "Cricket",
        icon: "cricket",
        price: 1100,
        courts: [
          {
            id: "10",
            name: "Full Pitch 1",
            number: 1,
          },
          {
            id: "11",
            name: "Full Pitch 2",
            number: 2,
          },
        ],
      },
      {
        id: "12",
        name: "Tennis",
        icon: "tennis",
        price: 900,
        courts: [
          {
            id: "10",
            name: "Court 1",
            number: 1,
          },
          {
            id: "11",
            name: "Court 2",
            number: 2,
          },
        ],
      },
    ],
    image:
      "https://playo.gumlet.io/SERVESMASH20191003055000886885/ServeSmash0.jpeg?mode=crop&crop=smart&h=200&width=450&q=75",
    location:
      "No. 27, Museum Rd, Shanthala Nagar, Ashok Nagar, Bengaluru, Karnataka",
    address: "1st Cross, RMV 2nd Stage, Nagashettihalli bangalore",
    bookings: [],
  },
  // Add more venues as need
];

async function addVenues() {
  for (const venueData of venues) {
    const existingVenue = await Venue.findOne({ name: venueData.name });
    if (existingVenue) {
      continue;
    }
    const newVenue = new Venue(venueData);
    await newVenue.save();
    console.log("Venue Added", venueData.name);
  }
}

addVenues().catch((err) => {
  console.log("Error Adding Venues", err);
});

app.get("/venues", async (req, res) => {
  try {
    const venues = await Venue.find({});
    res.status(200).json(venues);
  } catch (err) {
    console.log("Error Fetching Venues", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/creategame", async (req, res) => {
  try {
    const { sport, area, date, time, admin, totalPlayers } = req.body;

    const activityAccess = "public";
    console.log("body", req.body);

    console.log("sport", sport);
    console.log(area);
    console.log(date);
    console.log(admin);

    const newGame = new Game({
      sport,
      area,
      date,
      time,
      admin,
      totalPlayers,
      players: [admin],
    });

    const savedGame = await newGame.save();
    res.status(200).json(savedGame);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create game" });
  }
});

app.get("/games", async (req, res) => {
  try {
    const games = await Game.find({})
      .populate("admin")
      .populate("players", "image firstName lastName");

    const currentDate = moment();
    const filteredGames = games?.filter((game) => {
      const gameDate = moment(game.date, "Do MMMM");
      const gameTime = game.time.split("-")[0];
      const gameDateTime = moment(
        `${gameDate.format("YYYY-MM-DD")} ${gameTime}`,
        "YYYY-MM-DD h:mm A"
      );
      console.log("gameDateTime", gameDateTime);
      return gameDateTime.isAfter(currentDate);
    });
    const formattedGames = filteredGames.map((game) => ({
      _id: game._id,
      sport: game.sport,
      date: game.date,
      area: game.area,
      time: game.time,
      players: game.players.map((player) => ({
        _id: player._id,
        name: player.firstName + " " + player.lastName,
        imageUrl: player.image,
      })),
      totalPlayers: game.totalPlayers,
      queries: game.queries,
      requests: game.requests,
      isBooked: game.isBooked,
      adminName: `${game.admin.firstName} ${game.admin.lastName}`,
      adminUrl: game.admin.image,
      matchFull: game.matchFull,
    }));
    res.json(formattedGames);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to Fetch game" });
  }
});

app.get("/upcoming", async (req, res) => {
  try {
    const userId = req.query.userId;

    const games = await Game.find({
      $or: [{ players: userId }, { admin: userId }],
    })
      .populate("admin")
      .populate("players", "image firstName lastName");

    const formattedGames = games.map((game) => ({
      _id: game._id,
      sport: game.sport,
      date: game.date,
      area: game.area,
      time: game.time,
      players: game.players.map((player) => ({
        _id: player._id,
        name: player.firstName + " " + player.lastName,
        imageUrl: player.image,
      })),
      totalPlayers: game.totalPlayers,
      queries: game.queries,
      requests: game.requests,
      isBooked: game.isBooked,
      adminName: `${game.admin.firstName} ${game.admin.lastName}`,
      isUserAdmin: game.admin._id.toString() === userId,
      adminUrl: game.admin.image,
      matchFull: game.matchFull,
    }));
    return res.json(formattedGames);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to Fetch game" });
  }
});

app.post("/games/:gameId/request", async (req, res) => {
  try {
    const { userId, comment } = req.body;
    const { gameId } = req.params;
    const game = await Game.findById(gameId);
    if (!game) {
      return res.status(404).json({ message: "Game Not Found" });
    }
    const existingRequest = game.requests.find(
      (request) => request.userId.toString() === userId
    );
    if (existingRequest) {
      return res.status(400).json({ message: "Request Already Sent" });
    }
    game.requests.push({ userId, comment });
    await game.save();
    res.status(200).json({ message: "Request Sent Successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to Send request" });
  }
});

app.get("/games/:gameId/requests", async (req, res) => {
  try {
    const { gameId } = req.params;
    const game = await Game.findById(gameId).populate({
      path: "requests.userId",
      select: "email firstName lastName image skill noOfGames playpals sports",
    });
    if (!game) {
      return res.status(404).json({ message: "Game Not Found" });
    }
    const requestWithUserInfo = game.requests.map((request) => ({
      userId: request.userId._id,
      email: request.userId.email,
      firstName: request.userId.firstName,
      lastName: request.userId.lastName,
      image: request.userId.image,
      skill: request.userId.skill,
      noOfGames: request.userId.noOfGames,
      playpals: request.userId.playpals,
      sports: request.userId.sports,
      comment: request.comment,
    }));
    res.status(200).json(requestWithUserInfo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to get the Requests" });
  }
});

app.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    return res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch user" });
  }
});
