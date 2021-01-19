import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { withRouter } from 'react-router-dom'
import { message } from 'antd'
import { useSelector } from 'react-redux'
import Comment from '../commons/Comment'
import './NoticeDetailPage.css'

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
        <div className="notice_detail_main_container">
            <h1>공지사항</h1>
            <div className="notice_detail_background">
                <text id="title"> {Notice.title} </text>
                <div className="notice_detail_content">
                    <text>{Notice.content}</text>
                </div>
                {user && user.userData.isAdmin &&
                <div>
                    <button onClick={onModifyClick}>수정하기</button>
                    <button onClick={onDeleteClick}>삭제하기</button>
                </div>
                }
            </div>
            <div className="notice_detail_comment">
                <Comment refreshFunction={refreshFunction} commentLists={Comments} noticeId={noticeId} number={Comments.length}/>
            </div>
        </div>
    )
}

export default withRouter(NoticeDetailPage)
