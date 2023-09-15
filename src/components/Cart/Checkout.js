import { useRef,useState } from 'react';

import classes from './Checkout.module.css';

const isEmpty = value => value.trim()==='';


const isFiveChars= value => value.trim().length===5;


const Checkout = (props) => {

   const[formInputsValidity,setFormInputsValidity]=useState({
    name:true,
    street:true,
    city:true,
    postalCode:true
   }); 

   const nameIpRef=useRef();
   const streetIpRef=useRef();
   const postalCodeIpRef=useRef();
   const cityIpRef=useRef(); 

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName=nameIpRef.current.value;
    const enteredStreet=streetIpRef.current.value;
    const enteredPostalCode=postalCodeIpRef.current.value;
    const enteredCity=cityIpRef.current.value;

    const enteredNameIsValid=!isEmpty(enteredName);
    const enteredStreetIsValid=!isEmpty(enteredStreet);
    const enteredPostalCodeIsValid=isFiveChars(enteredPostalCode);
    const enteredCityIsValid=!isEmpty(enteredCity)

   setFormInputsValidity({
    name:enteredNameIsValid,
    street:enteredStreetIsValid,
    city:enteredCityIsValid,
    postalCode:enteredPostalCodeIsValid
   })

    const formIsValid=enteredNameIsValid && enteredStreetIsValid && enteredPostalCodeIsValid && enteredCityIsValid;

    if(!formIsValid){
        return;
    }

    props.onConfirm({name:enteredName,street:enteredStreet,city:enteredCity,postalCode:enteredPostalCode});
  };

  const nameControlClasses=`${classes.control} ${formInputsValidity.name ? '' : classes.invalid}`
  const streetControlClasses=`${classes.control} ${formInputsValidity.street ? '' : classes.invalid}`
  const cityControlClasses=`${classes.control} ${formInputsValidity.city ? '' : classes.invalid}`
  const postalCodeControlClasses=`${classes.control} ${formInputsValidity.postalCode ? '' : classes.invalid}`

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameIpRef} />
        {!formInputsValidity.name && <p>Please enter a valid name</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetIpRef}/>
        {!formInputsValidity.street && <p>Please enter a valid street</p>}
      </div>
      <div className={postalCodeControlClasses}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalCodeIpRef}/>
        {!formInputsValidity.postalCode && <p>Please enter a valid postal code</p>}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityIpRef}/>
        {!formInputsValidity.city && <p>Please enter a valid city</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;