import React from 'react'

const FaceRecognition = ({ imageUrl, box }) => {

    return (
        <div className="FaceRecognition">
            { imageUrl ? <><img
                id='inputImg'
                alt='cos'
                src={imageUrl || 'https://samples.clarifai.com/face-det.jpg'}
            />
            <div className='bounding-box'
                style={{
                    top: box.topRow,
                    bottom: box.bottomRow,
                    left: box.leftCol,
                    right: box.rightCol}}>
            </div></> : <span>Here will be displayed an image</span> }
        </div>
    )
}

export default FaceRecognition