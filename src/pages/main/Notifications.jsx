import React from 'react';
import { Group, ActionIcon, Title, Container, Stack  } from '@mantine/core'
import { useNavigate } from 'react-router-dom';
import { IconArrowLeft } from '@tabler/icons';

export default function (){
    const navigate = useNavigate()

    return(
        <Container my="auto" py={50} px={40} h="100%">
            <Group>
                <ActionIcon 
                    onClick={() => {
                        navigate('/home')}
                    }
                    color='blue'size={50}>
                    <IconArrowLeft size='xl' />
                </ActionIcon>
                <Title color='blue' size={25}>Notifications</Title>
            </Group>

            <Stack>
                {/* TODO: add notification data */}
            </Stack>
        </Container>
    )
}