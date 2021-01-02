import React from 'react'

function Footer() {
    return (
        <footer style={{ marginTop: '2rem' }}>
            <div style={{ height: '200px', backgroundColor: 'whitesmoke' }}>
                <div style={{display: 'flex', justifyContent:'center', flexDirection: 'row'}}>
                    <p style={{marginTop: '15px', marginRight: '20px' }}>대표자 | 김륜영</p>
                    <a style={{marginTop: '15px', marginRight: '20px' }} href="/policy">이용약관</a>
                    <p style={{marginTop: '15px' }}>고객센터(이메일) | jiduckche.com@gmail.com</p>
                </div>
                <div style={{display: 'flex', justifyContent:'center', flexDirection: 'row'}}>
                    <p style={{ marginRight: '20px' }}>찾아오시는 길 | 서울특별시 강남구 개포로 416 개포디지털혁신파크 새롬관</p>
                    <p style={{}}>후원 | 42Seoul</p>
                </div>
                <div style={{display: 'flex', justifyContent:'center', flexDirection: 'row'}}>
                    <p>Copyright ⓒ 2020 - 2021 jiduckche. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
