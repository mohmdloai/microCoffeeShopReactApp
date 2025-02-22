import axios from 'axios';

const API_URL = "http://localhost:5001/cart";

export const getCart = async () => {
     try {
          const response = await axios.get("/api/cart");
          return response.data;
     } catch (error) {
          console.error("Error fetching cart:", error);
          return [];
     }
};

export const updateCart = async (productId, quantity) => {
     try {
          const response = await axios.put(`/api/cart/${productId}`, { quantity });
          return response.data;
     } catch (error) {
          console.error("Error updating cart:", error);
          throw new Error("Failed to update cart");
     }
};