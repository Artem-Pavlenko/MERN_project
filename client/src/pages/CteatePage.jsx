import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {useHistory} from "react-router-dom";

export const CreatePage = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)
    const [link, setLink] = useState('')
    const {request} = useHttp()

    const keyPresHandler = async (event) => {
        if (event.key === 'Enter') {
            try {
                const data = await request('/api/link/generate', 'POST', {from: link}, {
                    Authorization: `Bearer ${auth.token}`
                })
                console.log('CreatePage, /api/link/generate', data)
                history.push(`/detail/${data.link._id}`)
            } catch (e) {}
        }
    }

    useEffect( () => {
        window.M.updateTextFields()
    }, [])

    return (
        <div className='row' style={{padding: '2rem'}}>
            <div className="col s8 offset-s2" >
                <div className="input-field">
                    <input
                        placeholder="Вставте ссылку"
                        id="link"
                        type="text"
                        value={link}
                        onChange={(event => setLink(event.target.value))}
                        onKeyPress={keyPresHandler}
                    />
                    <label htmlFor="link">Введите ссылку</label>
                </div>
            </div>
        </div>
    )
}