'use client';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/lib/store';
import { increment, decrement } from '@/lib/features/counter.slice';



const GraphBuilderPage = () => {

    const count = useSelector((state: RootState) => state.counter.value);
    return (
        <div>
            <h1>graph builder page component</h1>
            <h1>{count}</h1>
        </div>
    );
}

export default GraphBuilderPage;
