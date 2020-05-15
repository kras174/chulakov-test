import React, { Component, Fragment } from "react";
import Loader from "../UI/Loader/Loader";
import { num2str, sortList } from "../../helpers/helpers";
import PropTypes from "prop-types";
import ReactPlayer from "react-player";
import "./Preview.scss";

class Preview extends Component {
  renderPreview = () => {
    const { usersList, inputFilter, sortType, sortDirection, isEnglish } = this.props;
    // сортировка
    if (sortType) sortList(sortType, sortDirection, usersList);
    // вывод контекта
    return usersList.map((user) => {
      const iconPath = require(`../../data/images/${user.image}.svg`);
      let videoPath = "";
      if (user.video) videoPath = require(`../../data/videos/${user.video}.mp4`);
      //фильтрация
      if (inputFilter) {
        if (user.name.toLowerCase().indexOf(inputFilter.toLowerCase()) === -1) {
          return null;
        }
      }
      return (
        <div key={user.id} className={user.video ? "users-preview-item videoContent" : "users-preview-item"}>
          {/*Картинка через Icon компонент */}
          {/* <Icons name={user.image} width="50" height="50" /> */}
          <div className="previrew-item-no-video">
            <div className="preview-item-row">
              <img className="preview-item-icon" src={iconPath} alt=""></img>
              <p className="preview-item-name">{user.name}</p>
              <span className="preview-item-fav">
                <i className={user.favourite ? "fas fa-star" : "far fa-star"} onClick={this.props.starHandler.bind(this, user.id)} />
              </span>
            </div>

            {/*Картинка через img */}
            <p className="preview-item-age">
              {user.age}
              {isEnglish ? " years" : num2str(user.age, [" год", " года", " лет"])}
            </p>
            <p className="preview-item-phone">
              <i className="fas fa-phone" /> {user.phone}
            </p>
            <p className="preview-item-phrase">{user.phrase}</p>
          </div>
          {user.video && (
            <div className="previrew-item-video">
              <ReactPlayer url={videoPath} playing loop wrapper="previrew-item-video" />
            </div>
          )}
        </div>
      );
    });
  };

  render() {
    const { usersList, isFetching } = this.props;
    return (
      <Fragment>
        {isFetching ? (
          <Loader />
        ) : usersList.length !== 0 ? (
          <div className="users-preview">{this.renderPreview()}</div>
        ) : (
          <h2>Список пользователей пуст!</h2>
        )}
      </Fragment>
    );
  }
}

Preview.propTypes = {
  usersList: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  starHandler: PropTypes.func.isRequired,
  inputFilter: PropTypes.string.isRequired,
  sortType: PropTypes.string,
  sortDirection: PropTypes.string,
  isEnglish: PropTypes.bool.isRequired,
};

export default Preview;
