import { IProjectServicePort } from "../ports/project.service.port";
import { IProjectRepository } from "../ports/project.repository.port";
import {Project} from '../domain/project'

export class ProjectService implements IProjectServicePort {
    constructor(private projectrepository: IProjectRepository){}

 //------------------------------------------------------------------------------------//
    public async createProject(name: string , author:string , description:string): Promise<Project> {
        if (!name || !author || !description) {
            throw new Error("Invalid Credentials");
        }
        const createProjectDone = await this.projectrepository.saveProject(name, author, description);
        return createProjectDone;
    }
 //------------------------------------------------------------------------------------//
    public async updateProject(id : number ,name: string, author: string, description: string): Promise<Project |null> {
        if (!name || !author || !description) {
            throw new Error("Invalid Credentials");
        }
        const updateProjectDone = await this.projectrepository.update(id, name, author, description);
        return updateProjectDone;
    }
 //------------------------------------------------------------------------------------//
    public async deleteProject(id : number): Promise<void>{
        if (!id) {
            throw new Error("Invalid Credentials");
        }
     const removedDone =  await this.projectrepository.remove(id);
     return removedDone;
    }
  //------------------------------------------------------------------------------------//
  public async findProjectById(id: number): Promise<Project | null> {
        if (!id) {
            throw new Error("Invalid Credentials");
        }
      const findProjectDone = await this.projectrepository.find(id)
      return findProjectDone;
  }
  //------------------------------------------------------------------------------------//
  public async listProject(): Promise<Project[]> {
      const listProjectDone = await this.projectrepository.list();
      return listProjectDone;
  }
}   