import React, { useState } from 'react'
import Dropzone from 'react-dropzone';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { Icon } from 'antd'


import {
    extractImageFileExtensionFromBase64,
    getCroppedImg
} from '../../../../utils/ReusableUtils'

function DropAndCrop(props) {

    const [Crop, setCrop] = useState({aspect: 1/1, x:0, y:0, width:100,height:100, unit:'px'})
    const [ImageRef, setImageRef] = useState(null)
    const imagePreviewCanvasRef = props.canvas
    const setImageExt = props.setImageExt
    const OriginFile = props.OriginFile
    const setOriginFile = props.setOriginFile
    const ImageSrc = props.ImageSrc
    const setImageSrc = props.setImageSrc

    const imageMaxSize = 5 * 1024 * 1024
    const acceptedFileTypes = 'image/x-png, image/png, image/jpg, image/jpeg, image/gif'
    const acceptedFileTypesArray = acceptedFileTypes.split(",").map((item) => {return item.trim()})

    const verifyFile = (files) => {
        if(files && files.length > 0) {
            const currentFile = files[0]
            const currentFileType = currentFile.type
            const currentFileSize = currentFile.size
            if(currentFileSize > imageMaxSize) {
                alert('이 파일은 너무 큽니다. ' + imageMaxSize/1024/1024 + 'MB이하의 파일만 가능합니다')//maxsize 알려주기
                return false
            }
            if(!acceptedFileTypesArray.includes(currentFileType)){
                alert('이 파일은 지원하지 않습니다.')
                return false
            }
            return true
        }
    }

    const onDrop = (files, rejectedFiles) => {
        if(rejectedFiles && rejectedFiles.length > 0) {
            verifyFile(rejectedFiles)
        }
        if(files && files.length > 0) {
            const isVerified = verifyFile(files)
            if(isVerified) {
                const file = setOriginFile(files[0])
                const reader = new FileReader()
                reader.addEventListener("load", () => {
                    const myResult = reader.result
                    setImageSrc(myResult)
                    setImageExt(extractImageFileExtensionFromBase64(myResult))
                }, false)
                reader.readAsDataURL(file)
            }
        }        
    }

    const handleClearToDefault = (event) =>  {
        if(event) event.preventDefault()
        const canvas = imagePreviewCanvasRef.current
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        setImageSrc(null)
        setImageExt(null)
        setCrop({aspect: 1/1, x:0, y:0, width:100,height:100, unit:'px'})
    }

    const makeClientCrop = (crop) => {
        const canvasRef = imagePreviewCanvasRef.current
        if (ImageRef && crop.width && crop.height) {
            getCroppedImg(
            canvasRef,
            ImageRef,
            crop
          );
        }
    }

    const handleOnCropChange = (crop) => {
        setCrop(crop)
    }

    const handleImageLoaded = (image) => {
        setImageRef(image)
    }

    const handleOnCropComplete = (crop) => {
        makeClientCrop(crop)
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
           {ImageSrc !== null ?
            <div style={{ width: '300px', border: '1px solid lightgray', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ReactCrop
                    src={ImageSrc}
                    crop={Crop}
                    onImageLoaded={handleImageLoaded}
                    onComplete={handleOnCropComplete}
                    onChange={handleOnCropChange} />
            </div>
            :
            <Dropzone
                onDrop={onDrop}
                multieple={false}
                maxSize={imageMaxSize}
                accept={acceptedFileTypes}>
                {({ getRootProps, getInputProps }) => (
                    <div style={{ width: '300px', height: '240px', border: '1px solid lightgray', display: 'flex', alignItems: 'center', justifyContent: 'center' }} {...getRootProps()}>
                        <input {...getInputProps()} />
                        <Icon type="plus" style={{ fontSize: '3rem' }}/>
                    </div>
                )}
            </Dropzone>}   
            {
                <div style={{ marginLeft: '3rem', width: '300px'}}>
                    <p>Preview Canvas Crop</p>
                    <canvas ref={imagePreviewCanvasRef}/>
                    <button onClick={handleClearToDefault}>Clear</button>
                </div>
            } 
        </div>
    )
}

export default DropAndCrop
