import { CRUD } from '../../../common/interfaces/crud.interface';
import { GroupModel } from './models/group.model';
import { GroupListResponse } from './interfaces/responses/group-list.response.interface';
import { INTERNAL_SERVER_ERROR, OK } from 'http-status-codes';
import { ServiceUnavailableException } from '../../../common/exceptions/service-unavailable.exception';
import { GroupCreateRequestDto } from './dtos/requests/group-create.request.dto';
import { GroupCreateResponse } from './interfaces/responses/group-create.response.interface';
import { GroupCreateResponseDto } from './dtos/responses/group-create.response.dto';
import { ServerErrorException } from '../../../common/exceptions/server-error.exception';
import { GroupUpdateRequestDto } from './dtos/requests/group-update.request.dto';
import { GroupUpdateResponse } from './interfaces/responses/group-update.response.interface';
import { GroupUpdateResponseDto } from './dtos/responses/group-update.response.dto';
import { GroupNotFoundException } from './exceptions/group-not-found.exception';
import { GroupGetResponse } from './interfaces/responses/group-get.response.interface';
import { GroupGetResponseDto } from './dtos/responses/group-get.response.dto';
import { GroupDeleteResponse } from './interfaces/responses/group-delete.response.interface';
import { GroupDeleteResponseDto } from './dtos/responses/group-delete.response.dto';

export class GroupService implements CRUD {
  private group = GroupModel;

  public list = async (limit?: number, page?: number): Promise<GroupListResponse> => {
    const groups = await this.group.find();

    const response: GroupListResponse = { statusCode: INTERNAL_SERVER_ERROR, message: 'Error occured when getting a list of groups', data: null };

    if (groups) {
      response.statusCode = OK;
      response.message = 'Get group list success';
      response.data = { groups, groupQuantity: groups.length };

      return response;
    }

    throw new ServiceUnavailableException('MongoDB');
  };

  public create = async (groupData: GroupCreateRequestDto, userId: string): Promise<GroupCreateResponse> => {
    const createdGroup = new this.group({
      ...groupData,
      createdBy: userId,
    });
    const savedGroup = (await createdGroup.save()) as GroupCreateResponseDto;

    const response: GroupCreateResponse = { statusCode: INTERNAL_SERVER_ERROR, message: 'Error occured when creating a new groups', data: null };

    if (savedGroup) {
      response.statusCode = OK;
      response.message = 'Group created success';
      response.data = savedGroup;

      return response;
    }
    throw new ServerErrorException('Error saving new group');
  };

  public updateById = async (id: string, groupData: GroupUpdateRequestDto): Promise<GroupUpdateResponse> => {
    const savedGroup = (await this.group.findByIdAndUpdate(id, groupData, { new: true })) as GroupUpdateResponseDto;

    const response: GroupUpdateResponse = { statusCode: INTERNAL_SERVER_ERROR, message: `Error occured while updating group with id ${id}` };

    if (savedGroup) {
      response.statusCode = OK;
      response.message = 'Group updated success';
      response.data = savedGroup;

      return response;
    }
    throw new GroupNotFoundException(id);
  };

  public getById = async (id: string): Promise<GroupGetResponse> => {
    const group = (await this.group.findById(id)) as GroupGetResponseDto;

    const response: GroupGetResponse = { statusCode: INTERNAL_SERVER_ERROR, message: `Error occured while getting group with id ${id}` };

    if (group) {
      response.statusCode = OK;
      response.message = 'Get group success';
      response.data = group;

      return response;
    }
    throw new GroupNotFoundException(id);
  };

  public deleteById = async (id: string): Promise<GroupDeleteResponse> => {
    const deleteResponse = (await this.group.findByIdAndDelete(id)) as GroupDeleteResponseDto;

    const response: GroupDeleteResponse = { statusCode: INTERNAL_SERVER_ERROR, message: `Error occured while deleting group with id ${id}` };

    if (deleteResponse) {
      response.statusCode = OK;
      response.message = `Group successfully deleted with id ${id}`;
      response.data = deleteResponse;

      return response;
    }
    throw new GroupNotFoundException(id);
  };
}
