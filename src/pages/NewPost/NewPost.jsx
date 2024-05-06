import { useSubmit } from 'react-router-dom';
import { NewPostForm } from '../../features/posts/blogPost/NewPostForm';
import './NewPost.css';
import { sanitizeInput } from '../../utils/sanitizeInput';
import { uploadImage } from '../../API';

export default function NewPost() {
  const submit = useSubmit();

  const handlePost = async (formObject) => {
    const { image: imageData, ...formData } = formObject;

    formData.title = sanitizeInput(formObject.title);
    formData.subtitle = sanitizeInput(formObject.subtitle);

    if (imageData) {
      const imageResponse = await uploadImage(imageData, 'posts');
      const { file_id, image, thumbnail } = imageResponse;
      formData.file_id = file_id;
      formData.image = image;
      formData.thumbnail = thumbnail;
    } else {
      formData.fileId = null;
      formData.image = null;
      formData.thumbnail = null;
    }

    submit(formData, {
      method: 'post',
      encType: 'application/json',
      action: '/new',
    });
  };

  return (
    <main className='new-post'>
      <h2 className='new-post-title'>Create New Blog Post</h2>
      <NewPostForm handleSubmit={handlePost} />
    </main>
  );
}
