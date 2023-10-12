// import FilterButton from "../../components/admin/FilterButton";


const FilterTest = () => {
    return (
        <>
            <h1>Filter test</h1>

            <div className="filters">
                <button className="filter-1">Filter 1</button>
                <button className="filter-2">Filter 2</button>
                <button className="filter-3">Filter 3</button>
                <button className="filter-4">Filter 4</button>
                <button className="filter-5">Filter 5</button>
            </div>

            <div>
                <div className="container bg-danger object-1">Object 1</div>
                <div className="container bg-danger object-2">Object 2</div>
                <div className="container bg-danger object-3">Object 3</div>
                <div className="container bg-danger object-4">Object 4</div>
                <div className="container bg-danger object-5">Object 5</div>
            </div>
        </>
    );
}

export default FilterTest;
