import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import GridCard from '../commons/GridCard'
import { withRouter } from 'react-router-dom'

function RankingPage() {
    
    const [Prods, setProds] = useState([])
    const [Page, setPage] = useState(0)
    
    const infiniteScroll = () => {
        let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight)
        let scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop)
        let clientHeight = document.documentElement.clientHeight;
        
        if (scrollTop + clientHeight === scrollHeight) {
            setPage(Page+1)
        }
    }

    useEffect(() => {
        Axios.get(`/api/prod/best/${Page}`)
            .then(response => {
                setProds(response.data.result)
            })
    }, [Page])

    useEffect(() => {
        window.addEventListener('scroll', infiniteScroll)
        return () => {
            window.removeEventListener('scroll', infiniteScroll)
        }
    }, [])
    
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ width: '85%', margin: '1rem auto' }}>
                <h2> 인기 굿즈 순위 </h2>
                <hr />
            </div>
            {Prods && Prods.map((prod, index) => (
                <GridCard
                    rank={index}
                    prod={prod._id}
                    index={index}
                    user={prod._id.userId}
                    comment={prod.comment.length}
                 />
            ))}
        </div>
    )
}

export default withRouter(RankingPage)
