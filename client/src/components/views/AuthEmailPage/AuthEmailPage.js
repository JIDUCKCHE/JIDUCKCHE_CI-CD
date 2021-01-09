import React, { useState, useEffect } from 'react'
import { Input, Typography, Button, message } from 'antd'
import Axios from 'axios';
import { withRouter } from 'react-router-dom';

const { TextArea } = Input;
const { Title } = Typography

function AuthEmailPage(props) {

    const userId = localStorage.getItem('userId')
    const [Value, setValue] = useState("")

    useEffect(() => {
        Axios.get(`/api/user/authCode/${userId}`)
            .then(response => {
                if(response.data.success) {
                    message.info('이메일로 인증코드가 발송되었습니다.')
                } else {
                    message.error('인증코드 발송에 실패했습니다.')
                }
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    const onChange = (e) => {
        setValue(e.currentTarget.value)
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const variable = {
            authCode: Value
        }
        if (variable.authCode) {
            Axios.put(`/api/user/emailAuth/${userId}`, variable)
                .then(response => {
                    if(response.data.success) {
                        if(response.data.result.auth) {
                            message.success('이메일 인증에 성공했습니다.')
                            props.history.push('/')
                        } else {
                            message.warning('잘못된 인증번호입니다.')
                            setValue("")
                        }
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        }

    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Title level={2} style={{ marginTop: '8rem'}}>이메일 인증코드 입력</Title>
            <form style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem', flexDirection: 'row', alignItems: 'center' }} onSubmit={onSubmit}>
                <TextArea style={{ width: '200px', height: '50px', marginRight: '1rem' }}
                    placeholder="인증코드를 입력하세요"
                    value={Value}
                    onChange={onChange}
                />
                <Button style={{ width : '100px', height: '30px' }} onClick={onSubmit}>인증하기</Button>
            </form>
        </div>
    )
}

export default withRouter(AuthEmailPage)
