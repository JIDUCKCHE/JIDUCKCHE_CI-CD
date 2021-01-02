import React from 'react'
import { Tooltip } from 'antd'
import Like from './Like'
import { CommentOutlined } from '@ant-design/icons'
import { withRouter } from 'react-router-dom'

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
        <div key={index} style={{ width: '100%', height: '300px', display: 'flex', justifyContent: 'center',marginTop: '0.5rem', alignItems:'center' }}>
            <div style={{ width: '70%', height: '300px', display: 'flex', justifyContent: 'center',marginTop: '1rem', alignItems:'center', backgroundColor: 'whitesmoke', borderRadius: '1rem' }} onClick={onClickHandler}>
                <div style={{width: '85%', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                {rank !== null &&
                    <div style={{ marginRight: '2rem' }}>
                        <h2>{rank}</h2>
                    </div>
                }
                    <div style={{ width: '270px', height: '270px', margin: 0 }}>
                        <img style={{ height: '270px', objectFit: 'cover' }} src={`${prod.preImagePath}`} alt={prod.name}/>
                    </div>
                    <div style={{ display: 'flex', width: '700px', height: '90%', marginLeft: '48px', flexDirection:'column', justifyContent: 'center', textAlign: 'right', alignItems:'flex-end'}}>
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <h1>{prod.name}</h1>
                            <text style={{ color: 'black'}}>{prod.content}</text>
                            <text style={{ color: 'grey'}}>{user.name}</text>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '1rem' }}>
                            <Like 
                                prodId={prod._id}
                                userId={user._id}
                            />
                            <span key="comment" style={{ marginLeft: '1rem' }}>
                                <Tooltip title="comment">
                                    <CommentOutlined />
                                </Tooltip>
                                <span style={{ paddingLeft: '8px', cursor: 'auto' }}> {props.comment} </span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(GridCard)
