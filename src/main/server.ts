import "module-alias/register";
import dotenv from "dotenv";
import buildApp from "./app";
import { connectDatabase } from "../shared/config/DataSource";

dotenv.config();

const PORT = Number(process.env.PORT) || 3003;

async function bootstrap() {
  try {
    connectDatabase();
    console.log("✅ Database connected");
    const app = await buildApp();

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Error starting server:", err);
    process.exit(1);
  }
}

bootstrap();
