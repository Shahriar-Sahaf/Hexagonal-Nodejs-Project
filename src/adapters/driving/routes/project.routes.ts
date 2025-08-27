import express from 'express'
import { PgRepositoryProject } from "../../../adapters/driven/pg.repository.project.js";
import { ProjectService } from "../../../core/application/project.service.js";
import { ProjectController } from "../../../adapters/driving/controllers/project.controller.js";

//Projects Dependency Injection
const projectDrivenObject = new PgRepositoryProject();
const projectServiceObject = new ProjectService(projectDrivenObject);
const projectControllerObject = new ProjectController(projectServiceObject);


const router = express.Router();


//Project Routes
router.post("/create", (req, res) =>
  projectControllerObject.createProject(req, res)
);
router.put("/update", (req, res) =>
  projectControllerObject.updateProject(req, res)
);
router.delete("/delete", (req, res) =>
  projectControllerObject.delete(req, res)
);



export default router;