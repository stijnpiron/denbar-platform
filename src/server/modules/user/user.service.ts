import { CRUD } from '../../common/interfaces/crud.interface';
import { UserListResponse } from './interfaces/responses/user-list.response.interface';
import { INTERNAL_SERVER_ERROR, OK } from 'http-status-codes';
import { ServiceUnavailableException } from '../../common/exceptions/service-unavailable.exception';
import { UserUpdateRequestDto } from './dtos/requests/user-update.request.dto';
import { UserUpdateResponse } from './interfaces/responses/user-update.response.interface';
import { UserUpdateResponseDto } from './dtos/responses/user-update.response.dto';
import { UserNotFoundException } from './exceptions/user-not-found.exception';
import { UserGetResponse } from './interfaces/responses/User-get.response.interface';
import { UserGetResponseDto } from './dtos/responses/user-get.response.dto';
import { UserModel } from './models/user.model';
import { UserDeleteResponse } from './interfaces/responses/profile-delete.response.interface';
import { UserDeleteResponseDto } from './dtos/responses/profile-delete.response.dto';

export class UserService implements CRUD {
  private user = UserModel;

  public list = async (limit?: number, page?: number): Promise<UserListResponse> => {
    const users = await this.user.find();

    const response: UserListResponse = { statusCode: INTERNAL_SERVER_ERROR, message: 'Error occured when getting a list of users', data: null };

    if (users) {
      response.statusCode = OK;
      response.message = 'Get user list success';
      response.data = { users, userQuantity: users.length };

      return response;
    }

    throw new ServiceUnavailableException('MongoDB');
  };

  public updateById = async (id: string, userData: UserUpdateRequestDto): Promise<UserUpdateResponse> => {
    const savedUser = (await this.user.findByIdAndUpdate(id, userData, { new: true })) as UserUpdateResponseDto;

    const response: UserUpdateResponse = { statusCode: INTERNAL_SERVER_ERROR, message: `Error occured while updating user with id ${id}` };

    if (savedUser) {
      response.statusCode = OK;
      response.message = 'User updated success';
      response.data = savedUser;

      return response;
    }
    throw new UserNotFoundException(id);
  };

  public getById = async (id: string): Promise<UserGetResponse> => {
    const user = (await this.user.findById(id)) as UserGetResponseDto;

    const response: UserGetResponse = { statusCode: INTERNAL_SERVER_ERROR, message: `Error occured while getting user with id ${id}` };

    if (user) {
      response.statusCode = OK;
      response.message = 'Get user success';
      response.data = user;

      return response;
    }
    throw new UserNotFoundException(id);
  };

  public deleteById = async (id: string): Promise<UserDeleteResponse> => {
    const deleteResponse = (await this.user.findByIdAndDelete(id)) as UserDeleteResponseDto;

    const response: UserDeleteResponse = { statusCode: INTERNAL_SERVER_ERROR, message: `Error occured while deleting user with id ${id}` };

    if (deleteResponse) {
      response.statusCode = OK;
      response.message = `User successfully deleted with id ${id}`;
      response.data = deleteResponse;

      return response;
    }
    throw new UserNotFoundException(id);
  };
}
