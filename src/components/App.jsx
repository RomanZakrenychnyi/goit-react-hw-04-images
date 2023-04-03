import axios from 'axios';
import { Component } from 'react';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { SearchBar } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '34195796-6d8ef92c294f12e249c52e8bf';

export class App extends Component {
  state = {
    pictures: [],
    loading: false,
    queryImg: '',
    isFormSubmit: false,
    page: 1,
    loadMoreClick: false,
    modalOpen: false,
    isBtnActive: false,
    loader: false,
    modalImage: '',
  };

  async componentDidUpdate(__, prevState) {
    try {
      if (this.state.isFormSubmit === true) {
        const response = await axios.get(
          `?q=${this.state.queryImg}&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
        );
        this.setState({ pictures: response.data.hits });
        this.setState({ isFormSubmit: false });
        this.setState({ isBtnActive: true });
        this.setState({ loader: false });
      }

      if (this.state.loadMoreClick === true) {
        const response = await axios.get(
          `?q=${this.state.queryImg}&page=${this.state.page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
        );
        this.setState(prevState => ({
          pictures: [...prevState.pictures, ...response.data.hits],
        }));
        this.setState({ loadMoreClick: false });
        this.setState({ loader: false });
      }
    } catch (error) {
      console.log(error);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleModalClose);
  }


  handleSubmitClick = event => {
    event.preventDefault();
    const inputValue = event.target.children[1].value;
    this.setState({ queryImg: inputValue });
    this.setState({ isFormSubmit: true });
    this.setState({ loader: true });
  };


  handleBtnLoadMoreClick = () => {
    this.setState({ loadMoreClick: true });
    this.setState(prevState => ({ page: prevState.page + 1 }));
    this.setState({ loader: true });
  };


  handleModalOpen = event => {
    this.setState(prevState => ({ modalOpen: !prevState.modalOpen }));

    const imgId = event.currentTarget.attributes.id.value;
    const largeImage = this.state.pictures.find(
      picture => picture.id === +imgId
    );
    this.setState({ modalImage: largeImage.largeImageURL });

    window.addEventListener('keydown', this.handleModalClose);
  };


  handleModalClose = event => {
    if (event.key === 'Escape') {
      this.setState({ modalOpen: false });
    }
    window.removeEventListener('keydown', this.handleModalClose);
  };


  closeModalWindow = event => {
    if (event.target === event.currentTarget) {
      this.setState({ modalOpen: false });
    }
  };


  render() {
    return (
      <div>
        <SearchBar onSubmit={this.handleSubmitClick} />
        <ImageGallery
          pictures={this.state.pictures}
          onClick={this.handleModalOpen}
        />
        {this.state.loader && <Loader />}
        {this.state.isBtnActive && (
          <Button onClick={this.handleBtnLoadMoreClick} />
        )}
        {this.state.modalOpen && (
          <Modal
            closeModal={this.closeModalWindow}
            largeImage={this.state.modalImage}
          />
        )}
      </div>
    );
  }
}
