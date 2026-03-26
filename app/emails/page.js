'use client'

import '@styles/categories.css';
import React, { useEffect, useState } from 'react'
import Emails from '@components/emails';
import StatsCard from '@components/statsCard';
import FormAddEditEmails from '@/components/formAddEditEmails';
import axios from 'axios';

export default function page() {

    const [emails, setemails] = useState([]);

    const [formState, setFormState] = useState({
        action: "add",     // add | edit
        targetId: null,
    });

    useEffect(() => {
        const getQuotation = async () => {
            try {
                const res = await axios.get('/api/emails');
                console.log(res);
                setemails(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getQuotation();
    }, []);

    const handleAddEmail = () => {
        setFormState({
            action: "add",
            targetId: null,
        });
    }

    const handleEdit = (id) => {
        setFormState({
            action: "edit",
            targetId: id,
        });
    };

    const handleDelete = async (data) => {
        try {
            await axios.delete(`/api/emails/${data._id}`);

            setemails((prev) =>
                prev.filter((p) => p._id !== data._id)
            );

        } catch (err) {
            console.log(err);
        }
    }

    const handleSaveEdit = async (data) => {
        try {
            await axios.put(`/api/emails/${data.id}`, data);

            setemails((prev) => {
                const updated = prev.map((p) =>
                    p._id === data.id ? { ...p, ...data } : p
                );

                return updated
            });


        } catch (err) {
            console.log(err);
        }
    }

    const handleSave = async (email) => {
        try {
            const res = await axios.post('/api/emails', email);

            setemails((prev) => {
                const updated = [...prev, res.data];

                return updated
            });
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <main className="ml-0 md:ml-64 pt-16 px-4 md:px-6 pb-8">
                <div className="max-w-7xl mx-auto">
                    {/* Page Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 ">Emails Saved</h1>
                        <button
                            onClick={() => window.location.href = "/"}
                            title="Go to Home"
                            className="p-2 bg-gray-100 hover:bg-cyan-500 text-gray-700 hover:text-white rounded-lg transition-all duration-200 shadow-sm"
                        >
                            <i className="fa-solid fa-house"></i>
                        </button>
                    </div>
                    {/* Stats Cards */}
                    <StatsCard />

                    {/* Main Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Categories List */}
                        <div className="lg:col-span-2">
                            <div className="bg-white  rounded-xl shadow-lg overflow-hidden">
                                <div className="px-6 py-4 border-b border-gray-200  flex justify-between items-center">
                                    <h2 className="text-xl font-bold text-gray-900 ">Emails</h2>
                                    <button id="addCategoryBtn" className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                                        onClick={handleAddEmail}>
                                        <i className="fa-regular fa-plus" ></i>
                                        <span>Add Email</span>
                                    </button>
                                </div>
                                <div className="p-4" id="categoriesList">
                                    {/* Categories will be loaded here */}
                                    {emails.map((email) => (
                                        <Emails
                                            key={email._id}
                                            email={email}
                                            sub={email}
                                            onEdit={handleEdit}
                                            onDelete={handleDelete}
                                        />
                                    ))}
                                </div>
                            </div>

                        </div>
                        <FormAddEditEmails
                            formState={formState}
                            emails={emails}
                            onSaveEdit={handleSaveEdit}
                            onSave={handleSave} />
                    </div>
                </div>
            </main>
        </>
    )
}
