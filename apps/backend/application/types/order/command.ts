export type createCustomerOrderCommand = {
    name: string;
    lastname: string;
    mobile: string;
    email: string;
    company: string;
    address: string;
    apartment: string;
    postalCode: string;
    status?: string;
    total: number;
    city: string;
    country: string;
    description?: string;
    userId?: string;
};

export type updateCustomerOrderCommand = {
    id: string;
    address: string;
    apartment: string;
    company: string;
    createdAt: string;
    email: string;
    lastname: string;
    name: string;
    mobile: string;
    postalCode: string;
    status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
    city: string;
    country: string;
    description: string | null;
    total: number;
};