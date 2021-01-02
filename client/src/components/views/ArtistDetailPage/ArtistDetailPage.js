import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import Axios from 'axios';
import GridCard from '../commons/GridCard';

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
                    alert('상품을 불러오는데 실패 했습니다.')
                }
            })
        Axios.get(`/api/artist/info/${artistId}`)
            .then(response => {
                if(response.data.success) {
                    setArtist(response.data.result)
                    console.log(response.data.result)
                } else {
                    alert('아티스트 정보를 가져오는데 실패했습니다.')
                }
            })
    }, [])

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ width: '100%', height: '450px', display: 'flex', flexDirection: 'column', justifyContent: 'center', backgroundColor: 'grey', justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
                <img style={{ maxHeight: '300px', maxWidth: '700px', marginBottom: '3rem' }} src={Artist.mainImagePath} alt="아티스트 이미지"/>
                <text style={{ position: 'absolute', marginTop: '10rem', fontSize: '30px', fontWeight: '250', color: 'white' }}>{Artist.name}</text>
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
