import React, { useEffect, useState } from 'react'
import { Tooltip, Icon, message } from 'antd'
import Axios from 'axios'

function Like(props) {
    let variable = { }
    if (props.prodId) { variable = { prodId: props.prodId, userId: props.userId } }
    if (props.noticeId) { variable = { noticeId: props.noticeId, userId: props.userId } }
    if (props.commentId) { variable.commentId = props.commentId }

    const [Likes, setLikes] = useState(0)
    const [LikeAction, setLikeAction] = useState(null)

    useEffect(() => {
        
        Axios.get('/api/like/', { params: variable })
            .then(response => {
                if(response.data.success) {
                    setLikes(response.data.result.length)
                    response.data.result.map(like => {
                        if(like.userId === variable.userId) {
                            setLikeAction('liked')
                        }
                    })
                } else {
                    alert('좋아요 정보를 가져오는데 실패했습니다.')
                }
            })
        
    }, [Likes])

    const onLike = () => {
        if(props.userId) {
            if(LikeAction === null) {
                Axios.post('/api/like/', variable)
                    .then(response => {
                        if(response.data.success) {
                            setLikes(Likes + 1)
                            setLikeAction('liked')
                        } else {
                            message.warning('좋아요 반영에 실패했습니다.')
                        }
                    })
                    .catch(error => {
                        console.log(error)
                    })
            } else {
                Axios.delete('/api/like/', {params: variable})
                    .then(response => {
                        if(response.data.success) {
                            setLikes(Likes - 1)
                            setLikeAction(null)
                        } else {
                            message.warning('좋아요 취소 반영에 실패했습니다.')
                        }
                    })
                    .catch(error => {
                        console.log(error)
                    })
            }
        }
    }

    return (
        <div>
            <span key="comment-basic-like">
                <Tooltip title="Like">
                    <Icon type="like"
                        theme={LikeAction === 'liked' ? "filled" : "outlined"}
                        onClick={onLike}
                    />
                </Tooltip>
            <span style={{ paddingLeft: '8px', cursor: 'auto' }}> {Likes} </span>
            </span>
        </div>
    )
}

export default Like
