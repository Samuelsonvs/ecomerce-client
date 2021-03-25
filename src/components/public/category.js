import React, { useState } from 'react';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';

export default function Category() {
    const [ country, setCountry ] = useState('Turkey');
    const [ region, setRegion ] = useState('İl');

    const selectCountry = (val) => {
        setCountry(val)
    };

    const selectRegion = (val) => {
        setRegion(val)
    };
    return (
        <aside className="w-full border border-gray-500 rounded-2xl border-solid bg-indigo-700 p-5 md:w-96">
            <div className="mt-10 ml-3 text-white">
                <h3 className="mb-5 border-b pb-5 font-semibold text-3xl">Kategoriler</h3>
                <ul id="style-1" className=" mt-10">
                    <li>
                        <label class="checkbox">
                            <input type="checkbox" />
                            <span>Muhabbet Kuşu</span>
                        </label>
                    </li>
                    <li>
                        <label class="checkbox">
                            <input type="checkbox" />
                            <span>Sultan Papağanı</span>
                        </label>
                    </li>
                    <li>
                        <label class="checkbox">
                            <input type="checkbox" />
                            <span>Papağan</span>
                        </label>
                    </li>
                    <li>
                        <label class="checkbox">
                            <input type="checkbox" />
                            <span>Cennet Papağanı</span>
                        </label>
                    </li>
                    <li>
                        <label class="checkbox">
                            <input type="checkbox" />
                            <span>Kanarya</span>
                        </label>
                    </li>
                    <li>
                        <label class="checkbox">
                            <input type="checkbox" />
                            <span>Hint Bülbülü</span>
                        </label>
                    </li>
                </ul>
            </div>
            <div className="mt-20 ml-3">
                <h3 className="mb-5 border-b pb-5 font-semibold text-2xl text-white">Age</h3>
                <ul className="text-white block p-4">
                    <li>
                        <label class="checkbox">
                            <input type="checkbox" />
                            <span>0 - 6 month</span>
                        </label>
                    </li>
                    <li>
                        <label class="checkbox">
                            <input type="checkbox" />
                            <span>6 - 12 month</span>
                        </label>
                    </li>
                    <li>
                        <label class="checkbox">
                            <input type="checkbox" />
                            <span>1 - 2 year</span>
                        </label>
                    </li>
                    <li>
                        <label class="checkbox">
                            <input type="checkbox" />
                            <span>2 + year</span>
                        </label>
                    </li>
                </ul>
            </div>
            <div className="mt-20">
                <h3 className="mb-5 border-b pb-5 font-semibold text-2xl text-white">Province</h3>
                {/* <CountryDropdown
                    value={country}
                    onChange={(val) => selectCountry(val)} 
                    /> */}
                <RegionDropdown
                    country={country}
                    value={region}
                    onChange={(val) => selectRegion(val)}
                    />
            </div>
        </aside>
    )
}
