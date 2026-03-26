import React from 'react'
import { useEffect, useState } from "react";

export default function formAddEdeitEmails({ formState, emails, onSaveEdit, onSave }) {

  const [name, setName] = useState("");
  const { action, targetId } = formState;

  useEffect(() => {
    const email = emails.find((c) => c._id === targetId);
    if (email) {
      if (action === "edit") {
        setName(email.name);
      } else {
        resetForm();
      }
    } else {
      resetForm()
    }

  }, [formState]);

  const resetForm = () => {
    setName("");
  }

  const onCancel = () => {
    resetForm()
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (action === "edit") {
      onSaveEdit({
        id: targetId,
        name,
      })
    } else {
      onSave({
        name
      })
    }
    resetForm();
  };


  return (
    <>
      <div className="lg:col-span-1">
        <div className="bg-white rounded-xl shadow-lg sticky top-24">
          <div className="px-6 py-4 border-b border-gray-200 ">
            <h2 className="text-xl font-bold text-gray-900">
              {action === "add" ? "Add" : "Edit"}{" "}
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
                  className={`w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2  focus:ring-blue-500  focus:border-transparent outline-none transition`}
                />
              </div>


              <div className="flex space-x-3">
                <button type="submit" className={`flex-1  bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg font-medium transition-colors`}>
                  Save
                </button>
                <button type="button" onClick={onCancel} className="border px-4 py-2 rounded-lg hover:bg-red-700 hover:text-white">
                  Cancel
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </>
  )
}
