import React, { useEffect, useState } from 'react'
import './TrCount.css'

function TrCount({number, group, isSmallDevice, card}) {
    const [count1, setCount1] = useState(Math.ceil(number/2));
    const [count2, setCount2] = useState(Math.floor(number/2));

    let setDisplay = () => {
      if(isSmallDevice){
        if(group === 1){
          let td2 = card.querySelectorAll('.second');
          td2.forEach(element => {
            element.setAttribute('style', 'display:none')
          });
        } else{
          let td1 = card.querySelectorAll('.first');
          td1.forEach(element => {
            element.setAttribute('style', 'display:none')
          });
        }
      } else{
        let td1 = card.querySelectorAll('.first');
          td1.forEach(element => {
            element.setAttribute('style', 'display:table-cell')
          });
        let td2 = card.querySelectorAll('.second');
          td2.forEach(element => {
            element.setAttribute('style', 'display:table-cell')
          });
      }
    }
    
    setDisplay();

    return (
      <tr className='table__tr'>
            <td className='table__td'>Количество человек</td>
            <td className='table__td'></td>
            <td className='table__td first last'><input className='table__count' type='number' value={count1} onChange={(event)=>setCount1(event.target.value)}/></td>
            <td className='table__td second last'><input className='table__count' type='number' value={count2} onChange={(event)=>setCount2(event.target.value)}/></td>
      </tr>
    )
}

export default TrCount;