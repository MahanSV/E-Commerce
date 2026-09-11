
export type createMerchantCommand = {
    name: string;
    email: string;
    phone: string;
    address: string;
    description: string;
    status: string;
};

export type updateMerchantCommand = {
    id: string;
    name: string;
    email: string;
    mobile: string;
    address: string;
    description: string;
    status: string;
};