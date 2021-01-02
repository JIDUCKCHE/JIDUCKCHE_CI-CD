import React, { useEffect, useState } from 'react'
import { Typography, Button, Form, message, Input, Icon, Descriptions } from 'antd'
import { withRouter } from 'react-router-dom'
import Axios from 'axios';
import DropAndCrop from '../UploadPage/Section/DropAndCrop';
import {
    base64StringtoFile
} from '../../../utils/ReusableUtils'
import { v4 } from 'uuid'
import Calendar from 'react-calendar'

const { TextArea } = Input;
const { Title } = Typography;

function UploadPage(props) {
        const user = localStorage.getItem('userId')
        
        const [Category, setCategory] = useState("")
        const [ProdName, setProdName] = useState("");
        const [Artists, setArtist] = useState([])
        const [Content, setContent] = useState("");
        const [Link, setLink] = useState("");
        const [StartDate, setStartDate] = useState(new Date());
        const [EndDate, setEndDate] = useState(new Date())

        const [OnDrop, setOnDrop] = useState(false)

        const [MainImage, setMainImage] = useState("");
        const [PreImage, setPreImage] = useState("");
        const [MainImagePath, setMainImagePath] = useState("");
        const [PreImagePath, setPreImagePath] = useState("");

        const [OriginFile, setOriginFile] = useState(null);
        const [ImageSrc, setImageSrc] = useState(null)
        const [ImageExt, setImageExt] = useState(null)
        const imagePreviewCanvasRef = React.createRef()

        const prodId = props.match.params.prodId
        const uuid = v4();
        useEffect(() => {
            Axios.get('/api/artist/')
                .then(response => {
                    if (response.data.success) {
                        setArtist(response.data.result)
                    } else {
                        alert('아티스트 정보를 가져오는데 실패했습니다.')
                    }
                })
            
            Axios.get(`/api/prod/info/${prodId}`)
                .then(response => {
                    if (response.data.success) {
                        if (response.data.result.userId._id !== user) {
                            props.history.push('/')
                        }
                        setCategory(response.data.result.artistId._id)
                        setProdName(response.data.result.name)
                        setContent(response.data.result.content)
                        setLink(response.data.result.link)
                        setMainImage(response.data.result.mainImage)
                        setPreImage(response.data.result.preImage)
                        setMainImagePath(response.data.result.mainImagePath)
                        setPreImagePath(response.data.result.preImagePath)
                        setStartDate(new Date(response.data.result.startDate))
                        setEndDate(new Date(response.data.result.endDate))
                    } else {
                        alert('상품 정보를 가져오는데 실패했습니다.')
                    }
                })
        }, [])

        const onNameChange = (e) => {
            setProdName(e.currentTarget.value)
        }
        const onContentChange = (e) => {
            setContent(e.currentTarget.value)
        }
        const onCategoryChange = (e) => {
            setCategory(e.currentTarget.value)
        }
        const onLinkChange = (e) => {
            setLink(e.currentTarget.value)
        }

        const onDropClick = (e) => {
            e.preventDefault()
            setOnDrop(!OnDrop)
        }

        async function onSubmit (e) {
            e.preventDefault();
            const imgSrc = ImageSrc


            if(imgSrc && OnDrop) {
                const FileName = ProdName
                const canvasRef = imagePreviewCanvasRef.current
                const imgSrcExt = ImageExt
                const imageData64 = canvasRef.toDataURL('image/' + imgSrcExt)
                const preFilename = FileName + "_preview." + imgSrcExt
                const originFilename = FileName + '.' + imgSrcExt
                const newCroppedFile = base64StringtoFile(imageData64, preFilename)
                // let originFormData = new FormData;
                // let preFormData = new FormData;
                // const config = {
                //     header: {'content-type': 'multipart/form-data'}
                // }
                // originFormData.append("file", OriginFile)
                // preFormData.append("file", newCroppedFile)

                await Axios.post('/api/prod/deleteImage', { name: MainImage })
                    .then(response => {
                        console.log(response)
                    })
                await Axios.post('/api/prod/deletePreImage', { name: PreImage })

                // Axios.post('/api/file/deleteImage', {url: MainImage})
                //     .then(response => {
                //         if(!response.data.success) {
                //             alert('파일 삭제에 실패했습니다.')
                //         }
                //     })
                // Axios.post('/api/file/deleteImage', {url: PreImage})
                //     .then(response => {
                //         if(!response.data.success) {
                //             alert('파일 삭제에 실패했습니다.')
                //         }
                //     })

                let image = await Axios.post('/api/prod/getUrl', {name: uuid + originFilename})
                    .then(response => {
                            setMainImage(response.data.filename)
                            setMainImagePath(response.data.getURL)
                            return (response.data)
                    })
                await Axios.put(image.postURL, OriginFile)
                    .then(response => {

                    
                })
                let preImage = await Axios.post('/api/prod/getPreUrl', {name: uuid + preFilename})
                    .then(response => {
                        setPreImage(response.data.filename)
                        setPreImagePath(response.data.getURL)
                        return (response.data)
                })
                await Axios.put(preImage.postURL, newCroppedFile)
                    .then(response => {

                })
            }
            const variable = {
                'prodId': prodId,
                'userId': user,
                'name': ProdName,
                'artistId': Category,
                'link': Link,
                'preImage': PreImage,
                'mainImage': MainImage,
                'preImagePath': PreImagePath,
                'mainImagePath': MainImagePath,
                'startDate': StartDate,
                'endDate': EndDate,
                'content': Content
            }
            Axios.put('/api/prod/', variable)
                .then(response => {
                    if (response.data.success) {
                        message.success('성공적으로 업로드를 완료했습니다.')
                        props.history.push('/')
                    } else {
                        alert('데이터 저장에 실패했습니다.')
                    }
                })
        }

        const refreshOriginFile = (file) => {
            setOriginFile(file)
            return file
        }

        const refreshImageSrc = (src) => {
            setImageSrc(src)
        }

        const refreshImageExt = (ext) => {
            setImageExt(ext)
        }

        const onStartDateChange = (date) => {
            setStartDate(date)
        }

        const onEndDateChange = (date) => {
            setEndDate(date)
        }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2}> Prod Modify </Title>
            </div>
            <Form onSubmit={onSubmit}>
            {OnDrop === false ? 
                <React.Fragment>
                    {PreImage && MainImage &&
                    <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                        <div style={{ width:'45%' }}>
                            <p>Preview</p>
                            <img style={{ maxWidth: '100%', marginBottom: '2rem' }} src={`${PreImagePath}`} alt="thumbnail" />
                        </div>
                        <div style={{ width:'45%' }}>
                            <p>Main Image</p>
                            <img style={{ maxWidth: '100%' }} src={`${MainImagePath}`} alt="mainImage" />
                        </div>
                    </div>
                    }
                </React.Fragment>
                :
                <DropAndCrop
                    OriginFile={OriginFile} setOriginFile={refreshOriginFile}
                    ImageSrc={ImageSrc} setImageSrc={refreshImageSrc}
                    setImageExt={refreshImageExt}
                    canvas={imagePreviewCanvasRef}/>
            }
            {OnDrop===false ? 
                <button onClick={onDropClick}>이미지 변경</button>
                :
                <button onClick={onDropClick}>이미지 취소</button>
            }
            <br />
            <br />
            <label>상품 이름</label>
            <Input
                onChange={onNameChange}
                value={ProdName}
            />
            <br />
            <br />
            <label>내용</label>
            <TextArea
                onChange={onContentChange}
                value={Content}
            />
            <br />
            <br />
            <div style={{ display: 'flex', justifyContent:'space-between' }}>
                <div style={{ marginLeft: '1rem', width: '45%' }}>
                    <label>펀딩 시작일</label>
                    <Calendar
                        onChange={onStartDateChange}
                        value={StartDate}
                    />
                </div>
                <div style={{ marginRight: '1rem', width: '45%' }}>
                    <label>펀딩 종료일</label>
                    <Calendar
                        onChange={onEndDateChange}
                        value={EndDate}
                    />
                </div>
            </div>
            <br />
            <br />
            <label>링크</label>
            <TextArea
                onChange={onLinkChange}
                value={Link}
            />
            <br />
            <br />
            <select style={{ width: '150px', height: '2rem', border: '1px solid rgba(0,0,0,0.3)', outline: '0', borderRadius: '5px', paddingLeft: '0.5rem' }} onChange={onCategoryChange}>
                {Content && Artists.map((artist, index) => (
                    artist._id === Category ? <option key={index} value={artist._id} selected>{artist.name}</option> : <option key={index} value={artist._id}>{artist.name}</option>
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

export default withRouter(UploadPage)
