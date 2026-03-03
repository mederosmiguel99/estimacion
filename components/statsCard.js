
import Link from 'next/link'
import React from 'react'

export default function statsCard() {
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow p-6">
                    <Link href="/quotations" className="w-full bg-fuchsia-700 hover:bg-fuchsia-800 text-white py-2 rounded-lg flex items-center justify-center">
                        <i data-feather="plus" className="mr-1" /> Quotation saved
                    </Link>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <Link href="/proyects" className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-2 rounded-lg flex items-center justify-center">
                        <i data-feather="plus" className="mr-1" /> Proyects
                    </Link>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <Link href="/emails" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg flex items-center justify-center">
                        <i data-feather="plus" className="mr-1" /> Emails
                    </Link>
                </div>
            </div>
        </>
    )
}
