import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { withRouter } from 'react-router-dom'
import { message } from 'antd'
import { useSelector } from 'react-redux'
import Comment from '../commons/Comment'

function NoticeDetailPage(props) {

    const user = useSelector(state => state.user)
    const noticeId = props.match.params.noticeId
    const [Notice, setNotice] = useState([])
    const [Comments, setComments] = useState([])


    useEffect(() => {
        Axios.get(`/api/notice/info/${noticeId}`)
            .then(response => {
                if(response.data.success) {
                    setNotice(response.data.result)
                } else {
                    message.warning('공지사항 정보를 가져오는데 실패했습니다.')
                }
            })
            .catch(error => {
                console.log(error)
            })
            refreshFunction()
    }, [])

    const onModifyClick = (e) => {
        e.preventDefault()
        props.history.push(`/notice/modify/${noticeId}`)
    }

    const variable = {
        noticeId: noticeId
    }

    const refreshFunction = () => {
        Axios.get('/api/comment', { params: variable })
            .then(response => {
                if(response.data.success) {
                    setComments(response.data.result)
                } else {
                    message.warning('코멘트 정보를 가져오는 것을 실패했습니다.')
                }
            })
            .catch(error => {
                console.log(error)
            })
    }

    const onDeleteClick = (e) => {
        e.preventDefault();
        Axios.delete(`/api/notice/${noticeId}`)
            .then(response => {
                if(response.data.success) {
                    message.success('삭제에 성공했습니다.')
                    props.history.push('/')
                } else {
                    message.error('삭제에 실패했습니다.')
                }
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', marginTop: '2rem', textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}>
                <h1>공지사항</h1>
                <div style={{ width: '80%', borderRadius: '1rem', backgroundColor: 'gray', height: '1000px', display: 'flex', justifyContent: 'start', flexDirection: 'column', alignItems:'center' }}>
                    <text style={{ fontSize: '40px', fontWeight: '1000', color: 'white', marginTop: '1rem' }}> {Notice.title} </text>
                    <div style={{ marginTop: '3rem', width: '80%', textAlign: 'left' }}>
                        <text style={{ whiteSpace: 'pre-line', color: 'white', fontSize: '18px', fontWeight: '500' }}>{Notice.content}</text>
                    </div>

                    {user && user.userData.isAdmin &&
                    <div>
                        <button onClick={onModifyClick}>수정하기</button>
                        <button onClick={onDeleteClick}>삭제하기</button>
                    </div>
                    }
                </div>
                <div style={{ width: '100%', padding: '3rem 4rem', textAlign: 'left' }}>
                    <Comment refreshFunction={refreshFunction} commentLists={Comments} noticeId={noticeId} number={Comments.length}/>
                </div>
            </div>
            
        </div>
    )
}

export default withRouter(NoticeDetailPage)
