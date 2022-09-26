import React from 'react'
import { Carousel } from 'antd';
import Image from 'next/image';
function ImageSlider(props) {
    return (
        <div>

            <Carousel autoplay>
                {props.images.map((image, index) => (
                    <div key={index}>
                        <Image alt="" style={{ width: '100%', maxHeight: '150px' }}
                            src={`http://localhost:3000/${image}`}   />
                    </div>
                ))}
            </Carousel>
        </div>
    )
}

export default ImageSlider
