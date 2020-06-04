import { AllianceModel } from './models/alliance.model';
import { AllianceListResponse } from './interfaces/responses/alliance-list.response.interface';
import { INTERNAL_SERVER_ERROR, OK } from 'http-status-codes';
import { AllianceCreateRequestDto } from './dtos/requests/alliance-create.request.dto';
import { AllianceCreateResponse } from './interfaces/responses/alliance-create.response.interface';
import { AllianceCreateResponseDto } from './dtos/responses/alliance-create.response.dto';
import { AllianceUpdateRequestDto } from './dtos/requests/alliance-update.request.dto';
import { AllianceUpdateResponse } from './interfaces/responses/alliance-update.response.interface';
import { AllianceUpdateResponseDto } from './dtos/responses/alliance-update.response.dto';
import { AllianceNotFoundException } from './exceptions/alliance-not-found.exception';
import { AllianceGetResponse } from './interfaces/responses/alliance-get.response.interface';
import { AllianceGetResponseDto } from './dtos/responses/alliance-get.response.dto';
import { AllianceDeleteResponse } from './interfaces/responses/alliance-delete.response.interface';
import { AllianceDeleteResponseDto } from './dtos/responses/alliance-delete.response.dto';
import { CRUD } from '../../../common/interfaces/crud.interface';
import { ServiceUnavailableException } from '../../../common/exceptions/service-unavailable.exception';
import { ServerErrorException } from '../../../common/exceptions/server-error.exception';

export class AllianceService implements CRUD {
  private alliance = AllianceModel;

  public list = async (limit?: number, page?: number): Promise<AllianceListResponse> => {
    const alliances = await this.alliance.find();

    const response: AllianceListResponse = { statusCode: INTERNAL_SERVER_ERROR, message: 'Error occured when getting a list of alliances', data: null };

    if (alliances) {
      response.statusCode = OK;
      response.message = 'Get alliance list success';
      response.data = { alliances, allianceQuantity: alliances.length };

      return response;
    }

    throw new ServiceUnavailableException('MongoDB');
  };

  public create = async (allianceData: AllianceCreateRequestDto, userId: string): Promise<AllianceCreateResponse> => {
    const createdAlliance = new this.alliance({
      ...allianceData,
      createdBy: userId,
    });
    const savedAlliance = (await createdAlliance.save()) as AllianceCreateResponseDto;

    const response: AllianceCreateResponse = { statusCode: INTERNAL_SERVER_ERROR, message: 'Error occured when creating a new alliances', data: null };

    if (savedAlliance) {
      response.statusCode = OK;
      response.message = 'Alliance created success';
      response.data = savedAlliance;

      return response;
    }
    throw new ServerErrorException('Error saving new alliance');
  };

  public updateById = async (id: string, allianceData: AllianceUpdateRequestDto): Promise<AllianceUpdateResponse> => {
    const savedAlliance = (await this.alliance.findByIdAndUpdate(id, allianceData, { new: true })) as AllianceUpdateResponseDto;

    const response: AllianceUpdateResponse = { statusCode: INTERNAL_SERVER_ERROR, message: `Error occured while updating alliance with id ${id}` };

    if (savedAlliance) {
      response.statusCode = OK;
      response.message = 'Alliance updated success';
      response.data = savedAlliance;

      return response;
    }
    throw new AllianceNotFoundException(id);
  };

  public getById = async (id: string): Promise<AllianceGetResponse> => {
    const alliance = (await this.alliance.findById(id)) as AllianceGetResponseDto;

    const response: AllianceGetResponse = { statusCode: INTERNAL_SERVER_ERROR, message: `Error occured while getting alliance with id ${id}` };

    if (alliance) {
      response.statusCode = OK;
      response.message = 'Get alliance success';
      response.data = alliance;

      return response;
    }
    throw new AllianceNotFoundException(id);
  };

  public deleteById = async (id: string): Promise<AllianceDeleteResponse> => {
    const deleteResponse = (await this.alliance.findByIdAndDelete(id)) as AllianceDeleteResponseDto;

    const response: AllianceDeleteResponse = { statusCode: INTERNAL_SERVER_ERROR, message: `Error occured while deleting alliance with id ${id}` };

    if (deleteResponse) {
      response.statusCode = OK;
      response.message = `Alliance successfully deleted with id ${id}`;
      response.data = deleteResponse;

      return response;
    }
    throw new AllianceNotFoundException(id);
  };
}
