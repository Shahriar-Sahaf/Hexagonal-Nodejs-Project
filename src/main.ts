import express from "express";
import { createTableProject } from "./adapters/DB/config.js";
import projectRoutes from "./adapters/driving/routes/project.routes.js";
import userRoutes from "./adapters/driving/routes/user.routes";

createTableProject();

const app = express();
app.use(express.json());

app.use("/api/auth", userRoutes);
app.use("/api/projects", projectRoutes);
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
