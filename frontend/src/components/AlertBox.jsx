import React, { useState } from 'react'

const AlertBox = ({ isOpen, closeAlert, onConfirm }) => {

    return (
        <div className={`fixed inset-0 flex justify-center items-center transition-colors
            ${isOpen ? 'visible bg-gray-500/75' : 'invisible'
            }`}
        >
            <div className={`bg-white dark:bg-[#211641] rounded-lg w-lg p-7 shadow-2xl transition-all
                    ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
                }`}
            >
                <h2 className="text-lg font-bold dark:text-white">Are you sure you want to do that?</h2>

                <p className="mt-2 text-sm text-gray-500 dark:text-[#B5B0C7]">
                This action cannot be undone. This will permanently delete your current budget along with expenses and remove your data from our servers.
                </p>

                <div className="mt-4 flex gap-2">
                    <button onClick={onConfirm}
                        type="button"
                        className="rounded-sm bg-green-50 dark:bg-green-950 px-4 py-2 text-sm font-medium text-green-600"
                    >
                        Yes, I'm sure
                    </button>

                    <button onClick={closeAlert} type="button" className="rounded-sm bg-gray-50 dark:bg-gray-700 px-4 py-2 text-sm font-medium dark:text-gray-300 text-gray-600">
                        No, go back
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AlertBox