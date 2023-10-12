const FilterButton = () => {
    handleChange(){
        // get selected option
        sqlQuery += str(selectedOption)
    }

    return(
        <select onChange={handleChange} name="filter-name" id="filter-name">
            <option value="option-1">option-1</option>
            <option value="option-2">option-2</option>
            <option value="option-3">option-3</option>
        </select>
    );
}

export default FilterButton;