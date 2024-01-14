export default function sanitizeArray({ array, arrayId, arrayValue }) {
    if (array) {
        return array.map(({ [arrayId]: id, [arrayValue]: value, ...rest }) => ({
            id,
            value,
            ...rest,
        }));
    }

    return [];
}