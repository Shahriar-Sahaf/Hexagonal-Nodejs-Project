import {Project} from '../domain/project'

export interface IProjectServicePort {
    createProject(name: string , author:string , description:string): Promise<Project>;
    updateProject( name: string , author:string , description:string): Promise<Project>;
    deleteProject(id: number): Promise<void>;
    findProjectById(id: number): Promise<Project | null>;
    listProject(): Promise<Project[]>;
}