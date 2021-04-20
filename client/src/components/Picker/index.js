import React from 'react'
import ImageUploader from 'react-images-upload';

import './styles.css'

const Picker = ({ style, placeholder, extensions, onChange }) => (
    <ImageUploader
      className="Input"
      style={{ padding: '5px', ...style }}
      fileContainerStyle={{ padding: '0px', margin: '0px' }}
      withIcon={false}
      singleImage={true}
      withPreview={true}
      placeholder={placeholder}
      label="Max file size: 2mb"
      buttonText='Choose Image'
      imgExtension={extensions}
      maxFileSize={2048000}
      onChange={onChange}
    />
)

export { Picker }
