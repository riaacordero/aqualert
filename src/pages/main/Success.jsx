import React from 'react';
import { Container, Flex, Image, Text, Title, Button } from '@mantine/core'
import { useNavigate } from 'react-router-dom';

export default function() {

    const navigate = useNavigate()
    
    return(
        <Container my="auto" py={50} px={40} h="100%">
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
                    src='./assets/report-send.png'/>
                <Title fz={25}>Report Submitted!</Title>
                <Text fz='xs' px='sm'>
                Your report has been sent to Aqualert's admin system. In the meantime, please check your app from time to time for updates on your status.
                </Text>
                <Button 
                    onClick={() => {
                        navigate('/')}
                    }
                    fullWidth variant="gradient" radius="xl" size="md">Return to Home Screen
                </Button>
            </Flex>
        </Container>
    )
}