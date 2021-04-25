import React from 'react'

export default function Checkbox({value='', name = value, fnc}) {
    return (
        <li>
            <label class="checkbox">
                <input type="checkbox" value={value} onChange={fnc}/>
                <span>{name}</span>
            </label>
        </li>
    )
}
