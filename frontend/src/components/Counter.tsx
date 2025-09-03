// app/components/Counter.tsx
'use client';

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/lib/store';
import {
    increment,
    decrement,
    incrementByAmount, // 1. Import the action
} from '@/lib/features/counter.slice'

export default function Counter() {
    const count = useSelector((state: RootState) => state.counter.value);
    const dispatch = useDispatch<AppDispatch>();

    // 2. Add local state for the input field
    const [incrementAmount, setIncrementAmount] = useState('2');

    return (
        <div>
            <h2>Counter: {count}</h2>
            <div>
                <button onClick={() => dispatch(increment())}>Increment (+1)</button>
                <button onClick={() => dispatch(decrement())}>Decrement (-1)</button>
            </div>

            {/* 3. Add UI for the new functionality */}
            <div style={{ marginTop: '10px' }}>
                <input
                    aria-label="Set increment amount"
                    value={incrementAmount}
                    onChange={(e) => setIncrementAmount(e.target.value)}
                    style={{ marginRight: '10px' }}
                />
                <button
                    onClick={() =>
                        // Dispatch the action with the input value as the payload
                        dispatch(incrementByAmount(Number(incrementAmount) || 0))
                    }
                >
                    Add Amount
                </button>
            </div>
        </div>
    );
}