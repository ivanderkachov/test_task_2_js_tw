import React from "react"

import './modal.css'
const Modal = () => {
  return (
    <div className="modal active">
        <form className="modal__form">
          <input required placeholder="Name" className="modal__form__input" />
          <input placeholder="Category" className="modal__form__input" />
          <textarea placeholder="Content" className="modal__form__input" />
          <button>Add</button>
        </form>
    </div>
  );
}

export default Modal