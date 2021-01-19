import React from 'react'
import { Tooltip } from 'antd'
import Like from './Like'
import { CommentOutlined } from '@ant-design/icons'
import { withRouter } from 'react-router-dom'
import './common.css'

function GridCard(props) {
    const prod = props.prod
    const index = props.index
    const user = props.user
    let rank = null
    if (props.rank != null) {
        rank = props.rank == 0 ? 1 : props.rank+1
    }
    const onClickHandler = (e) => {
        e.preventDefault();
        props.history.push(`/prod/${prod._id}`)
    }

    return (
        <div key={index} className="grid_card_main_container">
            <div className="grid_card_background" onClick={onClickHandler}>
                {rank !== null &&
                <div className="grid_card_ranking">
                    <span>
                        <text>{rank}</text>
                    </span>
                </div>
                }
                <div className="grid_card_sub_container">
                    <div className="grid_card_img">
                        <img src={`${prod.preImagePath}`} alt={prod.name}/>
                    </div>
                    <div className="grid_card_title">
                        <div className="grid_card_title_text">
                            <h1>{prod.name}</h1>
                            <text id="black">{prod.content}</text>
                            <text id="grey">{user.name}</text>
                        </div>
                        <div className="grid_card_title_action">
                            <Like 
                                prodId={prod._id}
                                userId={user._id}
                            />
                            <span key="comment" id="comment">
                                <Tooltip title="comment">
                                    <CommentOutlined />
                                </Tooltip>
                                <span id="comment_number"> {props.comment} </span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(GridCard)
