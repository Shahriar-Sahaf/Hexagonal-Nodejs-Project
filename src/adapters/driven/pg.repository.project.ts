import { Project } from "../../core/domain/project";
import { IProjectRepository } from "../../core/ports/project.repository.port";
import pool from "../DB/config.js";

export class PgRepositoryProject implements IProjectRepository {
  public async saveProject(
    name: string,
    author: string,
    description: string
  ): Promise<Project> {
    const query = `INSERT INTO projects (name , author , description) VALUES ($1 , $2 , $3) RETURNING *`;
    const values = [name, author, description];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  public async update(
    id: number,
    name: string,
    author: string,
    description: string
  ): Promise<Project | null> {
    const query = `UPDATE projects SET name = $2, author = $3 , description = $4 WHERE id = $1 RETURNING *`;
    const values = [id, name, author, description];
    const result = await pool.query(query, values);
    if (result.rows.length < 0) {
      return null;
    }
    return result.rows[0];
  }

  public async remove(id: number): Promise<void> {
    const query = `DELETE FROM projects WHERE id = $1 `;
    const values = [id];
    const result = await pool.query(query, values);
  }

  public async find(id: number): Promise<Project | null> {
    const query = `SELECT * FROM projects WHERE id = $1`;
    const values = [id];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  public async list(): Promise<Project[]> {
    const query = `SELECT * FROM projects`;
    const result = await pool.query(query);
    return result.rows;
  }
}
