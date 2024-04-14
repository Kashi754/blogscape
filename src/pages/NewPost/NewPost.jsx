import { useSubmit } from 'react-router-dom';
import { NewPostForm } from '../../features/post/NewPostForm';
import './NewPost.css';
import { sanitizeInput } from '../../utils/sanitizeInput';

export default function NewPost() {
  const submit = useSubmit();

  const handlePost = (formObject) => {
    const formData = new FormData();

    formObject.title = sanitizeInput(formObject.title);
    formObject.subtitle = sanitizeInput(formObject.subtitle);

    for (const key in formObject) {
      formData.append(key, formObject[key]);
    }

    // Content type = multipart/form-data
    submit(formData, {
      method: 'post',
      encType: 'multipart/form-data',
    });
  };

  return (
    <main className='new-post'>
      <h2 className='new-post-title'>Create New Blog Post</h2>
      <NewPostForm handleSubmit={handlePost} />
    </main>
  );
}
