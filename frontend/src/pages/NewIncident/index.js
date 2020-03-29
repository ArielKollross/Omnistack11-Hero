import React, {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {FiArrowLeft} from 'react-icons/fi'
import api from '../../services/api'

import LogoImg from '../../assests/logo.svg'
import './style.css'

export default function NewIncident() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [value, setValue] = useState('')

    const history = useHistory()

    const ongId = localStorage.getItem('ongId')

    async function handleNewIncident(e) {
        e.preventDefault()

        const data = {
            title,
            description,
            value,
        }

        try {
            await api.post('incidents', data, {
                headers: {
                    Authorization: ongId, 
                }
            })

            history.push('/profile')
        } catch (error) {
            alert('Erro')
        }
    }

    return (
        <div className="new-incident-container">
        <div className="content">
            <section>
                <img src={LogoImg} alt="Be The Hero"/>
                <h1>Cadastrar Novo Caso</h1>
                <p> Descreva o caso detalhadamente para encontrar um herói para resolver isto.
                </p>

                <Link className="back-link" to="/profile">
                    <FiArrowLeft size={16} color="#E02041" />
                    Voltar para home
                </Link>
            </section>

            <form onSubmit={handleNewIncident}>
                <input 
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                placeholder="Título do caso"/>

                <textarea
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                placeholder="Descrição"/>

                <input 
                    value={value}
                    onChange={e => setValue(e.target.value)}
                placeholder="Valor em reais" />

                <button className="button" type="submit">Cadastrar</button>
            </form>
        </div>
    </div>
    )
}