import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import Axios from 'axios'
import { Row } from 'antd'
import MainImage from './Sections/MainImage'
import GridCards from '../commons/GridCards'
// import Modal from '../commons/Modal'

function LandingPage(props) {

    const user = localStorage.getItem('userId')
    const [BestProds, setBestProds] = useState([])
    const [MainProd, setMainProd] = useState([])
    const [Prods, setProds] = useState([])

    useEffect(() => {
        Axios.get('/api/prod/best/0')
            .then(response => {
                console.log(response.data)
                setBestProds(response.data.result)
                setMainProd(response.data.result[0]._id)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    useEffect(() => {
        Axios.get(`/api/prod/`,{ params: { startId: 0, endId: 0 } })
            .then(response => {
                console.log(response.data)
                setProds(response.data.result)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <div style={{ width: '100%', margin: '0' }}>
            {MainProd &&
                <MainImage
                    image={`${MainProd.preImagePath}`}
                    title={MainProd.name}
                    text={MainProd.content}
                    prodId={MainProd._id}
                />
            }
            {/* 하단 전체 */}
            <div style={{ width: '100%', height: '100%', margin: '1rem auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                {/* 내부 박스 1 */}
                <div style={{ display: 'flex', backgroundColor: '#ffdf80', width: '90%', borderRadius: '1rem', alignItems: 'center', flexDirection: 'column' }}>
                    {/* 내부 박스 아이템 */}
                    <div style={{ display: 'inline-block', width: '90%', marginBottom: '2rem', marginTop: '1rem', alignItems: 'center' }} >
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <text style={{ color: 'grey', fontSize: '18px', fontWeight: '500' }}> 인기있는 굿즈 </text>
                            <a style={{ color: 'grey' }} href='/ranking'> 더보기 </a>
                        </div>
                        <hr style={{ color: 'grey',  }} />
                        <Row gutter={[16, 16]} type="flex" style={{ alignItems: 'center' }}>
                            {BestProds && BestProds.map((prod, index) => (
                                <React.Fragment key={index}>
                                    <GridCards
                                        landing
                                        image={`${prod._id.preImagePath}`}
                                        prodId={prod._id._id}
                                        prodName={prod._id.name}
                                        userId={user}
                                        comment={prod.comment.length}
                                    />
                                </React.Fragment>
                            ))}
                        </Row>
                    </div>
                </div>
                <hr />
                <div style={{ display: 'flex', backgroundColor: 'whitesmoke', width: '90%', borderRadius: '1rem', alignItems: 'center', flexDirection: 'column' }}>
                    {/* 내부 박스 아이템 */}
                    <div style={{ display: 'inline-block', width: '90%', marginBottom: '2rem', marginTop: '1rem', alignItems: 'center' }} >
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <text style={{ color: 'grey', fontSize: '18px', fontWeight: '500' }}> 새로운 굿즈 </text>
                            <a style={{ color: 'grey' }} href='/newProd'> 더보기 </a>
                        </div>
                        <hr style={{ color: 'grey',  }} />
                        <Row gutter={[16, 16]} type="flex" style={{ alignItems: 'center' }}>
                            {Prods && Prods.map((prod, index) => (
                                <React.Fragment key={index}>
                                    <GridCards
                                        landing
                                        image={`${prod.preImagePath}`}
                                        prodId={prod._id}
                                        prodName={prod.name}
                                        userId={user}
                                        comment={prod.comment.length}
                                    />
                                </React.Fragment>
                            ))}
                        </Row>
                    </div>
                </div>
                {/* <div style={{ display: 'flex', backgroundColor: '#ffdf80', width: '90%', borderRadius: '1rem', alignItems: 'center', flexDirection: 'column' }}>
                    <div style={{ display: 'inline-block', width: '90%', marginBottom: '2rem', marginTop: '1rem', alignItems: 'center' }} >

                    <div style={{ display: 'inline-block', width: '90%', marginBottom: '2rem', marginTop: '1rem', alignItems: 'center' }} >
                        <h2> 새로운 굿즈 </h2>
                        <a href='/newProd'> 더보기 </a>
                    </div>
                    <hr />
                    <Row gutter={[16, 16]} type="flex" style={{ alignItems: 'center' }}>
                        {Prods && Prods.map((prod, index) => (
                            <React.Fragment key={index}>
                                <GridCards
                                    landing
                                    image={`${prod.preImagePath}`}
                                    prodId={prod._id}
                                    prodName={prod.name}
                                    userId={user}
                                    comment={prod.comment.length}
                                />
                            </React.Fragment>
                        ))}
                    </Row>
                </div>
                </div> */}
            </div>
        </div>
        
    )
}

export default withRouter(LandingPage)
