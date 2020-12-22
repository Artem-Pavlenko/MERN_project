import React from 'react'

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <div></div>
        )
    }
}