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
                <div style={{ backgroundColor: 'gray', height: '1000px', display: 'flex', justifyContent: 'start', flexDirection: 'column', alignItems:'center' }}>
                    <text style={{ fontSize: '40px', fontWeight: '1000', color: 'white', marginTop: '1rem' }}> {Notice.title} </text>
                    <div style={{ marginTop: '2rem', width: '70%' }}>
                        <text style={{ whiteSpace: 'pre-line', color: 'white', fontSize: '18px', fontWeight: '500' }}>{Notice.content}</text>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default withRouter(NoticeDetailPage)
