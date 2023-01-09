import React from 'react'
import { Container, Flex, Image, Stack, Title, TextInput, Button, PasswordInput, Checkbox } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context'
import { useForm } from '@mantine/form'

export default function () {
    const navigate = useNavigate()
    const auth = useAuth()
    const form = useForm({
        initialValues:{
            email: '',
            isAdmin: false
        },
        validate:{
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        },
    })

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
                    <form onSubmit={form.onSubmit((values) => console.log(values))}>
                    <Stack spacing="xs">
                        <TextInput placeholder="Email address" />
                        <PasswordInput placeholder="Password" />
                        <Checkbox
                            mt='md'
                            label="I am an admin"
                            {...form.getInputProps('isAdmin', {type: 'checkbox'})}
                        />
                    </Stack>
                    </form>
                <Stack spacing="xs">
                    <Button type="submit"
                        onClick={() => {
                            auth.signin('test', () => {navigate('/')})
                            }
                        }
                        variant="gradient" fullWidth radius="xl" size="md">Login
                    </Button>
                    <Button fullWidth variant="outline" radius="xl" size="md">Register</Button>
                </Stack>
            </Flex>
        </Container>
    )
}