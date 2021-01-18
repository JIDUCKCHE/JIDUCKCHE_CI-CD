import React, { useEffect, useState } from 'react'
import { Tooltip, Icon, List, message } from 'antd'
import Axios from 'axios'
import { withRouter } from 'react-router-dom'
import Like from '../commons/Like'
import Comment from '../commons/Comment'
import moment from 'moment'
import './ProdDetailPage.css'

function ProdDetailPage(props) {

    const user = localStorage.getItem('userId')
    const [Prod, setProd] = useState(null)
    const [Comments, setComments] = useState([])
    const [MainImage, setMainImage] = useState([])
    const [PreImage, setPreImage] = useState([])
    const [DDay, setDDay] = useState(0);
    const [User, setUser] = useState(null);
    const today = moment().format('YYYY-MM-DD')

    const prodId = props.match.params.prodId
    const variable = {
        prodId: prodId,
        originName: MainImage,
        preName: PreImage
    }
    console.log(variable)

    useEffect(() => {
        Axios.get(`/api/prod/info/${prodId}`)
            .then(response => {
                if(response.data.success) {
                    setProd(response.data.result)
                    setMainImage(response.data.result.mainImage)
                    setPreImage(response.data.result.preImage)
                    setDDay(moment(response.data.result.endDate).diff(today, 'days'))
                } else {
                    message.warning('게시글 정보를 가져오는데 실패했습니다.')
                }
            })
            .catch(error => {
                console.log(error)
            })
            if (user) {
                Axios.get(`/api/user/info/${user}`)
                    .then(response => {
                        if(response.data.success) {
                            setUser(response.data.result)
                        } else {
                            message.warning('유저 정보를 가져오는데 실패했습니다.')
                        }
                    })
                    .catch(error => {
                        console.log(error)
                    })
                }
        refreshFunction()
    }, [])

    const refreshFunction = () => {
        Axios.get('/api/comment/', { params: variable })
            .then(response => {
                if(response.data.success) {
                    setComments(response.data.result)
                } else {
                    message.warning('코멘트 정보를 가져오는 것을 실패했습니다.')
                }
            })
            .catch(error => {
                console.log(error)
            })
    }

    const onDeleteClick = () => {
        if((user === Prod.userId._id) || (User.isAdmin)) {
            Axios.delete('/api/prod', {params: variable})
                .then(response => {
                    if(response.data.success) {
                        props.history.push('/')
                    } else {
                        message.warning('상품 삭제에 실패했습니다.')
                    }
                })
                .catch(error => {
                    console.log(error)
                })
            } else {
                message.error('해당 상품 작성자만 삭제할 수 있습니다.')
            }
        }

    const onModifyClick = () => {
        props.history.push(`/modify/${prodId}`)
    }

    

    return (
        <div className="prod_detail_main_container">
            {Prod &&
            <>
            <div className="prod_detail_title_container">
                <div className="prod_detail_title_artist">
                    <a href={`/artist/${Prod.artistId._id}`}>
                        <div className="prod_detail_title_artist_img">
                            <span>
                                <img src={Prod.artistId.mainImagePath} alt="artistImage"/>
                            </span>
                        </div>
                        <div>
                            <text> {Prod.artistId.name} </text>
                        </div>
                    </a>
                </div>
                <div className="prod_detail_title_title">
                    <text>{Prod.name}</text>
                </div>
                <div className="prod_detail_title_user">
                    {/* 유저 이미지 추가 예정 */}
                    <text> {Prod.userId.name} </text>
                </div>
            </div>
            <div className="prod_detail_banner_container">
                <div className="prod_detail_banner_img">
                    <img src={`${Prod.preImagePath}`} alt="prodPreImage"/>
                </div>
                <div className="prod_detail_banner_title">
                    <label>상품설명</label>
                    <text> {Prod.content} </text>
                    <a href={Prod.link}>사러가기</a>
                    {DDay >= 0 ?
                        <h2>입금 D-DAY {DDay}일</h2>
                        :
                        <h2>판매가 종료된 상품입니다.</h2>
                    }
                    <div>
                        <List.Item
                            actions={[ <Like prod prodId={Prod._id} userId={user}/>]}/>
                    </div>
                    {((user === Prod.userId._id) || (User && User.isAdmin)) && (
                        <div>
                            <button style={{ marginRight: '1rem' }} onClick={onModifyClick}> 수정하기</button>
                            <button onClick={onDeleteClick}>지우기</button>
                        </div>
                        )}
                </div>
            </div>
            <div className="prod_detail_main_image">
                <img src={`${Prod.mainImagePath}`} alt="prodImage"/>
            </div>
            </>
            }
            {/* {User && */}
            <div className="prod_detail_comment">
                <Comment refreshFunction={refreshFunction} commentLists={Comments} prodId={prodId} number={Comments.length}/>
            </div>
            {/* } */}
        </div>
    )
}

export default withRouter(ProdDetailPage)
