import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getPosts } from '../util/http'

import Post from '../components/Post'
import CreatePost from '../components/CreatePost'

const Home = () => {
    const {data, isLoading, isError, error} = useQuery({
        queryKey: ["posts"],
        queryFn: getPosts,
    })

    const {data: authUser} = useQuery({queryKey: ["authUser"]})

  return (
    <div className='w-1/3 h-full bg-slate-900 overflow-auto'>
        <CreatePost authUser={authUser} />
        {data?.map((post) => <Post postData={post} authUser={authUser} />)}
    </div>
  )
}

export default Home