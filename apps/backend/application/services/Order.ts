import ApiError from '#webhost/errors/apiError.ts';
import httpStatus from 'http-status';
import {OrderServiceInterface} from "#application/interfaces/OrderInterface.ts";
import {OrderRepositoryInterface} from "#domain/interfaces/OrderRepository.ts";
import OrderRepository from "#repositories/OrderRepository.ts";
import {createCustomerOrderCommand, updateCustomerOrderCommand} from "#application/types/order/command.ts";
import {CustomerOrderDTO} from "#application/dto/CustomerOrderDTO.ts";
import {OrderFactory} from "#domain/factories/OrderFactory.ts";
import {OrderMapper} from "#application/mappers/OrderMapper.ts";
import { UserFactory } from '#domain/factories/UserFactory.ts';
import { UserRepositoryInterface } from '#domain/interfaces/UserRepository.ts';
import UserRepository from "#repositories/UserRepository.ts";

export class OrderService implements OrderServiceInterface {
    private orderRepository: OrderRepositoryInterface;
    private userRepository: UserRepositoryInterface;

    constructor(
        orderRepository: OrderRepositoryInterface = new OrderRepository(),
        userRepository: UserRepositoryInterface = new UserRepository(),
    ) {
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
    };


    async createCustomerOrder(command: createCustomerOrderCommand): Promise<CustomerOrderDTO> {
        const userEntity = UserFactory.createCustomer({
            name: command.name,
            lastName: command.lastname,
            email: command.email,
            mobile: command.mobile,
        });

        const checkUserEmailExist = await this.userRepository.getUserByEmail(userEntity.email);

        if (checkUserEmailExist) throw new ApiError(httpStatus.BAD_REQUEST, "User already exist", "Error");

        const addUser = await this.userRepository.createUser(userEntity);

        if (!addUser) throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Failed to create user", "Error");

        const orderEntity = OrderFactory.create(command);

        const addOrder = await this.orderRepository.createCustomerOrder(orderEntity);

        if (!addOrder) throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Failed to create order", "Error");

        return OrderMapper.toCustomerOrderDTO(addOrder);
    };

    async updateCustomerOrder(command: updateCustomerOrderCommand): Promise<CustomerOrderDTO> {
        const order = await this.orderRepository.checkOrderExist(command.id);

        if (!order) throw new ApiError(httpStatus.NOT_FOUND, "Order doesn't exist.", "Error");

        const updatedOrder = await this.orderRepository.updateCustomerOrder(command);

        if (!updatedOrder) throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Failed to update order", "Error");

        return OrderMapper.toCustomerOrderDTO(updatedOrder);
    };

    async deleteCustomerOrder(id: string): Promise<CustomerOrderDTO> {
        const order = await this.orderRepository.checkOrderExist(id);

        if (!order) throw new ApiError(httpStatus.NOT_FOUND, "Order doesn't exist.", "Error");

        const deletedOrder = await this.orderRepository.deleteCustomerOrder(id);

        if (!deletedOrder) throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Failed to delete order", "Error");

        return OrderMapper.toCustomerOrderDTO(deletedOrder);
    };

    async getCustomerOrder(id: string): Promise<CustomerOrderDTO> {
        const order = await this.orderRepository.getOrderById(id);

        if (!order) throw new ApiError(httpStatus.NOT_FOUND, "Order doesn't exist.", "Error");

        return OrderMapper.toCustomerOrderDTO(order);

    };

    async getAllOrders(page: number, limit: number): Promise<{
        orders: CustomerOrderDTO[],
        pagination: {
            page: number,
            limit: number
            total: number,
            totalPages: number
        }
    }> {
        const offset = (page - 1) * limit;

        const paginatedOrders = await this.orderRepository.getAllOrders(page, limit, offset);

        const orders = OrderMapper.toCustomerOrderDTOList(paginatedOrders.orders);

        return {
            orders,
            pagination: paginatedOrders.pagination
        };
    };

    async createOrderProduct(): Promise<any> {
        /**
         * 2)create "OrderItem"
         * 3) update quantity based on price * quantity in "Order"
         */
    };
}