import { createContext, useContext, useEffect, useReducer } from "react";
import { useProductContext } from "./productContext";
import reducer from "../Reducer/filterReducer";

const FilterContext = createContext()

const initialState = {
    filter_products: [],     //for displaying products after filter
    all_products: [],       //to perform filter operations
    grid_view: true,
    sorting_value: "lowest",
    filters:{
        text:"",
        category: "all",
        company: "all",
        color: "all",
        maxPrice: 0,
        price: 0,
        minPrice: 0,
    }
}

export const FilterContextProvider = ({children})=>{

    const {products} = useProductContext()

    const [state,dispatch] = useReducer(reducer,initialState)

    //to set the grid view
    const setGridView = ()=>
    {
        return dispatch({type:"SET_GRID_VIEW"})
    }

    //to set the list view
    const setListView = ()=>
    {
        return dispatch({type:"SET_LIST_VIEW"})
    }

    // sorting function
    const sorting = (event)=>
    {
        let userValue = event.target.value
        dispatch({type:"GET_SORT_VALUE", payload: userValue})
    }

    // update the filter values for search
    const updateFilterValue = (event)=>
    {
        let name = event.target.name;
        let value = event.target.value;

        return dispatch({type:"UPDATE_FILTERS_VALUE", payload:{name,value}})
    }

    // to clear the filter
    const clearFilters = ()=>
    {
        dispatch({type:"CLEAR_FILTERS"})
    }

    //to sort the product
    useEffect(()=>
    {
        // console.log(state.sorting_value);
        // dispatch({type:"SORTING_PRODUCTS", payload: products})   //instead of this we can get payload from filter_products in filterReducer component in SORTING_PRODUCTS 

        dispatch({type:"FILTER_PRODUCTS"})
        dispatch({type:"SORTING_PRODUCTS"})
    },[products, state.sorting_value, state.filters])

    useEffect(()=>
    {
        dispatch({type:"LOAD_FILTER_PRODUCTS", payload: products})
    },[products]) //should pass dependency because it will not dispatch the products or products data will not be updated to filter_products...

    return (
        <FilterContext.Provider value={{...state, setGridView, setListView, sorting, updateFilterValue, clearFilters}}>
            {children}
        </FilterContext.Provider>
    );
}

export const useFilterContext = ()=>
{
    return useContext(FilterContext)
}