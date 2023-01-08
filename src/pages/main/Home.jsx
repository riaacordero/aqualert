import { Image, Container, Flex, Stack, Title, TextInput, Button, PasswordInput, MantineProvider } from '@mantine/core'
import { useState } from 'react'

export default function () {
    return (
        <MantineProvider
            theme={{
                fontFamily: 'Poppins, sans-serif',
                headings: { fontFamily: 'Poppins, sans-serif' }
            }}> hello
        </MantineProvider>
    )
}