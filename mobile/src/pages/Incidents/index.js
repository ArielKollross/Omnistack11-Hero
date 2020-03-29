import React, {useEffect, useState} from 'react'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import {View, FlatList ,Image, Text, TouchableOpacity } from 'react-native'
import api from '../../services/api'

import logoImg from '../../assets/logo.png'
import style from './style'


export default function Incidents() {

    const [incidents, setIncidents] = useState([])
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const [loadgin, setLoading] = useState(false)

    const navigation = useNavigation()

    function navigateToDetail(incident) {
        navigation.navigate('Detail', {incident})
    }

    async function loadIncidents() {
        if (loadgin){
            return
        }

        if (total > 0 && Incidents.length == total){
            return
        }

        setLoading(true)


        const response = await api.get('incidents', {
            params: {page}
        })

        setIncidents([...incidents, ...response.data])
        setTotal(response.headers['x-total-count'])
        setPage(page +1)
        setLoading(false)
    }

    useEffect( () => {
        loadIncidents()
    }, [] ) 

    return (
        <View style={style.container}>
           <View style={style.header}>
               <Image source={logoImg} />
               <Text style={style.headerText}>
                   Total de <Text style={style.headerTextBold}>{total} casos </Text>
               </Text>
           </View>

           <Text style={style.title}>Bem vindo!</Text>
           <Text style={style.description}>Escolha um dos casos abaixo e salve o dia.
           </Text>

           <FlatList
           style={style.incidentsList}
           showsVerticalScrollIndicator={true}

           data={incidents}
           keyExtractor={incident => String(incident.id)}
           onEndReached={loadIncidents}
           onEndReachedThreshold={0.2}
           
           renderItem={({item: incident}) => (
            <View style={style.incident}>
            <Text style={style.incidentProperty}>ONG:</Text>
            <Text style={style.incidentValue}>{incident.name}</Text>

            <Text style={style.incidentProperty}>CASO:</Text>
            <Text style={style.incidentValue}>{incident.title}</Text>

            <Text style={style.incidentProperty}>Valor:</Text>
            <Text style={style.incidentValue}>
                {Intl.NumberFormat('pt-BR',{ 
                  style: 'currency',
                  currency: 'BRL'
                }).format(incident.value)}
            </Text>

            <TouchableOpacity style={style.detailsButton} 
                onPress={() => navigateToDetail(incident)}>
                    <Text style={style.detailsButtonText}>Ver mais detalhes</Text>
                    <Feather name="arrow-right" size={17} color="#E02041"/>
            </TouchableOpacity>
        </View> 
           )}
           />

        </View> 
    )
}