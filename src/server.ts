import app from "./app";
import mongoose from "mongoose";
import "dotenv/config";

//database connection
async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URL as string);
    console.log(`🛢 Database connection successful`);

    app.listen(process.env.PORT, () => {
      console.log(`Server is  listening on port ${process.env.PORT}`);
    });
  } catch (err) {
    console.log(`Failed to connect database`, err);
  }
}

main();
