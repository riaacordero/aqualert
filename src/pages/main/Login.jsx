import { Image, Container, Flex, Stack, Title, TextInput, Button, PasswordInput, MantineProvider } from '@mantine/core'
import { useState } from 'react'

export default function () {
    return (
        <MantineProvider
            theme={{
                fontFamily: 'Poppins, sans-serif',
                headings: { fontFamily: 'Poppins, sans-serif' }
            }}>
            <Flex
                direction='column'
                gap={{ base: 'sm', sm: 'lg' }}
                justify= 'center'
                align='stretch'
                m={100}>
                <Image
                    justify="center"
                    width={250}
                    sx={{alignSelf: 'center' }}
                    src="./assets/water.png"
                    alt="water art from icons8" />
                <Title>Welcome to Aqualert!</Title>
                <TextInput placeholder="username"/>
                <PasswordInput placeholder="password" />
                <Stack>
                    <Button fullWidth="true" radius="xl" size="md">Login</Button>
                    <Button fullWidth="true" variant="outline" radius="xl" size="md">Register</Button>
                </Stack>
            </Flex>
        </MantineProvider>
    )
}