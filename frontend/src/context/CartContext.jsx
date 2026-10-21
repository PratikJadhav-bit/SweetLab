import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext(null);

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const exists = state.items.find(i => i.id === action.payload.id);
      const items = exists
        ? state.items.map(i => i.id === action.payload.id ? { ...i, qty: i.qty + 1 } : i)
        : [...state.items, { ...action.payload, qty: 1 }];
      return { ...state, items, isOpen: true };
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(i => i.id !== action.payload) };
    case 'UPDATE_QTY': {
      const items = action.payload.qty < 1
        ? state.items.filter(i => i.id !== action.payload.id)
        : state.items.map(i => i.id === action.payload.id ? { ...i, qty: action.payload.qty } : i);
      return { ...state, items };
    }
    case 'CLEAR_CART':
      return { ...state, items: [] };
    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen };
    case 'OPEN_CART':
      return { ...state, isOpen: true };
    case 'CLOSE_CART':
      return { ...state, isOpen: false };
    default:
      return state;
  }
};

const initialState = { items: [], isOpen: false };

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState, (init) => {
    try {
      const saved = localStorage.getItem('sweetlab_cart');
      return saved ? { ...init, items: JSON.parse(saved) } : init;
    } catch { return init; }
  });

  useEffect(() => {
    localStorage.setItem('sweetlab_cart', JSON.stringify(state.items));
  }, [state.items]);

  const subtotal = state.items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const discount = Math.round(subtotal * 0.15);
  const total = subtotal - discount;
  const itemCount = state.items.reduce((sum, i) => sum + i.qty, 0);

  return (
    <CartContext.Provider value={{ ...state, dispatch, subtotal, discount, total, itemCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
};
