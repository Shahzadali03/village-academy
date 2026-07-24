import React from 'react'

const Breadcumb = ({pageTitle}) => {
    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><i className="bi bi-house"></i></li>
                <li className="breadcrumb-item active" aria-current="page">{pageTitle}</li>
            </ol>
        </nav>
    )
}

export default Breadcumb
