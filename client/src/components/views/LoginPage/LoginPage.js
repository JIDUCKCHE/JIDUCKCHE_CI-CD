import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../../_actions/user_action'
import { withRouter } from 'react-router-dom'
import { message } from 'antd';

function LoginPage(props) {

    const dispatch = useDispatch();

    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    const {
        email,
        password
    } = values;
    
    const onChange = (e) => {
        const { value, name } = e.target;
        setValues({
            ...values,
            [name]: value
        });
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();

        let body ={
            email: email,
            password: password
        }

        dispatch(loginUser(body))
            .then(response => {
                console.log(response)
                if (response.payload.success){
                    window.localStorage.setItem('userId', response.payload.result._id)
                    props.history.push('/')
                } else {
                    message.warning('이메일 또는 비밀번호가 틀렸습니다.')
                    setValues({
                        email: '',
                        password: ''
                    })
                }
            })
            .catch (err => {
                console.log(err)
            })
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems:'center',
            width: '100%',
            height: '100vh' }}>
            <form style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '440px',
                height: '70vh',
                justifyContent: 'center',
            }}
            onSubmit={onSubmitHandler}>
                {/* logo */}
                <div style={{
                    width: '140px',
                    height: '140px',
                    padding: '0',
                    borderRadius: '50%',
                    backgroundColor: '#ffdf80',
                    marginBottom: '50px'
                }}>
                    <div style={{
                    width: '100px',
                    height: '100px',
                    padding: '0',
                    borderRadius: '50%',
                    backgroundColor: '#ffffff',
                    margin: '10px 0px 20px 50px'
                }} />

                </div>
                {/* logo */}
                <input
                    type="email"
                    placeholder="이메일을 입력하세요"
                    name="email"
                    value={email}
                    onChange={onChange}
                    style={{
                        maxWidth: '280px',
                        minWidth: '220px',
                        padding: '0px 0.5rem',
                        height: '40px',
                        margin: '5px',
                        borderRadius: '5px',
                        border: '1px solid rgba(0,0,0,0.2)',
                    }}
                />
                <input
                    type="password"
                    placeholder="비밀번호를 입력하세요"
                    name="password"
                    value={password}
                    onChange={onChange}
                    style={{
                        maxWidth: '280px',
                        minWidth: '220px',
                        padding: '0px 0.5rem',
                        height: '40px',
                        margin: '5px',
                        borderRadius: '5px',
                        border: '1px solid rgba(0,0,0,0.2)'
                    }}
                />
                <button
                    type="submit"
                    style={{
                        maxWidth: '300px',
                        minWidth: '240px',
                        height: '40px',
                        margin: '20px',
                        backgroundColor: '#ffdf80',
                        border: 'none',
                        outline: 'none',
                        borderRadius: '5px',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                        border: '1px solid rgba(0,0,0,0.02)',
                        fontWeight: '800',
                        color: 'white'
                    }}>
                        로그인
                </button>
                                {/* icons */}
            <div style={{
                width: '200px',
                height: '100px',
                display: 'flex',
                justifyContent:'space-between',
                alignItems: 'center',
                marginBottom: '10px'
            }}>
                <div style={{
                    width: '40px',
                    height: '40px',
                    padding: '0',
                    borderRadius: '50%',
                    backgroundColor: '#ccffcc'
                }} />
                <div style={{
                    width: '40px',
                    height: '40px',
                    padding: '0',
                    borderRadius: '50%',
                    backgroundColor: '#cce6ff'
                }} />

                <div style={{
                    width: '40px',
                    height: '40px',
                    padding: '0',
                    borderRadius: '50%',
                    backgroundColor: '#f2ccff'
                }} />
            </div>
            {/* icons */}
            </form>
        </div>
    )
}

export default withRouter(LoginPage)
