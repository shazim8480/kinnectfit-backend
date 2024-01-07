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

// // const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.efpjwcu.mongodb.net/?retryWrites=true&w=majority`;

// const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ac-dcujods-shard-00-00.efpjwcu.mongodb.net:27017,ac-dcujods-shard-00-01.efpjwcu.mongodb.net:27017,ac-dcujods-shard-00-02.efpjwcu.mongodb.net:27017/?ssl=true&replicaSet=atlas-5aa5iy-shard-0&authSource=admin&retryWrites=true&w=majority`;

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
    const mealPlanCollection = db.collection("mealPlans");
    const mealCollection = db.collection("meals");

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
        const user_id = uuidv4();

        // Save user to the database
        const newUser = await userCollection.insertOne({
          id: user_id,
          name,
          email,
          password: hashedPassword,
          created_at: new Date(),
        });

        const createdUser = {
          _id: newUser.insertedId,
          id: user_id,
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
          isTrainer: false,
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

    // ********** ! Workout api collection ! ********** //

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
        const workout = await workoutCollection.findOne({ workout_id: id });
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

    // get workout from specific user
    app.get("/api/kv1/user-workout/:user_id", async (req, res) => {
      try {
        const { user_id } = req.params;
        // console.log(params);
        const user = await userCollection.findOne({ id: user_id });
        // return;

        if (!user) {
          return res
            .status(404)
            .json({ message: "User not found", status: 404 });
          return;
        } else if (user?.workouts) {
          res.status(200).json({ workouts: user.workouts, status: 200 });
        } else {
          res.status(200).json({ user: user, status: 200 });
        }
      } catch (error) {
        res
          .status(500)
          .json({ message: "Error fetching workouts", error: error.message });
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

    // Update a specific workout module by ID
    app.put(
      "/api/kv1/update-workout-module/:id/:module_id",
      async (req, res) => {
        try {
          const { id, module_id } = req.params;
          const { isConfirmed } = req.body;
          const result = await userCollection.updateOne(
            {
              "workouts.workout_id": id,
              "workouts.workout_modules.id": module_id,
            },
            {
              $set: {
                "workouts.$[outer].workout_modules.$[inner].isConfirmed":
                  isConfirmed,
              },
            },
            {
              arrayFilters: [
                { "outer.workout_id": id },
                { "inner.id": module_id },
              ],
            }
          );

          if (result.matchedCount === 0) {
            return res
              .status(404)
              .json({ message: "Module not found", status: 404 });
          }

          if (result.modifiedCount === 0) {
            return res
              .status(200)
              .json({ message: "No changes made", status: 200 });
          }

          res
            .status(200)
            .json({ message: "Module updated successfully", status: 200 });
        } catch (error) {
          console.error("Error updating module:", error);
          res
            .status(500)
            .json({ message: "Error updating module", error: error.message });
        }
      }
    );

    // ********** ! Meal plan api collection ! ********** //

    // Create a meal plan
    app.post("/api/kv1/create-meal-plan", async (req, res) => {
      const mealPlan_id = uuidv4();
      try {
        const {
          trainer_id,
          mealPlan_name,
          mealPlan_description,
          mealPlan_category,
          mealPlan_cover_img,
        } = req.body;

        const newMealPlan = {
          trainer_id,
          mealPlan_id: mealPlan_id,
          mealPlan_name,
          mealPlan_description,
          mealPlan_category,
          mealPlan_cover_img,
          created_at: new Date(),
        };

        // Save the new mealPlan to the database
        const insertedMealPlan = await mealPlanCollection.insertOne(
          newMealPlan
        );
        // console.log(insertedMealPlan);

        res.status(201).json({
          message: "Meal Plan created successfully",
          mealPlan: { insertedMealPlan, mealPlan_id },
          status: 201,
        });
      } catch (error) {
        res
          .status(500)
          .json({ message: "Error creating workout", error: error.message });
      }
    });

    // Get all meal plans
    app.get("/api/kv1/meal-plans", async (req, res) => {
      try {
        const mealPlans = await mealPlanCollection.find({}).toArray();
        res.status(200).json({ mealPlans, status: 200 });
      } catch (error) {
        res
          .status(500)
          .json({ message: "Error fetching workouts", error: error.message });
      }
    });

    // Get a specific meal plan by ID
    app.get("/api/kv1/meal-plan/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const mealPlan = await mealPlanCollection.findOne({
          _id: ObjectId(id),
        });
        if (!mealPlan) {
          return res
            .status(404)
            .json({ message: "Meal plan not found", status: 404 });
        }
        res.status(200).json({ mealPlan, status: 200 });
      } catch (error) {
        res
          .status(500)
          .json({ message: "Error fetching meal plan", error: error.message });
      }
    });

    // Update a specific meal plan by ID
    app.put("/api/kv1/meal-plan/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const updatedMealPlan = req.body;
        // Update the workout in the database
        const result = await mealPlanCollection.updateOne(
          { _id: ObjectId(id) },
          { $set: updatedMealPlan }
        );
        if (result.modifiedCount === 0) {
          return res
            .status(404)
            .json({ message: "Meal plan not found", status: 404 });
        }
        res
          .status(200)
          .json({ message: "Meal plan updated successfully", status: 200 });
      } catch (error) {
        res
          .status(500)
          .json({ message: "Error updating meal plan", error: error.message });
      }
    });

    // Delete a specific meal plan by ID
    app.delete("/api/kv1/meal-plan/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const result = await mealPlanCollection.deleteOne({
          _id: ObjectId(id),
        });
        if (result.deletedCount === 0) {
          return res
            .status(404)
            .json({ message: "Meal plan not found", status: 404 });
        }
        res
          .status(200)
          .json({ message: "Meal plan deleted successfully", status: 200 });
      } catch (error) {
        res
          .status(500)
          .json({ message: "Error deleting meal plan", error: error.message });
      }
    });

    // ********** !  user api  ********** //

    // Get all users
    app.get("/api/kv1/users", async (req, res) => {
      try {
        const users = await userCollection.find({}).toArray();
        res.status(200).json({ users, status: 200 });
      } catch (error) {
        res
          .status(500)
          .json({ message: "Error fetching users", error: error.message });
      }
    });

    // Get a specific workout by ID
    app.get("/api/kv1/user/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const user = await userCollection.findOne({ id });
        if (!user) {
          return res
            .status(404)
            .json({ message: "User not found", status: 404 });
        }
        res.status(200).json({ user, status: 200 });
      } catch (error) {
        res
          .status(500)
          .json({ message: "Error fetching user", error: error.message });
      }
    });

    // ********** ! Update user api  ********** //
    // Update user route
    // Define a new endpoint to update user with workout, meal, or meal plan
    app.put("/api/kv1/update-user/:user_id", async (req, res) => {
      try {
        const { user_id } = req.params;
        // return;

        const { workout, meal_id, mealPlan_id, workout_module } = req.body;

        const user = await userCollection.findOne({ id: user_id });
        // console.log(user);
        // return;

        if (!user) {
          return res
            .status(404)
            .json({ message: "User not found", status: 404 });
        }
        // return
        // Update user with workout information
        if (workout) {
          const updatedUser = await userCollection.findOneAndUpdate(
            { id: user_id },
            { $addToSet: { workouts: workout } }, // Assuming workouts is an array in your user schema
            { returnDocument: "after" }
          );
          console.log(updatedUser);

          // return;
          res.status(200).json({
            message: "User updated successfully with workout",
            user: updatedUser.value,
            status: 200,
          });
        }
        // return;
        // Update user with meal information
        else if (meal_id) {
          const updatedUser = await userCollection.findOneAndUpdate(
            { id: user_id },
            { $addToSet: { meals: meal_id } }, // Assuming meals is an array in your user schema
            { returnDocument: "after" }
          );

          res.status(200).json({
            message: "User updated successfully with meal",
            user: updatedUser.value,
            status: 200,
          });
        }

        // Update user with meal plan information
        else if (mealPlan_id) {
          const updatedUser = await userCollection.findOneAndUpdate(
            { id: user_id },
            { $addToSet: { mealPlans: mealPlan_id } },
            { returnDocument: "after" }
          );

          res.status(200).json({
            message: "User updated successfully with meal plan",
            user: updatedUser.value,
            status: 200,
          });
        }
        // Update user with workout modules information
        else if (workout_module) {
          const updatedUser = await userCollection.findOneAndUpdate(
            { id: user_id },
            { $addToSet: { workout_modules: workout_module } },
            { returnDocument: "after" }
          );
          res.status(200).json({
            message: "User updated successfully with workout modules",
            user: updatedUser.value,
            status: 200,
          });
        }
      } catch (error) {
        res
          .status(500)
          .json({ message: "Error updating user", error: error.message });
      }
    });

    // ********** ! Meal api collection ! ********** //

    // Create a meal
    app.post("/api/kv1/create-meal", async (req, res) => {
      const meal_id = uuidv4();
      try {
        const {
          available_category,
          carbs,
          fat,
          meal_category,
          meal_img,
          meal_name,
          prep_time,
          protein,
          ingredients,
          mealPlan_id,
          trainer_id,
        } = req.body;

        const newMeal = {
          trainer_id,
          meal_id: meal_id,
          meal_name,
          meal_img,
          meal_category,
          available_category,
          mealPlan_id,
          carbs,
          fat,
          prep_time,
          protein,
          ingredients,
          created_at: new Date(),
        };

        // Save the new mealPlan to the database
        const insertedMeal = await mealCollection.insertOne(newMeal);
        // console.log(insertedMeal);

        res.status(201).json({
          message: "Meal created successfully",
          mealPlan: { insertedMeal, meal_id },
          status: 201,
        });
      } catch (error) {
        res
          .status(500)
          .json({ message: "Error creating meal", error: error.message });
      }
    });

    // Get all meals
    app.get("/api/kv1/meals", async (req, res) => {
      try {
        const meals = await mealCollection.find({}).toArray();
        res.status(200).json({ meals, status: 200 });
      } catch (error) {
        res
          .status(500)
          .json({ message: "Error fetching meals", error: error.message });
      }
    });

    // Get a specific meal  by ID
    app.get("/api/kv1/meal/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const meal = await mealCollection.findOne({ _id: ObjectId(id) });
        if (!meal) {
          return res
            .status(404)
            .json({ message: "Meal not found", status: 404 });
        }
        res.status(200).json({ meal, status: 200 });
      } catch (error) {
        res
          .status(500)
          .json({ message: "Error fetching meal", error: error.message });
      }
    });

    // Update a specific meal plan by ID
    app.put("/api/kv1/meal/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const updatedMeal = req.body;
        // Update the workout in the database
        const result = await mealCollection.updateOne(
          { _id: ObjectId(id) },
          { $set: updatedMeal }
        );
        if (result.modifiedCount === 0) {
          return res
            .status(404)
            .json({ message: "Meal not found", status: 404 });
        }
        res
          .status(200)
          .json({ message: "Meal updated successfully", status: 200 });
      } catch (error) {
        res
          .status(500)
          .json({ message: "Error updating meal", error: error.message });
      }
    });

    // Delete a specific meal plan by ID
    app.delete("/api/kv1/meal/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const result = await mealCollection.deleteOne({ _id: ObjectId(id) });
        if (result.deletedCount === 0) {
          return res
            .status(404)
            .json({ message: "Meal not found", status: 404 });
        }
        res
          .status(200)
          .json({ message: "Meal deleted successfully", status: 200 });
      } catch (error) {
        res
          .status(500)
          .json({ message: "Error deleting meal", error: error.message });
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
