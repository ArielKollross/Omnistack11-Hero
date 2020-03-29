import React, {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'

import './style.css'
import LogoImg from '../../assests/logo.svg'
import herosImg from '../../assests/heroes.png'
import {FiLogIn} from 'react-icons/fi'
import api from '../../services/api'

export default function Logon() {
    
    const [id, setId] = useState('')
    const history = useHistory()

   async function handleLogin(e) {
        e.preventDefault()

        try{
            const response = await api.post('session', {id})

            localStorage.setItem('ongId', id)
            localStorage.setItem('ongName', response.data.name)

            console.log(response.data.name)

            history.push('/profile')
        }catch (err){
            alert('Falha ao logar.')
        }
    }

    return (
        <div className="logon-container">
            <section className="from">
                <img src={LogoImg} alt="Be The Hero"/>

                <form onSubmit={handleLogin}>
                    <h1>Faça seu login</h1>

                    <input placeholder="Sua ID"
                        value={id}
                        onChange={e=> setId(e.target.value)}
                    />
                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041" />
                        Não tenho cadastro
                    </Link>
                </form>
            </section>

            <img src={herosImg} alt="Heros"/>
        </div>
    )
}