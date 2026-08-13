import ApiError from '#webhost/errors/apiError.ts';
import httpStatus from 'http-status';
import {OrderItemRepositoryInterface} from "#domain/interfaces/OrderItemRepository.ts";
import { OrderItemServiceInterface } from "#application/interfaces/OrderItemInterface.ts";
import OrderItemRepository from "#repositories/OrderItemRepository.ts";
import { OrderItemDTO } from "#application/dto/OrderItemDTO.ts";
import {OrderItemMapper} from "#application/mappers/OrderItemMapper.ts";
import {createOrderItemCommand, updateOrderItemCommand} from "#application/types/orderItem/command.ts";
import {OrderItemFactory} from "#domain/factories/OrderItemFactory.ts";

export class OrderItemService implements OrderItemServiceInterface {
    private orderItemRepository: OrderItemRepositoryInterface;

    constructor(orderItemRepository: OrderItemRepositoryInterface = new OrderItemRepository()) {
        this.orderItemRepository = orderItemRepository;
    };

    async createOrderProduct(command: createOrderItemCommand): Promise<OrderItemDTO> {
        // Note: Might need to change quantity for "Order"
        const entity = OrderItemFactory.create(command);

        const addOrderProduct = await this.orderItemRepository.createOrderProduct(entity);

        if (!addOrderProduct) throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Failed to create Order Item.", "Error");

        return OrderItemMapper.toOrderItemDTO(addOrderProduct);
    };

    async updateProductOrder(command: updateOrderItemCommand): Promise<OrderItemDTO> {
        const checkProductOrderExist = await this.orderItemRepository.getOrderProductById(command.id);

        if (!checkProductOrderExist) throw new ApiError(httpStatus.BAD_REQUEST, "Order not found", "Error");

        const updatedProductOrder = await this.orderItemRepository.updateProductOrder(command);

        if (!updatedProductOrder) throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Failed to update Order Item.", "Error");

        return updatedProductOrder && OrderItemMapper.toOrderItemDTO(updatedProductOrder);
    };

    async deleteProductOrder(id: string): Promise<void> {
        const checkProductOrderExist = await this.orderItemRepository.getOrderProductById(id);

        if (!checkProductOrderExist) throw new ApiError(httpStatus.BAD_REQUEST, "Order not found", "Error");

        await this.orderItemRepository.deleteProductOrder(id);
    };

    async getProductOrder(id: string): Promise<OrderItemDTO[]> {
        const orderItem = await this.orderItemRepository.getProductOrder(id);

        return OrderItemMapper.toOrderItemDTOList(orderItem);
    };

    async getAllProductOrders(): Promise<OrderItemDTO[]> {
        const orderItems = await this.orderItemRepository.getAllProductOrders();

        return OrderItemMapper.toOrderItemDTOList(orderItems);
    };
}