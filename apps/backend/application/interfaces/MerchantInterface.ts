

export interface MerchantServiceInterface {
    getAllMerchants(): Promise<MerchantDTO[]>
    getMerchantById(id: string): Promise<MerchantDTO>
    createMerchant(command: createMerchantCommand): Promise<MerchantDTO>
    updateMerchant(command: updateMerchantCommand): Promise<MerchantDTO>
    deleteMerchant(id: string): Promise<void>
}