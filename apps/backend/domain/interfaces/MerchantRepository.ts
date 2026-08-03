import Merchant from "#models/Merchant.ts";
import {updateMerchantCommand} from "#application/types/merchant/command.ts";


export interface MerchantRepositoryInterface {
    getAllMerchants(): Promise<Merchant[]>
    getMerchantById(id: string): Promise<Merchant>
    createMerchant(entity: Merchant): Promise<Merchant>
    updateMerchant(command: updateMerchantCommand): Promise<Merchant>
    deleteMerchant(id: string): Promise<Merchant>
}