import React,{ useEffect, useState } from 'react';
import styles from "./checkout.module.css";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {DLT,ADD,REMOVE} from '../../Redux/CartCheckout/action/action'

export const Listitems = (props) => {
    const [data,setData] = useState([]);
  // console.log(data);
  // const [price,setPrice] = useState([]);

  const {id} = useParams();
  // console.log(id);

//   const history = useNavigate();

  const dispatch = useDispatch();

  const getdata = useSelector(state => state.carts.carts)
  // console.log(getdata)


  const compare = ()=>{
    let comparedata = getdata.filter((props)=>{
      return props.id == id
    });
    setData(comparedata);
  }

  // add data
  

  const send = (props)=>{
    // console.log(e);
    dispatch(ADD(props));
  }
  
  const dlt = (props)=>{
    dispatch(DLT(props));
    // history("/");
}
// const total = ()=>{
//     let price = 0;
//     getdata.map((e,k)=>{
//         price = e.quantity * e.productprice
//         setPrice(price);
//     });
    
// };
// const stotal = ()=>{
//     let sprice = 0;
//     getdata.map((props,k)=>{
//         sprice = props.quantity * props.StrikePrice
//     });
//     setPrice(sprice);
// };


// remove one
const remove = (props)=>{
  dispatch(REMOVE(props))
}

  useEffect(()=>{
    compare();
    // total();
    // stotal();
  },[id])

  return (
    <div className={styles.listItemDiv}>
      <div>&nbsp;</div>
      <div className={styles.description}>
        <div className={styles.fade}><p>{props.Brand}</p> </div>
        <div><p>{props.productName}</p> </div>
      </div>
      <div>
        <div>Rs: {props.productprice} </div>
        <div className={styles.fade}>
          <strike>Rs:{props.StrikePrice} </strike>
        </div>
      </div>
      <div>
        <div className={styles.quantitydiv}>
          <button onClick={props.quantity <=1 ? ()=>dlt(props.id) : ()=>remove(props)}>-</button>
          <input
            type={"number"}
            placeholder = {props.quantity}
          />
          <button onClick={()=>send(props)}>+</button>
        </div>
      </div>
      <div>
        <div>Rs.{(props.quantity * props.productprice).toFixed(2)} </div>
      </div>
      <div className={styles.crossSign} 
      onClick={()=>dlt(props.id)}>
        <img src="https://www.bigbasket.com/static/uiv2/css/images/close_grid_icon.png" />
      </div>
      <div>
        <div className={styles.savings}>Rs. {(props.quantity * (props.StrikePrice-props.productprice)).toFixed(2)}</div>
      </div>
    </div>
  )
}