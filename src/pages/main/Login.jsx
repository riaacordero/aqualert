import React from 'react'
import { Modal, Container, Flex, Image, Stack, Title, TextInput, Button, PasswordInput, Checkbox } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import { useContext, useState } from "react"
import { useAuth } from '../../context'
import { useForm } from '@mantine/form'
import { signInWithEmailAndPassword } from 'firebase/auth'
import {auth} from "../../firebase"

export default function () {
    //revealed when there is error
    const [error, setError] = useState(false);
    const [email, setEmail] = useState("");
    const [password,setPassword] = useState("");
    

    //routing
    const navigate = useNavigate();


    const handleLogin = (e) => {
        e.preventDefault();

        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          
          //check if its working
          console.log(user)

          //navigate to page
          navigate("/register")
     
        })
        .catch((error) => {
          
          setError(true)

          //check in console
          console.log("There is an error")
        
        });
    }

    return (


        <Container my="auto" size={400} h="100%">
            <Flex
                direction='column'
                gap='xl'
                justify='center'
                align='stretch'
                w='100%'
                h='100%'
                sx={{ textAlign: 'center' }}>
                <Image
                    width={250}
                    sx={{ alignSelf: 'center' }}
                    src="./assets/water.png"
                    alt="water art from icons8" />
                <Stack fz={12}>
                    <Title color={"#04294F"} fz={30}>Welcome to Aqualert!</Title>
                    Checking on your water supply has never been this easy.
                </Stack>
                {/* !! FORMS HERE !! */}
                <form onSubmit={handleLogin}>
                    <Stack spacing="xs">
                        <Stack py='md'>
                            <Stack>
                                <TextInput placeholder="Email address" onChange={e => setEmail(e.target.value)} />
                                <PasswordInput placeholder="Password" onChange={e => setPassword(e.target.value)}/>
                            </Stack>
                            
                        </Stack>                  
                    </Stack>
                    <Stack spacing="xs">

                        <Button type="submit"
                           
                            variant="gradient" fullWidth radius="xl" size="md">Login
                        </Button>
                        <Button 
                            onClick={() => {
                                navigate('/register')}
                            }
                        fullWidth variant="outline" radius="xl" size="md">Register</Button>
                        <Button 
                            onClick={() => {
                                navigate('/adminlogin')}
                            }
                        td="underline" variant="subtle" color="gray" radius="xl">Login as admin</Button>



                    </Stack>
                </form>
            </Flex>
        </Container>
    )
}