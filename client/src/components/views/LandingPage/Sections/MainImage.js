import React from 'react'
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

function MainImage(props) {
    return (
        // <div style={{ width: '100%', height: '500px' }}>
        //     <CarouselProvider
        //         naturalSlideWidth={10}
        //         naturalSlideHeight={10}
        //         totalSlides={3}
        //         visibleSlides={3}
        //         infinite={true}
        //     >
        //         <Slider>
        //             <Slide index={0}>First Slide</Slide>
        //             <Slide index={1}>Second Slide</Slide>
        //             <Slide index={2}>Third Slide</Slide>
        //         </Slider>
        //         <ButtonBack>Back</ButtonBack>
        //         <ButtonNext>Next</ButtonNext>
        //     </CarouselProvider>
        // </div>
        <a href={`/prod/${props.prodId}`}>
            <div style={{ background: `linear-gradient(to bottom, rgba(0,0,0,0)
            39%,rgba(0,0,0,0)
            41%,rgba(0,0,0,0.65)
            100%),
            url('${props.image}'), #1c1c1c`,
                height: '500px',
                backgroundSize: 'contain',
                // backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                width: '100%',
                position: 'relative'
            }}>
                <div>
                    <div style={{ position: 'absolute', maxWidth: '500px', bottom: '2rem', marginLeft: '2rem' }}>
                        <h2 style={{ color: 'white' }}> {props.title} </h2>
                        <p style={{ color: 'white', fontSize: '1rem' }}>{props.text}</p>
                    </div>
                </div>
            </div>
        </a>
    )
}

export default MainImage
