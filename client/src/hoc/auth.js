import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { message } from 'antd';
import { auth } from '../_actions/user_action'

export default function (SpecificComponent, option, adminRoute) {
    //null => 아무나 출입 가능
    //true => 로그인한 유저만 출입 가능
    //false => 로그인한 유저는 출입 불가능


    function AuthenticationCheck (props) {

        const dispatch = useDispatch();
        const [Ok, setOk] = useState(false)

        useEffect(() => {

            dispatch(auth()).then(response => {
                //로그인 하지 않은 상태
                if(!response.payload.isAuth) {
                    localStorage.removeItem('userId')
                    if(option) {
                        message.warn('로그인 한 유저만 접근 가능한 페이지입니다.')
                        props.history.push('/login')
                    }
                } else {
                    //로그인 한 상태
                    if(adminRoute && !response.payload.isAdmin) {
                        message.warn('관리자만 접근 가능한 페이지 입니다.')
                        props.history.push('/')
                    } else if (option === false && option !== null) {
                        message.warn('로그인 한 유저는 접근 불가능한 페이지 입니다.')
                        props.history.push('/')
                    } 
                }
                setOk(!Ok)
            })
         }, [])

        return (
            Ok ? 
            <SpecificComponent />:<div></div>
        )
    }
    return AuthenticationCheck
}