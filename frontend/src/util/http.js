import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient()

export const submitSignUp = async (formData) => {
    const {userName, fullName, email, password} = formData

    try{
        const response = await fetch("http://localhost:8080/api/auth/signin", {
           method: "POST",
           headers: {
            "Content-Type": "application/json"
           },
           body: JSON.stringify({
            userName,
            fullName,
            email,
            password
           })
        })
        const data = await response.json()

        return data
    }catch(err){
        console.log(err)
    }
}

export const submitLogIn = async (formData) => {
    const {email, password} = formData

    try{
        const response = await fetch("http://localhost:8080/api/auth/login", {
           method: "POST",
           credentials: 'include',
           headers: {
            "Content-Type": "application/json"
           },
           body: JSON.stringify({
            email,
            password
           })
        })

        const data = await response.json()
        
        if(!response.ok) throw new Error(data.error || "Failed to login")

        return data
    }catch(error){
        console.error(error)
        throw error
    }
}

export const submitLogOut = async () => {
    const response = await fetch("http://localhost:8080/api/auth/logout" , {
        method: "POST",
        credentials: 'include',
    })

    const data = await response.json()

    if(!response.ok){
        throw new Error(data.message || "Failed on logout")
    }

}

export const getProfile = async ({signal, userName}) => {
    try{
        const response = await fetch("http://localhost:8080/api/users/profile/" + userName, {
            method: "GET",
            credentials: 'include',
            headers: {
             "Content-Type": "application/json"
            }
         })

         const data = await response.json()

         if(!response.ok) throw new Error(data.error || "Failed to get profile")

         return data
    }catch(error){
        console.error(error)
        throw error
    }
}

export const getMe = async ({signal, userName}) => {
    try{
        const response = await fetch("http://localhost:8080/api/auth/me", {
            method: "GET",
            credentials: 'include',
            headers: {
             "Content-Type": "application/json"
            }
         })

         const data = await response.json()

         if(!response.ok) throw new Error(data.error || "Failed to get profile")

         return data
    }catch(error){
        console.error(error)
        throw error
    }
}

export const getPosts = async () => {
    try{
        const response = await fetch("http://localhost:8080/api/posts/all", {
            method: "GET",
            credentials: 'include',
            headers: {
             "Content-Type": "application/json"
            }
         })

         const data = await response.json()

         if(!response.ok) throw new Error(data.error || "Failed to get profile")

         return data
    }catch(error){
        console.error(error)
        throw error
    }
}

export const submitLike = async (postId) => {
    try{
        const response = await fetch("http://localhost:8080/api/posts/like/" + postId, {
            method: "POST",
            credentials: 'include',
            headers: {
             "Content-Type": "application/json"
            }
         })

         const data = await response.json()

         if(!response.ok) throw new Error(data.error || "Failed to get profile")

         return data
    }catch(error){
        console.error(error)
        throw error
    }
}

export const submitCretePost = async ({text, img}) => {
    try{
        const response = await fetch("http://localhost:8080/api/posts/create", {
           method: "POST",
           credentials: 'include',
           headers: {
            "Content-Type": "application/json"
           },
           body: JSON.stringify({
            text,
            img
           })
        })

        const data = await response.json()
        
        if(!response.ok) throw new Error(data.error || "Failed to login")

        console.log(data)
    }catch(error){
        console.error(error)
        throw error
    }
}
