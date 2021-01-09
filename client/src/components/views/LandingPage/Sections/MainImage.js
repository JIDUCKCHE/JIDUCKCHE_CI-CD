import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Axios from 'axios';
import { message } from 'antd';

function MainImage(props) {
    
    const [Banner, setBanner] = useState([])
    const [Page, setPage] = useState(0)

    useEffect(() => {
        Axios.get('/api/prod/best/0')
            .then(response => {
                if(response.data.success) {
                    setBanner(response.data.result)
                } else {
                    message.warning('배너 정보를 가져오지 못했습니다.')
                }
            })
            .catch(error => {
                console.log(error)
            })
    }, [])
    
    console.log(Banner)
    const settings = {
        beforeChange: (current, next) => setPage(next),
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplaySpeed: 3000,
        autoplay:true,
        arrows:true
      };
    return (
        <div style={{ width: '100%', height: '400px' }}>
            <Slider {...settings}>
                {Banner && Banner.map((banner, index) => (
                    <div key={index} style={{ width: '100%', height: '100%' }}>
                    <a href={`/prod/${banner._id._id}`}>
                        <div style={{ background: `linear-gradient(to bottom, rgba(0,0,0,0)
                        30%,rgba(0,0,0,0)
                        50%,rgba(0,0,0,0.65)
                        100%),
                        url('${banner._id.preImagePath}'), #1c1c1c`,
                            height: '400px',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center',
                            width: '100%',
                            position: 'relative',
                            zIndex: -1
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'center', width: '100%', height: '100%', position: 'absolute', zIndex: 1, backdropFilter: 'blur(15px)' }}>
                                <img src={banner._id.preImagePath} style={{ maxWidth: '100%', height: '100%' }} />
                            </div>
                            <div style={{ position: 'relative', width: '30%', height: '100px', top: '250px', left: '50px', zIndex: 1 }}>
                                <h2 style={{ color: 'white', fontSize: '30px', fontWeight: '500' }}> {banner._id.name} </h2>
                                <p style={{ color: 'white', fontSize: '15px' }}>{banner._id.content}</p>
                            </div>
                            <div style={{ width: '20%', height: '2px', backgroundColor: 'grey', marginTop: '0.3rem', position: 'absolute', top: '360px', left: '50px', zIndex: 1 }}>
                                <div style={{ width : `${100*((Page+1)/Banner.length)}%`, backgroundColor: 'white', height: '100%', position: 'relative' }} />
                            </div>
                        </div>
                    </a>
                    </div>
                ))
                }
            </Slider>
        </div>
    )
}

export default MainImage
