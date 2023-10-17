import React, { useEffect } from 'react';

import { GET_Officialinfo_BY_ECODE } from '@/graphql/Officialinfo/queries';
import { useMutation, useLazyQuery, useQuery } from '@apollo/client';


export function GetUserByECode(employeeCode: unknown) {
    console.log('employeeCode', employeeCode);
    // const [executeQuery, { loading, error, data }] = useLazyQuery(GET_Officialinfo_BY_ECODE);
    // console.log(GET_Officialinfo_BY_ECODE.loc.source.body);

    let userId = 6;
    // useEffect(() => {
    //     console.log(employeeCode);
    //     executeQuery({ variables: { ecode: employeeCode } });
    //     console.log(data);
    // }, [employeeCode]);

    // console.log(data);
    // useEffect(() => {
    //     if (data && data.userDetailByCode) {
    //         const { userDetailByCode } = data; // Destructure the division object
    //         console.log('user_id', userDetailByCode.user_id);
    //         userId = userDetailByCode.user_id;
    //         // setEmpUserId(userDetailByCode.user_id)
    //         // return userDetailByCode.user_id;
    //     }
    // }, [data]);

    // if (loading) return <p>Loading...</p>;
    // if (error) return <p>Error: {error.message}</p>;

    return userId;


}
