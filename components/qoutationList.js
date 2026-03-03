import React from 'react'

export default function subCategoriesList({ project, onAddSubCategory, onEdit, onDelete }) {
    if (!project) {
        return (
            <div className="text-center py-12">
                <i className="fa-regular fa-folder fa-3x text-gray-400 mx-auto mb-4"></i>
                <p className="text-gray-500 dark:text-gray-400">Select a proyect to view its qoutations
                </p>
            </div>
        );
    }

    if (project.quotations.length === 0) {
        return (
            <div className="text-center py-12">
                <i data-feather="folder-plus" className="w-12 h-12 text-gray-400 mx-auto mb-4"></i>
                <p className="text-gray-500 dark:text-gray-400">No qoutation yet</p>
                <button onClick={() => { onAddSubCategory('newSubcategori') }} className="mt-4 text-primary-600 dark:text-primary-400 hover:underline">
                    Add your first qoutation
                </button>
            </div>
        );
    }

    return (
        <>
            {project.quotations.map((sub, index) => (

                <div key={index} className={`subcategory-card ${sub.isReceived ? "bg-green-50" : "bg-white"} border border-gray-300 rounded-lg p-4 mb-3 dark:hover:border-fuchsia-300 transition`}>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-fuchsia-100 rounded-lg">
                                <i className="fa-regular fa-folder text-fuchsia-700 "></i>
                            </div>
                            <div>
                                <h4 className="font-medium text-gray-900 ">{sub.name}</h4>
                                <div className='flex'>
                                    <p className="text-sm text-gray-600 mt-1">
                                        {`${sub.requestDate
                                            ? new Date(sub.requestDate).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric",
                                            })
                                            : ""} - ${sub.responseDate
                                                ? new Date(sub.responseDate).toLocaleDateString("en-US", {
                                                    year: "numeric",
                                                    month: "short",
                                                    day: "numeric",
                                                })
                                                : "-"}`}</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className={`badge ${sub.isReceived ? "bg-green-300" : "bg-fuchsia-300"} text-primary-800 dark:text-primary-300`}>
                                {sub.isReceived ? 'Received' : 'unReceived'}
                            </span>
                            <button className="p-2 text-gray-500 hover:text-fuchsia-800 hover:bg-gray-100 rounded-md transition"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onEdit(sub._id);
                                }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-edit-2 w-4 h-4">
                                    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z">
                                    </path>
                                </svg>
                            </button>

                            <button className="p-2 text-gray-500 hover:text-red-600  hover:bg-gray-100 rounded-md transition"
                                onClick={(e) => {
                                    e.stopPropagation();

                                    const confirmDelete = window.confirm("Are you sure you want to delete this project?");

                                    if (!confirmDelete) return;

                                    onDelete('subcategory', sub);
                                }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-trash-2 w-4 h-4">
                                    <polyline points="3 6 5 6 21 6" />
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2">
                                    </path>
                                    <line x1={10} y1={11} x2={10} y2={17} />
                                    <line x1={14} y1={11} x2={14} y2={17} />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            ))}

        </>
    );
}

// <div className="text-center py-12">
//                 <i data-feather="folder" className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//                 <p className="text-gray-500 dark:text-gray-400">Select a category to view its subcategories
//                 </p>
//             </div>