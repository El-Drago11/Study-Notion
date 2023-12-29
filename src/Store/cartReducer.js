import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
    cart : localStorage.getItem("Cart")? JSON.parse(localStorage.getItem("Cart")):0,
    // total items present
    totalItems: localStorage.getItem("totalItems")?JSON.parse(localStorage.getItem("totalItems")):0,
    // total amount
    total : localStorage.getItem("Total")? JSON.parse(localStorage.getItem("Total")) : 0
}

const cartSlice = createSlice({
    name:'cart',
    initialState:initialState,
    reducers:{
        // add to cart
        addToCart(state,action){
            const course = action.payload;
            // it will return index of that card/course
            const findCourse = state.cart.findIndex((item)=>{ return item._id === course._id});
            if(findCourse>=0){
                toast.error("Course already Added");
            }
            state.cart.push(course);
            state.totalItems++;
            state.total += course.price;
            //---> update the cart
            localStorage.setItem("Cart",JSON.stringify(state.cart));
            localStorage.setItem("Total",JSON.stringify(state.total));
            localStorage.setItem("TotalItems",JSON.stringify(state.totalItems));
            toast.success("Course added to cart")

        },
        // removeItemsfromcart
        removeItemsfromcart(state,action){
            const course = action.payload;
            // it will return index of that card/course
            const index = state.cart.findIndex((item)=>{ return item._id === course._id});
            if(index>=0){
                state.totalItems--;
                state.total -= course.price;
                state.cart.splice(index,1);//remove 1 item from that index;
                //---> update the cart
                localStorage.setItem("Cart",JSON.stringify(state.cart));
                localStorage.setItem("Total",JSON.stringify(state.total));
                localStorage.setItem("TotalItems",JSON.stringify(state.totalItems));
                toast.success("Course removed from cart")
            }
        },
        // resetCard
        resetCard(state,action){
            state.cart = [];
            state.total = 0;
            state.totalItems = 0;
            // ---->update the cart
            localStorage.removeItem("Cart")
            localStorage.removeItem("Total")
            localStorage.removeItem("TotalItems")
            toast.success("Your Cart is empty !!")
        }
    }
})

export const{addToCart,removeItemsfromcart,resetCard} = cartSlice.actions
export default cartSlice.reducer