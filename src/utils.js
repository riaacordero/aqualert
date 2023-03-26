import { CollectionReference, FieldPath, getDocs, query, QueryDocumentSnapshot, where } from "firebase/firestore";

export const STATUS_TYPES = [
    { value: 'interruptionReported', label: 'Interruption Reported', color: '#5C5F66' },
    { value: 'interrupted', label: 'Interrupted', color: '#F03E3E' },
    { value: 'ongoingRepair', label: 'Ongoing Repair', color: '#228BE6' },
    { value: 'scheduledInterruption', label: 'Scheduled Interruption', color: '#F08C00' },
    { value: 'good', label: 'Good', color: '#40C057' }
];

/**
 *
 * @param {CollectionReference<import("firebase/firestore").DocumentData>} collection
 * @param {string | FieldPath} fieldName
 * @param {string[]} set
 * @returns {Promise<QueryDocumentSnapshot<import('firebase/firestore').DocumentData>[]>}
 */
export async function batchLoadData(collection, fieldName, set) {
    const uniqueSet = Array.from(new Set(set.filter(Boolean)));
    const promises = [];

    for (let i = 0; i < uniqueSet.length; i += 10) {
        const subset = uniqueSet.slice(i, i+10);
        if (subset.length === 0) {
            break;
        }

        promises.push(() => getDocs(
            query(collection, where(fieldName, 'in', subset))
        ));
    }

    if (promises.length === 1) {
        return (await promises[0]()).docs;
    }

    const results = await Promise.all(promises.map(p => p()));
    return results.reduce((snapshot, cv) => {
        snapshot.push(...cv.docs);
        return snapshot;
    }, []);
}
