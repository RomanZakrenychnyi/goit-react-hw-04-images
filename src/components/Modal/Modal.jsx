import style from './Modal.module.css';

export const Modal = ({ closeModal, largeImage }) => {
  return (
    <div className={style.Overlay} onClick={closeModal}>
      <div className={style.Modal}>
        <img src={largeImage} alt="" />
      </div>
    </div>
  );
};
