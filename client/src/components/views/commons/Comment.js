import React, { useState } from 'react'
import Axios from 'axios'
import { useSelector } from 'react-redux'
import SingleComment from './SingleComment'
import ReplyComment from './ReplyComment'

function Comment(props) {

    const user = useSelector(state => state.user)
    const prodId = props.prodId
    const [commentValue, setcommentValue] = useState("")

    const handleClick = (e) => {
        setcommentValue(e.currentTarget.value)
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const variables = {
            content: commentValue,
            userId: user.userData._id,
            prodId: prodId
        }
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
                        <SingleComment refreshFunction={props.refreshFunction} comment={comment} prodId={prodId}/>
                        <ReplyComment refreshFunction={props.refreshFunction} parentCommentId={comment._id} prodId={prodId} comment={props.commentLists}/>
                    </React.Fragment>
                )
            ))
            }
            {/* Comment Lists */}
            

            {/* Root Comment Form */}

            <form style={{ display: 'flex' }} onSubmit={onSubmit} >
                <textarea
                    style={{ width: '80%', borderRadius: '5px', margin: 'auto' }}
                    onChange={handleClick}
                    value={commentValue}
                    placeholder="코멘트를 작성해 주세요"
                />
                <br />
                <button style={{ width: '5%', height: '50px', margin: 'auto' }} onClick={onSubmit} > Submit</button>
            </form>
        </div>
    )
}

export default Comment
