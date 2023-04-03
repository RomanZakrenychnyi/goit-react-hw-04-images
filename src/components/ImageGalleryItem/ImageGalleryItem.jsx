import style from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ images, onClick }) => {
  return (
      images.map(({id, webformatURL}) => {
        return <li className={style.ImageGalleryItem} key={id}>
          <img
            onClick={onClick}
            src={webformatURL}
            id={id}
            alt=""
            className={style.ImageGalleryItemImage}
          />
        </li>
      }
      )
  );
};
