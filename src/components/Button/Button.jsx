import style from './Button.module.css';

export const Button = ({ onClick }) => {
  return (
    <div className={style.div}>
      <button type="button" className={style.Button} onClick={onClick}>
        Load more
      </button>
    </div>
  );
};
