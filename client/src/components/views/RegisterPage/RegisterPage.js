import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { registerUser } from '../../../_actions/user_action'
import { withRouter } from 'react-router-dom'
import { message } from 'antd'
import Axios from 'axios'

function RegisterPage(props) {
    const dispatch = useDispatch();
    
    const [values, setValues] = useState({
        id: "",
        email: "",
        password: "",
        passwordCheck: ""
    });
    const [EmailDup, setEmailDup] = useState(false)
    const [NameDup, setNameDup] = useState(false)

    const {
        id,
        email,
        password,
        passwordCheck
    } = values;

    const onChange = (e) => {
        const { value, name } = e.target;
        setValues({
            ...values,
            [name]: value
        });
        if (value != "") checkDup(value, name)
        else {
            setNameDup(false)
            setEmailDup(false)
        }
    };

    const checkDup = (value, type) => {
        let params = {}
        if (type == 'id') { params = { id: value } }
        if (type == 'email') { params = { email: value } }

        Axios.get(`api/user/dup`, { params: params })
            .then(response => {
                if (response.data.result == 'success') {
                    if (type == 'id') setNameDup(false)
                    if (type == 'email') setEmailDup(false)
                } else {
                    if (type == 'id') setNameDup(true)
                    if (type == 'email') setEmailDup(true)
                }
            })
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();

        if(password !== passwordCheck) {
            return message.warning('비밀번호와 비밀번호 확인은 같아야합니다.')
        }
        else if (NameDup || EmailDup) {
            return message.warning('닉네임 또는 이메일이 중복됩니다.')
        } else {
            let body = {
                name: id,
                email: email,
                password: password
            }

            dispatch(registerUser(body))
                .then(response => {
                    if (response.payload.success){
                        message.success('회원가입이 완료되었습니다.')
                        props.history.push('/login')
                    } else {
                        alert('Error')
                    }
                })
        }
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
                    type="text"
                    placeholder="닉네임을 입력하세요"
                    name="id"
                    value={id}
                    onChange={onChange}
                    style={{
                        maxWidth: '280px',
                        minWidth: '220px',
                        padding: '0px 0.5rem',
                        height: '40px',
                        margin: '5px',
                        borderRadius: '5px',
                        border: `${NameDup ? '1px solid rgba(255,0,0,255)' : '1px solid rgba(0,0,0,0.2)'}`,
                    }}
                />
                {NameDup &&
                    <span style={{ color: 'red' }}>이미 사용 중인 닉네임 입니다.</span>
                }
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
                        border: `${EmailDup ? '1px solid rgba(255,0,0,255)' : '1px solid rgba(0,0,0,0.2)'}`,
                    }}
                />
                {EmailDup &&
                    <span style={{ color: 'red' }}>이미 가입된 이메일 입니다.</span>
                }
                <input
                    type="password"
                    placeholder="비밀번호를 입력하세요"
                    name="password"
                    value={password}
                    onChange={onChange}
                    minLength={6}
                    maxLength={12}
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
                    placeholder="비밀번호를 한 번 더 입력하세요"
                    name="passwordCheck"
                    value={passwordCheck}
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
                        회원가입하기
                </button>
            </form>
        </div>
    )
}

export default withRouter(RegisterPage)
