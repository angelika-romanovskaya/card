import React, { useState } from 'react'
import './TrCount.css'
import {connect} from 'react-redux'
import {setInfo as setPodgroupsAction} from '../../redux/module/podgroups'
import {setData as setDataAction} from '../../redux/module/data'

function TrCount({number, group, isSmallDevice, card, podgroups, setInfo, setData,}) {
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

    let setCount = (event) =>{
      let parent = event.target.closest('.card');
      let card = parent.getAttribute('id');
      let td = event.target.closest('td');
      if(td.classList.contains('first')){
        podgroups[card][0].countStudents = event.target.value;
      } else{
        podgroups[card][1].countStudents = event.target.value;
      }
      setInfo(podgroups);
      setData(podgroups);
    }

    return (
      <tr className='table__tr'>
            <td className='table__td'>Количество человек</td>
            <td className='table__td'></td>
            <td className='table__td first last'><input className='table__count' type='number' value={count1} onChange={(event)=>{setCount1(event.target.value); setCount(event)}}/></td>
            <td className='table__td second last'><input className='table__count' type='number' value={count2} onChange={(event)=>{setCount2(event.target.value); setCount(event)}}/></td>
      </tr>
    )
}

const mapStateToProps = function(state) {
  return {
    podgroups:state.podgroups.podgroups
  }
}

export default connect(
    mapStateToProps,
    {
      setData: setDataAction,
      setInfo: setPodgroupsAction,
    }
  )(TrCount);