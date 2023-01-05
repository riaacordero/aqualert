import { Button, Container, Stack, Title } from '@mantine/core'
import { useState } from 'react'
import './Home.css'

export default function() {
    const [count, setCount] = useState(0)

    return (
        <Container>
            <Stack align="center">
                <Title>Hello world!</Title>
                <Button fullWidth onClick={() => setCount(count + 1)}>Counter: {count}</Button>
            </Stack>
        </Container>
    )
}