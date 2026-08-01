import prisma from '#context/dbContext/prisma/client.ts';
import {BaseRepository} from "#repositories/BaseRepository.ts";
import {NotificationRepositoryInterface} from "#domain/interfaces/NotificationRepository.ts";
import Notification from "#models/Notification.ts";


export default class NotificationRepository extends BaseRepository<Notification> implements NotificationRepositoryInterface {
    constructor() {
        super(Notification.createFromSnapshot);
    };
};