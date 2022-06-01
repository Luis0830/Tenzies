import './index.css'
import Box from "./Box"
import React from "react"
import { nanoid } from 'nanoid'  // I installed that package in order to generate a ramdom ID//
import Confetti from "react-confetti" // I installed this package in order to generate the confetti effect


export default function App() {
const [dice, setDice] = React.useState(getNumber())//the value of state is the getNumbe() function//
const [tenzies, setTenzies] = React.useState(false)

///with useEffect we will Check the dice array for these winning conditions: 
//1. All dice are held, and 
//2. all dice have the same value
//If both conditions are true, set `tenzies` to true and log
 //* "You won!" to the console

React.useEffect(()=>{  
        const allHeld = dice.every(die => die.isHeld)   
        const firstValue = dice[0].value  // with .dice we are looking for a condition and if every item in the array returns true for that condition it will return the value "true"//
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)
            }} , [dice]) //created this state in order to check winning condition**//

  /********getNumber function explanation****************************************/
  // // loop 10 times
    // push a random number from 1-6 to my array
// return array
/*************************************************/
  function getNumber() {  
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push({
              value: Math.ceil(Math.random() * 6),        //we are pushing an array of objects //
              isHeld: false,
              id: nanoid() //by calling nanoid() we are adding a ramdom Id//
            })
        }
        
        return newDice
    }
    function holdDice(id){ ///this is the function that will be use as props for the onClick///
        setDice(oldDice => oldDice.map(die => {// using `dice.map()` and checking for the `id` of the die to determine which one to flip `isHeld` on
            return die.id === id ? 
                {...die, isHeld: !die.isHeld} :
                die
        }))
    }
  
    
    const diceElements = dice.map(die => (
      <Box 
          key={die.id} 
          value={die.value} 
          isHeld={die.isHeld} 
          holdDice={() => holdDice(die.id)}
      />
  )) //Die is the object and we are mapping over dice in order to get the ramdom elements and render Box//
  

  function toggle() {
    setDice(oldDice => oldDice.map(die => {
        return die.isHeld ? 
            die :                   //using conditional, if the dice is held we keep it
            {value: Math.ceil(Math.random() * 6),   //we are pushing an array of objects //
            isHeld: false,
            id: nanoid()}
    }))}// This works in order to change state//
    
    function newGame(){ //this function works in order to reset the whole game,
      setTenzies(false)
      setDice(getNumber())
  }
  
  return (
    
    <main className="app">
      {tenzies && <Confetti />}
      <h1>Tenzies</h1>
      {tenzies? <h2>You Win!</h2> : <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>}
      <div className="box-container">
        {diceElements}
      </div>
      {tenzies? <button onClick={newGame} className="roll-bottom"><h4>New Game</h4></button> : <button onClick={toggle} className="roll-bottom"><h4>Roll</h4></button>}
    </main>
  );
}