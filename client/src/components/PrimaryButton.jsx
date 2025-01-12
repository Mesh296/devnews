import React from 'react'

export const PrimaryButton = ({ text, onClick, className }) => {
    return (
        <button 
        onClick={onClick}
        className={`px-3 py-2 laptop:px-4 laptop:py-3 laptop:text-sm bg-brand-color cursor-pointer text-dark-element-primary rounded-[7px] hover:bg-surface hover:text-element-primary border-2 border-transparent hover:border-brand-color transition-all duration-200 ${className}`}>
            {text}
        </button>
    )
}
