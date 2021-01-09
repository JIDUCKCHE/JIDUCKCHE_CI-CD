import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import Axios from 'axios'
import GridCard from '../commons/GridCard'
import { message } from 'antd'

function NewProdPage() {
    
    const [Prods, setProds] = useState([])
    const [Page, setPage] = useState(0)
    const [StartId, setStartId] = useState(0)
    const [EndId, setEndId] = useState(0)

    const infiniteScroll = () => {
        let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight)
        let scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop)
        let clientHeight = document.documentElement.clientHeight;
        
        if (scrollTop + clientHeight === scrollHeight) {
            setPage(Page+1)
        }
    }
    
    function maxFunc(n, o) {
        return n > o ? n : o
    }
    
    function minFunc(n, o) {
        return n < o ? n : o
    }

    useEffect(() => {
        Axios.get(`/api/prod/`, { params: { startId: StartId, endId: EndId }})
            .then(response => {
                if (response.data.success) {
                    setProds([...Prods,...response.data.result])
                    setStartId(StartId === 0 ? response.data.result[0]._id : maxFunc(Prods[0]._id, response.data.result[0]._id))
                    setEndId(EndId === 0 ? response.data.result[response.data.result.length - 1]._id : minFunc(Prods[Prods.length - 1]._id, response.data.result[response.data.result.length - 1]._id))
                } else {
                    message.warning('새로운 상품을 가져오는데 실패했습니다.')
                }
            })
            .catch(error => {
                console.log(error)
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
                <h2> 최신 굿즈들 </h2>
                <hr />
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

export default withRouter(NewProdPage)
