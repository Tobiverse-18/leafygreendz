import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Check, X } from "lucide-react";
import { useCart } from "../../context/CartContext";
import "./CartNotification.css";

function CartNotification() {
  const {
    cartNotification,
    setCartNotification,
  } = useCart();

  useEffect(() => {
    if (!cartNotification) {
      return;
    }

    const timer = setTimeout(() => {
      setCartNotification(null);
    }, 5000);

    return () => clearTimeout(timer);
  }, [
    cartNotification,
    setCartNotification,
  ]);

  if (!cartNotification) {
    return null;
  }

  return (
    <div
      className="cart-notification"
      role="status"
    >
      <div className="cart-notification__icon">
        <Check
          size={17}
          strokeWidth={2}
        />
      </div>

      <div className="cart-notification__content">

        <strong>
          Added to cart
        </strong>

        <span>
          {cartNotification.title}
        </span>

        <Link
          to="/cart"
          onClick={() =>
            setCartNotification(null)
          }
        >
          View Cart
        </Link>

      </div>

      <button
        type="button"
        className="cart-notification__close"
        onClick={() =>
          setCartNotification(null)
        }
        aria-label="Close notification"
      >
        <X
          size={16}
          strokeWidth={1.8}
        />
      </button>
    </div>
  );
}

export default CartNotification;