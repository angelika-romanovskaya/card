import React from 'react'
import {IoIosArrowDown} from 'react-icons/io';
import { FaTrash } from 'react-icons/fa';
import {connect} from 'react-redux'
import {setInfo as setPodgroupsAction} from '../../redux/module/podgroups'
import {setData as setDataAction} from '../../redux/module/data'
import './listPodgroup.css'

function ListPodgroup({setColumn, setGroup, group,podgroups, setInfo, data, setData}) {
    let openList = (event) =>{
        let parent = event.target.closest('.group');
        let option = parent.querySelector('.group__option');
        if(option.classList.contains('group__option--open')){
          option.classList.remove('group__option--open');
        } else{
          option.classList.add('group__option--open');
        }
      }


      let chooseGroup = (event)=>{
        let groupID = event.target.closest('li').getAttribute('id');
        let card = event.target.closest('.card');
        if(groupID === 'group1'){
            setGroup(1);
            let td1 = card.querySelectorAll('.first');
            td1.forEach(element => {
              element.setAttribute('style', 'display:table-cell')
            });
            let td2 = card.querySelectorAll('.second');
            td2.forEach(element => {
              element.setAttribute('style', 'display:none')
            });
        } else{
            setGroup(2);
            let td1 = card.querySelectorAll('.first');
            td1.forEach(element => {
              element.setAttribute('style', 'display:none')
            });
            let td2 = card.querySelectorAll('.second');
            td2.forEach(element => {
              element.setAttribute('style', 'display:table-cell')
            });
        }
        let parent = event.target.closest('.group');
        let option = parent.querySelector('.group__option');
        option.classList.remove('group__option--open');
      }

      let removeColumn=(event)=>{
        let table = event.target.closest('.table');
        let tdTextarea = table.querySelector('tr:last-child>td:last-child');
        tdTextarea.removeAttribute('colspan');
        setColumn(3)
        let idCard = event.target.closest('.card').getAttribute('id');
        if(podgroups[idCard].length === 2){
            podgroups[idCard].pop();
        }
        podgroups[idCard][0].countStudents = data[idCard].studentsNumber;
        setInfo(podgroups);
        setData(podgroups);
        setGroup(1);
        let card = event.target.closest('.card');
        let td1 = card.querySelectorAll('.first');
            td1.forEach(element => {
              element.setAttribute('style', 'display:table-cell')
            });
            let td2 = card.querySelectorAll('.second');
            td2.forEach(element => {
              element.setAttribute('style', 'display:none')
        });
    }

  return (
    <ul className='group'>
          <li className='group__item'>{group === 1 ? (
            <span>Подгруппа 1</span>
          ) : (
            <>
                <span>Подгруппа 2</span> <button onClick={(event)=>removeColumn(event)} className='table__btn'><FaTrash/></button>
            </>
          )}
          <button className='arrow' onClick={(event)=>openList(event)}><IoIosArrowDown/></button></li>
          <ul className='group__option'>
            <li id="group1" onClick={(event)=>chooseGroup(event)} className='group__item'>Подгруппа 1</li>
            <li id="group2" onClick={(event)=>chooseGroup(event)} className='group__item'>Подгруппа 2</li>
          </ul>
    </ul>
  )
}


const mapStateToProps = function(state) {
    return {
      podgroups:state.podgroups.podgroups,
      data: state.data.data
    }
  }
  
  export default connect(
      mapStateToProps,
      {
        setInfo: setPodgroupsAction,
        setData: setDataAction
      }
    )(ListPodgroup);