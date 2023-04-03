// import PropTypes from 'prop-types';
import style from './Searchbar.module.css';

export const SearchBar = ({onSubmit}) => {
  return (
    <header className={style.Searchbar}>
      <form className={style.SearchForm} onSubmit={onSubmit}>
        <button type="submit" className={style.SearchFormButton}></button>

        <input
          className={style.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

// SearchBar.propTypes = {
//   onSubmit: PropTypes.func.isRequired,
// };
