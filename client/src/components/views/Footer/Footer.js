import React from 'react'
import './Footer.css'

function Footer() {
    return (
        <footer className="footer">
            <div className="footer_main_container">
                <div className="first_row">
                    <p>대표자 | 김륜영</p>
                    <a href="/policy">이용약관</a>
                    <p>고객센터(이메일) | jiduckche.com@gmail.com</p>
                    <p>찾아오시는 길 | 서울특별시 강남구 개포로 416 개포디지털혁신파크 새롬관</p>
                    <p>후원 | 42Seoul</p>
                </div>
                <div className="second_row">
                    <p>Copyright ⓒ 2020 - 2021 jiduckche. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
