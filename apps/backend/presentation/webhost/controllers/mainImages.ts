import type { Request, Response } from 'express';


class MainImageController {
    constructor() {};

    public uploadMainImage = async (req: Request, res: Response): Promise<any> => {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ message: "Nema otpremljenih fajlova" });
        }

        // Get file from a request
        const uploadedFile = req.files?.uploadedFile;

        // Using mv method for moving file to the directory on the server
        uploadedFile.mv('../../../../frontend/public/' + uploadedFile.name, (err: any) => {
            if (err) {
                return res.status(500).send(err);
            }

            res.status(200).json({ message: "Fajl je uspešno otpremljen" });
        });
    };
}

export default new MainImageController();