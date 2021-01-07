import React, { useState } from 'react'
import { Input, Button } from 'antd'
import Axios from 'axios'
import { useSelector } from 'react-redux'
import SingleComment from './SingleComment'
import ReplyComment from './ReplyComment'

const { TextArea } = Input;


function Comment(props) {

    const user = useSelector(state => state.user)
    const prodId = props.prodId
    const noticeId = props.noticeId
    const [commentValue, setcommentValue] = useState("")

    const handleClick = (e) => {
        setcommentValue(e.currentTarget.value)
    }

    const onSubmit = (e) => {
        e.preventDefault();

        let variables = {
            content: commentValue,
            userId: user.userData._id,
        }
        if (prodId) { variables.prodId = prodId }
        if (noticeId) { variables.noticeId = noticeId }

        Axios.post('/api/comment/', variables)
            .then(response => {
                if(response.data.success) {
                    props.refreshFunction()
                    setcommentValue("")
                } else {
                    alert('댓글을 저장하지 못했습니다.')
                }
            })
    }
    return (
        <div>
            <br />
            <div style={{ display: 'flex' }}>
                <p style={{margin: '0 10px 0 0'}}>Replies</p>
                <p >{props.number}</p>
            </div>
            <hr />

            {props.commentLists && props.commentLists.map((comment, index) => (
                (!comment.responseTo &&
                    <React.Fragment>
                        <SingleComment refreshFunction={props.refreshFunction} comment={comment} prodId={prodId} noticeId={noticeId} />
                        <ReplyComment refreshFunction={props.refreshFunction} parentCommentId={comment._id} prodId={prodId} noticeId={noticeId} comment={props.commentLists}/>
                    </React.Fragment>
                )
            ))
            }
            {/* Comment Lists */}
            

            {/* Root Comment Form */}

            {user && user.userData.isAuth &&
            <form style={{ display: 'flex' }} onSubmit={onSubmit} >
                <TextArea  wrap="hard" col="50"
                    style={{ width: '80%', borderRadius: '5px', margin: 'auto' }}
                    onChange={handleClick}
                    value={commentValue}
                    placeholder="코멘트를 작성해 주세요"
                />
                <br />
                <Button style={{ width: '5%', height: '50px', margin: 'auto' }} onClick={onSubmit} > Submit</Button>
            </form>
            }
        </div>
    )
}

export default Comment
