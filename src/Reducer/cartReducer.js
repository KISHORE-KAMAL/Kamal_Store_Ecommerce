const cartReducer = (state, action) => {

    if(action.type === "ADD_TO_CART")
    {
        let {id, color, amount, product} = action.payload
        // console.log(product);

        // tackle the existing product for not adding again and again in next item of same name and color
        let existingProduct = state.cart.find((curItem)=>
        {
            return curItem.id === id + color
        })

        if(existingProduct)
        {
            let updatedProduct = state.cart.map((curElem)=>
            {
                if(curElem.id === id + color)
                {
                    let newAmount = curElem.amount + amount
                    if(newAmount >= curElem.max)
                    {
                        newAmount = curElem.max
                    }
                    return {
                        ...curElem,
                        amount: newAmount,
                    }
                }
                else
                {
                    return curElem
                }
            })
            return {
                ...state,
                cart: updatedProduct,
            }
        }
        else
        {
            let cartProduct = {
                id: id + color,
                name: product.name,
                color,
                amount,
                image: product.image[0].url,
                price: product.price,
                max: product.stock,
            };
    
            return {
                ...state,
                cart: [...state.cart, cartProduct,],
            }
        }
    }

    // to set the increment and decrement of product in cart
    if(action.type === "SET_DECREMENT")
    {
        let updatedProduct = state.cart.map((curElem)=>
        {
            if(curElem.id === action.payload)
            {
                let decAmount = curElem.amount - 1
                if(decAmount <= 0)
                {
                    decAmount = 1
                }
                return {
                    ...curElem,
                    amount: decAmount,
                }
            }
            else
            {
                return curElem
            }
        })
        return {
            ...state,
            cart: updatedProduct,
        }
    }

    if(action.type === "SET_INCREMENT")
    {
        let updatedProduct = state.cart.map((curElem)=>
        {
            if(curElem.id === action.payload)
            {
                let incAmount = curElem.amount + 1
                if(incAmount >= curElem.max)
                {
                    incAmount = curElem.max
                }
                return {
                    ...curElem,
                    amount: incAmount,
                }
            }
            else
            {
                return curElem
            }
        })
        return {
            ...state,
            cart: updatedProduct,
        }
    }

    if(action.type === "REMOVE_ITEM")
    {
        let updatedCart = state.cart.filter((curElem)=>
        {
            return curElem.id !== action.payload
        })

        return {
            ...state,
            cart: updatedCart,
        }
    }

    // to empty or to clear the cart
    if(action.type === "CLEAR_CART")
    {
        return {
            ...state,
            cart: [],
        }
    }

    // if(action.type === "CART_TOTAL_ITEM")
    // {
    //     let updatedItemVal = state.cart.reduce((initialVal, curElem)=>
    //     {
    //         let {amount} = curElem
    //         initialVal = initialVal + amount
    //         return initialVal
    //     },0)
    //     return {
    //         ...state,
    //         total_item: updatedItemVal,
    //     }
    // }

    // if(action.type === "CART_TOTAL_PRICE")
    // {
    //     let total_price = state.cart.reduce((initialVal, curElem)=>
    //     {
    //         let {price, amount} = curElem
    //         initialVal = initialVal + price * amount
    //         return initialVal
    //     },0)
    //     return {
    //         ...state,
    //         total_price: total_price,
    //     }
    // }

    // ~smaller code of total price & item
    if(action.type === "CART_ITEM_PRICE_TOTAL")
    {
        let {total_item, total_price} = state.cart.reduce((initialVal, curElem)=>
        {
            let {price, amount} = curElem

            initialVal.total_item += amount
            initialVal.total_price += price * amount

            return initialVal
        },{
            total_item: 0,
            total_price: 0,
        })
        return {
            ...state,
            total_item,
            total_price,
        }
    }


  return state;
}

export default cartReducer