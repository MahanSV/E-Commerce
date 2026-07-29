import ApiError from '#webhost/errors/apiError.ts';
import httpStatus from 'http-status';

export default class CategoryService implements CategoryServiceInterface {
    private categoryRepository: CategoryRepositoryInterface;

    constructor(categoryRepository: CategoryRepositoryInterface = new CategoryRepository()) {
        this.categoryRepository = categoryRepository;
    };
};