import React from 'react'
import { useEffect, useState } from "react";

export default function addEditCategori({
    categories,
    selectedCategory,
    subcategories,
    formState,
    onSaveCategory,
    onSaveSubcategory,
    onUpdateCategoryAndSubcategory,
    onSwitchCategorySubcategory
}) {

    const { mode, action, targetId } = formState;

    const [name, setName] = useState("");

    // 🟦 PROJECT
    const [requestDate, setRequestDate] = useState("");
    const [expirationDate, setExpirationDate] = useState("");
    const [isCompleted, setIsCompleted] = useState(false);

    // 🟪 QUOTATION
    const [price, setPrice] = useState("");
    const [isReceived, setIsReceived] = useState(false);
    const [responseDate, setResponseDate] = useState("");
    const [isSaved, setIsSaved] = useState(false);

    const [projectId, setProjectId] = useState('');

    useEffect(() => {
        setProjectId(selectedCategory ? selectedCategory?._id : '')

        if (action === "edit") {
            if (mode === "project") {
                const project = categories.find((c) => c._id === targetId);
                if (project) {
                    setName(project.name);
                    setRequestDate(formatDate(project.requestDate));
                    setExpirationDate(formatDate(project.expirationDate));
                    setIsCompleted(project.isCompleted || false);
                }
            }

            if (mode === "quotation") {
                const sub = subcategories?.find((s) => s._id === targetId);
                if (sub) {
                    setName(sub.name);
                    setPrice(sub.price || "");
                    setRequestDate(formatDate(sub.requestDate));
                    setResponseDate(formatDate(sub.responseDate));
                    setIsReceived(sub.isReceived || false);
                    setIsSaved(sub.isSaved || false);
                    setProjectId(selectedCategory?._id);
                }
            }
        } else {
            resetForm();
        }
    }, [formState]);

    const formatDate = (date) => {
        if (!date) return "";
        return new Date(date).toISOString().split("T")[0];
    };

    const resetForm = () => {
        setName("");
        setRequestDate("");
        setExpirationDate("");
        setIsCompleted(false);
        setPrice("");
        setIsReceived(false);
        setResponseDate("");
        setIsSaved(false);
    };

    const onCancel = () => {
        resetForm()
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (mode === "project") {
            if (action === "edit") {
                onUpdateCategoryAndSubcategory('project', {
                    id: targetId,
                    name,
                    requestDate,
                    expirationDate,
                    isCompleted
                })
            } else {
                onSaveCategory({
                    name,
                    requestDate,
                    expirationDate,
                    isCompleted
                });
            }

        } else {
            if (action === "edit") {
                onUpdateCategoryAndSubcategory('quotation', {
                    id: targetId,
                    projectId,
                    name,
                    price,
                    requestDate,
                    responseDate,
                    isReceived,
                    isSaved
                })
            } else {
                onSaveSubcategory({
                    projectId,
                    name,
                    price,
                    requestDate,
                    responseDate,
                    isReceived,
                    isSaved
                });
            }
        }

        resetForm();
        onCancel();
    };


    return (
        <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg sticky top-24">
                <div className="px-6 py-4 border-b border-gray-200 ">
                    <h2 className="text-xl font-bold text-gray-900">
                        {action === "add" ? "Add" : "Edit"}{" "}
                        {mode === "project" ? "Project" : "Quotation"}
                    </h2>
                </div>
                <div className="p-6">
                    <form onSubmit={handleSubmit} className="p-6 space-y-6">

                        {/* NAME */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                placeholder="Name"
                                className={`w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 ${mode === 'project' ? 'focus:ring-blue-500 ' : 'focus:ring-fuchsia-300'} focus:border-transparent outline-none transition`}
                            />
                        </div>

                        {/* 🟦 PROJECT */}
                        {mode === "project" && (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Request Date</label>
                                    <input
                                        type="date"
                                        value={requestDate}
                                        onChange={(e) => setRequestDate(e.target.value)}
                                        required
                                        className={`w-full px-4 py-2.5 bg-gray-50 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition`}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Expiration Date</label>
                                    <input
                                        type="date"
                                        value={expirationDate}
                                        onChange={(e) => setExpirationDate(e.target.value)}
                                        required
                                        className={`w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500`}
                                    />
                                </div>

                                <div className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        checked={isCompleted}
                                        onChange={(e) => setIsCompleted(e.target.checked)}
                                    />
                                    <span>Completed</span>
                                </div>
                            </>
                        )}

                        {/* 🟪 QUOTATION */}
                        {mode === "quotation" && (
                            <>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Request Date</label>
                                    <input
                                        type="date"
                                        value={requestDate}
                                        onChange={(e) => setRequestDate(e.target.value)}
                                        required
                                        className={`w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fuchsia-300`}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Response Date</label>
                                    <input
                                        type="date"
                                        value={responseDate}
                                        onChange={(e) => setResponseDate(e.target.value)}
                                        className={`w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fuchsia-300`}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                                    <input
                                        type="number"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        placeholder="Price"
                                        className={`w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fuchsia-300`}
                                    />
                                </div>

                                <div className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        checked={isReceived}
                                        onChange={(e) => setIsReceived(e.target.checked)}
                                    />
                                    <span>Received</span>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        checked={isSaved}
                                        onChange={(e) => setIsSaved(e.target.checked)}
                                    />
                                    <span>Saved</span>
                                </div>

                                
                            </>
                        )}

                        <div className="flex space-x-3">
                            <button type="submit" className={`flex-1 ${mode === 'project' ? 'bg-cyan-500 hover:bg-cyan-600' : 'bg-fuchsia-700 hover:bg-fuchsia-800'} text-white px-6 py-3 rounded-lg font-medium transition-colors`}>
                                Save
                            </button>
                            <button type="button" onClick={onCancel} className="border px-4 py-2 rounded-lg hover:bg-red-700 hover:text-white">
                                Cancel
                            </button>
                        </div>

                        <div className="pt-6 border-t border-gray-200 ">
                            <button
                                type="button"
                                className={`w-full ${mode === 'project' ? 'bg-fuchsia-700 hover:bg-fuchsia-800' : 'bg-cyan-500 hover:bg-cyan-600'} text-white px-6 py-3 rounded-lg font-medium transition-colors`}
                                onClick={() => { onSwitchCategorySubcategory(mode) }}
                            >
                                {mode === 'quotation' ? 'Switch to Add Project' : 'Switch to Add Quotation'}
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}