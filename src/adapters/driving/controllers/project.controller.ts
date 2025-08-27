import { IProjectServicePort } from "../../../core/ports/project.service.port";
import type { Request, Response } from "express";
import { z } from "zod";

export class ProjectController {
  constructor(private projectServicePort: IProjectServicePort) {}

  public async createProject(req: Request, res: Response) {
    try {
      const checkSchema = z.object({
        name: z.string().min(2),
        author: z.string().min(2),
        description: z.string().min(10),
      }).strict();
      const { name, author, description } = checkSchema.parse(req.body);
      const details = await this.projectServicePort.createProject(
        name,
        author,
        description
      );
      res.status(200).json({ details });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid input", errors: error.issues });
      }
      const err = error as Error;
      res.status(401).json({ message: err.message });
    }
  }

  public async updateProject(req: Request, res: Response) {
    try {
      const checkSchema = z.object({
          id: z.number().positive().int(),
          name: z.string().min(2).max(100),
          author: z.string().min(2).max(100),
          description: z.string().min(10).max(500),
        })
        .strict();
      const { id, name, author, description } = checkSchema.parse(req.body, {
        error: (issues) => {
          return {
            message: "Validation failed",
            issues,
          };
        },
      });

      const result = await this.projectServicePort.updateProject(
        id,
        name,
        author,
        description
      );
      if (result == null) {
        res.status(401).json("No Project With this ID");
      }
      res.status(200).json({ message: result });
    } catch (error) {
      const err = error as Error;
      res.status(401).json({ message: err.message });
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const checkSchema = z
        .object({
          id: z.number().positive().int(),
        })
        .strict();

      const { id } = checkSchema.parse(req.body);
      const result = await this.projectServicePort.deleteProject(id);
      if (result == null) {
        res.status(404).json({ message: `No Project With ID ${id}` });
      }
      res.status(200).json({ message: `Project ${id} deleted` });
    } catch (error) {
      const err = error as Error;
      res.status(401).json({ message: err.message });
    }
  }

  public async findById(req: Request, res: Response) {
    const checkSchema = z.object({
      id: z.number().positive().int(),
    });
    const { id } = checkSchema.parse(req.body);

    const result = await this.projectServicePort.findProjectById(id);
    if (result == null) {
      res.status(404).json({ message: `No Project With ID ${id}` });
    }
    res.status(200).json({ message: result });
  }

  public async listAll(req: Request, res: Response) {
    try {
      const result = await this.projectServicePort.listProject();
      res.status(200).json({ projects: result });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
