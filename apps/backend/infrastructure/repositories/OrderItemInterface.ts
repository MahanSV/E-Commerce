import prisma from '#context/dbContext/prisma/client.ts';
import {BaseRepository} from "#repositories/BaseRepository.ts";
import {OrderItemRepositoryInterface} from "#domain/interfaces/OrderItemInterface.ts";
import OrderItem from "#models/OrderItem.ts";


export default class OrderItemRepository extends BaseRepository<OrderItem> implements OrderItemRepositoryInterface {
    constructor() {
        super(OrderItem.createFromSnapshot);
    };
};