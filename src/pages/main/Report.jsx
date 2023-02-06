import React from 'react';
import { ActionIcon, Container, Button, Group, Text, Stack, Title, Textarea } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { IconArrowLeft, IconSend } from '@tabler/icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context';
import { addDoc, collection, doc, documentId, getDoc, query, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';



export default function () {
    const navigate = useNavigate()
    const {user} = useAuth()

    const form = useForm({
        initialValues: {
            interruptDate: '',
            complaintMsg: ''
        },
        validate:{
            complaintMsg: (value) => value.length > 1 ? null : 'Cannot leave blank',
        }
    })

    const AhoCorasick = function (keywords) {
        this._buildTables(keywords);
      };
      
      AhoCorasick.prototype._buildTables = function (keywords) {
        let gotoFn = {
          0: {},
        };
        let output = {};
      
        let state = 0;
        keywords.forEach((word) => {
          let curr = 0;
          for (let i = 0; i < word.length; i++) {
            let l = word[i];
            if (gotoFn[curr] && l in gotoFn[curr]) {
              curr = gotoFn[curr][l];
            } else {
              state++;
              gotoFn[curr][l] = state;
              gotoFn[state] = {};
              curr = state;
              output[state] = [];
            }
          }
      
          output[curr].push(word);
        });
      
        let failure = {};
        let xs = [];
      
        for (let l in gotoFn[0]) {
          let state = gotoFn[0][l];
          failure[state] = 0;
          xs.push(state);
        }
      
        while (xs.length) {
          let r = xs.shift();
      
          for (let l in gotoFn[r]) {
            let s = gotoFn[r][l];
            xs.push(s);
      
            let state = failure[r];
            while (state > 0 && !(l in gotoFn[state])) {
              state = failure[state];
            }
      
            if (l in gotoFn[state]) {
              let fs = gotoFn[state][l];
              failure[s] = fs;
              output[s] = output[s].concat(output[fs]);
            } else {
              failure[s] = 0;
            }
          }
        }
      
        this.gotoFn = gotoFn;
        this.output = output;
        this.failure = failure;
      };
      
      AhoCorasick.prototype.search = function (string) {
        let noErrorString = '';
        let state = 0;
        let results = [];
        let h = 0;
        let init = false;
        aho_loop: for (let i = 0; i < string.length; i++) {
          let l = string[i];
          while (state > 0 && !(l in this.gotoFn[state])) {
            state = this.failure[state];
            noErrorString = '';
          }
          if (!(l in this.gotoFn[state])) {
            if (h !== 0 || !init) {
              h++;
              init = true;
              let results2 = [];
              for (let key in this.gotoFn) {
                for (let subkey in this.gotoFn[key]) {
                  if (subkey === l) {
                    results2.push(this.gotoFn[key][l]);
                  }
                }
              }
            }
        }}}
        var ac = new AhoCorasick(['test', 'asd', 'qwe', 'boat', 'hadlok'

        ]);   
        
        
    return (
        <Container my="auto" py={50} px={40} h="100%">
            <Stack>
                <Group>
                    <ActionIcon 
                        onClick={() => {
                            navigate('/home')}
                        }
                        color='blue' size={50}>
                        <IconArrowLeft size='xl' />
                    </ActionIcon>
                    <Title color='blue' size={25}>Report Interruption</Title>
                </Group>
                <Text fz='sm'>Thank you for reporting your area. We would like to know more about what happened. Please fill up the form below with the details of your current water situation.</Text>
                <form onSubmit={form.onSubmit(async(values) => {
                    // const billingNo = (await getDoc(doc(db, 'users', user.uid)))?.get('billingNo');
                    await addDoc(collection(db, "reports"), { ...values, user_id: user.rawUser.uid })
                    navigate('/success')
                })}>
                    <Stack py={10}>
                        <DatePicker
                            placeholder='Select date' label='No water since'
                            withAsterisk {...form.getInputProps('interruptDate')}
                            maxDate={new Date()} />
                        <Textarea
                            placeholder='Tell us more about what happened...' label='Complaint details' withAsterisk
                            minRows={10}
                            maxRows={20} {...form.getInputProps('complaintMsg')}/>
                    </Stack>
                    <Stack py={50}>
                        <Button type="submit"
                            variant="gradient" fullWidth radius="xl" size="md">
                                <ActionIcon>
                                    <IconSend color='white'/>
                                </ActionIcon>
                                
                                Submit
                        </Button>
                        <Button 
                            onClick={() => {
                                navigate('/home')}
                            }
                            fullWidth variant="outline" radius="xl" size="md">Cancel
                        </Button>
                    </Stack>
                </form>
            </Stack>
        </Container>

    )
}