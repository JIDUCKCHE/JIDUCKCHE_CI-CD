import React, { useEffect, useState } from 'react'
import SingleComment from './SingleComment'

function ReplyComment(props) {

    const [ChildCommentNumber, setChildCommentNumber] = useState(0)
    const [OpenReplyComments, setOpenReplyComments] = useState(false)

    useEffect(() => {
        
        let commentNumber = 0;
        props.comment.map((comment) => {
            if(comment.responseTo === props.parentCommentId) {
                commentNumber++
            }
        })
        setChildCommentNumber(commentNumber)
    }, [props.comment])

    let renderReplyComment = (parentCommentId) => (
            props.comment.map((comment, index) => (
            <React.Fragment>
                {
                    comment.responseTo === parentCommentId &&
                    <div style={{ width: '80%', marginLeft: '40px' }}>
                        <SingleComment refreshFunction={props.refreshFunction} comment={comment} prodId={props.prodId} noticeId={props.noticeId} />
                        <ReplyComment refreshFunction={props.refreshFunction} parentCommentId={comment._id} prodId={props.prodId} noticeId={props.noticeId} comment={props.comment}/>
                    </div>
                }

            </React.Fragment>
        )))

    const onHandleChange = () => {
        setOpenReplyComments(!OpenReplyComments)
    }


    return (
        <div>
            
            {ChildCommentNumber > 0 && 
                <p style={{ fontSize: '12px', margin: 0, color: 'rgba(0,0,0,0.2)', marginLeft: '10px'}} onClick={onHandleChange}>
                    View {ChildCommentNumber} more comment(s)
                </p>
            }
            {OpenReplyComments &&
                renderReplyComment(props.parentCommentId)
            }
        </div>
    )
}

export default ReplyComment
