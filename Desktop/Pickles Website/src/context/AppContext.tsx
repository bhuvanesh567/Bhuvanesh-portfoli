import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Product {
  id: number;
  name: string;
  price: number; // base price for 250g
  description: string;
  category: 'veg' | 'non-veg';
  image: string;
  rating: number;
  reviewsCount: number;
  spiceLevel: number; // 1 to 5
  shelfLife: string;
  ingredients: string[];
  nutrition: {
    energy: string;
    protein: string;
    fat: string;
    carbohydrates: string;
    sodium: string;
  };
}

export interface CartItem {
  product: Product;
  weight: number; // 250, 500, 1000
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  createdAt: number;
  items: CartItem[];
  subtotal: number;
  discount: number;
  delivery: number;
  total: number;
  shippingAddress: {
    name: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    pincode: string;
  };
  paymentMethod: string;
  status: 'placed' | 'mixing' | 'matured' | 'transit' | 'delivered';
}

export interface Coupon {
  code: string;
  discountPercentage: number;
  minSubtotal: number;
  description: string;
}

interface AppContextType {
  products: Product[];
  cart: CartItem[];
  wishlist: Product[];
  orders: Order[];
  appliedCoupon: Coupon | null;
  searchQuery: string;
  selectedCategory: string;
  wishlistOpen: boolean;
  cartOpen: boolean;
  checkoutOpen: boolean;
  accountOpen: boolean;
  trackingOpen: boolean;
  trackingOrderId: string;
  user: {
    name: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    pincode: string;
    ordersCount: number;
  } | null;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  setWishlistOpen: (open: boolean) => void;
  setCartOpen: (open: boolean) => void;
  setCheckoutOpen: (open: boolean) => void;
  setAccountOpen: (open: boolean) => void;
  setTrackingOpen: (open: boolean) => void;
  setTrackingOrderId: (id: string) => void;
  addToCart: (product: Product, weight: number, quantity?: number) => void;
  removeFromCart: (productId: number, weight: number) => void;
  updateCartQuantity: (productId: number, weight: number, quantity: number) => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: number) => boolean;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  placeOrder: (shippingDetails: Order['shippingAddress'], paymentMethod: string) => Order;
  loginUser: (details: { name: string; phone: string; email: string; address: string; city: string; pincode: string }) => void;
  logoutUser: () => void;
  getCartSubtotal: () => number;
  getCartTotal: () => number;
  getCartDiscount: () => number;
  getDeliveryCharge: () => number;
}

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Andhra Avakaya Pickle',
    price: 299,
    description: 'The legendary traditional Andhra mango pickle. Made with hand-cut sour raw mangoes, freshly ground red chilli powder, aromatic mustard flour, cold-pressed sesame oil, and fenugreek seeds. Fully cured and bursting with pure spice.',
    category: 'veg',
    image: '/avakaya.png',
    rating: 4.9,
    reviewsCount: 342,
    spiceLevel: 5,
    shelfLife: '12 Months',
    ingredients: ['Raw Sour Mangoes', 'Pure Cold-Pressed Sesame Oil', 'Chilli Powder', 'Mustard Seeds', 'Salt', 'Fenugreek Seeds', 'Turmeric'],
    nutrition: {
      energy: '380 kcal',
      protein: '2.4 g',
      fat: '34.0 g',
      carbohydrates: '16.5 g',
      sodium: '4.8 g'
    }
  },
  {
    id: 2,
    name: 'Tangy Gongura Pickle',
    price: 279,
    description: 'An absolute delicacy made from fresh sorrel leaves (Gongura) sautéed in wood-pressed oil, simmered with roasted garlic, red chillies, and local Andhra spices. Perfect with piping hot rice and a dollop of ghee.',
    category: 'veg',
    image: '/gongura.png',
    rating: 4.8,
    reviewsCount: 215,
    spiceLevel: 4,
    shelfLife: '9 Months',
    ingredients: ['Fresh Sorrel Leaves (Gongura)', 'Cold-Pressed Sesame Oil', 'Garlic Cloves', 'Dried Red Chillies', 'Salt', 'Mustard Seeds', 'Coriander Seeds'],
    nutrition: {
      energy: '310 kcal',
      protein: '3.1 g',
      fat: '28.0 g',
      carbohydrates: '11.2 g',
      sodium: '4.2 g'
    }
  },
  {
    id: 3,
    name: 'Spicy Tomato Pickle',
    price: 249,
    description: 'Delectably tangy and spicy, made using naturally ripened farm-fresh tomatoes, sun-cured tamarind paste, fried chillies, garlic, and special ground spices. A versatile accompaniment that pairs with idli, dosa, or rice.',
    category: 'veg',
    image: '/tomato_pickle.png',
    rating: 4.7,
    reviewsCount: 188,
    spiceLevel: 3,
    shelfLife: '9 Months',
    ingredients: ['Ripe Farm Tomatoes', 'Tamarind Pulp', 'Sesame Oil', 'Red Chilli Powder', 'Garlic', 'Salt', 'Mustard & Cumin Seeds'],
    nutrition: {
      energy: '260 kcal',
      protein: '1.8 g',
      fat: '22.0 g',
      carbohydrates: '13.5 g',
      sodium: '3.9 g'
    }
  },
  {
    id: 4,
    name: 'Sun-Cured Lemon Pickle',
    price: 229,
    description: 'Prepared using traditional sun-drying methods, this oil-free pickle packs a massive punch of tangy, salty, and spicy notes. Pickled lemons cured with whole spices and salt until perfectly soft and flavorful.',
    category: 'veg',
    image: '/lemon_pickle.png',
    rating: 4.8,
    reviewsCount: 156,
    spiceLevel: 3,
    shelfLife: '12 Months',
    ingredients: ['Juicy Yellow Lemons', 'Salt', 'Red Chilli Powder', 'Fenugreek Powder', 'Turmeric Powder', 'Asafoetida (Hing)'],
    nutrition: {
      energy: '140 kcal',
      protein: '1.2 g',
      fat: '1.5 g',
      carbohydrates: '24.0 g',
      sodium: '6.1 g'
    }
  },
  {
    id: 5,
    name: 'Spiced Garlic Pickle',
    price: 259,
    description: 'Whole, peeled premium garlic cloves slowly simmered in a dense, spicy tamarind and sesame oil gravy. As the garlic cloves absorb the spices, they turn soft, sweet, and fiery all at once. Excellent for digestion.',
    category: 'veg',
    image: '/garlic_pickle.png',
    rating: 4.9,
    reviewsCount: 274,
    spiceLevel: 4,
    shelfLife: '12 Months',
    ingredients: ['Peeled Garlic Cloves', 'Sesame Oil', 'Tamarind Extract', 'Chilli Powder', 'Mustard Powder', 'Salt', 'Asafoetida'],
    nutrition: {
      energy: '320 kcal',
      protein: '4.5 g',
      fat: '26.0 g',
      carbohydrates: '17.0 g',
      sodium: '4.5 g'
    }
  },
  {
    id: 6,
    name: 'Andhra Special Chicken Pickle',
    price: 399,
    description: 'Premium boneless tender chicken pieces, deep-fried to crisp perfection, then tossed with our chef-special freshly ground dry spices, freshly made ginger-garlic paste, fresh curry leaves, and lemon juice. Truly addictive.',
    category: 'non-veg',
    image: '/chicken_pickle.png',
    rating: 4.9,
    reviewsCount: 512,
    spiceLevel: 5,
    shelfLife: '6 Months (Refrigerated)',
    ingredients: ['Fresh Boneless Chicken', 'Cold-Pressed Peanut Oil', 'Ginger-Garlic Paste', 'Lemon Juice', 'Spiced Garam Masala', 'Chilli Powder', 'Salt', 'Curry Leaves'],
    nutrition: {
      energy: '460 kcal',
      protein: '24.5 g',
      fat: '39.0 g',
      carbohydrates: '2.8 g',
      sodium: '3.6 g'
    }
  },
  {
    id: 7,
    name: 'Fiery Royal Prawn Pickle',
    price: 499,
    description: 'Fresh prawns sourced daily, thoroughly cleaned, crispy fried, and seasoned in a rich, spicy, traditional Andhra pickle masala. The infusion of mustard, garlic, and peanut oil brings out a rich seafood flavor like no other.',
    category: 'non-veg',
    image: '/prawn_pickle.png',
    rating: 5.0,
    reviewsCount: 389,
    spiceLevel: 5,
    shelfLife: '6 Months (Refrigerated)',
    ingredients: ['Fresh Royal Prawns', 'Cold-Pressed Peanut Oil', 'Ginger-Garlic Paste', 'Vinegar & Lemon Juice', 'Hand-ground Spices', 'Curry Leaves', 'Salt'],
    nutrition: {
      energy: '420 kcal',
      protein: '21.0 g',
      fat: '35.5 g',
      carbohydrates: '3.5 g',
      sodium: '3.8 g'
    }
  }
];

