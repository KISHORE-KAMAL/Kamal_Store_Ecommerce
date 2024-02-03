const filterReducer = (state,action) => {

  switch (action.type) {

    case "LOAD_FILTER_PRODUCTS": 

      //^ to get max price
      let priceArr = action.payload.map((curElem)=>
      {
        return curElem.price
      })

      //~ first method (math function)
      // console.log(Math.max.apply(null, priceArr));  //*math.max method takes only numbers in normal like (1,2,3,4) but our price is in array so we use apply method also.... while using apply method we should pass first argument as null,undefined or math and then 2nd argument the array... if u dont specify the first argument u will get value as infinity...

      //~ second method (reduce method) recomended
      // let maxPrice = priceArr.reduce((initialVal, curVal)=>
      // {
      //   return Math.max(initialVal, curVal);
      // },0)
      // console.log(maxPrice);

      //~ third method (spread operator) 
      let maxPrice = Math.max(...priceArr);
      // console.log(maxPrice);


        return {...state, 
            filter_products: [...action.payload], //*creating copy of original if any changes happen in the data...
            all_products: [...action.payload],
            filters:{
              ...state.filters,
              maxPrice: maxPrice,   //when we have key and value pair same name then we can write only one time
              price: maxPrice,
            }
        };

    case "SET_GRID_VIEW": 
        return {...state, 
            grid_view: true
        };

    case "SET_LIST_VIEW": 
        return {...state, 
            grid_view: false
        };

    case "GET_SORT_VALUE": 
        // let userSortValue = document.getElementById("sort")
        // let sort_value = userSortValue.options[userSortValue.selectedIndex].value
        //* (Not good practice use event.target.value in function while clicking the sorting function in filterContext)
        // (OR) let sort_value = userSortValue.value
        return {...state, 
            // sorting_value: sort_value
            sorting_value: action.payload   //*getting value from dispatch payload
        };

    case "SORTING_PRODUCTS": 

        // ^ sorting bad practice

        // let newSortData;
        // let tempSortProduct = [...action.payload]    //*instead of this we can use filter_products data

        //~ sorting lowest price
        // if(state.sorting_value === "lowest")
        // {
        //   newSortData = tempSortProduct.sort((a,b)=>
        //   {
        //     return a.price - b.price
        //   })
        // }

        //~ sorting highest price
        // if(state.sorting_value === "highest")
        // {
        //   newSortData = tempSortProduct.sort((a,b)=>
        //   {
        //     return b.price - a.price
        //   })
        // }

        //~ sorting ascending names
        // if(state.sorting_value === "a-z")
        // {
          // newSortData = tempSortProduct.sort((a,b)=>
          // {
            // return a.name.localeCompare(b.name)  
            //*localeCompare is a string method to compare strings 
            //*returns { -1 if(a<b) }--------{ 1 if(a>b) }---------{ 0 if(a===b) }
          // })
        // }

        //~ sorting descending names
        // if(state.sorting_value === "z-a")
        // {
        //   newSortData = tempSortProduct.sort((a,b)=>
        //   {
        //     return b.name.localeCompare(a.name)
        //   })
        // }



        // ^ sorting good practice

        let newSortData;
        let {filter_products, sorting_value} = state;
        let tempSortProduct = [...filter_products]

        const sortingProducts = (a,b)=>
        {
          if(sorting_value === "lowest")
          {
            return a.price - b.price
          }
          if(sorting_value === "highest")
          {
            return b.price - a.price
          }
          if(sorting_value === "a-z")
          {
            return a.name.localeCompare(b.name)
          }
          if(sorting_value === "z-a")
          {
            return b.name.localeCompare(a.name)
          }
        }

        newSortData = tempSortProduct.sort(sortingProducts)

        return{...state,
          filter_products: newSortData
        };

    case "UPDATE_FILTERS_VALUE":
      let {name,value} = action.payload;
      return {...state, filters: {
        ...state.filters, [name]:value    //In search input for name attribute we have given as text so it updates value to the text key in filters object inside state.... should give both same names else it creates another key and updates....
      }};

    case "FILTER_PRODUCTS":
      
      let {all_products} = state;
      let tempFilterProduct = [...all_products]

      const {text, category, company, color, price} = state.filters;
      if(text)
      {
        tempFilterProduct = tempFilterProduct.filter((curElem) => {
          return curElem.name.toLowerCase().includes(text);
        })
      }
      if(category !== "all")
      {
        tempFilterProduct = tempFilterProduct.filter((curElem) => {
          return curElem.category === category;
        })
      }
      if(company !== "all")
      {
        tempFilterProduct = tempFilterProduct.filter((curElem) => {
          return curElem.company.toLowerCase() === company.toLowerCase();
        })
      }
      if(color !== "all")
      {
        tempFilterProduct = tempFilterProduct.filter((curElem) => {
          return curElem.colors.includes(color);
        })
      }
      if(price === 0)
      {
        tempFilterProduct = tempFilterProduct.filter((curElem) => {
          return curElem.price === price;
        })
      }else{
        tempFilterProduct = tempFilterProduct.filter((curElem) => {
          return curElem.price <= price;
        })
      }

      return {...state,
        filter_products: tempFilterProduct
      };


    case "CLEAR_FILTERS":
      return {
        ...state,
        filters:{
          ...state.filters,
          text:"",
          category: "all",
          company: "all",
          color: "all",
          maxPrice: state.filters.maxPrice,
          price: state.filters.maxPrice,
          minPrice: 0,
        }
      };

    default: return state;
  }
}

export default filterReducer