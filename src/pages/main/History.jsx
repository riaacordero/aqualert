import React from 'react';
import { Group, ActionIcon, Title, Container  } from '@mantine/core'
import { useNavigate } from 'react-router-dom';
import { IconArrowLeft } from '@tabler/icons';

export default function (){
    const navigate = useNavigate()

    return(
        <Container my="auto" py={50} px={40} h="100%">
            <Group>
                <ActionIcon 
                    onClick={() => {
                        navigate('/')}
                    }
                    color='blue'size={50}>
                    <IconArrowLeft size='xl' />
                </ActionIcon>
                <Title color='blue' size={25}>Status History</Title>
            </Group>
        </Container>
    )
}