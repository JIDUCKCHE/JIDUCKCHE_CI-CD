import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { withRouter } from 'react-router-dom'

function NoticeDetailPage(props) {

    const noticeId = props.match.params.noticeId
    const [Notice, setNotice] = useState([])

    useEffect(() => {
        Axios.get(`/api/notice/info/${noticeId}`)
            .then(response => {
                if(response.data.success) {
                    setNotice(response.data.result)
                } else {
                    alert('공지사항 정보를 가져오는데 실패했습니다.')
                }
            })
    }, [])

    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ display: 'inline-block', marginTop: '2rem', textAlign: 'center'}}>
                <h1>공지사항</h1>
                <div style={{ backgroundColor: 'gray', height: '1000px'}}>
                    <h2 style={{ color: 'white'}}>제목 : {Notice.title} </h2>
                    <div style={{ marginTop: '2rem' }}>
                        <text style={{ color: 'white' }}>{Notice.content}</text>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default withRouter(NoticeDetailPage)
