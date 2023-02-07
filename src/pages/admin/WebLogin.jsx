import { Image, Center, Flex, Stack, Title, TextInput, Button, PasswordInput, Text, Container, MantineProvider } from '@mantine/core'
import React from 'react'
import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context';
import { showNotification } from '@mantine/notifications';

export default function() {
    //revealed when there is error
    const { signin } = useAuth();
    const [error, setError] = useState(false);
    const [email, setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [isAdmin, setAdmin] = useState(true);

    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        signin({ email, password, isAdmin })
            .then(() =>{
                navigate('/admin')
            })
            .catch((error) => {
                if (error instanceof Error) {
                    showNotification({
                        color: 'red',
                        title: 'Error',
                        message: "Are you sure you're an admin? Please check if your email and password is correct. "+error.message
                    })
                }
            });
    }

    return (
        <MantineProvider
            theme={{
                fontFamily: 'Poppins, sans-serif',
                headings: { fontFamily: 'Poppins, sans-serif' }
            }}>
            
            <Container my="auto" size={400} h="100vh">
                <Flex
                    direction='column'
                    gap='sm'
                    justify='center'
                    align='stretch'
                    w='100%'
                    h='100%'
                    sx={{ textAlign: 'center' }}>
                    <Image
                        width= {100}
                        sx={{ alignSelf: 'center' }}
                        src= "./assets/aqualert-logo.png"
                        alt= "icon for dp" 

                    />
                    <Title order={4}>Aqualert Admin System</Title>
                    <Text fz="xs"> Access consumer complaints through Aqualert's dedicated complaint management system. </Text>
                    
                    <form onSubmit={handleLogin}>
                        <Stack  mt= "lg" spacing="sm" >
                            <TextInput placeholder="Email address" onChange={e => setEmail(e.target.value)} />
                            <PasswordInput placeholder="Password" onChange={e => setPassword(e.target.value)}/>
                        </Stack>

                        <Button type="submit"
                            mt= "xl" fullWidth radius="xl" size="md">Login
                        </Button>
                        <Button 
                                onClick={() => {
                                    navigate('/')}
                                }
                            td="underline" variant="subtle" color="gray" radius="xl">Return to main website
                        </Button>
                    </form>

                </Flex>
            </Container>

        </MantineProvider>
        
    )
}