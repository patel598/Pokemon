import React from 'react'

const CardNotFound = () => {
    return (
        <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No Pokemon Found
            </h3>
            <p className="text-gray-500">
                Try adjusting your search or filter criteria
            </p>
        </div>
    )
}

export default CardNotFound