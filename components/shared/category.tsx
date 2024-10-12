/* eslint-disable react/display-name */
import { memo } from "react";


export const CategoryItem: React.FC = () => {
    return (
        <div>
            <h3>Category Item</h3>
        </div>
    )
}

export const Category = memo(() => {
    return (
        <div>
            <h2>Category</h2>
        </div>
    )
})