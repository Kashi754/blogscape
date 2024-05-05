import { BaseLoader } from '../../common/base.loader';
import { tagsSlice } from './tagsSlice';

export class TagsLoader extends BaseLoader {
  listTagsLoader = async ({ request }) => {
    const tags = await this._loader(tagsSlice.endpoints.getTags, request);
    return { tags };
  };
}
