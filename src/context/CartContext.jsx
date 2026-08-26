import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const CartContext = createContext(null);


/* ========================================
   GET STORED CART
   ======================================== */

function getStoredCart() {
  try {
    const storedCart = localStorage.getItem(
      "leafygreendz-cart"
    );

    return storedCart
      ? JSON.parse(storedCart)
      : [];
  } catch {
    return [];
  }
}


/* ========================================
   GET STORED CHECKOUT
   ======================================== */

function getStoredCheckout() {
  try {
    const storedCheckout = localStorage.getItem(
      "leafygreendz-checkout"
    );

    return storedCheckout
      ? JSON.parse(storedCheckout)
      : null;
  } catch {
    return null;
  }
}


/* ========================================
   CART PROVIDER
   ======================================== */

export function CartProvider({ children }) {

  const [cartItems, setCartItems] =
    useState(getStoredCart);

  const [cartNotification, setCartNotification] =
    useState(null);

  const [checkoutData, setCheckoutData] =
    useState(getStoredCheckout);


  /* ========================================
     SAVE CART
     ======================================== */

  useEffect(() => {

    localStorage.setItem(
      "leafygreendz-cart",
      JSON.stringify(cartItems)
    );

  }, [cartItems]);


  /* ========================================
     SAVE CHECKOUT
     ======================================== */

  useEffect(() => {

    if (checkoutData) {

      localStorage.setItem(
        "leafygreendz-checkout",
        JSON.stringify(checkoutData)
      );

    } else {

      localStorage.removeItem(
        "leafygreendz-checkout"
      );

    }

  }, [checkoutData]);


  /* ========================================
     ADD TO CART
     ======================================== */

  const addToCart = (book) => {

    setCartItems((currentItems) => {

      const existingItem = currentItems.find(
        (item) => item.id === book.id
      );


      if (existingItem) {

        return currentItems.map((item) =>
          item.id === book.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );

      }


      return [
        ...currentItems,
        {
          ...book,
          quantity: 1,
        },
      ];

    });


    setCartNotification({
      id: Date.now(),
      title: book.title,
    });

  };


  /* ========================================
     REMOVE FROM CART
     ======================================== */

  const removeFromCart = (bookId) => {

    setCartItems((currentItems) =>
      currentItems.filter(
        (item) => item.id !== bookId
      )
    );

  };


  /* ========================================
     UPDATE QUANTITY
     ======================================== */

  const updateQuantity = (
    bookId,
    quantity
  ) => {

    setCartItems((currentItems) =>

      currentItems

        .map((item) =>
          item.id === bookId
            ? {
                ...item,
                quantity,
              }
            : item
        )

        .filter(
          (item) => item.quantity > 0
        )

    );

  };


  /* ========================================
     CLEAR CART
     ======================================== */

  const clearCart = () => {

    setCartItems([]);

  };


  /* ========================================
     CART COUNT
     ======================================== */

  const cartCount = cartItems.reduce(
    (total, item) =>
      total + item.quantity,
    0
  );


  /* ========================================
     CART TOTAL
     ======================================== */

  const cartTotal = cartItems.reduce(
    (total, item) =>
      total +
      Number(item.price) *
      item.quantity,
    0
  );


  /* ========================================
     SAVE CART CHECKOUT
     ======================================== */

  const saveCheckout = (
    customer,
    djangoOrder = null
  ) => {

    const order = {

      customer,

      items: cartItems.map((item) => ({
        id: item.id,
        title: item.title,
        price: Number(item.price),
        quantity: item.quantity,
        coverImage: item.coverImage,
      })),

      subtotal: cartTotal,

      total: cartTotal,

      currency: "NGN",

      status: djangoOrder?.status || "pending",

      type: "cart",

      /* Django order information */

      orderId: djangoOrder?.id || null,

      orderNumber:
        djangoOrder?.order_number || null,

      paymentReference:
        djangoOrder?.payment_reference || null,

    };


    setCheckoutData(order);

    return order;

  };


  /* ========================================
     SAVE DIRECT CHECKOUT
     ======================================== */

  const saveDirectCheckout = (
    customer,
    book,
    djangoOrder = null
  ) => {

    const price = Number(book.price);


    const order = {

      customer,

      items: [
        {
          id: book.id,
          title: book.title,
          price,
          quantity: 1,
          coverImage: book.coverImage,
        },
      ],

      subtotal: price,

      total: price,

      currency: "NGN",

      status:
        djangoOrder?.status || "pending",

      type: "direct",

      /* Django order information */

      orderId:
        djangoOrder?.id || null,

      orderNumber:
        djangoOrder?.order_number || null,

      paymentReference:
        djangoOrder?.payment_reference || null,

    };


    setCheckoutData(order);

    return order;

  };


  /* ========================================
     UPDATE DJANGO ORDER
     ======================================== */

  const updateCheckoutOrder = (
    djangoOrder
  ) => {

    setCheckoutData((currentCheckout) => {

      if (!currentCheckout) {
        return null;
      }


      return {

        ...currentCheckout,

        orderId:
          djangoOrder?.id ??
          currentCheckout.orderId,

        orderNumber:
          djangoOrder?.order_number ??
          currentCheckout.orderNumber,

        status:
          djangoOrder?.status ??
          currentCheckout.status,

        paymentReference:
          djangoOrder?.payment_reference ??
          currentCheckout.paymentReference,

      };

    });

  };


  /* ========================================
     UPDATE CHECKOUT CUSTOMER
     ======================================== */

  const updateCheckoutCustomer = (
    customer
  ) => {

    setCheckoutData((currentCheckout) => {

      if (!currentCheckout) {
        return null;
      }


      return {

        ...currentCheckout,

        customer,

      };

    });

  };


  /* ========================================
     CLEAR CHECKOUT
     ======================================== */

  const clearCheckout = () => {

    setCheckoutData(null);

  };


  /* ========================================
     CONTEXT VALUE
     ======================================== */

  const value = {

    /* CART */

    cartItems,

    addToCart,

    removeFromCart,

    updateQuantity,

    clearCart,

    cartCount,

    cartTotal,


    /* NOTIFICATION */

    cartNotification,

    setCartNotification,


    /* CHECKOUT */

    checkoutData,

    saveCheckout,

    saveDirectCheckout,

    updateCheckoutOrder,

    updateCheckoutCustomer,

    clearCheckout,

  };


  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );

}


/* ========================================
   USE CART
   ======================================== */

export function useCart() {

  const context = useContext(CartContext);


  if (!context) {

    throw new Error(
      "useCart must be used inside a CartProvider"
    );

  }


  return context;

}