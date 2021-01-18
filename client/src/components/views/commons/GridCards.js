import React from 'react'
import { Col, Tooltip } from 'antd'
import Like from './Like'
import { CommentOutlined } from '@ant-design/icons'

function GridCards(props) {
    return (
        <Col lg={6} md={8} xs={12}>
            <div style={{ position: 'relative' }}>
                <a href={`/prod/${props.prodId}`}>
                    <img style={{ width: '100%', height: '100%' }} src={props.image} alt={props.prodName}/>
                </a>
            </div>
            {props.landing ?
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Like
                    prodId={props.prodId}
                    userId={props.userId}
                />
                <div>
                    <span key="comment">
                        <Tooltip title="comment">
                            <CommentOutlined />
                        </Tooltip>
                        <span style={{ paddingLeft: '8px', cursor: 'auto' }}> {props.comment} </span>
                    </span>
                </div>
            </div>
            :null}
        </Col>
    )
}

export default GridCards
