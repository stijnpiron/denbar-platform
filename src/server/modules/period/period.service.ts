import { PeriodDeleteResponse } from './interfaces/responses/period-delete.response.interface';
import { PeriodGetResponse } from './interfaces/responses/period-get.response.interface';
import { PeriodUpdateResponse } from './interfaces/responses/period-update.response.interface';
import { INTERNAL_SERVER_ERROR, OK } from 'http-status-codes';
import { ServerErrorException } from '../../common/exceptions/server-error.exception';
import { PeriodModel } from './models/period.model';
import { ServiceUnavailableException } from '../../common/exceptions/service-unavailable.exception';
import { CRUD } from '../../common/interfaces/crud.interface';
import { PeriodListResponse } from './interfaces/responses/period-list.response.interface';
import { PeriodNotFoundException } from './exceptions/period-not-found.exception';
import { PeriodCreateResponse } from './interfaces/responses/period-create.response.interface';
import { PeriodCreateRequestDto } from './dtos/requests/period-create.request.dto';
import { PeriodCreateResponseDto } from './dtos/responses/period-create.response.dto';
import { PeriodUpdateRequestDto } from './dtos/requests/period-update.request.dto';
import { PeriodUpdateResponseDto } from './dtos/responses/period-update.response.dto';
import { PeriodGetResponseDto } from './dtos/responses/period-get.response.dto';
import { PeriodDeleteResponseDto } from './dtos/responses/period-delete.response.dto';

export class PeriodService implements CRUD {
  private period = PeriodModel;

  public list = async (limit?: number, page?: number): Promise<PeriodListResponse> => {
    const periods = await this.period.find();

    const response: PeriodListResponse = { statusCode: INTERNAL_SERVER_ERROR, message: 'Error occured when getting a list of periods', data: null };

    if (periods) {
      response.statusCode = OK;
      response.message = 'Get period list success';
      response.data = { periods, periodQuantity: periods.length };

      return response;
    }

    throw new ServiceUnavailableException('MongoDB');
  };

  public create = async (periodData: PeriodCreateRequestDto, userId: string): Promise<PeriodCreateResponse> => {
    const createdPeriod = new this.period({
      ...periodData,
      createdBy: userId,
    });
    const savedPeriod = (await createdPeriod.save()) as PeriodCreateResponseDto;

    const response: PeriodCreateResponse = { statusCode: INTERNAL_SERVER_ERROR, message: 'Error occured when creating a new periods', data: null };

    if (savedPeriod) {
      response.statusCode = OK;
      response.message = 'Period created success';
      response.data = savedPeriod;

      return response;
    }
    throw new ServerErrorException('Error saving new period');
  };

  public updateById = async (id: string, periodData: PeriodUpdateRequestDto): Promise<PeriodUpdateResponse> => {
    const savedPeriod = (await this.period.findByIdAndUpdate(id, periodData, { new: true })) as PeriodUpdateResponseDto;

    const response: PeriodUpdateResponse = { statusCode: INTERNAL_SERVER_ERROR, message: `Error occured while updating period with id ${id}` };

    if (savedPeriod) {
      response.statusCode = OK;
      response.message = 'Period updated success';
      response.data = savedPeriod;

      return response;
    }
    throw new PeriodNotFoundException(id);
  };

  public getById = async (id: string): Promise<PeriodGetResponse> => {
    const period = (await this.period.findById(id)) as PeriodGetResponseDto;

    const response: PeriodGetResponse = { statusCode: INTERNAL_SERVER_ERROR, message: `Error occured while getting period with id ${id}` };

    if (period) {
      response.statusCode = OK;
      response.message = 'Get period success';
      response.data = period;

      return response;
    }
    throw new PeriodNotFoundException(id);
  };

  public deleteById = async (id: string): Promise<PeriodDeleteResponse> => {
    const deleteResponse = (await this.period.findByIdAndDelete(id)) as PeriodDeleteResponseDto;

    const response: PeriodDeleteResponse = { statusCode: INTERNAL_SERVER_ERROR, message: `Error occured while deleting period with id ${id}` };

    if (deleteResponse) {
      response.statusCode = OK;
      response.message = `Period successfully deleted with id ${id}`;
      response.data = deleteResponse;

      return response;
    }
    throw new PeriodNotFoundException(id);
  };
}
