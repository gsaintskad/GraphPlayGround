// app/components/Counter.tsx
'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/lib/store';
import { increment, decrement } from '@/lib/features/counter.slice';

export default function Counter() {
    // Get the current count from the Redux store
    const count = useSelector((state: RootState) => state.counter.value);
    // Get the dispatch function to send actions
    const dispatch = useDispatch<AppDispatch>();

    return (
        <div>
            <h2>Counter: {count}</h2>
            <button onClick={() => dispatch(increment())}>Increment</button>
            <button onClick={() => dispatch(decrement())}>Decrement</button>
        </div>
    );
}