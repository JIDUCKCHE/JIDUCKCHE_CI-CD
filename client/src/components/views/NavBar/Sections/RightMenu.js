import React, { useState, useEffect } from 'react'
import { Menu } from 'antd'
import { useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Axios from 'axios'

const { SubMenu } = Menu;

function RightMenu(props) {
    const user = useSelector(state => state.user)

    const [Artists, setArtists] = useState([])
    const [Ents, setEnts] = useState([])

    useEffect(() => {
        Axios.get('/api/ent/')
            .then(response => {
                if(response.data.success) {
                    setEnts(response.data.result)
                } else {
                    alert('엔터 정보를 가져오는데 실패했습니다.')
                }
            })

        Axios.get('/api/artist/')
            .then(response => {
                if(response.data.success) {
                    setArtists(response.data.result)
                } else {
                    alert('아티스트 정보를 가져오는데 실패했습니다.')
                }
            })
    }, [])


    const logoutHandler = () => {
        Axios.get('/api/user/logout')
            .then(response => {
                if(response.data.success) {
                    localStorage.removeItem('userId')
                    props.history.push("/login")
                } else {
                    alert('로그아웃에 실패했습니다.')
                }
            })
    }
    
    if(user.userData && !user.userData.isAuth) {
        return (
            <Menu mode={props.mode}>
                <Menu.Item key="mail">
                    <a href="/login">Signin</a>
                </Menu.Item>
                <Menu.Item key="app">
                    <a href="/register">Signup</a>
                </Menu.Item>
            </Menu>
        )
    } else {
        return (
            <Menu mode={props.mode}>
                <SubMenu key="artist" title="Artist">
                    {Ents && Artists &&
                        Ents.map((ent, index) => (
                            <SubMenu key={index} title={ent.name}>
                                {
                                    Artists.map((artist, aindex) => {
                                        if (artist.entId === ent._id) {
                                            return (
                                            <Menu.Item key={`artsit${aindex}`}>
                                                <a href={`/artist/${artist._id}`}>
                                                    {artist.name}
                                                </a>
                                            </Menu.Item>
                                            )
                                        }
                                    })
                                }
                            </SubMenu>
                        ))    
                    }
                </SubMenu>
                <Menu.Item key="upload">
                    <a href="/mypage">MyPage</a>
                </Menu.Item>
                <Menu.Item key="logout">
                    <a onClick={logoutHandler}>Logout</a>
                </Menu.Item>
            </Menu>
        )
    }
}

export default withRouter(RightMenu)
