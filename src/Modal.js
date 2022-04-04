import React from 'react';

const Modal = (props) => {
    if(!props.onClose) {

    }
    return(
        <div className='modal'>
            <div className='modal-header'>
                <div className='modal-body'>
                    <h4>Modal Content</h4>
                </div>
                <div className='modal-footer'>
                    <button>Close</button>
                    <button>Update</button>
                </div>
            </div>
        </div>
    )
}


export default Modal;