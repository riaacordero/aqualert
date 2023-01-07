import { Image, Center, Flex, Stack, Title, TextInput, Button, PasswordInput } from '@mantine/core'
import { useState } from 'react'

export default function() {
    return (
        <main>
            <Center>
                <Flex
                    direction={{ base: 'column', sm: 'row' }}
                    gap={{ base: 'sm', sm: 'lg' }}
                    justify={{ sm: 'center' }}>
                    <Image
                        justify="center"
                        width={250}
                        src="./assets/water.png"
                        alt="water art from icons8" />
                    <Title>Welcome to Aqualert</Title>
                    <TextInput placeholder="username" />
                    <PasswordInput withAsterisk placeholder="password" />
                    <Stack>
                        <Button fullWidth="true" radius="xl" size="md">Login</Button>
                        <Button fullWidth="true" variant="outline" radius="xl" size="md">Register</Button>
                    </Stack>
                </Flex>
            </Center>
        </main>
    )
}