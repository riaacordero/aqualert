import { Button, Center, Stack, Title } from "@mantine/core";
import { doc, setDoc, collection, getDocs, DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";
import { db } from "../../firebase";

const consumerData = [
    {
        "billing_num": 100000345,
        "location_id": 100000000,
        "street_name": "Caimeto Street, San Roque",
        "barangay": "Daliao",
        "status": 1
    },
    {
        "billing_num": 100000346,
        "location_id": 100000001,
        "street_name": "Camarin St.",
        "barangay": "New Lizada",
        "status": 1
    },
    {
        "billing_num": 100000347,
        "location_id": 100000002,
        "street_name": "Purok 4 Nalum",
        "barangay": "Baliok",
        "status": 1
    },
    {
        "billing_num": 100000348,
        "location_id": 100000003,
        "street_name": "Purok 7A",
        "barangay": "Bangkas Heights",
        "status": 1
    },
    {
        "billing_num": 100000349,
        "location_id": 100000004,
        "street_name": "Lot 1-E 26 Ecoland, 2000 Dacon Complex",
        "barangay": "Bucana",
        "status": 1
    },
    {
        "billing_num": 100000350,
        "location_id": 100000005,
        "street_name": "Blk 42, Lot 1, Teakwood Street, Green Meadows Subdivision, Sto. Niño",
        "barangay": "Tugbok",
        "status": 1
    },
    {
        "billing_num": 100000351,
        "location_id": 100000006,
        "street_name": "Sunnyville Subdivision",
        "barangay": "Talomo",
        "status": 1
    },
    {
        "billing_num": 100000352,
        "location_id": 100000007,
        "street_name": "Lanzona Subdivision, 9 Rigodon Street",
        "barangay": "Matina Aplaya",
        "status": 1
    },
    {
        "billing_num": 100000353,
        "location_id": 100000008,
        "street_name": "Alpha Executive Home, 2nd Ave, Alpha Executive Homes",
        "barangay": "Matina Crossing",
        "status": 1
    },
    {
        "billing_num": 100000354,
        "location_id": 100000009,
        "street_name": "495 General Luna Ext",
        "barangay": "Poblacion District",
        "status": 1
    },
    {
        "billing_num": 100000355,
        "location_id": 100000010,
        "street_name": "Orange St, Spring Village, Bugac",
        "barangay": "Maa",
        "status": 1
    },
    {
        "billing_num": 100000356,
        "location_id": 100000011,
        "street_name": "Blk 7, Lot 3, Luzviminda Village, Don Julian Rodriguez Sr. Ave, Maa Road",
        "barangay": "Talomo",
        "status": 1
    },
    {
        "billing_num": 100000357,
        "location_id": 100000012,
        "street_name": "39 Mahogany Street Nova Tierra Village",
        "barangay": "Lanang",
        "status": 1
    },
    {
        "billing_num": 100000358,
        "location_id": 100000013,
        "street_name": "3JQ4+F5C, Circumferential Rd",
        "barangay": "Bajada",
        "status": 1
    },
    {
        "billing_num": 100000359,
        "location_id": 100000014,
        "street_name": "Sigma St, Doña Vicenta Village",
        "barangay": "Bajada",
        "status": 1
    },
    {
        "billing_num": 100000360,
        "location_id": 100000015,
        "street_name": "51-A, 8000 Artiaga St",
        "barangay": "Poblacion District",
        "status": 1
    },
    {
        "billing_num": 100000361,
        "location_id": 100000016,
        "street_name": "Brgy. 40-D Basketball Court, 8 Nograles Avenue",
        "barangay": "Poblacion District",
        "status": 1
    },
    {
        "billing_num": 100000362,
        "location_id": 100000017,
        "street_name": "Juna Subdivision, 425 Tulip Drive",
        "barangay": "Matina",
        "status": 1
    },
    {
        "billing_num": 100000363,
        "location_id": 100000018,
        "street_name": "Gen. Douglas MacArthur Hwy, Talomo, Davao City, 8000 Davao del Sur",
        "barangay": "Matina",
        "status": 1
    },
    {
        "billing_num": 100000364,
        "location_id": 100000019,
        "street_name": "San Antonio de Padua Parish, Holy Cross Drive",
        "barangay": "Agdao",
        "status": 1
    }
]

export default function() {
    const BARANGAY_COLLECTION  = 'barangays';
    const CONSUMER_DATA_COLLECTION  = 'consumer_data';

    const [barangays, setBarangays] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);
    const [fConsumerData, setConsumerData] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);

    useEffect(() => {
        Promise.all([
            loadBarangays(),
            loadConsumerData()
        ])
    }, []);

    const loadBarangays = async () => {
        const querySnapshot = await getDocs(collection(db, BARANGAY_COLLECTION));
        setBarangays(querySnapshot.docs);
    }

    const loadConsumerData = async () => {
        const querySnapshot = await getDocs(collection(db, CONSUMER_DATA_COLLECTION));
        setConsumerData(querySnapshot.docs);
    }

    const prepopulateBarangays = () => {
        const uniqueBarangays = Array.from(new Set(consumerData.map(d => d.barangay)));
        Promise.all(uniqueBarangays.map((name, i) => setDoc(
            doc(db, BARANGAY_COLLECTION, (i + 100000360).toString()),
            { barangay_name: name }
        )))
            .then(() => loadBarangays())
            .catch(console.error);
    }

    const prepopulate = () => {
        Promise.all(consumerData.map(({ barangay, billing_num, location_id, ...payload }) => 
            setDoc(
                doc(db, CONSUMER_DATA_COLLECTION, billing_num.toString()),
                {
                    barangay_id: barangays.find(b => b.get('barangay_name') === barangay).id,
                    ...payload
                }
            )
        ))
            .then(() => loadConsumerData())
            .catch(console.error);
    }

    return (
        <Center>
            <Stack align="center">
                <Title>God Mode</Title>
                <Button disabled={barangays.length !== 0} onClick={prepopulateBarangays}>
                    Prepopulate barangays
                </Button>
                <Button disabled={fConsumerData.length !== 0} onClick={prepopulate}>
                    Prepopulate consumer data
                </Button>
            </Stack>
        </Center>
    );
}