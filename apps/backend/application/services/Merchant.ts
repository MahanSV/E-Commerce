import ApiError from '#webhost/errors/apiError.ts';
import httpStatus from 'http-status';
import { MerchantServiceInterface } from "#application/interfaces/MerchantInterface.ts";
import { MerchantRepositoryInterface } from "#domain/interfaces/MerchantRepository.ts";
import MerchantRepository from "#repositories/MerchantRepository.ts";
import {MerchantDTO} from "#application/dto/MerchantDTO.ts";
import {createMerchantCommand, updateMerchantCommand} from "#application/types/merchant/command.ts";
import {MerchantMapper} from "#application/mappers/MerchantMapper.ts";
import {MerchantFactory} from "#domain/factories/MerchantFactory.ts";


export default class MerchantService implements MerchantServiceInterface {
    private merchantRepository: MerchantRepositoryInterface;

    constructor(merchantRepository: MerchantRepositoryInterface = new MerchantRepository()) {
        this.merchantRepository = merchantRepository;
    };

    async getAllMerchants(): Promise<MerchantDTO[]> {
        const allMerchants = await this.merchantRepository.getAllMerchants();

        return MerchantMapper.toDTOList(allMerchants);
    };

    async getMerchantById(id: string): Promise<MerchantDTO> {
        const merchant = await this.merchantRepository.getMerchantById(id);

        if (merchant)  throw new ApiError(httpStatus.NOT_FOUND, "Merchant Doesn't exist", "Error");

        return MerchantMapper.toDTO(merchant);
    };

    async createMerchant(command: createMerchantCommand): Promise<MerchantDTO> {
        const entity = MerchantFactory.create(command);

        const addMerchant = await this.merchantRepository.createMerchant(entity);

        if (!addMerchant)  throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Failed to create merchant", "Error");

        return MerchantMapper.toDTO(addMerchant);
    };

    async updateMerchant(command: updateMerchantCommand): Promise<MerchantDTO> {
        const updatedMerchant = await this.merchantRepository.updateMerchant(command);

        if (!updatedMerchant)  throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Failed to update merchant", "Error");

        return MerchantMapper.toDTO(updatedMerchant);
    };

    async deleteMerchant(id: string): Promise<void> {
        const deleteMerchant = await this.merchantRepository.deleteMerchant(id);

        if (!deleteMerchant) throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, `Failed to delete merchant: ${id}`, "Error");
    };
};