import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import NoticeGrid from './Sections/NoticeGrid'
import { withRouter } from 'react-router-dom'
import { message } from 'antd'

function NoticePage() {

    const userId = localStorage.getItem('userId')
    const [User, setUser] = useState(null)
    const [Notice, setNotice] = useState([])
    const [Page, setPage] = useState(0)

    useEffect(() => {
        Axios.get(`/api/notice/${Page}`)
            .then(response => {
                if(response.data.success) {
                    setNotice(response.data.result)
                } else {
                    message.warning('공지사항을 가져오는데 실패했습니다.')
                }
            })
            .catch(error => {
                console.log(error)
            })
        if (userId) {
            Axios.get(`/api/user/info/${userId}`)
                .then(response => {
                    if(response.data.success) {
                        setUser(response.data.result)
                    } else {
                        message.warning('유저 정보를 가져오는데 실패했습니다.')
                    }
                })
                .catch(error => {
                    console.log(error)
                })
            }
    }, [])

    return (
        <div style={{ width: '100%', justifyContent: 'center', textAlign: 'center' }}>
            <div style={{ width: '80%', height: '80%', display:'inline-block', marginTop: '2rem' }}>
                <h1>공지사항</h1>
                {User && User.isAdmin &&
                    <a href="/uploadNotice">글쓰기</a>
                }
                <div style={{ width: '100%', height: '50px', display: 'flex', flexDirection: 'row', justifyContent:'space-between' }}>
                    <div style={{ width: '10% '}}>
                        <h3>index</h3>
                    </div>
                    <div style={{ width: '70% ', textAlign: 'left'}}>
                        <text>title</text>
                    </div>
                    <div style={{ width: '20% '}}>
                        <text>writer</text>
                    </div>
                </div>
                <hr/>
                <div style={{ width: '100%', justifyItems: 'center', display: 'flex', flexDirection: 'column' }}>
                    {Notice && Notice.map((notice, index) => (
                        <NoticeGrid
                            notice={notice}
                            index={index+1}
                        />
                    ))}
                </div>
            </div>
            
        </div>
    )
}

export default withRouter(NoticePage)
