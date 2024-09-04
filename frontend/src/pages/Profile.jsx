import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getProfile } from '../util/http'
import { useParams } from 'react-router-dom'

const Me = () => {
  const {userName} = useParams()
  const {data, isPending, isError, error} = useQuery({
    queryKey: ['profile', userName],
    queryFn: ({signal}) => getProfile({signal, userName})
  })

  if(isError) console.log(error)

  return (
    <div>
        {data?.fullName}
        {data?.email}
    </div>
  )
}

export default Me