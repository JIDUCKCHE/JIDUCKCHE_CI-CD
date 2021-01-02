import React, { useState, useEffect } from 'react'
import { Menu } from 'antd'
import Axios from 'axios'
import { useSelector } from 'react-redux'
const SubMenu = Menu.SubMenu

function LeftMenu(props) {
    
    const user = useSelector(state => state.user)
    const userId = localStorage.getItem('userId')
    const [User, setUser] = useState(null)

        // useEffect(() => {
        //     if (userId){
        //     Axios.get(`/api/user/info/${userId}`)
        //         .then(response => {
        //             if(response.data.success) {
        //                 console.log(response.data.result)
        //                 setUser(response.data.result)
        //             } else {
        //                 alert('사용자 정보를 가져오는데 실패했습니다.')
        //             }
        //         })
        //     } else {
        //         setUser(null)
        //     }
        // }, [])


        const MenuLogin = () => {
            return (
                <Menu mode={props.mode}>
                    <Menu.Item key="mail">
                        <a href="/notice">Notice</a>
                    </Menu.Item>
                    {user.userData && user.userData.isAdmin ?
                    <SubMenu title={<span>Uploads</span>}>
                        <Menu.Item key="mail">
                            <a href="/upload">Upload</a>
                        </Menu.Item>
                        <Menu.Item key="mail">
                            <a href="/uploadEnt">EntUpload</a>
                        </Menu.Item>
                        <Menu.Item key="mail">
                            <a href="/uploadArtist">ArtistUpload</a>
                        </Menu.Item>
                    </SubMenu>
                    :
                    <SubMenu title={<span>Uploads</span>}>
                        <Menu.Item key="mail">
                            <a href="/upload">Upload</a>
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
                        <a href="/notice">Notice</a>
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
