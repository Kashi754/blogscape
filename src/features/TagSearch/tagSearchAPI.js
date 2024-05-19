import { axiosInstance } from '../../API/axiosBaseQuery';

export const fetchTags = async (term) => {
  try {
    const result = await axiosInstance.get(`/v1/tags?startsWith=${term}`);
    return result.data;
  } catch (axiosError) {
    console.error(axiosError);
  }
};
