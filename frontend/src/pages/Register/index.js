import React, {useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import api from '../../services/api'

import LogoImg from '../../assests/logo.svg'
import './style.css'




export default function Register() {
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [whatsapp,setWhasapp] = useState('')
    const [city,setCity] = useState('')
    const [uf,setUf] = useState('')

    const history = useHistory()

    async function handleRegister(e) {
        e.preventDefault()

        const data = {name, email, whatsapp, city, uf,}

        history.push('/')

    try{
        const response = await api.post('ongs', data) //await -> aguardar tempo de respota
    // sempre que usar awaite, função tem que ter um async 

    alert(`Seu ID de acesso: ${response.data.id}`)
    } catch (err) {
        alert('Erro no cadastro, tente novamente')
    }
}

    

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={LogoImg} alt="Be The Hero"/>
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a
                        encontrarem os casos da sua ONG.
                    </p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041" />
                        Já tenho cadastro
                    </Link>
                </section>

                <form onSubmit={handleRegister}>
                    <input placeholder="Nome da ONG"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <input type="email" placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input placeholder="WhatsApp" 
                        value={whatsapp}
                        onChange={e => setWhasapp(e.target.value)}
                    />

                    <div className="input-group">
                        <input placeholder="Cidade"
                            value={city}
                            onChange={e => setCity(e.target.value)}
                        />
                        <input placeholder="UF" style={{width: 80}}
                            value={uf}
                            onChange={e => setUf(e.target.value)}
                        />
                    </div>

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}