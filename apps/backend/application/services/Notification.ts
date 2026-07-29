import ApiError from '#webhost/errors/apiError.ts';
import httpStatus from 'http-status';

export class NotificationService implements NotificationServiceInterfac {
    private notificationRepository: NotificationRepositoryInterface;

    constructor(notificationRepository: NotificationRepositoryInterface = new NotificationRepository()) {
        this.notificationRepository = notificationRepository;
    };
}