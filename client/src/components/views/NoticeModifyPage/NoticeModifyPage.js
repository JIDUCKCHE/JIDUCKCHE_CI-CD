import React, { useEffect, useState } from 'react'
import { Typography, Button, Form, message, Input } from 'antd'
import Axios from 'axios'
import { withRouter } from 'react-router-dom'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

const { TextArea } = Input;
const { Title } = Typography;

function NoticeModifyPage(props) {
    
    const user = localStorage.getItem('userId')
    const noticeId = props.match.params.noticeId
    const [TitleName, setTitleName] = useState("")
    const [Content, setContent] = useState("");
    const [StartDate, setStartDate] = useState(new Date());
    const [EndDate, setEndDate] = useState(new Date());

    useEffect(() => {
        Axios.get(`/api/notice/info/${noticeId}`)
            .then(response => {
                if(response.data.success) {
                    console.log(response.data.result)
                    setTitleName(response.data.result.title)
                    setContent(response.data.result.content)
                    setStartDate(new Date(response.data.result.startDate))
                    setEndDate(new Date(response.data.result.endDate))
                } else {
                    alert('공지사항 정보를 가져오는데 실패했습니다.')
                }
            })
    }, [])

    const onTitleChange = (e) => {
        setTitleName(e.currentTarget.value)
    }

    const onContentChange = (e) => {
        setContent(e.currentTarget.value)
    }

    const onStartDateChange = (date) => {
        setStartDate(date)
    }

    const onEndDateChange = (date) => {
        setEndDate(date)
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const variable = {
            'userId': user,
            'title': TitleName,
            'content': Content,
            'startDate': StartDate,
            'endDate': EndDate
        }
        Axios.put(`/api/notice/${noticeId}`, variable)
            .then(response => {
                if(response.data.success) {
                    message.success('성공적으로 업로드를 완료했습니다.')
                    props.history.push('/')
                } else {
                    alert('데이터 저장에 실패했습니다.')
                }
            })
    }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2}> Notice Upload </Title>
            </div>
            <Form onSubmit={onSubmit}>
                <label>공지사항 제목</label>
                <Input
                    onChange={onTitleChange}
                    value={TitleName}
                />
                <br />
                <br />
                
                <label>내용</label>
                <TextArea wrap="hard" col="50"
                    onChange={onContentChange}
                    value={Content}
                />
                <br />
                <br />

                <div style={{ display: 'flex', justifyContent:'space-between' }}>
                    <div style={{ marginLeft: '1rem', width: '45%' }}>
                        <label>공지 시작일</label>
                        <Calendar
                            onChange={onStartDateChange}
                            value={StartDate}
                        />
                    </div>
                    <div style={{ marginRight: '1rem', width: '45%' }}>
                        <label>공지 종료일</label>
                        <Calendar
                            onChange={onEndDateChange}
                            value={EndDate}
                        />
                    </div>
                </div>
                <br />
                <br />

                <Button type="primary" size="large" onClick={onSubmit}>
                    Submit
                </Button>
            </Form>
   
        </div>
    )
}

export default withRouter(NoticeModifyPage)
