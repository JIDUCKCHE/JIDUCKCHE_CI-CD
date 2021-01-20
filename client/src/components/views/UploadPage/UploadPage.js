import React, { useEffect, useState } from 'react'
import { Typography, Button, Form, message, Input } from 'antd'
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom'
import Axios from 'axios';
import DropAndCrop from './Section/DropAndCrop';
import {
    base64StringtoFile
} from '../../../utils/ReusableUtils'
import { v4 } from 'uuid'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import './Section/UploadPage.css'

const { TextArea } = Input;
const { Title } = Typography;

function UploadPage(props) {
        const user = useSelector(state => state.user);
        
        const [Category, setCategory] = useState("")
        const [ProdName, setProdName] = useState("");
        const [Artists, setArtist] = useState([])
        const [Content, setContent] = useState("");
        const [Link, setLink] = useState("");
        const [StartDate, setStartDate] = useState(new Date());
        const [EndDate, setEndDate] = useState(new Date())

        const [OriginFile, setOriginFile] = useState(null);
        const [ImageSrc, setImageSrc] = useState(null)
        const [ImageExt, setImageExt] = useState(null)
        const imagePreviewCanvasRef = React.createRef()

        const uuid = v4();

        useEffect(() => {
            Axios.get('/api/artist/')
                .then(response => {
                    if (response.data.success) {
                        setArtist(response.data.result);
                        setCategory(response.data.result[0]);
                    } else {
                        message.warning('아티스트 정보를 가져오는데 실패했습니다.')
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        }, [])

        async function onSubmit (e) {
            e.preventDefault();
            const imgSrc = ImageSrc
            const FileName = ProdName

            if(imgSrc) {
                const canvasRef = imagePreviewCanvasRef.current
                const imgSrcExt = ImageExt
                const imageData64 = canvasRef.toDataURL('image/' + imgSrcExt)
                const originFilename = FileName + '.' + imgSrcExt
                const preFilename = FileName + "_preview." + imgSrcExt
                const newCroppedFile = base64StringtoFile(imageData64, preFilename)

                let image = await Axios.post('/api/prod/getUrl', {name: uuid + originFilename})
                    .then(response => {
                        if (response.data.success) return (response.data.result)
                        else message.warning('이미지 업로드에 실패했습니다.')
                    })
                    .catch(error => {
                        console.log(error)
                    })
                Axios.put(image.postURL, OriginFile)
                    .then(response => {
                        if(response.status !== 200) {
                            message.warning('이미지 업로드에 실패했습니다.')
                        }
                    })
                    .catch(error => {
                        console.log(error)
                    })
                let preImage = await Axios.post('/api/prod/getPreUrl', {name: uuid + preFilename})
                    .then(response => {
                        if (response.data.success) return (response.data.result)
                        else message.warning('이미지 업로드에 실패했습니다.')
                    })
                    .catch(error => {
                        console.log(error)
                    })

                Axios.put(preImage.postURL, newCroppedFile)
                    .then(response => {
                        if(response.status !== 200) {
                            message.warning('이미지 업로드에 실패했습니다.')
                        }
                    })
                    .catch(error => {
                        console.log(error)
                    })
                    
                const variable = {
                    'userId': user.userData._id,
                    'name': ProdName,
                    'artistId': Category,
                    'link': Link,
                    'mainImage': image.filename,
                    'preImage': preImage.filename,
                    'mainImagePath': image.getURL,
                    'preImagePath': preImage.getURL,
                    'startDate': StartDate,
                    'endDate': EndDate,
                    'content': Content
                }

                Axios.post('/api/prod/', variable)
                    .then(response => {
                        if (response.data.success) {
                            message.success('성공적으로 업로드를 완료했습니다.')
                            props.history.push('/')
                        } else {
                            message.warning('데이터 저장에 실패했습니다.')
                        }
                    })
                    .catch(error => {
                        console.log(error)
                    })
                }
        }
        
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
            if(date > EndDate) {
                alert("펀딩 시작일은 종료일 이후일 수 없습니다.")
            } else {
                setStartDate(date)
            }
        }

        const onEndDateChange = (date) => {
            if(date < StartDate) {
                alert("펀딩 종료일은 시작일보다 이전일 수 없습니다.")
            } else {
                setEndDate(date)
            }
        }

    return (
        <div className="upload_prod_main_container">
            <div className="upload_prod_title">
                <Title level={2}> Prod Upload </Title>
            </div>
            <div className="upload_prod_form">
            <Form onSubmit={onSubmit}>
                <div className="upload_prod_drop_crop">
                    <DropAndCrop
                        OriginFile={OriginFile} setOriginFile={refreshOriginFile}
                        ImageSrc={ImageSrc} setImageSrc={refreshImageSrc}
                        setImageExt={refreshImageExt}
                        canvas={imagePreviewCanvasRef}/>
                </div>
                <div className="upload_prod_title">
                    <text>상품 이름</text>
                    <Input
                        onChange={onNameChange}
                        value={ProdName}
                    />
                </div>
                <div className="upload_prod_content">
                    <text>내용</text>
                    <textarea
                        onChange={onContentChange}
                        value={Content}
                    />
                </div>
                <div className="upload_prod_calendar">
                    <div className="upload_prod_calendar_sub">
                        <text>펀딩 시작일</text>
                        <Calendar
                            onChange={onStartDateChange}
                            value={StartDate}
                        />
                    </div>
                    <div className="upload_prod_calendar_sub">
                        <text>펀딩 종료일</text>
                        <Calendar
                            onChange={onEndDateChange}
                            value={EndDate}
                        />
                    </div>
                </div>
                <div className="upload_prod_link">
                    <text>링크</text>
                    <TextArea
                        onChange={onLinkChange}
                        value={Link}
                    />
                </div>
                <div className="upload_prod_select">
                    <select onChange={onCategoryChange}>
                        {Artists.map((artist, index) => (
                            <option key={index} value={artist._id}>{artist.name}</option>
                        ))}
                    </select>
                </div>
                <button className="upload_prod_button" onClick={onSubmit}>
                    업로드
                </button>
            </Form>
            </div>
        </div>
    )
}

export default withRouter(UploadPage)
