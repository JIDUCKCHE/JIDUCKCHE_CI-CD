import React from 'react'
import '../NoticePage.css'

function NoticeGrid(props) {
    console.log(props)
    return (
        <div>
            <div className="notice_grid_main_container">
                <div className="notice_grid_index">
                    <text>{props.index}</text>
                </div>
                <a href={`/notice/${props.notice._id}`} className="notice_grid_title">
                    <div className="notice_grid_title_sub">
                        <text>{props.notice.title}</text>
                    </div>
                </a>
                <div className="notice_grid_user">
                    <text>{props.notice.userId.name}</text>
                </div>
            </div>
            <div className="notice_grid_line"/>
        </div>
        )
}

export default NoticeGrid
