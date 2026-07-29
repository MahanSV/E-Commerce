import ApiError from '#webhost/errors/apiError.ts';
import httpStatus from 'http-status';

export class Order implements OrderServiceInterfac {
    private orderRepository: OrderRepositoryInterface;

    constructor(orderRepository: OrderRepositoryInterface = new OrderRepository()) {
        this.orderRepository = orderRepository;
    };
}