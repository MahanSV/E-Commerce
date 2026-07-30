import prisma from '#context/dbContext/prisma/client.ts';
import Order from '#models/Order.ts';
import {BaseRepository} from "#repositories/BaseRepository.ts";
import {OrderRepositoryInterface} from "#domain/interfaces/OrderRepository.ts";

export default class OrderRepository extends BaseRepository<Order> implements OrderRepositoryInterface {
    constructor() {
        super(Order.createFromSnapshot);
    };
};