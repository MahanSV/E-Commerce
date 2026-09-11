import Category from "#models/Category.ts";


export interface CategoryRepositoryInterface {
    getAllCategories(): Promise<Category[]>
    createCategory(name: string): Promise<Category>
    getCategoryById(id: string): Promise<Category | null>
    updateCategory(id:string, name: string): Promise<Category>
    deleteCategory(id:string): Promise<Category>
}