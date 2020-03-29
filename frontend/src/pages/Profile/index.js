import React, {useState,useEffect} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {FiPower, FiTrash2} from 'react-icons/fi'
import api from '../../services/api'

import logoImg from '../../assests/logo.svg'
import './style.css'


export default function Profile() {
    const [incidents, setIncidents] = useState([])

    const history = useHistory()

    const ongName = localStorage.getItem('ongName')
    const ongId = localStorage.getItem('ongId')


    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId,
            }
        }).then(response => {
            setIncidents(response.data)
        })
    }, [ongId])


    async function handleDeletIncident(id) {
        try {
          await api.delete(`incidents/${id}`, {
            headers: {
                Authorization: ongId,
            }
          })

          setIncidents(incidents.filter(incident => incident.id !== id))

        } catch (err) {
            alert('Erro ao deletar')
        }
    }
    

    function handleLogout() {
       localStorage.clear()

       history.push('/')
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt=""/>
                    <span>Bem vinda, {ongName}</span>

                <Link className="button" to="/incidents/new">
                    Cadastrar noso caso</Link>

                <button type="button"
                    onClick={handleLogout}
                >
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>

            <h1>Casos Cadastrados</h1>

            <ul>
                {incidents.map(incident =>(
                    <li key={incident.id}>
                    <strong>CASO:</strong>
                    <p>{incident.title}</p>

                    <strong>DESCRIÇÃO:</strong>
                    <p>{incident.description}</p>

                    <strong>VALOR:</strong>
                    <p>{Intl.NumberFormat('pt-BR', 
                        {style: 'currency', currency: 'BRL'})
                        .format(incident.value)}</p>

                    <button type="button"
                        onClick={() => handleDeletIncident(incident.id)}
                    >
                        <FiTrash2 size={20} color="#a8a8b3"/>
                    </button>
                </li>
                ) )}
            </ul>
        </div>
    )
}