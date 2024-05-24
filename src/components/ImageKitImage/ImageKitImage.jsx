import { IKImage } from 'imagekitio-react';

export function ImageKitImage({
  className,
  src,
  transformation,
  alt,
  defaultImg,
  onError,
}) {
  return src ? (
    <IKImage
      className={className}
      urlEndpoint='https://ik.imagekit.io/blogscape'
      src={src}
      transformation={[transformation]}
      loading='lazy'
      lqip={{ active: true }}
      alt={alt}
    />
  ) : (
    <img
      className={className}
      src={defaultImg}
      alt={alt}
      onError={onError}
    />
  );
}
