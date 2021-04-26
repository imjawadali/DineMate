import React from 'react'
import ImageUploader from 'react-images-upload';

import './styles.css'

const Picker = ({ style, height, imageUrl, uploading, showCancel, extensions, onChange, onCancel }) => (
    !imageUrl ? !uploading ? <ImageUploader
      className="Input"
      style={{ padding: '5px', ...style }}
      fileContainerStyle={{ padding: '0px', margin: '0px' }}
      withIcon={true}
      singleImage={true}
      label="Max file size: 2mb"
      buttonText='Choose Image'
      imgExtension={extensions}
      maxFileSize={2048000}
      onChange={onChange}
    /> : <div className="Input ImagePreviewContainer">
      <p>Processing Image</p>
      <i style={{ marginTop: '10px' }} className="fa fa-refresh fa-pulse fa-2x" />
    </div> :
    <div className="Input ImagePreviewContainer">
      {showCancel ? <i className="fa fa-times-circle fa-lg"
        style={{
          display: 'block',
          float: 'right',
          position: 'absolute',
          top: 10,
          right: 10,
          cursor: 'pointer'
        }}
        onClick={onCancel}
      /> : null}
      <img style={{ height, ...style }} src={imageUrl} alt={imageUrl} />
    </div>
)

export { Picker }
