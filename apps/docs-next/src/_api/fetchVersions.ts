import { GRAPHQL_API_URL } from ".";
import { VERSIONS } from "../_graphql/versions";

export const fetchVersions = async <T>(): Promise<T[]> => {
    const versions = await fetch(`${GRAPHQL_API_URL}/api/graphql`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-store',
        body: JSON.stringify({
            query: VERSIONS
        })
    })
    ?.then(res => res.json())
    ?.then(res => {
        if (res.errors) throw new Error(res?.errors?.[0]?.message ?? 'Error fetching versions')

        return res?.data?.Versions?.docs
    })

    return versions
};