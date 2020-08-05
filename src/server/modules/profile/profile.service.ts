import { CRUD } from '../../common/interfaces/crud.interface';
import { ProfileModel } from './models/profile.model';
import { ProfileListResponse } from './interfaces/responses/profile-list.response.interface';
import { INTERNAL_SERVER_ERROR, OK } from 'http-status-codes';
import { ServiceUnavailableException } from '../../common/exceptions/service-unavailable.exception';
import { ProfileCreateRequestDto } from './dtos/requests/profile-create.request.dto';
import { ProfileCreateResponse } from './interfaces/responses/profile-create.response.interface';
import { ProfileCreateResponseDto } from './dtos/responses/profile-create.response.dto';
import { ServerErrorException } from '../../common/exceptions/server-error.exception';
import { ProfileUpdateRequestDto } from './dtos/requests/profile-update.request.dto';
import { ProfileUpdateResponse } from './interfaces/responses/profile-update.response.interface';
import { ProfileUpdateResponseDto } from './dtos/responses/profile-update.response.dto';
import { ProfileNotFoundException } from './exceptions/profile-not-found.exception';
import { ProfileGetResponse } from './interfaces/responses/profile-get.response.interface';
import { ProfileGetResponseDto } from './dtos/responses/profile-get.response.dto';
import { ProfileDeleteResponse } from './interfaces/responses/profile-delete.response.interface';
import { ProfileDeleteResponseDto } from './dtos/responses/profile-delete.response.dto';

export class ProfileService implements CRUD {
  private profile = ProfileModel;

  public list = async (limit?: number, page?: number): Promise<ProfileListResponse> => {
    const profiles = await this.profile.find();

    const response: ProfileListResponse = { statusCode: INTERNAL_SERVER_ERROR, message: 'Error occured when getting a list of profiles', data: null };

    if (profiles) {
      response.statusCode = OK;
      response.message = 'Get profile list success';
      response.data = { profiles, profileQuantity: profiles.length };

      return response;
    }

    throw new ServiceUnavailableException('MongoDB');
  };

  public create = async (profileData: ProfileCreateRequestDto, userId: string): Promise<ProfileCreateResponse> => {
    const createdProfile = new this.profile({
      ...profileData,
      createdBy: userId,
    });
    const savedProfile = (await createdProfile.save()) as ProfileCreateResponseDto;

    const response: ProfileCreateResponse = { statusCode: INTERNAL_SERVER_ERROR, message: 'Error occured when creating a new profiles', data: null };

    if (savedProfile) {
      response.statusCode = OK;
      response.message = 'Profile created success';
      response.data = savedProfile;

      return response;
    }
    throw new ServerErrorException('Error saving new profile');
  };

  public updateById = async (id: string, profileData: ProfileUpdateRequestDto): Promise<ProfileUpdateResponse> => {
    const savedProfile = (await this.profile.findByIdAndUpdate(id, profileData, { new: true })) as ProfileUpdateResponseDto;

    const response: ProfileUpdateResponse = { statusCode: INTERNAL_SERVER_ERROR, message: `Error occured while updating profile with id ${id}` };

    if (savedProfile) {
      response.statusCode = OK;
      response.message = 'Profile updated success';
      response.data = savedProfile;

      return response;
    }
    throw new ProfileNotFoundException(id);
  };

  public getById = async (id: string): Promise<ProfileGetResponse> => {
    const profile = (await this.profile.findById(id)) as ProfileGetResponseDto;

    const response: ProfileGetResponse = { statusCode: INTERNAL_SERVER_ERROR, message: `Error occured while getting profile with id ${id}` };

    if (profile) {
      response.statusCode = OK;
      response.message = 'Get profile success';
      response.data = profile;

      return response;
    }
    throw new ProfileNotFoundException(id);
  };

  public deleteById = async (id: string): Promise<ProfileDeleteResponse> => {
    const deleteResponse = (await this.profile.findByIdAndDelete(id)) as ProfileDeleteResponseDto;

    const response: ProfileDeleteResponse = { statusCode: INTERNAL_SERVER_ERROR, message: `Error occured while deleting profile with id ${id}` };

    if (deleteResponse) {
      response.statusCode = OK;
      response.message = `Profile successfully deleted with id ${id}`;
      response.data = deleteResponse;

      return response;
    }
    throw new ProfileNotFoundException(id);
  };
}
