require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

const cors = require("cors");

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.raiw9.mongodb.net/?retryWrites=true&w=majority`;
// const uri = `mongodb://localhost:27017`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const run = async () => {
  try {
    const db = client.db("kinnectfit");
    const userCollection = db.collection("users");
    const trainerCollection = db.collection("trainers");
    const workoutCollection = db.collection("workouts");

    // ********** ! auth api ! ********** //

    // Sign up route
    app.post("/api/kv1/sign-up", async (req, res) => {
      try {
        const { name, email, password } = req.body;

        // Check if the email already exists in the database
        const existingUser = await userCollection.findOne({ email });
        if (existingUser) {
          return res
            .status(409)
            .json({ message: "Email already exists!", status: 409 });
        }

        const hashedPassword = await bcrypt.hash(password, 10); // Hashing password
        const userId = uuidv4();

        // Save user to the database
        const newUser = await userCollection.insertOne({
          id: userId,
          name,
          email,
          password: hashedPassword,
          created_at: new Date(),
        });

        const createdUser = {
          _id: newUser.insertedId,
          id: userId,
          name,
          email,
          created_at: new Date(),
        };

        res.status(201).json({
          message: "Account created successfully",
          user: createdUser,
          status: 200,
        });
      } catch (error) {
        res
          .status(500)
          .json({ message: "Error creating user", error: error.message });
      }
    });

    // Sign in route
    app.post("/api/kv1/sign-in", async (req, res) => {
      try {
        const { email, password } = req.body;

        // Find user by email in the database
        const user = await userCollection.findOne({ email });

        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }

        // Compare entered password with hashed password in the database
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
          return res.status(401).json({ message: "Invalid password" });
        }

        // Remove password from the user object before sending the response
        const { password: userPassword, ...userWithoutPassword } = user;

        res.status(200).json({
          message: "Logged in successfully",
          user: userWithoutPassword,
          status: 200,
        });
      } catch (error) {
        res
          .status(500)
          .json({ message: "Error signing in", error: error.message });
      }
    });

    // ********** ! Trainers api collection ! ********** //

    // Create a new trainer
    app.post("/api/kv1/create-trainer", async (req, res) => {
      try {
        const {
          trainer_id,
          name,
          age,
          height,
          weight,
          BMI,
          status,
          isTrainer,
          trainerImg,
        } = req.body;

        const newTrainer = {
          trainer_id,
          name,
          age,
          height,
          weight,
          BMI,
          status,
          isTrainer,
          trainerImg,
          created_at: new Date(),
        };

        // Check if a trainer with the same trainer_id already exists
        const existingTrainer = await trainerCollection.findOne({ trainer_id });
        if (existingTrainer) {
          return res.status(409).json({
            message: "Trainer already exists",
            status: 409,
          });
        }

        // Save the new trainer to the database
        const insertedTrainer = await trainerCollection.insertOne(newTrainer);
        res.status(201).json({
          message: "Trainer created successfully",
          trainer: insertedTrainer,
          status: 201,
        });
      } catch (error) {
        res
          .status(500)
          .json({ message: "Error creating trainer", error: error.message });
      }
    });

    // Get all trainers
    app.get("/api/kv1/trainers", async (req, res) => {
      try {
        const trainers = await trainerCollection.find({}).toArray();
        res.status(200).json({ trainers, status: 200 });
      } catch (error) {
        res
          .status(500)
          .json({ message: "Error fetching trainers", error: error.message });
      }
    });

    // Get a specific trainer by ID
    app.get("/api/kv1/trainer/:trainer_id", async (req, res) => {
      try {
        const { trainer_id } = req.params;
        const trainer = await trainerCollection.findOne({ trainer_id });
        if (!trainer) {
          return res
            .status(404)
            .json({ message: "Trainer not found", status: 404 });
        }
        res.status(200).json({ trainer, status: 200 });
      } catch (error) {
        res
          .status(500)
          .json({ message: "Error fetching trainer", error: error.message });
      }
    });

    // Update a specific trainer by ID
    app.put("/api/kv1/trainer/:trainer_id", async (req, res) => {
      try {
        const { trainer_id } = req.params;
        const updatedTrainer = req.body;
        // Perform validation or sanitation of data if needed
        // Update the trainer in the database
        const result = await trainerCollection.updateOne(
          { trainer_id },
          { $set: updatedTrainer }
        );
        if (result.modifiedCount === 0) {
          return res
            .status(404)
            .json({ message: "Trainer not found", status: 404 });
        }
        res
          .status(200)
          .json({ message: "Trainer updated successfully", status: 200 });
      } catch (error) {
        res
          .status(500)
          .json({ message: "Error updating trainer", error: error.message });
      }
    });

    // Delete a specific trainer by ID
    app.delete("/api/kv1/trainer/:trainer_id", async (req, res) => {
      try {
        const { trainer_id } = req.params;
        // Delete the trainer from the database
        const result = await trainerCollection.deleteOne({ trainer_id });
        if (result.deletedCount === 0) {
          return res
            .status(404)
            .json({ message: "Trainer not found", status: 404 });
        }
        res
          .status(200)
          .json({ message: "Trainer deleted successfully", status: 200 });
      } catch (error) {
        res
          .status(500)
          .json({ message: "Error deleting trainer", error: error.message });
      }
    });

    // ********** ! Workouts api collection ! ********** //

    // create a new workout
    app.post("/api/kv1/create-workout", async (req, res) => {
      const workout_id = uuidv4();

      try {
        const {
          workout_name,
          workout_cover,
          workout_modules,
          category,
          total_workout_time,
          trainer_id,
          description,
        } = req.body;

        const newWorkout = {
          workout_id: workout_id,
          workout_name,
          workout_cover,
          workout_modules,
          category,
          total_workout_time,
          trainer_id,
          description,
          created_at: new Date(),
        };

        // Save the new workout to the database
        const insertedWorkout = await workoutCollection.insertOne(newWorkout);
        res.status(201).json({
          message: "Workout created successfully",
          workout: insertedWorkout,
          status: 201,
        });
      } catch (error) {
        res
          .status(500)
          .json({ message: "Error creating workout", error: error.message });
      }
    });

    // Get all workouts
    app.get("/api/kv1/workouts", async (req, res) => {
      try {
        const workouts = await workoutCollection.find({}).toArray();
        res.status(200).json({ workouts, status: 200 });
      } catch (error) {
        res
          .status(500)
          .json({ message: "Error fetching workouts", error: error.message });
      }
    });

    // Get a specific workout by ID
    app.get("/api/kv1/workout/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const workout = await workoutCollection.findOne({ _id: ObjectId(id) });
        if (!workout) {
          return res
            .status(404)
            .json({ message: "Workout not found", status: 404 });
        }
        res.status(200).json({ workout, status: 200 });
      } catch (error) {
        res
          .status(500)
          .json({ message: "Error fetching workout", error: error.message });
      }
    });

    // Update a specific workout by ID
    app.put("/api/kv1/workout/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const updatedWorkout = req.body;
        // Update the workout in the database
        const result = await workoutCollection.updateOne(
          { _id: ObjectId(id) },
          { $set: updatedWorkout }
        );
        if (result.modifiedCount === 0) {
          return res
            .status(404)
            .json({ message: "Workout not found", status: 404 });
        }
        res
          .status(200)
          .json({ message: "Workout updated successfully", status: 200 });
      } catch (error) {
        res
          .status(500)
          .json({ message: "Error updating workout", error: error.message });
      }
    });
  } finally {
  }
};

run().catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Welcome to Kinnectfit server!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
