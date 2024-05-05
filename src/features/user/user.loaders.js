import { BaseLoader } from '../../common/base.loader';
import { userSlice } from './userSlice';

export class UserLoader extends BaseLoader {
  userLoader = async ({ request, params }) => {
    const user = await this._loader(
      userSlice.endpoints.getUserById,
      request,
      params.userId
    );
    return { user, userId: params.userId };
  };

  myProfileLoader = async ({ request }) => {
    const user = await this._loader(userSlice.endpoints.getMyProfile, request);
    return { user };
  };
}
