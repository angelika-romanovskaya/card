import React, { useEffect, useState } from 'react'
import {connect} from 'react-redux'
import {getTeacher as getTeacherAction} from '../../redux/module/teacher'
import {setInfo as setPodgroupsAction} from '../../redux/module/podgroups'
import {setData as setDataAction} from '../../redux/module/data'
import './listTeacher.css'
import {IoIosArrowDown} from 'react-icons/io';

function ListTeacher({teacher, getTeacher, dis, podgroups, setInfo, setData, setNumberPodgroup}) {
    useEffect(()=>{
        getTeacher();
    },[])

    let openList = (event) =>{
      let parent = event.target.closest('.teacher');
      let option = parent.querySelector('.teacher__option');
      if(option.classList.contains('teacher__option--open')){
        option.classList.remove('teacher__option--open');
      } else{
        option.classList.add('teacher__option--open');
      }
    }

    let chooseTeacher = (event)=>{
      let choose = event.target.innerHTML;
      let id = event.target.getAttribute('id');
      let card = event.target.closest('.card').getAttribute('id');
      let idTr = event.target.closest('.table__tr').getAttribute('id');
      if(event.target.closest('.table__td').classList.contains('first')){
        podgroups[card][0][idTr] = id;
        setInfo(podgroups)
        setData(podgroups);
        setNumberPodgroup(1)
      } else{
        podgroups[card][1][idTr] = id;
        setInfo(podgroups)
        setData(podgroups)
        setNumberPodgroup(2)
      }
      let parent = event.target.closest('.teacher');
      let value = parent.querySelector('.teacher>.teacher__item p');
      value.innerHTML = choose;
      let option = parent.querySelector('.teacher__option');
      option.classList.remove('teacher__option--open');
    }

  return (
      <ul className={dis ? 'teacher disabled' : 'teacher'}>
          <li className='teacher__item'><p>Вакансия</p><button onClick={(event)=>openList(event)}><IoIosArrowDown/></button></li>
          <ul className='teacher__option'>
            <li onClick={(event)=>chooseTeacher(event)} className='teacher__item'>Вакансия</li>
            {teacher.map(item=> <li id={item.id} onClick={(event)=>chooseTeacher(event)} className='teacher__item' key={item.id}>{item.name}</li>)}
          </ul>
      </ul>
  )
}

const mapStateToProps = function(state) {
  return {
    teacher: state.teacher.teacher,
    podgroups:state.podgroups.podgroups
  }
}

export default connect(
    mapStateToProps,
    {
      setData: setDataAction,
      setInfo: setPodgroupsAction,
      getTeacher: getTeacherAction
    }
  )(ListTeacher);

