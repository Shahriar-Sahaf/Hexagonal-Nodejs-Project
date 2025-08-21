import {Project} from '../domain/project'

export interface IProjectServicePort {
    createProject(name: string , author:string , description:string): Promise<Project>;
    updateProject(id:number, name: string , author:string , description:string): Promise<Project | null>;
    deleteProject(id: number): Promise<void>;
    findProjectById(id: number): Promise<Project | null>;
    listProject(): Promise<Project[]>;
}