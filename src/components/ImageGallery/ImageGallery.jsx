import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import style from './ImageGallery.module.css'

export const ImageGallery = ({ pictures, onClick }) => {
  return (
    <ul className={style.ImageGallery}>
      <ImageGalleryItem images={pictures} onClick={onClick} />
    </ul>
  );
};
