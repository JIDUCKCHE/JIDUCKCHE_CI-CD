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
    
    const settings = {
        beforeChange: (current, next) => setPage(next),
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplaySpeed: 3000,
        autoplay:true,
        arrows:false
    };

    return (
        <div className="main_image">
            <Slider {...settings}>
            {Banner && Banner.map((banner, index) => (
                <div key={index} className="main_image_container">
                <a href={`/prod/${banner._id._id}`}>
                    <div className="main_image_background">
                        <div className="main_image_bg_image">
                            <img src={banner._id.preImagePath}/>
                        </div>
                        <div className="main_image_main_image">
                            <img src={banner._id.preImagePath}/>
                        </div>
                        <div className="main_image_title">
                            <text> {banner._id.name} </text>
                            <p>{banner._id.content}</p>
                        </div>
                        <div className="main_image_bar">
                            <div style={{ width : `${100*((Page+1)/Banner.length)}%`}} />
                        </div>
                    </div>
                </a>
                </div>
            ))}
            </Slider>
        </div>
    )
}

export default MainImage
