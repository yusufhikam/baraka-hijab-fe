import axios from "axios";
import { URLBase } from "../urlBase";

const syncCartsFromLocalStorage = async () => {
    const localCart = JSON.parse(localStorage.getItem('carts') || '[]');

    if(localCart.length === 0) return;

    try{
        await axios.post(`${URLBase}/carts/sync`, {
            carts: localCart // input carts
        }, {
            headers: {
                'Authorization' : `Bearer ${localStorage.getItem('auth_token')}`
            }
        });

        localStorage.removeItem('carts');

    }catch(error){
        console.error(error);
    }
}


export default syncCartsFromLocalStorage;