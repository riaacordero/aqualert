import { Button, Center, FileInput, Stack, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { createUserWithEmailAndPassword, deleteUser, EmailAuthProvider, reauthenticateWithCredential, SignInMethod } from "firebase/auth";
import { doc, setDoc, collection, getDocs, DocumentData, QueryDocumentSnapshot, deleteDoc, getCountFromServer, query, where } from "firebase/firestore";
import Papa from "papaparse";
import { useEffect, useMemo } from "react";
import { useState } from "react";
import { BARANGAY_COLLECTION, CONSUMER_DATA_COLLECTION, USER_COLLECTION } from "../../collection_constants";
import { useAuth } from "../../context";
import { auth, db } from "../../firebase";
import { batchLoadData } from "../../utils";

interface ConsumerData {
    billing_num: string
    connection_type: string
    water_meter_id: string
    water_supply_sys: string
    barangay_name: string
    street_name: string
    latitude: number
    longitude: number
    status_type: number
}

interface User {
    firstName: string
    lastName: string
    email: string
    password: string
    billingNo: string
    isAdmin: boolean
}

export default function() {
    const [isRemoteDataLoaded, setRemoteDataLoaded] = useState(false);
    const [barangays, setBarangays] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);
    const [inputCustomerData, setInputCustomerData] = useState<ConsumerData[]>([]);
    const [inputUserData, setInputUserData] = useState<User[]>([]);
    const [userDataCount, setUserDataCount] = useState(0);
    const [consumerDataCount, setConsumerDataCount] = useState(0);
    const lastBarangayId = useMemo(() => parseInt(barangays[barangays.length - 1]?.id ?? '100000359' /* 360 */), [barangays]);
    const { user, signout } = useAuth();

    useEffect(() => {
        Promise.all([
            loadBarangays(),
            loadConsumerData(),
            loadUserData()
        ]).finally(() => {
            setRemoteDataLoaded(true);
        });
    }, []);

    useEffect(() => {
        if (consumerDataCount === 0 || barangays.length === 0) {
            loadConsumerData();
        }
    }, [barangays, consumerDataCount]);

    const loadBarangays = async () => {
        const querySnapshot = await getDocs(collection(db, BARANGAY_COLLECTION));
        setBarangays(querySnapshot.docs);
    }

    const loadConsumerData = async () => {
        const querySnapshot = await getCountFromServer(collection(db, CONSUMER_DATA_COLLECTION));
        setConsumerDataCount(querySnapshot.data().count);
    }

    const loadUserData = async () => {
        const querySnapshot = await getCountFromServer(collection(db, USER_COLLECTION));
        setUserDataCount(querySnapshot.data().count);
    }

    const uploadBarangays = () => {
        const uniqueBarangays = Array.from(new Set(inputCustomerData.map(d => d.barangay_name)));

        // Exclude previous barangays
        batchLoadData(collection(db, BARANGAY_COLLECTION), 'barangay_name', inputCustomerData.map(d => d.barangay_name))
            .then(docs => {
                const foundExisting = docs.map(d => d.get('barangay_name') as string);
                return Promise.all(uniqueBarangays.filter(b => !foundExisting.includes(b)).map((barangay_name, i) => setDoc(
                    doc(db, BARANGAY_COLLECTION, (lastBarangayId + i + 1).toString()),
                    { barangay_name }
                )));
            })
            .then(() => loadBarangays())
            .catch(console.error);
    }

    const uploadCustomerData = () => {
        Promise.all(inputCustomerData.map(({ barangay_name, billing_num, ...payload }) =>
            setDoc(
                doc(db, CONSUMER_DATA_COLLECTION, billing_num.toString()),
                {
                    barangay_id: barangays.find(b => b.get('barangay_name') === barangay_name).id,
                    ...payload
                }
            )
        ))
            .then(() => loadConsumerData())
            .catch(console.error);
    }

    const uploadUserData = () => {
        Promise.all(inputUserData.map(({ password, ...payload }) =>
            createUserWithEmailAndPassword(auth, payload.email, password)
                .then(({user}) => {
                    return setDoc(
                        doc(db, USER_COLLECTION, user.uid),
                        payload
                    );
                })
        ))
            .then(() => loadUserData())
            .catch(console.error);
    }

    const deleteAllConsumerData = async () => {
        const shouldDelete = confirm('Are you sure you want to delete ALL the consumer data?');
        if (!shouldDelete) return;
        const snapshot = await getDocs(collection(db, CONSUMER_DATA_COLLECTION));
        await Promise.all(snapshot.docs.map(doc => deleteDoc(doc.ref)));
        setConsumerDataCount(0);
    }

    const deleteAllBarangays = async () => {
        const shouldDelete = confirm('Are you sure you want to delete ALL barangay data?');
        if (!shouldDelete) return;
        const snapshot = await getDocs(collection(db, BARANGAY_COLLECTION));
        await Promise.all(snapshot.docs.map(doc => deleteDoc(doc.ref)));
        setBarangays([]);
    }

    const deleteAllUserData = async () => {
        // TODO: you cannot delete user on firebase auth. please manually delete it through the dashboard
        const shouldDelete = confirm('Are you sure you want to delete ALL the user data?');
        if (!shouldDelete) return;
        const snapshot = await getDocs(collection(db, USER_COLLECTION));
        await Promise.all(snapshot.docs.map(doc => deleteDoc(doc.ref)));
        setUserDataCount(0);
    }

    const onHandleUploadCdataCsv = (file: File | null) => {
        setInputCustomerData([]);
        if (!file) return;
        Papa.parse<ConsumerData>(file, {
            header: true,
            dynamicTyping: (field) => field !== 'water_meter_id',
            complete(results) {
                setInputCustomerData(results.data);
            },
        });
    }

    const deleteAccountForm = useForm({
        initialValues: {
            password: ''
        }
    });

    const deleteCurrentUser = async ({ password }: { password: string }) => {
        if (!user) return;

        try {
            const newUser = await reauthenticateWithCredential(user.rawUser, EmailAuthProvider.credential(user.rawUser.email, password));

            await deleteUser(newUser.user);
            await signout();
            await deleteDoc(doc(db, USER_COLLECTION, user.rawUser.uid));
        } catch (e) {
            deleteAccountForm.setErrors({ password: e.toString() });
        }
    }

    const onHandleUploadUsersCsv = (file: File | null) => {
        setInputUserData([]);
        if (!file) return;
        Papa.parse<User>(file, {
            header: true,
            dynamicTyping: (field) => field === 'isAdmin',
            complete(results) {
                setInputUserData(results.data);
            },
        });
    }

    return (
        <Center>
            <Stack align="center">
                <Title>God Mode</Title>

                <Stack>
                    <FileInput w="100%" label="New consumer data file" placeholder="File must be CSV" accept="text/csv" onChange={onHandleUploadCdataCsv} />

                    <Button fullWidth disabled={inputCustomerData.length === 0} onClick={uploadBarangays}>
                        Upload NEW barangays
                    </Button>

                    <Button fullWidth disabled={inputCustomerData.length === 0} onClick={uploadCustomerData}>
                        Upload NEW consumer data
                    </Button>

                    <Button fullWidth color="red" disabled={!isRemoteDataLoaded || consumerDataCount === 0} onClick={deleteAllConsumerData}>
                        Delete ALL consumer data
                    </Button>

                    <Button fullWidth color="red" disabled={!isRemoteDataLoaded || barangays.length === 0} onClick={deleteAllBarangays}>
                        Delete ALL barangays
                    </Button>
                </Stack>

                <Stack w="100%">
                    <FileInput w="100%" label="New user data file" placeholder="File must be CSV" accept="text/csv" onChange={onHandleUploadUsersCsv} />

                    <Button fullWidth disabled={inputUserData.length === 0} onClick={uploadUserData}>
                        Upload NEW users
                    </Button>

                    <Button fullWidth color="red" disabled={!isRemoteDataLoaded || userDataCount === 0} onClick={deleteAllUserData}>
                        Delete ALL users
                    </Button>

                    {user && <form onSubmit={deleteAccountForm.onSubmit(deleteCurrentUser)}>
                        <Stack>
                            <TextInput
                                label="Confirm delete user password"
                                type="password"
                                placeholder="Input your password to delete account"
                                {...deleteAccountForm.getInputProps('password')} />

                            <Button fullWidth color="red" disabled={!deleteAccountForm.isDirty('password')} type="submit">
                                Delete current user
                            </Button>
                        </Stack>
                    </form>}
                </Stack>
            </Stack>
        </Center>
    );
}
