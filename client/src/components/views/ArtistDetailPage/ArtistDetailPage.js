import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import Axios from 'axios';
import GridCard from '../commons/GridCard';
import { message } from 'antd';
import './ArtistDetailPage.css'

function ArtistDetailPage(props) {

    const [Prods, setProds] = useState([]);
    const [Artist, setArtist] = useState("");
    const artistId = props.match.params.artistId

    useEffect(() => {
        Axios.get(`/api/prod/artist/${artistId}`)
            .then(response => {
                if(response.data.success) {
                    setProds(response.data.result);
                } else {
                    message.warning('상품을 불러오는데 실패 했습니다.')
                }
            })
            .catch(error => {
                console.log(error)
            })
        Axios.get(`/api/artist/info/${artistId}`)
            .then(response => {
                if(response.data.success) {
                    setArtist(response.data.result)
                    console.log(response.data.result)
                } else {
                    message.warning('아티스트 정보를 가져오는데 실패했습니다.')
                }
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    return (
        <div className="artist_detail_main_container">
            <div className="artist_detail_logo">
                <img src={Artist.mainImagePath} alt="아티스트 이미지"/>
                <text>{Artist.name}</text>
            </div>
            {Prods && Prods.map((prod, index) => (
                <GridCard
                    prod={prod}
                    index={index}
                    user={prod.userId}
                    comment={prod.comment.length}
                 />
            ))}
        </div>
    )
}

export default withRouter(ArtistDetailPage)
