import React, { useEffect, useState } from 'react'
import ListTeacher from '../ListTeacher/ListTeacher';
import {connect} from 'react-redux'
import './trTable.css'
import {FaSortAmountDown} from 'react-icons/fa';
import {setInfo as setPodgroupsAction} from '../../redux/module/podgroups'
import {setData as setDataAction} from '../../redux/module/data'

function TrTable({lessonType,type, number, column, podgroups, setInfo, setData, group }) {
  const [dis, setDis] = useState(false);
  const [numberPodgroup, setNumberPodgroup] = useState(group);

  useEffect(()=>{
    setDis(()=>{
      if(Number(number) === 0 && number !== '' ) return true
      else return false
    })
  }, [])

  let chooseTeacher = (event)=>{
    let parent = event.target.closest('.card');
    let card = parent.getAttribute('id');
    if(numberPodgroup === 1){
      let teacherSelect = parent.querySelectorAll('.first .teacher');
      let choose = parent.querySelector('.first .teacher > .teacher__item p').innerHTML;
      teacherSelect.forEach(element => {
        if(!element.classList.contains('disabled')){
          let item = element.querySelector('.teacher__item>p');
          item.innerHTML = choose;
          let idTr = element.closest('.table__tr').getAttribute('id');
          podgroups[card][0][idTr] = podgroups[card][0].lecturesHours;
        }
      });
      setInfo(podgroups);
      setData(podgroups);
    }else{
      let teacherSelect = parent.querySelectorAll('.second .teacher');
      let choose = parent.querySelector('.second .teacher > .teacher__item p').innerHTML;
      teacherSelect.forEach(element => {
        if(!element.classList.contains('disabled')){
          let item = element.querySelector('.teacher__item>p');
          item.innerHTML = choose;
          let idTr = element.closest('.table__tr').getAttribute('id');
          podgroups[card][1][idTr] = podgroups[card][1].lecturesHours;
        }
      });
      setInfo(podgroups);
      setData(podgroups);
    }
  }

  return (
    <tr id={lessonType} className='table__tr'>
      {column === 3 ?(
        <>
          <td  className='table__td'>{type}</td>
          <td  className='table__td'>{number}</td>
          {type === "Лекции" ? (
              <td className='table__td first last'><div className='choose__teacher'><ListTeacher setNumberPodgroup = {setNumberPodgroup} dis = {dis}/> <button className="btn__choose" onClick={(event) => chooseTeacher(event)}><FaSortAmountDown/></button></div></td>
            ) : (
              <td className='table__td first last'><ListTeacher setNumberPodgroup = {setNumberPodgroup} dis = {dis}/></td>
            )
          }
        </>
      ):(
        <>
          <td  className='table__td'>{type}</td>
          <td  className='table__td'>{number}</td>
          {type === "Лекции" ? (
              <td className='table__td first last'><div className='choose__teacher'><ListTeacher setNumberPodgroup = {setNumberPodgroup} dis = {dis}/> <button className="btn__choose" onClick={(event) => chooseTeacher(event)}><FaSortAmountDown/></button></div></td>
            ) : (
              <td className='table__td first last'><ListTeacher setNumberPodgroup = {setNumberPodgroup} dis = {dis}/></td>
            )
          }
          {type === "Лекции" ? (
              <td className='table__td second last'><div className='choose__teacher'><ListTeacher setNumberPodgroup = {setNumberPodgroup} dis = {dis}/> <button className="btn__choose" onClick={(event) => chooseTeacher(event)}><FaSortAmountDown/></button></div></td>
            ) : (
              <td className='table__td second last'><ListTeacher setNumberPodgroup = {setNumberPodgroup} dis = {dis}/></td>
            )
          }
        </>
      )}
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
  )(TrTable);