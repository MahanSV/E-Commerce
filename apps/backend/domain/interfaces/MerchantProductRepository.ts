import {MerchantProductCommand} from "#application/types/merchantProduct/command.ts";
import MerchantProduct from "#models/MerchantProduct.ts";


export interface MerchantProductRepositoryInterface {
    createMerchantProduct(command: MerchantProductCommand): Promise<MerchantProduct>
}