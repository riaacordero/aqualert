import React from 'react';
import { ActionIcon, Container, Button, Group, Text, Stack, Title, Textarea, TextInput, PasswordInput } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { IconArrowLeft, IconSend } from '@tabler/icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context';

export default function() {
    const navigate = useNavigate()
    const form = useForm({
        initialValues:{
            email: '',
            isAdmin: false
        },
        validate:{
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email')
        },
    })

    return(
        <Container my="auto" py={50} px={40} h="100%">
            <Group>
                <ActionIcon 
                    onClick={() => {
                        navigate('/login')}
                    }
                    color='blue'size={50}>
                    <IconArrowLeft size='xl' />
                </ActionIcon>
                <Title color='blue' size={25}>Register</Title>
            </Group>
            <Stack py={20}>
                <Text>Help us get to know you, fill out the registration form below!</Text>
                <form onSubmit={form.onSubmit((values) => console.log(values))}>
                    <Stack>
                        <TextInput
                            label='First Name'placeholder='ex.: Juan'>
                        </TextInput>
                        <TextInput
                            label='Middle Name'placeholder='ex.: Juan'>
                        </TextInput>
                        <TextInput 
                            label='Last Name'placeholder='ex.: dela Cruz'>
                        </TextInput>
                        <TextInput
                            label='Email address' placeholder='your@email.com'>
                        </TextInput>
                        <PasswordInput
                            label='Password' placeholder='Must have at least 8 characters'>
                        </PasswordInput>
                        <TextInput
                            label='Billing Account No.' placeholder='Check your billing statement for reference'>
                        </TextInput>         
                        <Button 
                            onClick={() => {
                                navigate('/')}
                            }
                            fullWidth variant="gradient" radius="xl" size="md">Register
                        </Button>
                    </Stack>
                </form>
            </Stack>
        </Container>
    )
}