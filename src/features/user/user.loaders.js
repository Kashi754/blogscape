import { BaseLoader } from '../../common/base.loader';
import { userSlice } from './userSlice';

export class UserLoader extends BaseLoader {
  userLoader = async ({ request, params }) => {
    if (!params.userId) {
      const user = await this._loader(
        userSlice.endpoints.getMyProfile,
        request
      );
      return { user };
    } else {
      const user = await this._loader(
        userSlice.endpoints.getUserById,
        request,
        params.userId
      );
      return { user, userId: params.userId };
    }
  };

  // myProfileLoader = async ({ request, params }) => {
  //   if (!params.userId) {
  //     const user = !params?.userId ? await this._loader(userSlice.endpoints.getMyProfile, request);
  //     return { user };
  //   }
  // };
}
