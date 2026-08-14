import {MerchantDTO} from "#application/dto/MerchantDTO.ts";
import {createMerchantCommand, updateMerchantCommand} from "#application/types/merchant/command.ts";


export interface MerchantServiceInterface {
    getAllMerchants(): Promise<MerchantDTO[]>
    getMerchantById(id: string): Promise<MerchantDTO>
    createMerchant(command: createMerchantCommand): Promise<MerchantDTO>
    updateMerchant(command: updateMerchantCommand): Promise<MerchantDTO>
    deleteMerchant(id: string): Promise<void>
}