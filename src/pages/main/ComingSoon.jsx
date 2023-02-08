import React from 'react';
import { Container, Flex, Image, Text, Title, Button } from '@mantine/core'
import { useNavigate } from 'react-router-dom';

export default function() {

    const navigate = useNavigate()
    
    return(
        <Container my="auto" size={400} h="100vh">
            <Flex
                direction='column'
                gap='xl'
                justify='center'
                align='stretch'
                w='100%'
                h='100%'
                sx={{ textAlign: 'center' }}>
                <Image
                    width={300}
                    sx={{ alignSelf: 'center' }} 
                    src='./assets/repair.png'/>
                <Title color='blue'  fz={28}>Coming Soon!</Title>
                <Text fz='xs' px='sm'>
                Some features just couldn't make it to the deadline, but we'll get it done as soon as we can!
                </Text>
                <Button 
                    onClick={() => {
                        navigate('/home')}
                    }
                    fullWidth variant="gradient" radius="xl" size="md">Return to Home Screen
                </Button>
            </Flex>
        </Container>
    )
}