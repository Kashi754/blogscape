import { useState } from 'react';
import { Form } from 'react-bootstrap';
import {
  getFileSize,
  verifyFileSize,
  verifyFileType,
} from '../../utils/verifyFile';
import './FileInput.css';

function FileInfo({ fileInfo }) {
  return (
    <p className='file-info'>{`File: ${fileInfo?.name} (${fileInfo?.size})`}</p>
  );
}

export function FileInput({
  handleChange,
  defaultPreview,
  className,
  targetSize = 250,
}) {
  const [previewImage, setPreviewImage] = useState(null);
  const [fileInfo, setFileInfo] = useState(null);
  const [correctType, setCorrectType] = useState(true);
  const [correctSize, setCorrectSize] = useState(true);

  const verifyFile = (file) => {
    setCorrectType(true);
    setCorrectSize(true);
    const typeVerified = verifyFileType(file);
    if (!typeVerified) {
      setCorrectType(false);
      setFileInfo(null);
      setPreviewImage(null);
      return false;
    }
    const sizeVerified = verifyFileSize(file, targetSize);
    if (!sizeVerified) {
      setCorrectSize(false);
      setFileInfo(null);
      setPreviewImage(null);
      return false;
    }
    return true;
  };

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    if (!verifyFile(imageFile)) {
      return;
    }

    setPreviewImage(URL.createObjectURL(imageFile));

    const fileData = {
      name: imageFile.name,
      size: getFileSize(imageFile),
    };

    setFileInfo(fileData);
    handleChange(imageFile);
  };

  return (
    <Form.Group
      className={(className ? className + '-section ' : '') + 'image-section'}
    >
      {(previewImage || defaultPreview) && (
        <img
          className={
            (className ? className + '-preview ' : '') + 'preview-image'
          }
          src={previewImage || defaultPreview}
          alt='Preview'
        />
      )}
      <div
        className={
          !correctType || !correctSize
            ? (className ? 'custom-' + className + '-input ' : '') +
              'custom-image-input invalid-image'
            : (className ? 'custom-' + className + '-input ' : '') +
              'custom-image-input'
        }
      >
        <Form.Label htmlFor={(className ? className + '-' : '') + 'imageFile'}>
          Image...
        </Form.Label>
        {!fileInfo ? (
          <p>No image selected for upload</p>
        ) : (
          <FileInfo fileInfo={fileInfo} />
        )}
      </div>

      <Form.Control
        id={(className ? className + '-' : '') + 'imageFile'}
        type='file'
        className={(className ? className + '-input ' : '') + 'image-input '}
        size='lg'
        name='image'
        accept='image/*'
        onChange={handleImageChange}
        isInvalid={!correctType || !correctSize}
      />

      <Form.Control.Feedback
        className={
          (className ? className + '-feedback ' : '') + 'invalid-feedback'
        }
        type='invalid'
      >
        {!correctType && 'Please select an image file'}
        {!correctSize && `Please select a file ${targetSize}KB or less`}
      </Form.Control.Feedback>
    </Form.Group>
  );
}
