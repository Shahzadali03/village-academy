import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchClassRequest } from '../Redux/action/classAction';

const Classes = ({id}) => {
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fetchClassRequest())
    },[dispatch])

    const {classes, loading} = useSelector(state=> state.classes)

    if(loading) return <option>Loading...</option>

    return  classes && classes.classes?.map((e)=> <option value={e.id} selected = {e.id === id}>{e.name}</option>)
}

export default Classes