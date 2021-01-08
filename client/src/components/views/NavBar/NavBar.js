import React, { useState } from 'react';
import { Drawer, Button, Icon } from 'antd';
import LeftMenu from './Sections/LeftMenu';
import RightMenu from './Sections/RightMenu';
import './Sections/Navbar.css'
import Logo from '../commons/ducku512.png'

function NavBar() {

    const [Visible, setVisible] = useState(false)

    const showDrawer = () => {
        setVisible(true)
    }

    const onClose = () => {
        setVisible(false)
    }


    return (
        <nav className="menu" style={{ position: 'fixed', zIndex: 5, width: '100%' }}>
            <div className="menu__logo" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: '68px' }}>
                <a style={{ fontWeight: 'bold', fontSize: '20px', color: '#FFB641' }} href="/">
                    <img src={Logo} alt="더쿠아이콘" style={{ width: '48px', height: '48px', marginRight: '1rem', padding: 'auto' }} />
                    <span>지덕체</span>
                </a>
            </div>
            <div className="menu__container">
                <div className="menu_left">
                    <LeftMenu mode="horizontal" />
                </div>
                <div className="menu_right">
                    <RightMenu mode="horizontal" />
                </div>
                <Button
                    className="menu__mobile-button"
                    type="primary"
                    onClick={showDrawer}
                >
                    <Icon type="align-right" />
                </Button>
                <Drawer
                    title="Basic Drawer"
                    placement="right"
                    className="menu_drawer"
                    closable={false}
                    onClose={onClose}
                    visible={Visible}
                >
                    <LeftMenu mode="inline" />
                    <RightMenu mode="inline" />
                </Drawer>
            </div>
        </nav>
    )
}

export default NavBar
