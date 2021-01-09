import React, { useEffect, useState } from 'react'
import { Tooltip, Icon, List, message } from 'antd'
import Axios from 'axios'
import { withRouter } from 'react-router-dom'
import Like from '../commons/Like'
import Comment from '../commons/Comment'
import moment from 'moment'

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
        <div style={{ display: 'flex', justifyContent:'center', alignContent: 'center', alignItems:'center', width: '100%', height: '100%', flexDirection: 'column'}}>
            {Prod &&
            <>
            <div style={{ display: 'flex', justifyContent:'center', width: '80%', height: '280px', alignContent: 'center', alignItems: 'center', textAlign: 'center', flexDirection: 'column'}}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <a href={`/artist/${Prod.artistId._id}`}>
                        <span style={{ display: 'inline-block', justifyContent: 'center', alignContent: 'center', width:'50px', height: '50px', borderRadius: '50%', backgroundColor:'black' }}>
                            <img style={{ maxWidth: '90%', maxHeight: '90%', display: 'block', margin: '1rem auto' , objectFit: 'contain' }} src={Prod.artistId.mainImagePath} alt="artistImage" />
                        </span>
                        <h3 style={{padding: 0, margin: 0}}> {Prod.artistId.name} </h3>
                    </a>
                </div>
                <h1 style={{fontWeight: 800, fontSize: '4vh', margin: '10px 0px'}}>{Prod.name}</h1>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {/* <span style={{ width:'25px', height: '25px', borderRadius: '50%', backgroundImage:'', marginRight: '0.5rem'}} /> */}
                    <h4> {Prod.userId.name} </h4>
                </div>
            </div>
            <div style={{ display: 'flex', height: '400px', width: '80%', alignItems:'center', backgroundColor: 'whitesmoke', borderRadius: '2rem'}}>
                <div style={{ display: 'flex', width: '50%', flexDirection: 'column' }}>
                    <img style={{ objectFit: 'contain', width: '300px', marginLeft: '10rem' }} src={`${Prod.preImagePath}`} alt="prodPreImage"/>
                </div>
                <div style={{ display: 'flex', width: '40%', flexDirection: 'column', alignItems: 'flex-end' }}>
                    <label>상품설명</label>
                    <text style={{ marginTop: '1rem', fontWeight: 200, fontSize: '24px', color: 'black', textAlign: 'right' }}> {Prod.content} </text>
                    <hr />
                    <hr />
                    <a href={Prod.link} style={{ fontSize: '20px'}}>
                        사러가기
                    </a>
                    <hr />
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
            <div style={{ display:'flex', marginTop: '5rem', flexDirection:'column' }}>
                <img src={`${Prod.mainImagePath}`} alt="prodImage"/>
            </div>
            </>
            }
            {/* {User && */}
            <div style={{ width: '100%', padding: '3rem 4rem' }}>
                <Comment refreshFunction={refreshFunction} commentLists={Comments} prodId={prodId} number={Comments.length}/>
            </div>
            {/* } */}
        </div>
    )
}

export default withRouter(ProdDetailPage)
