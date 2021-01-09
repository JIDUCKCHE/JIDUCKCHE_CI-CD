import React, { useState, useEffect } from 'react'
import { Menu } from 'antd'
import Axios from 'axios'
import { useSelector } from 'react-redux'
const SubMenu = Menu.SubMenu

function LeftMenu(props) {
    
    const user = useSelector(state => state.user)

        const MenuLogin = () => {
            return (
                <Menu mode={props.mode}>
                    <Menu.Item key="mail">
                        <a href="/notice" style={{ fontWeight: 'bold' }}>공지사항</a>
                    </Menu.Item>
                    {user.userData && user.userData.isAdmin ?
                    <SubMenu title={<span>업로드</span>} style={{ fontWeight: 'bold' }}>
                        <Menu.Item key="mail">
                            <a href="/upload">업로드</a>
                        </Menu.Item>
                        <Menu.Item key="mail">
                            <a href="/uploadEnt">엔터 업로드</a>
                        </Menu.Item>
                        <Menu.Item key="mail">
                            <a href="/uploadArtist">아티스트 업로드</a>
                        </Menu.Item>
                    </SubMenu>
                    :
                    <SubMenu title={<span>업로드</span>}>
                        <Menu.Item key="mail">
                            <a href="/upload">업로드</a>
                        </Menu.Item>
                    </SubMenu>
                    }
                </Menu>
            )
        }

        const MenuNotLogin = () => {
            return (
                <Menu mode={props.mode}>
                    <Menu.Item key="mail">
                        <a href="/notice" style={{ fontWeight: 'bold' }}>공지사항</a>
                    </Menu.Item>
                </Menu>
            )
        }


        if (user.userData && user.userData.isAuth) {
            return (
                <MenuLogin />
            )
        } else {
            return (
                <MenuNotLogin />
            )
        }
}

export default LeftMenu
