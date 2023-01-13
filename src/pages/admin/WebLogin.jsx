import { Image, Center, Flex, Stack, Title, TextInput, Button, PasswordInput, Text, Container, MantineProvider } from '@mantine/core'
import React from 'react'
import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

export default function() {

    const navigate = useNavigate()

    return (
        <MantineProvider
            theme={{
                fontFamily: 'Poppins, sans-serif',
                headings: { fontFamily: 'Poppins, sans-serif' }
            }}>
            
            <Container my="auto" size={400} h="100%">
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
                    <Title order={4}> Welcome to Aqualert </Title>
                    <Text fz="xs"> Lorem ipsum dolor sit amet consectetur. </Text>
                    
                    <Stack  mt= "lg" spacing="sm" >
                        <TextInput 
                            placeholder= "username"
                            size= "sm" 
                        />
                        <PasswordInput withAsterisk placeholder="password" />
                    </Stack>

                    <Button 
                        onClick={() => {
                            navigate('/admin')}
                        }
                    mt= "xl" fullWidth radius="xl" size="md">Login</Button>
                    <Button 
                            onClick={() => {
                                navigate('/')}
                            }
                        td="underline" variant="subtle" color="gray" radius="xl">Return to main website</Button>

                </Flex>
            </Container>

        </MantineProvider>
        
    )
}