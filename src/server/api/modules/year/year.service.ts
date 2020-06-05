import { CRUD } from '../../../common/interfaces/crud.interface';
import { YearModel } from './models/year.model';
import { YearListResponse } from './interfaces/responses/year-list.response.interface';
import { INTERNAL_SERVER_ERROR, OK } from 'http-status-codes';
import { ServiceUnavailableException } from '../../../common/exceptions/service-unavailable.exception';
import { YearCreateRequestDto } from './dtos/requests/year-create.request.dto';
import { YearCreateResponse } from './interfaces/responses/year-create.response.interface';
import { YearCreateResponseDto } from './dtos/responses/year-create.response.dto';
import { ServerErrorException } from '../../../common/exceptions/server-error.exception';
import { YearUpdateRequestDto } from './dtos/requests/year-update.request.dto';
import { YearUpdateResponse } from './interfaces/responses/year-update.response.interface';
import { YearUpdateResponseDto } from './dtos/responses/year-update.response.dto';
import { YearNotFoundException } from './exceptions/year-not-found.exception';
import { YearGetResponse } from './interfaces/responses/year-get.response.interface';
import { YearGetResponseDto } from './dtos/responses/year-get.response.dto';
import { YearDeleteResponse } from './interfaces/responses/year-delete.response.interface';
import { YearDeleteResponseDto } from './dtos/responses/year-delete.response.dto';

export class YearService implements CRUD {
  private group = YearModel;

  public list = async (limit?: number, page?: number): Promise<YearListResponse> => {
    const groups = await this.group.find();

    const response: YearListResponse = { statusCode: INTERNAL_SERVER_ERROR, message: 'Error occured when getting a list of groups', data: null };

    if (groups) {
      response.statusCode = OK;
      response.message = 'Get group list success';
      response.data = { groups, groupQuantity: groups.length };

      return response;
    }

    throw new ServiceUnavailableException('MongoDB');
  };

  public create = async (groupData: YearCreateRequestDto, userId: string): Promise<YearCreateResponse> => {
    const createdYear = new this.group({
      ...groupData,
      createdBy: userId,
    });
    const savedYear = (await createdYear.save()) as YearCreateResponseDto;

    const response: YearCreateResponse = { statusCode: INTERNAL_SERVER_ERROR, message: 'Error occured when creating a new groups', data: null };

    if (savedYear) {
      response.statusCode = OK;
      response.message = 'Year created success';
      response.data = savedYear;

      return response;
    }
    throw new ServerErrorException('Error saving new group');
  };

  public updateById = async (id: string, groupData: YearUpdateRequestDto): Promise<YearUpdateResponse> => {
    const savedYear = (await this.group.findByIdAndUpdate(id, groupData, { new: true })) as YearUpdateResponseDto;

    const response: YearUpdateResponse = { statusCode: INTERNAL_SERVER_ERROR, message: `Error occured while updating group with id ${id}` };

    if (savedYear) {
      response.statusCode = OK;
      response.message = 'Year updated success';
      response.data = savedYear;

      return response;
    }
    throw new YearNotFoundException(id);
  };

  public getById = async (id: string): Promise<YearGetResponse> => {
    const group = (await this.group.findById(id)) as YearGetResponseDto;

    const response: YearGetResponse = { statusCode: INTERNAL_SERVER_ERROR, message: `Error occured while getting group with id ${id}` };

    if (group) {
      response.statusCode = OK;
      response.message = 'Get group success';
      response.data = group;

      return response;
    }
    throw new YearNotFoundException(id);
  };

  public deleteById = async (id: string): Promise<YearDeleteResponse> => {
    const deleteResponse = (await this.group.findByIdAndDelete(id)) as YearDeleteResponseDto;

    const response: YearDeleteResponse = { statusCode: INTERNAL_SERVER_ERROR, message: `Error occured while deleting group with id ${id}` };

    if (deleteResponse) {
      response.statusCode = OK;
      response.message = `Year successfully deleted with id ${id}`;
      response.data = deleteResponse;

      return response;
    }
    throw new YearNotFoundException(id);
  };
}
