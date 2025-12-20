import "dotenv/config";
import { app } from "./app";
import { logger } from "./utils/logger";
import { connectDB } from "./db/dbConnect";

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  connectDB();
  logger.info(`Server ready at: http://localhost:${PORT}`);
});
