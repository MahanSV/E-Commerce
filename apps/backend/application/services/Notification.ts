import ApiError from '#webhost/errors/apiError.ts';
import httpStatus from 'http-status';
import {NotificationRepositoryInterface} from "#domain/interfaces/NotificationRepository.ts";
import {NotificationServiceInterface} from "#application/interfaces/NotificationInterface.ts";
import NotificationRepository from "#repositories/NotificationRepository.ts";
import {NotificationDTO} from "#application/dto/NotificationDTO.ts";
import {
    createNotificationCommand,
    deleteNotificationCommand,
    updateNotificationCommand
} from "#application/types/notification/command.ts";
import {NotificationFactory} from "#domain/factories/Notification.ts";
import {NotificationMapper} from "#application/mappers/NotificationMapper.ts";

export class NotificationService implements NotificationServiceInterface {
    private notificationRepository: NotificationRepositoryInterface;

    constructor(notificationRepository: NotificationRepositoryInterface = new NotificationRepository()) {
        this.notificationRepository = notificationRepository;
    };

    async getUnreadCount(userId: string): Promise<number> {
        return await this.notificationRepository.getUnreadCount(userId);
    };

    // TODO: Need's to be check for implementation!
    async getUserNotifications(userId: string): Promise<NotificationDTO[]> {};

    async createNotification(command: createNotificationCommand): Promise<NotificationDTO> {
        const entity = NotificationFactory.create(command);

        const addNotification = await this.notificationRepository.createNotification(entity);

        if (!addNotification) throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Failed to create Notification.", "Error");

        return NotificationMapper.toDTO(addNotification);
    };

    async bulkMarkAsRead(notificationIds: string[], userId: string): Promise<number> {
        return await this.notificationRepository.bulkMarkAsRead(notificationIds, userId);
    };

    async bulkDeleteNotifications(notificationIds: string[], userId: string): Promise<number> {
        return await this.notificationRepository.bulkDeleteNotifications(notificationIds, userId);
    };

    async updateNotification(command: updateNotificationCommand): Promise<NotificationDTO> {
        const checkNotificationExist = await this.notificationRepository.getNotificationById(command.id);

        if (!checkNotificationExist) throw new ApiError(httpStatus.BAD_REQUEST, `Failed to found Notification: ${command.id}`, "Error");

        const updatedNotification = await this.notificationRepository.updateNotification(command);

        if (!updatedNotification) throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Failed to update Notification.", "Error");

        return NotificationMapper.toDTO(updatedNotification);
    };

    async deleteNotification(command: deleteNotificationCommand): Promise<void> {
        const checkNotificationExist = await this.notificationRepository.getNotificationByIdAndUserId(
            command.id, command.userId
        );

        if (!checkNotificationExist)  throw new ApiError(httpStatus.NOT_FOUND, `Failed to found Notification: ${command.id}`, "Error");

        const deleteNotification = await this.notificationRepository.deleteNotification(command.id);

        if (!deleteNotification) throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Failed to delete Notification.", "Error");
    };
}