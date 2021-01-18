import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import Axios from 'axios'
import { Row, message } from 'antd'
import MainImage from './Sections/MainImage'
import GridCards from '../commons/GridCards'
// import Modal from '../commons/Modal'
import './LandingPage.css'

function LandingPage(props) {

    const user = localStorage.getItem('userId')
    const [BestProds, setBestProds] = useState([])
    const [MainProd, setMainProd] = useState([])
    const [Prods, setProds] = useState([])

    useEffect(() => {
        Axios.get('/api/prod/best/0')
            .then(response => {
                if (response.data.success) {
                    setBestProds(response.data.result)
                    setMainProd(response.data.result[0]._id)
                } else {
                    message.warning('인기 상품 정보를 가져오지 못했습니다.')
                }
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    useEffect(() => {
        Axios.get(`/api/prod/`,{ params: { startId: 0, endId: 0 } })
            .then(response => {
                if (response.data.success) {
                    setProds(response.data.result)
                } else {
                    message.warning('최신 상품 정보를 가져오지 못했습니다.')
                }
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <div className="main_container">
            {MainProd &&
                <MainImage
                    image={`${MainProd.preImagePath}`}
                    title={MainProd.name}
                    text={MainProd.content}
                    prodId={MainProd._id}
                />
            }
            <div className="prod_main_container">
                <div className="title_container">
                    <text className="title"> 인기있는 굿즈 </text>
                    <a className="more_button" href='/ranking'> 더보기 </a>
                </div>
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
            <div className="dividing_line"/>
            <div className="prod_main_container">
                <div className="title_container">
                    <text className="title"> 새로운 굿즈 </text>
                    <a className="more_button" href='/newProd'> 더보기 </a>
                </div>
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
            <div className="dividing_line"/>
        </div>
    )
}

export default withRouter(LandingPage)