const AVAILABLE_COUPONS: Coupon[] = [
  { code: 'WELCOME10', discountPercentage: 10, minSubtotal: 0, description: '10% OFF on all orders!' },
  { code: 'AVAKAYA20', discountPercentage: 20, minSubtotal: 599, description: '20% OFF on orders above ₹599' }
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load state from local storage if available
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('vnt_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState<Product[]>(() => {
    const saved = localStorage.getItem('vnt_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('vnt_orders');
    return saved ? JSON.parse(saved) : [];
  });

  const [user, setUser] = useState<AppContextType['user']>(() => {
    const saved = localStorage.getItem('vnt_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(() => {
    const saved = localStorage.getItem('vnt_coupon');
    return saved ? JSON.parse(saved) : null;
  });

  // UI state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [trackingOpen, setTrackingOpen] = useState(false);
  const [trackingOrderId, setTrackingOrderId] = useState('');

  // Persist items
  useEffect(() => {
    localStorage.setItem('vnt_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('vnt_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('vnt_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('vnt_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('vnt_coupon', JSON.stringify(appliedCoupon));
  }, [appliedCoupon]);

  // Price calculation helpers
  const getWeightMultiplier = (weight: number) => {
    if (weight === 500) return 1.8;
    if (weight === 1000) return 3.2;
    return 1.0; // 250g
  };

  const getCartSubtotal = () => {
    return cart.reduce((total, item) => {
      const scalePrice = Math.round(item.product.price * getWeightMultiplier(item.weight));
      return total + (scalePrice * item.quantity);
    }, 0);
  };

  const getCartDiscount = () => {
    const subtotal = getCartSubtotal();
    if (!appliedCoupon) return 0;
    if (subtotal < appliedCoupon.minSubtotal) return 0;
    return Math.round(subtotal * (appliedCoupon.discountPercentage / 100));
  };

  const getDeliveryCharge = () => {
    const subtotal = getCartSubtotal();
    if (subtotal === 0) return 0;
    return subtotal > 499 ? 0 : 50; // Free delivery above 499
  };

  const getCartTotal = () => {
    const subtotal = getCartSubtotal();
    const discount = getCartDiscount();
    const delivery = getDeliveryCharge();
    return Math.max(0, subtotal - discount + delivery);
  };

  // Cart operations
  const addToCart = (product: Product, weight: number, quantity = 1) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.product.id === product.id && item.weight === weight
      );
      if (existingIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingIndex].quantity += quantity;
        return newCart;
      }
      return [...prevCart, { product, weight, quantity }];
    });
    setCartOpen(true);
  };

  const removeFromCart = (productId: number, weight: number) => {
    setCart((prevCart) =>
      prevCart.filter((item) => !(item.product.id === productId && item.weight === weight))
    );
  };

  const updateCartQuantity = (productId: number, weight: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, weight);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId && item.weight === weight
          ? { ...item, quantity }
          : item
      )
    );
  };

  // Wishlist operations
  const toggleWishlist = (product: Product) => {
    setWishlist((prevWishlist) => {
      const exists = prevWishlist.some((item) => item.id === product.id);
      if (exists) {
        return prevWishlist.filter((item) => item.id !== product.id);
      }
      return [...prevWishlist, product];
    });
  };

  const isInWishlist = (productId: number) => {
    return wishlist.some((item) => item.id === productId);
  };

  // Coupon operations
  const applyCoupon = (code: string) => {
    const coupon = AVAILABLE_COUPONS.find(
      (c) => c.code.toUpperCase() === code.trim().toUpperCase()
    );
    if (!coupon) {
      return { success: false, message: 'Invalid coupon code.' };
    }
    const subtotal = getCartSubtotal();
    if (subtotal < coupon.minSubtotal) {
      return {
        success: false,
        message: `Min. order amount for ${coupon.code} is ₹${coupon.minSubtotal}.`
      };
    }
    setAppliedCoupon(coupon);
    return { success: true, message: `Coupon applied: ${coupon.description}` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  // Order placement
  const placeOrder = (shippingAddress: Order['shippingAddress'], paymentMethod: string) => {
    const subtotal = getCartSubtotal();
    const discount = getCartDiscount();
    const delivery = getDeliveryCharge();
    const total = getCartTotal();

    const orderId = `VNT-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder: Order = {
      id: orderId,
      date: new Date().toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      createdAt: Date.now(),
      items: [...cart],
      subtotal,
      discount,
      delivery,
      total,
      shippingAddress,
      paymentMethod,
      status: 'placed'
    };

    // Save order
    setOrders((prev) => [newOrder, ...prev]);

    // Clear cart & coupon
    setCart([]);
    setAppliedCoupon(null);

    // Update user order count if logged in
    if (user) {
      setUser((prev) => (prev ? { ...prev, ordersCount: prev.ordersCount + 1 } : null));
    }

    return newOrder;
  };

  // User auth simulation
  const loginUser = (details: {
    name: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    pincode: string;
  }) => {
    setUser({
      ...details,
      ordersCount: orders.length
    });
  };

  const logoutUser = () => {
    setUser(null);
    setOrders([]);
    localStorage.removeItem('vnt_orders');
  };

  // Update order status based on actual time elapsed since creation
  useEffect(() => {
    if (orders.length === 0) return;

    const updateOrderStatus = () => {
      setOrders((prevOrders) => {
        let changed = false;
        const updated = prevOrders.map((order) => {
          const createdAt = order.createdAt || (new Date(order.date).getTime() || Date.now());
          const elapsedMins = (Date.now() - createdAt) / 60000;

          let targetStatus: Order['status'] = 'placed';
          if (elapsedMins >= 30) {
            targetStatus = 'delivered';
          } else if (elapsedMins >= 15) {
            targetStatus = 'transit';
          } else if (elapsedMins >= 5) {
            targetStatus = 'matured';
          } else if (elapsedMins >= 1) {
            targetStatus = 'mixing';
          }

          if (order.status !== targetStatus || !order.createdAt) {
            changed = true;
            return { ...order, createdAt, status: targetStatus };
          }
          return order;
        });

        return changed ? updated : prevOrders;
      });
    };

    updateOrderStatus();
    const interval = setInterval(updateOrderStatus, 5000);

    return () => clearInterval(interval);
  }, [orders]);

  return (
    <AppContext.Provider
      value={{
        products: PRODUCTS,
        cart,
        wishlist,
        orders,
        appliedCoupon,
        searchQuery,
        selectedCategory,
        wishlistOpen,
        cartOpen,
        checkoutOpen,
        accountOpen,
        trackingOpen,
        trackingOrderId,
        user,
        setSearchQuery,
        setSelectedCategory,
        setWishlistOpen,
        setCartOpen,
        setCheckoutOpen,
        setAccountOpen,
        setTrackingOpen,
        setTrackingOrderId,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        toggleWishlist,
        isInWishlist,
        applyCoupon,
        removeCoupon,
        placeOrder,
        loginUser,
        logoutUser,
        getCartSubtotal,
        getCartTotal,
        getCartDiscount,
        getDeliveryCharge
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
