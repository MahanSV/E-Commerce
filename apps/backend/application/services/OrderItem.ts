import ApiError from '#webhost/errors/apiError.ts';
import httpStatus from 'http-status';

export class OrderItem implements OrderItemServiceInterfac {
    private orderItemRepository: OrderItemRepositoryInterface;

    constructor(orderItemRepository: OrderItemRepositoryInterface = new OrderItemRepository()) {
        this.orderItemRepository = orderItemRepository;
    };
}