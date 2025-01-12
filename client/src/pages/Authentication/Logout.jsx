import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'

function Logout() {
    useEffect(()=>{
        <Navigate to="/login" />
    })
  return (
    <div>Logout</div>
  )
}

export default Logout