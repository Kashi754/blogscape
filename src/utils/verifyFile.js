const fileTypes = [
  'image/apng',
  'image/bmp',
  'image/gif',
  'image/jpeg',
  'image/pjpeg',
  'image/png',
  'image/svg+xml',
  'image/tiff',
  'image/webp',
  'image/x-icon',
];

export function verifyFileType(file) {
  return fileTypes.includes(file.type);
}

export function verifyFileSize(file, targetSize = 250) {
  // file size in KB
  const fileSize = file.size / 1024;
  return fileSize <= targetSize;
}

export function getFileSize(file) {
  const number = file.size;
  if (number < 1024) {
    return `${number} bytes`;
  } else if (number >= 1024 && number < 1048576) {
    return `${(number / 1024).toFixed(1)} KB`;
  } else if (number >= 1048576) {
    return `${(number / 1048576).toFixed(1)} MB`;
  }
}
