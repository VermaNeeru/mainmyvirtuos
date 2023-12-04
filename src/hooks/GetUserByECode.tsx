import { useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_Officialinfo_BY_ECODE } from '@/graphql/Officialinfo/queries';

export function useGetUserByECode(employeeCode: unknown) {
    const [executeQuery, { loading, error, data }] = useLazyQuery(GET_Officialinfo_BY_ECODE);

    useEffect(() => {
        executeQuery({ variables: { ecode: employeeCode } });
    }, [employeeCode, executeQuery]);

    useEffect(() => {
        if (data && data.userDetailByCode) {
            const { userDetailByCode } = data;
            console.log('user_id', userDetailByCode.user_id);
            // setEmpUserId(userDetailByCode.user_id)
            return userDetailByCode.user_id;
        }
    }, [data]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    // Note: You need to return something meaningful here, as this is a hook
    return null;
}

