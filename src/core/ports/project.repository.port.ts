import {Project} from '../domain/project'
export interface IProjectRepository {
    saveProject(name: string , author:string , description:string): Promise<Project>
    update(id : number,name: string , author:string , description:string): Promise<Project | null>
    remove(id : number): Promise<void>
    find(id: number): Promise<Project | null>
    list(): Promise<Project[]>

}