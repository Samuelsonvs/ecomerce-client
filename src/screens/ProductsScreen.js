import React from 'react';
import Category from '../components/public/category';
import FilterableList from '../components/filterableList';
import Hype from '../components/hype';

const listed = [1,2,3,4];

export default function ProductsScreen() {
    return (
        <>
            <Hype />
            <div className="md:flex md:p-10">
                <Category />
                <FilterableList />
            </div>
        </>
    )
}
