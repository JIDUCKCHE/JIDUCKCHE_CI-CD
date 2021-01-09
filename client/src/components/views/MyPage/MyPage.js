import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import GridCards from '../commons/GridCards';
import { Row, message } from 'antd';
import { withRouter } from 'react-router-dom';

function MyPage() {

    const [LikeProds, setLikeProds] = useState([])
    const [MyProds, setMyProds] = useState([])

    const user = localStorage.getItem('userId')

    useEffect(() => {
        Axios.get(`/api/prod/myLike/${user}`)
            .then(response => {
                if (response.data.success) {
                    setLikeProds(response.data.result)
                } else {
                    message.warning('좋아요 목록을 가져오는데 실패했습니다.')
                }
            })
            .catch(error => {
                console.log(error)
            })
        
        Axios.get(`/api/prod/my/${user}`)
            .then(response => {
                if (response.data.success) {
                    setMyProds(response.data.result)
                } else {
                    message.warning('나의 게시물을 가져오는데 실패했습니다.')
                }
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    return (
        <div style={{ width: '100%', margin: '0' }}>
            <div style={{ width: '85%', margin: '1rem auto' }}>
                <h2> 내가 좋아하는 굿즈 </h2>
                <hr />
                <Row gutter = {[16, 16]} type="flex" style={{ alignItems: 'center'}} >
                    {LikeProds && LikeProds.map((likeProd, index) => (
                            <React.Fragment key={index}>
                                <GridCards
                                    landing
                                    userId={user}
                                    image={`${likeProd.prodId.preImagePath}`}
                                    prodId={likeProd.prodId._id}
                                    prodName={likeProd.prodId.name}
                                    comment={likeProd.comment.length}
                                /> 
                            </React.Fragment>
                    ))}
                </Row>
            </div>
            <div style={{ width: '85%', margin: '1rem auto' }}>
                <h2> 내가 올린 굿즈 </h2>
                <hr />
                <Row gutter = {[16, 16]} type="flex" style={{ alignItems: 'center'}} >
                    {
                        MyProds && MyProds.map((myProd, index) => (
                            <React.Fragment key={index}>
                                <GridCards
                                    landing
                                    userId={user}
                                    image={`${myProd.preImagePath}`}
                                    prodId={myProd._id}
                                    prodName={myProd.name}
                                    comment={myProd.comment.length}
                                />
                            </React.Fragment>
                        ))}
                </Row>
            </div>
        </div>
    )
}

export default withRouter(MyPage)
