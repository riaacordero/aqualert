import { MantineProvider, Container, Flex, Image, Stack, Title, TextInput, Button, PasswordInput } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context'

export default function () {
    const navigate = useNavigate()
    const auth = useAuth()

    return (
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
                    <Button 
                        onClick={() => {
                            auth.signin('test', () => {navigate('/')})
                            }
                        }
                        fullWidth radius="xl" size="md">Login
                    </Button>
                    <Button fullWidth variant="outline" radius="xl" size="md">Register</Button>
                </Stack>
            </Flex>
        </Container>
    )
}