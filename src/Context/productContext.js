import React, { createContext, useContext, useEffect, useReducer } from 'react'
import reducer from "../Reducer/productReducer"
import axios from "axios"

const AppContext = createContext();

const API = "https://api.pujakaitem.com/api/products";

const initialState = {
    isLoading: false,
    isError: false,
    products: [],
    featureProducts: [],
    isSingleLoading: false,
    singleProduct: {}
}

const AppProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const getProducts = async (url)=>
    {
        dispatch({type:"SET_LOADING"})
        try
        {
            const res = await axios.get(url);
            const products = await res.data;
            // console.log("products",products);
            dispatch({type:"SET_API_DATA", payload: products})
        }
        catch(err)
        {
            console.log(err);
            dispatch({type:"API_ERROR"})
        }
    }

    // my 2nd api call for single product
    const getSingleProduct = async (url)=>
    {
        dispatch({type:"SET_SINGLE_LOADING"})
        try
        {
            const res = await axios.get(url);
            const singleProduct = await res.data;
            // console.log("singleProduct",singleProduct);
            dispatch({type:"SET_SINGLE_PRODUCT", payload: singleProduct})

        }
        catch(err)
        {
            console.log(err);
            dispatch({type:"SET_SINGLE_ERROR"})
        } 
    }

    useEffect(()=>
    {
        getProducts(API)
    },[])

  return (
    <AppContext.Provider value={{...state, getSingleProduct}} > {children} </AppContext.Provider>
  )
}

// custom hook
const useProductContext = ()=>
{
   return useContext(AppContext)
}

export { AppProvider, AppContext, useProductContext }