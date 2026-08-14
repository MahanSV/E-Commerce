import {CategoryDTO} from "#application/dto/CategoryDTO.ts";


export interface CategoryServiceInterface {
    getAllCategories(): Promise<CategoryDTO[]>
    createCategory(name: string): Promise<CategoryDTO>
    getCategory(id:string): Promise<CategoryDTO>
    updateCategory(id: string, name: string): Promise<CategoryDTO>
    deleteCategory(id:string): Promise<void>

}