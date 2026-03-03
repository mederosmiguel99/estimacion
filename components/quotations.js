import React from 'react'

export default function quotations({ sub }) {
    return (
        <>
            <div key={sub._id} className={`subcategory-card bg-white border border-gray-300 rounded-lg p-4 mb-3 dark:hover:border-fuchsia-300 transition`}>
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
                        <span className={`badge bg-fuchsia-300 text-primary-800 dark:text-primary-300`}>
                            {`Price: ${sub.price} `}
                        </span>

                    </div>
                </div>
            </div>
        </>
    )
}
