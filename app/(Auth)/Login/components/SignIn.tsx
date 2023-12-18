

"use client"


import React, { useState } from 'react'

import axios from 'axios';





const SignIn = () => {
    const [Tokens, setTokens] = useState()





    const Post_TTransaction_Tokens = axios.get("/api/Post_challenge_Transaction")



        .then(response => {

            const { token } = response.data
            console.log("token data ", token)
            setTokens(token)
        })
        .catch(error => {
            console.log(error);
        });

    console.log("Tokens", Tokens)


  

    return (
        <div>SignIn</div>
    )
}

export default SignIn