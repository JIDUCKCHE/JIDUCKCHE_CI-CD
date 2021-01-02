import React, { useState } from 'react'
import { Comment, Avatar, Button, Input, message } from 'antd'
import Axios from 'axios'
import { useSelector } from 'react-redux';
import Like from './Like'

const { TextArea } = Input;


function SingleComment(props) {


    const user = useSelector(state => state.user)
    const userId = localStorage.getItem('userId')

    const [OpenReply, setOpenReply] = useState(false)
    const [OpenModify, setOpenModify] = useState(false)
    const [CommentValue, setCommentValue] = useState("")

    const onClickReplyOpen = () => {
        setOpenReply(!OpenReply)
    }

    const onClickModify = () => {
        setCommentValue(props.comment.content)
        setOpenModify(!OpenModify)
    }
    
    const onClickDelete = () => {
        Axios.delete(`/api/comment/${props.comment._id}`)
            .then(response => {
                if (response.data.success) {
                    message.success('댓글 삭제에 성공했습니다.')
                    props.refreshFunction()
                } else {
                    alert('댓글 삭제에 실패했습니다.')
                }
            })
    }

    const onHandleChange = (e) => {
        setCommentValue(e.currentTarget.value)
    }

    const onSubmit = (e) => {
        e.preventDefault();

        if(CommentValue !== "") {
            const variables = {
                content: CommentValue,
                userId: user.userData._id,
                prodId: props.prodId,
                responseTo: props.comment._id
            }
            Axios.post('/api/comment/', variables)
                .then(response => {
                    if(response.data.success) {
                        props.refreshFunction()
                        setCommentValue("")
                        setOpenReply(false)
                    } else {
                        alert('댓글을 저장하지 못했습니다.')
                    }
                })
        }
    }

    const onModifySubmit = (e) => {
        e.preventDefault();

        if(CommentValue !== "") {
            const variables = {
                commentId: props.comment._id,
                content: CommentValue
            }
            Axios.put('/api/comment/', variables)
                .then(response => {
                    if(response.data.success) {
                        props.refreshFunction(response.data.result)
                        setCommentValue("")
                        setOpenModify(false)
                    } else {
                        alert('댓글을 저장하지 못했습니다.')
                    }
                })
        }
    }

    const actions_owner = [
        <Like prodId={props.prodId} userId={localStorage.getItem('userId')} commentId={props.comment._id}/>
        ,<span onClick={onClickReplyOpen} key="comment-basic-reply-to" style={{margin: '0 0 0 10px'}}>Reply to</span>
        ,<span onClick={onClickModify} key="comment-modify" style={{margin: '0 0 0 10px'}}>modify</span>
        ,<span onClick={onClickDelete} key="comment-delete" style={{margin: '0 0 0 10px'}}>delete</span>
    ]

    const actions_general = [
        <Like prodId={props.prodId} userId={localStorage.getItem('userId')} commentId={props.comment._id}/>
        ,<span onClick={onClickReplyOpen} key="comment-basic-reply-to" style={{margin: '0 0 0 10px'}}>Reply to</span>
    ]

    return (
        <div>
            <Comment
                actions={props.comment.userId._id === userId && props.comment.deleted === false ? actions_owner : actions_general}
                author={props.comment.userId.name}
                avatar={<Avatar src={props.comment.userId.image} alt />}
                content={props.comment.deleted === true ? <p> (삭제된 댓글입니다.) </p>:<p> {props.comment.content} {props.comment.modified ? '(수정됨)':'' }</p>}
            />
            {OpenReply &&
                <form style={{ display: 'flex' }} onSubmit={onSubmit} >
                    <textarea
                        style={{ width: '100%', borderRadius: '5px' }}
                        onChange={onHandleChange}
                        value={CommentValue}
                        placeholder="코멘트를 작성해 주세요"
                    />
                    <br />
                    <button style={{ width: '20%', height: '52px' }} onClick={onSubmit} > Submit</button>
                </form>
            }
            {OpenModify &&
                <form style={{ display: 'flex' }} onSubmit={onModifySubmit} >
                    <textarea
                        style={{ width: '100%', borderRadius: '5px' }}
                        onChange={onHandleChange}
                        value={CommentValue}
                        placeholder="코멘트를 작성해 주세요"
                    />
                    <br />
                    <button style={{ width: '20%', height: '52px' }} onClick={onModifySubmit} > Submit</button>
                </form>
            }
        </div>
    )
}

export default SingleComment
