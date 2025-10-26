import PublicFooter from '@/components/shared/PublicFooter';
import PublicNavbar from '@/components/shared/PublicNavbar';
import React from 'react';

const CommonLayout = ({children} : {children: React.ReactNode}) => {
    return (
        <>
        <PublicNavbar></PublicNavbar>
            {children}
            <PublicFooter></PublicFooter>
        </>
    );
};

export default CommonLayout;