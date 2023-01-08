import { Image, Container, Flex, Stack, Title, TextInput, Button, PasswordInput, MantineProvider } from '@mantine/core'
import { useState } from 'react'

export default function () {
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
                        width={250}
                        sx={{ alignSelf: 'center' }}
                        src="./assets/water.png"
                        alt="water art from icons8" />
                    <Title>Welcome to Aqualert!</Title>
                    <TextInput placeholder="username" />
                    <PasswordInput placeholder="password" />
                    <Stack>
                        <Button fullWidth="true" radius="xl" size="md">Login</Button>
                        <Button fullWidth="true" variant="outline" radius="xl" size="md">Register</Button>
                    </Stack>
                </Flex>
            </Container>
        </MantineProvider>
    )
}