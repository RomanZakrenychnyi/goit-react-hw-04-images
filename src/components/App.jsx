import axios from 'axios';
// import { searchQuery } from 'Service/API';
import { useState, useEffect } from 'react';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { SearchBar } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '34195796-6d8ef92c294f12e249c52e8bf';

export const App = () => {
  const [pictures, setPictures] = useState([]);
  const [queryImg, setQueryImg] = useState('');
  const [isFormSubmit, setIsFormSubmit] = useState(false);
  const [page, setPage] = useState(1);
  const [loadMoreClick, setLoadMoreClick] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [isBtnActive, setIsBtnActive] = useState(false);
  const [loader, setLoader] = useState(false);
  const [modalImage, setModalImage] = useState('');

  useEffect(() => {
    const fetchImg = async () => {
      try {
        if (isFormSubmit) {
          const response = await axios.get(
            `?q=${queryImg}&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
          );
          setPictures(response.data.hits);
          setIsFormSubmit(false);
          setIsBtnActive(true);
          setLoader(false);
          setPage(1);

          if (response.data.hits.length < 12) {
            setIsBtnActive(false);
          }
        }

        if (loadMoreClick) {
          const response = await axios.get(
            `?q=${queryImg}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
          );
          setPictures([...pictures, ...response.data.hits]);
          setLoadMoreClick(false);
          setLoader(false);

          if (response.data.hits.length < 12) {
            setIsBtnActive(false);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchImg();
  }, [isFormSubmit, queryImg, loadMoreClick, page, pictures]);

  //   async componentDidUpdate(__, prevState) {
  //     try {
  //       if (this.state.isFormSubmit === true) {
  //         const response = await axios.get(
  //           `?q=${this.state.queryImg}&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  //         );
  //         this.setState({ pictures: response.data.hits });
  //         this.setState({ isFormSubmit: false });
  //         this.setState({ isBtnActive: true });
  //         this.setState({ loader: false });
  //       }

  //       if (this.state.loadMoreClick === true) {
  //         const response = await axios.get(
  //           `?q=${this.state.queryImg}&page=${this.state.page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  //         );
  //         this.setState(prevState => ({
  //           pictures: [...prevState.pictures, ...response.data.hits],
  //         }));
  //         this.setState({ loadMoreClick: false });
  //         this.setState({ loader: false });
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }

  useEffect(() => window.removeEventListener('keydown', handleModalClose));

  const handleSubmitClick = event => {
    event.preventDefault();
    const inputValue = event.target.children[1].value;
    setQueryImg(inputValue);
    setIsFormSubmit(true);
    setLoader(true);
  };

  const handleBtnLoadMoreClick = () => {
    setLoadMoreClick(true);
    setPage(page + 1);
    setLoader(true);
  };

  const handleModalOpen = event => {
    setModalOpen(!modalOpen);

    const imgId = event.currentTarget.attributes.id.value;
    const largeImage = setPictures(
      pictures.find(picture => picture.id === +imgId)
    );
    setModalImage(largeImage.largeImageURL);

    window.addEventListener('keydown', handleModalClose);
  };

  const handleModalClose = event => {
    if (event.key === 'Escape') {
      setModalOpen(false);
    }
    window.removeEventListener('keydown', handleModalClose);
  };

  const closeModalWindow = event => {
    if (event.target === event.currentTarget) {
      setModalOpen(false);
    }
  };
console.log(page);
  return (
    <div>
      <SearchBar onSubmit={handleSubmitClick} />
      <ImageGallery pictures={pictures} onClick={handleModalOpen} />
      {loader && <Loader />}
      {isBtnActive && <Button onClick={handleBtnLoadMoreClick} />}
      {modalOpen && (
        <Modal closeModal={closeModalWindow} largeImage={modalImage} />
      )}
    </div>
  );
};

// export class App extends Component {
//   state = {
//     pictures: [],
//     loading: false,
//     queryImg: '',
//     isFormSubmit: false,
//     page: 1,
//     loadMoreClick: false,
//     modalOpen: false,
//     isBtnActive: false,
//     loader: false,
//     modalImage: '',
//   };

//   async componentDidUpdate(__, prevState) {
//     try {
//       if (this.state.isFormSubmit === true) {
//         const response = await axios.get(
//           `?q=${this.state.queryImg}&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
//         );
//         this.setState({ pictures: response.data.hits });
//         this.setState({ isFormSubmit: false });
//         this.setState({ isBtnActive: true });
//         this.setState({ loader: false });
//       }

//       if (this.state.loadMoreClick === true) {
//         const response = await axios.get(
//           `?q=${this.state.queryImg}&page=${this.state.page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
//         );
//         this.setState(prevState => ({
//           pictures: [...prevState.pictures, ...response.data.hits],
//         }));
//         this.setState({ loadMoreClick: false });
//         this.setState({ loader: false });
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handleModalClose);
//   }

//   handleSubmitClick = event => {
//     event.preventDefault();
//     const inputValue = event.target.children[1].value;
//     this.setState({ queryImg: inputValue });
//     this.setState({ isFormSubmit: true });
//     this.setState({ loader: true });
//   };

//   handleBtnLoadMoreClick = () => {
//     this.setState({ loadMoreClick: true });
//     this.setState(prevState => ({ page: prevState.page + 1 }));
//     this.setState({ loader: true });
//   };

//   handleModalOpen = event => {
//     this.setState(prevState => ({ modalOpen: !prevState.modalOpen }));

//     const imgId = event.currentTarget.attributes.id.value;
//     const largeImage = this.state.pictures.find(
//       picture => picture.id === +imgId
//     );
//     this.setState({ modalImage: largeImage.largeImageURL });

//     window.addEventListener('keydown', this.handleModalClose);
//   };

//   handleModalClose = event => {
//     if (event.key === 'Escape') {
//       this.setState({ modalOpen: false });
//     }
//     window.removeEventListener('keydown', this.handleModalClose);
//   };

//   closeModalWindow = event => {
//     if (event.target === event.currentTarget) {
//       this.setState({ modalOpen: false });
//     }
//   };

//   render() {
// return (
//   <div>
//     <SearchBar onSubmit={this.handleSubmitClick} />
//     <ImageGallery
//       pictures={this.state.pictures}
//       onClick={this.handleModalOpen}
//     />
//     {this.state.loader && <Loader />}
//     {this.state.isBtnActive && (
//       <Button onClick={this.handleBtnLoadMoreClick} />
//     )}
//     {this.state.modalOpen && (
//       <Modal
//         closeModal={this.closeModalWindow}
//         largeImage={this.state.modalImage}
//       />
//     )}
//   </div>
// );
//   }
// }
