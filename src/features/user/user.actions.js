import { userSlice } from './userSlice';

export const updateProfileAction = (dispatch) => async (formData) => {
  await dispatch(userSlice.endpoints.updateMyProfile.initiate(formData));
};

export const updateSocialMediaAction = (dispatch) => async (formData) => {
  await dispatch(userSlice.endpoints.updateMySocialMedia.initiate(formData));
};

export const updatePasswordAction = (dispatch) => async (formData) => {
  return await dispatch(
    userSlice.endpoints.updateMyPassword.initiate(formData)
  );
};
