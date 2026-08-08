import {CategoryDTO} from "#application/dto/CategoryDTO.ts";


export interface CategoryServiceInterface {
    getAllCategories(): Promise<CategoryDTO[]>
    createCategory(name: string): Promise<CategoryDTO>
    getCategory(id:string): Promise<CategoryDTO>
    updateCategory
    deleteCategory(id:string): Promise<void>

}