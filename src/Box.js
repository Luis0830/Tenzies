import React from "react"
import './index.css';

export default function Box(props){

    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white" // using conditional in order to aply the style depending of the boolean value 
    }
    return(
        <div className="box" style={styles} onClick={props.holdDice}> 
           <h2>{props.value}</h2>
        </div>
    )
}