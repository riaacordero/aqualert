import React from 'react';
import { ActionIcon, Container, Button, Group, Text, Stack, Title, Textarea, TextInput, PasswordInput } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { isInRange, useForm } from '@mantine/form';
import { IconArrowLeft, IconSend } from '@tabler/icons';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
// import { useAuth } from '../../context';
import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from "../../firebase"

export default function() {
    
    const navigate = useNavigate()
    const form = useForm({
        initialValues:{
            firstName: '',
            middleName: '',
            lastName: '',
            email: '',
            password: '',
            billingNo:'',
            isAdmin: false
        },
        validate:{
            firstName: (value) => value.length > 1 ? null : 'Cannot leave blank',
            middleName: (value) => value.length > 1 ? null : 'Cannot leave blank',
            lastName: (value) => value.length > 1 ? null : 'Cannot leave blank',
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            password: (value) => value.length > 8 ? null : 'Password must have at least 8 characters',
            billingNo: (value) => value.length === 9 ? null : 'Billing Number is 9 digits long'
        },       
    })
    
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
                <Title color='blue' size={25}>Register</Title>
            </Group>
            <Stack py={20}>
                <Text>Help us get to know you, fill out the registration form below!</Text>
                <form onSubmit={form.onSubmit(async (values) => {
                    //Add create user with email and password
                    
                    createUserWithEmailAndPassword(auth, values.email, values.password)
                        .then(({ user }) => {
                            //Get the user id
                            const uid = user.uid

                            //Data
                            const data = {
                                firstName: values.firstName,
                                middleName: values.middleName,
                                lastName: values.lastName,
                                email: values.email,
                                billingNo: values.billingNo,
                                isAdmin: false
                            };

                            //Add it on users collection 
                            setDoc(doc(db, "users", uid), data) // add user added succesfuly prompt

                            // // Signed in (Check)
                            // const user = userCredential.user;
                            // console.log(user);
                        })
                        .catch((error) => {
                            alert(error.message)
                        });
                })}>
                    <Stack>
                        <TextInput
                            label='First Name'placeholder='ex.: Juan'{...form.getInputProps('firstName')}>
                        </TextInput>
                        <TextInput
                            label='Middle Name'placeholder='ex.: Juan'{...form.getInputProps('middleName')}>
                        </TextInput>
                        <TextInput 
                            label='Last Name'placeholder='ex.: dela Cruz'{...form.getInputProps('lastName')}>
                        </TextInput>
                        <TextInput
                            label='Email address' placeholder='your@email.com'{...form.getInputProps('email')}>
                        </TextInput>
                        <PasswordInput
                            label='Password' placeholder='Must have at least 8 characters'{...form.getInputProps('password')}>
                        </PasswordInput>
                        <TextInput
                            label='Billing Account No.' placeholder='Check your billing statement for reference'{...form.getInputProps('billingNo')}>
                        </TextInput>         
                        <Button 
                            type = "submit"
                            fullWidth variant="gradient" radius="xl" size="md">Register
                        </Button>
                        <Button  
                            onClick={() => {
                                navigate('/')}
                            }
                            fullWidth variant="outline" radius="xl" size="md">Cancel
                        </Button>
                    </Stack>
                </form>
            </Stack>
        </Container>
    ) 
}