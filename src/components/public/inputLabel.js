import React from 'react'

export default function InputLabel({type, value='', tag, name, callback}) {
    return (
        <div className="mt-10">
            <label className="text-gray-600 font-semibold" htmlFor={tag}>{name}</label>
            <input
                className="mt-2 block w-full p-2 h-16 border border-transparent rounded-md"
                type={type}
                id={tag}
                defaultValue={value}
                required
                onChange={(e) => callback(e.target.value)}
                ></input>
        </div>
    )
}
