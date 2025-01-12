import React from 'react'

export const InputField = ({ labelFor, text, placeholder, inputType, inputName, inputId, classNameInput, classNameLabel, onChange }) => {
    return (
        <div>
            <label htmlFor={labelFor}
                className={` mb-2 text-sm font-medium text-element-primary ${classNameLabel}`}
            >
                {text}
            </label>
            <input type={inputType} name={inputName} id={inputId} placeholder={placeholder}
                className={`border border-stroke-bold rounded-lg text-element-primary focus:border-element-primary focus:ring-element-primary bg-on-surface-1 ${classNameInput}`}
            onChange={onChange} required
            />
        </div>
    )
}
