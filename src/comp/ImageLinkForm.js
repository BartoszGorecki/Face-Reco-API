import React from 'react'
import '../style/image.css'

const ImageLinkForm = ({ onInputChange, onSubmit }) => {

    return (
        <div className="ImageLinkForm">
            <p>
                {'It will detect faces in your picture'}
            </p>
            <div>
                <input type='text' onChange={onInputChange} />
                <button onClick={onSubmit}>Detect</button>
            </div>
        </div>
    )
}

export default ImageLinkForm