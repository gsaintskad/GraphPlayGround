// components/NavigationBar/BreadCrumb.tsx
'use client'; // Add this directive

import React, { useMemo } from 'react';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { usePathname } from 'next/navigation'; // Import usePathname
import Link from 'next/link'; // Import next/link

const BreadCrumb = () => {
    const pathname = usePathname(); // Use usePathname

    const pathSegments = useMemo(() => {
        return pathname.split('/').filter((i) => i);
    }, [pathname]);

    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <Link href="/">Algorithmer</Link> {/* Use href */}
                </BreadcrumbItem>
                {!!pathSegments.length && <BreadcrumbSeparator />}
                {pathSegments.length > 2 && (
                    <>
                        ...
                        <BreadcrumbSeparator />
                    </>
                )}
                {pathSegments.map((segment, index) => {
                    if (index < pathSegments.length - 2 || segment === '') {
                        return null; // Return null for cleaner code
                    }
                    const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
                    return (
                        <React.Fragment key={`breadcrumb-${index}`}>
                            <BreadcrumbItem>
                                <Link href={href}>{segment}</Link>
                            </BreadcrumbItem>
                            {index < pathSegments.length - 1 && <BreadcrumbSeparator />}
                        </React.Fragment>
                    );
                })}
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default BreadCrumb;