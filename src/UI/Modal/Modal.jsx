// import PropTypes from 'prop-types';
import style from './Modal.module.css';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import useCloseModal from '../../hooks/useCloseModal';

export const Modal = ({ children, showCloseButton = false }) => {
  const overlayRef = useRef(null);
  const closeModal = useCloseModal();

  const handleClick = e => {
    const target = e.target;
    if (target === overlayRef.current) {
      closeModal();
    }
  };

  const handleEscape = e => {
    if (
      (e.target.tagName !== 'TEXTAREA') &&
      (e = e || window.event) &&
      (e.key === 'Escape')) {
      closeModal();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);
    document.addEventListener('keyup', handleEscape);
    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('keyup', handleEscape);
    };
  }, []);

  useEffect(() => {
    document.addEventListener('keyup', handleEscape);
    return () => {
      document.removeEventListener('keyup', handleEscape);
    };
  }, []);

  return (
    ReactDOM.createPortal(
      <div className={style.overlay} ref={overlayRef}>
        <div className={style.modal}>
          {children}
          {showCloseButton &&
            <button
              className={style.close}
              onClick={() => closeModal() }>
              <FontAwesomeIcon color='tomato' size='3x' icon={faCircleXmark} />
            </button>
          }
        </div>
      </div>,
      document.getElementById('modal-root')
    )
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
};
