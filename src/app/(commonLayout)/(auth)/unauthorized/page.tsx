import Link from 'next/link';
import React from 'react';

const UnAutorizedPage = () => {
    return (
        <div>
            <h1 className="text-3xl font-bold text-center mt-20">Unauthorized Access</h1>
            <p className="text-center mt-4 text-lg">You do not have permission to view this page.</p>
            <Link href={"/"}>Home</Link>
        </div>
    );
};

export default UnAutorizedPage;