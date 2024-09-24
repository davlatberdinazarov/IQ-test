import React from 'react';
import { Hourglass } from 'react-loader-spinner';

export default function Loading() {
    return (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black bg-opacity-30">
            <div className="p-3 bg-white shadow-lg rounded-md">
                <Hourglass
                    visible={true}
                    height="50"
                    width="50"
                    ariaLabel="hourglass-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    colors={['#306cce', '#72a1ed']}
                />
            </div>
        </div>
    );
}
