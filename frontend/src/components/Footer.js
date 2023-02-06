import React from 'react'

const Footer = () => {
    const portfolioUrl = 'https://www.martinezjuancruz.com';
    return (
        <>
            <hr></hr> 
            <h1>Desarrollado por&nbsp;
                <a href={portfolioUrl} id="portfolio-link" target="_blank" rel="noreferrer">
                    Martinez Juan Cruz
                </a>
            </h1>
            <hr></hr>   
        </>
    )
}

export default Footer