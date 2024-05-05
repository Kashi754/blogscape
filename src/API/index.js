// src/API/index.js

import axios from 'axios';
import { nanoid } from 'nanoid';
import { axiosInstance } from './axiosBaseQuery';

export { login, logout, register } from '../features/auth/authAPI';

export {
  getRandomBlogId,
  getRandomPostId,
} from '../features/selectRandom/selectRandomAPI';

export async function verifyPassword(password) {
  // TODO: validate password in server
  return true;
}

export async function uploadImage(file, folder) {
  const extension = file.type.split('/')[1];
  const newImageName = nanoid() + `.${extension}`;

  // TODO: get signature from server

  const response = await axiosInstance.get('v1/secret');

  const { token, expire, signature } = response.data;
  const { data } = await axios.post(
    'https://upload.imagekit.io/api/v1/files/upload',
    {
      file: file,
      publicKey: 'public_iILFPVBo5QbfK+36qOvA8VwUEzk=',
      signature: signature,
      expire: expire, // time until signature is valid
      token: token,
      fileName: newImageName,
      folder: '/' + folder,
      responseFields: 'fileId,url,thumbnailUrl',
    },
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );

  return {
    file_id: data.fileId,
    image: data.url,
    thumbnail: data.thumbnailUrl,
  };
}
