
export class ImageFactory {
    /**
     * Creates a new Image entity
     */
    public static create(photo: string) {
        // Add any domain logic or validation here before creating the entity
        return {
            imageID : crypto.randomUUID(), // Generate ID if isn't provided
            image: photo
        };
    };

    public static async createImage(images: string[]) {
        return images.map((image) => ImageFactory.create(image));
    };
}