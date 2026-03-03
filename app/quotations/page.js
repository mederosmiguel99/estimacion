'use client'

import React, { useEffect, useState } from 'react'
import Quotations from '@components/quotations';
import StatsCard from '@components/statsCard';
import axios from 'axios';

export default function page() {

    const [quotations, setquotations] = useState([]);

    useEffect(() => {
        const getQuotation = async () => {
            try {
                const res = await axios.get('/api/quotations/saved');
                console.log(res);
                setquotations(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getQuotation();
    }, []);

    return (
        <>
            <main className="ml-0 md:ml-64 pt-16 px-4 md:px-6 pb-8">
                <div className="max-w-7xl mx-auto">
                    {/* Page Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 ">Project Dashboard</h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">Manage and organize your projects and qoutations
                            efficiently</p>
                    </div>
                    {/* Stats Cards */}
                    <StatsCard />

                    {/* Main Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Categories List */}
                        <div className="lg:col-span-2">
                            <div className="bg-white  rounded-xl shadow-lg overflow-hidden">
                                <div className="px-6 py-4 border-b border-gray-200  flex justify-between items-center">
                                    <h2 className="text-xl font-bold text-gray-900 ">Projects</h2>
                                    
                                </div>
                                <div className="p-4" id="categoriesList">
                                    {/* Categories will be loaded here */}
                                    {quotations.map((quotation) => (
                                        <Quotations
                                            sub={quotation}
                                        />
                                    ))}
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </main>

        </>
    )
}
