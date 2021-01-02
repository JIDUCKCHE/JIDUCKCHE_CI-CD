import React, { useEffect } from 'react'
import { Typography, Button, Form, message, Input, Icon, Descriptions } from 'antd'
import { useState } from 'react';
import Dropzone from 'react-dropzone';
import Axios from 'axios';
import { v4 } from 'uuid'
import {
    extractImageFileExtensionFromBase64,
} from '../../../utils/ReusableUtils'
import { withRouter } from 'react-router-dom'

const { TextArea } = Input;
const { Title } = Typography;

function ArtistUploadPage() {

    const [ArtistName, setArtistName] = useState("");
    const [Ents, setEnts] = useState([]);
    const [Category, setCategory] = useState("");
    const [OriginFile, setOriginFile] = useState(null);
    const [ImageSrc, setImageSrc] = useState(null)
    const [ImageExt, setImageExt] = useState(null)

    const imageMaxSize = 5 * 1024 * 1024
    const acceptedFileTypes = 'image/x-png, image/png, image/jpg, image/jpeg, image/gif'
    const acceptedFileTypesArray = acceptedFileTypes.split(",").map((item) => {return item.trim()})
    const uuid = v4();

    useEffect(() => {
        Axios.get(`/api/ent/`)
            .then(response => {
                if (response.data.success) {
                    setEnts(response.data.result)
                } else {
                    alert('아티스트 정보를 가져오는데 실패했습니다.')
                }
            })
    }, [])

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
                reader.readAsDataURL(files[0])
            }
        }        
    }
    
    const onNameChange = (e) => {
        setArtistName(e.currentTarget.value)
    }
    const onCategoryChange = (e) => {
        setCategory(e.currentTarget.value)
    }

    async function onSubmit(e) {
        e.preventDefault();
        const imgSrc = ImageSrc
        const FileName = ArtistName
        
        if(imgSrc) {
            const imgSrcExt = ImageExt
            const originFilename = FileName + '.' + imgSrcExt

            let image = await Axios.post('/api/ent/getUrl', {name: uuid + originFilename})
                .then(response => {
                        return (response.data.result)
                })

            Axios.put(image.postURL, OriginFile)
                .then(response => {
                    console.log(response)
                    if(response.status !== 200) {
                        alert('이미지 업로드에 실패했습니다.')
                    }
                })

            const variable = {
                'name': ArtistName,
                'entId': Category,
                'mainImage': image.filename,
                'mainImagePath': image.getURL,
            }
            Axios.post('/api/artist/', variable)
                .then(response => {
                    if (response.data.success) {
                        message.success('성공적으로 업로드를 완료했습니다.')
                        setTimeout(() => {
                            setArtistName("")
                            setCategory("")
                            setOriginFile(null)
                            setImageSrc(null)
                            setImageExt(null)
                        }, 1000);
                    } else {
                        alert('데이터 저장에 실패했습니다.')
                    }
                })
            }
    }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2}> Artist Upload </Title>
            </div>
            <Form onSubmit={onSubmit}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {!ImageSrc ?
                    <Dropzone
                    onDrop={onDrop}
                    multieple={false}
                    maxSize={10000000}>
                        {({ getRootProps, getInputProps }) => (
                            <div style={{ width: '300px', height: '240px', border: '1px solid lightgray', display: 'flex',
                        alignItems: 'center', justifyContent: 'center' }} {...getRootProps()}>
                            <input {...getInputProps()} />
                            <Icon type="plus" style={{ fontSize: '3rem' }}/>
                        </div>
                        )}
                    </Dropzone>
                    :
                    <img src={ImageSrc} style={{ width: '200px' }}/>
                }
                </div>
            <br />
            <br />


            <label>아티스트 이름</label>
            <Input
                onChange={onNameChange}
                value={ArtistName}
            />
            <br />
            <br />


            <label>엔터 선택</label> <br />
            <select style={{ width: '150px', height: '2rem', border: '1px solid rgba(0,0,0,0.3)', outline: '0', borderRadius: '5px', paddingLeft: '0.5rem' }} onChange={onCategoryChange}>
                {Ents.map((ent, index) => (
                    <option key={index} value={ent._id}>{ent.name}</option>
                ))}
            </select>
            <br />
            <br />


            <Button type="primary" size="large" onClick={onSubmit}>
                Submit
            </Button>
            </Form>
        </div>
    )
}

export default withRouter(ArtistUploadPage)
