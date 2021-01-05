import React from 'react'

function NoticeGrid(props) {
    console.log(props)
    return (
        <div style={{ display: 'inline-block', width: '100%' }}>
                <div style={{ width: '100%', height: '50px', display: 'flex', flexDirection: 'row', justifyContent:'space-between', alignItems:'center' }}>
                    <div style={{ width: '10% '}}>
                        <text>{props.index}</text>
                    </div>
                    <a href={`/notice/${props.notice._id}`}>
                        <div style={{ width: '100% ', textAlign: 'left'}}>
                            <text>{props.notice.title}</text>
                        </div>
                    </a>
                    <div style={{ width: '20% '}}>
                        <text>{props.notice.userId.name}</text>
                    </div>
                </div>
            <hr/>
        </div>
        )
}

export default NoticeGrid
