import React from 'react'

export default function Checkbox({value='', checked=false, name = value, fnc}) {
    return (
        <li>
            <label className="checkbox">
                <input type="checkbox" defaultChecked={checked} value={value} onChange={fnc}/>
                <span>{name}</span>
            </label>
        </li>
    )
}
