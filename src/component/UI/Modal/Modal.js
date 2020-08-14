import React from 'react';
import "./Modal.css";
import Backdrop from '../Backdrop/Backdrop';

function Modal(props) {
    const { modalClosed, show } = props;
    return (
        <>
            <Backdrop clicked={modalClosed} show={show}/>
            <div 
                className="Modal"
                style={{
                    transform: show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: show ? '1' : '0'
                }}
                >
                {props.children}
            </div>
        </>
    )
}

export default Modal;
