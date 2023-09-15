import { useContext,useEffect,useState } from "react";

import CartIcon from "../Cart/CartIcon";
import classes from './HeaderCartButton.module.css';
import CartContext from "../store/cart-context";

const HeaderCartButton = (props) => {

  const [isHighlighted,setIsHighlighted]=useState(false);

  const cartCtx = useContext(CartContext);

  const {items} = cartCtx;

  const btnClasses = `${classes.button} ${isHighlighted? classes.bump: ''}`;

  useEffect(() => {
    if(items.length === 0 ){
      return;
    }
    setIsHighlighted(true);
    const timer = setTimeout(() => {
      setIsHighlighted(false);
    },300);

    return () => {
      clearTimeout(timer);
    }
  },[items])

  const numberOfCartItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0)

  return <button className={btnClasses} onClick={props.onClick}>
    <span className={classes.icon}>
      <CartIcon />
    </span>
    <span>Your Cart</span>
    <span className={classes.badge}>
      {numberOfCartItems}
    </span>
  </button>
}

export default HeaderCartButton;