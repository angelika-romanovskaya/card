import React, { useEffect, useState } from 'react'
import { useMediaQuery } from "@uidotdev/usehooks";
import TrTable from '../TrTable/TrTable';
import './table.css'
import TrCount from '../TrCount/TrCount';
import {connect} from 'react-redux'
import {setInfo as setPodgroupsAction} from '../../redux/module/podgroups'
import {setData as setDataAction} from '../../redux/module/data'
import { AiOutlinePlus } from 'react-icons/ai';
import { FaTrash } from 'react-icons/fa';
import ListPodgroup from '../ListPodgroup/ListPodgroup';


function Table({typeLesson, podgroups, setInfo, data, setData}) {
    const [column, setColumn] = useState(3);
    const [group, setGroup] = useState(1);
    const [typeExam, setTypeExam] = useState('');
    const [lessonType, setLessonType] = useState('');
    const [card, setCard] = useState('');
    const [display, setDisplay] = useState('table-cell');
    const isSmallDevice = useMediaQuery("(max-width : 768px)");

    let setType = () =>{
        if(typeLesson.exam === true && typeLesson.offset === false){
            setTypeExam("Экзамен");
            setLessonType('exam');
        }else if(typeLesson.exam === false && typeLesson.offset === true){
            setTypeExam("Зачет");
            setLessonType('offset')
        } else{
            setTypeExam('');
        }
    }

    useEffect(()=>{
        setType();
    }, [])

    let addColumn=(event)=>{
        let table = event.target.closest('.table');
        let cards = event.target.closest('.card');
        setCard(cards);
        let tdTextarea = table.querySelector('tr:last-child>td:last-child');
        tdTextarea.setAttribute('colspan', 2);
        setColumn(4);
        let idCard = event.target.closest('.card').getAttribute('id');
        let clone = {};
        Object.assign(clone, podgroups[idCard][0]);
        for (const key in clone) {
            clone[key] = '';
        }
        if(podgroups[idCard].length === 1){
            podgroups[idCard].push(clone)
        }
        podgroups[idCard][0].countStudents = Math.ceil(data[idCard].studentsNumber/2);
        podgroups[idCard][1].countStudents = Math.floor(data[idCard].studentsNumber/2);
        setInfo(podgroups);
        setData(podgroups);
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
    }

  return (
        <table className='table'>
            <thead className='table__head'>
                <tr className='table__tr'>
                    {column === 3? (
                    <>
                        <th className='table__th'>Занятие</th>
                        <th className='table__th'>Часы</th>
                        <th className='table__th last'><div><span>Преподаватель</span> <button onClick={(event)=>addColumn(event)} className='table__btn'><AiOutlinePlus/></button></div></th>
                    </>
                    ):(isSmallDevice ? (
                    <>
                            <th className='table__th'>Занятие</th>
                            <th className='table__th'>Часы</th>
                            <th className='table__th last'><ListPodgroup setGroup = {setGroup} group = {group} setColumn={setColumn}/></th>
                    </>) : (
                        <>
                            <th className='table__th'>Занятие</th>
                            <th className='table__th'>Часы</th>
                            <th className='table__th last'><div><span>Подгруппа 1</span></div></th>
                            <th className='table__th last'><div><span>Подгруппа 2</span> <button onClick={(event)=>removeColumn(event)} className='table__btn'><FaTrash/></button></div></th>
                        </>)
                    )
                    }
                </tr>
            </thead>
            <tbody className='table__body'>
                <TrTable group = {group} lessonType={'lecturesHours'} type = "Лекции" column={column} number={typeLesson.lecturesHours}/>
                <TrTable group = {group} lessonType={'laboratoryHours'} type = "Лабораторные работы" column={column} number={typeLesson.laboratoryHours}/>
                <TrTable group = {group} lessonType={'practicHours'} type = "Практические" column={column} number={typeLesson.practicHours}/>
                <TrTable group = {group} lessonType={'seminarHours'} type = "Семинарские" column={column} number={typeLesson.seminarHours}/>
                {typeExam === '' ? (<></>):(
                    <TrTable isSmallDevice = {isSmallDevice} group = {group} lessonType={lessonType} type = {typeExam} number = '' column={column} />
                )}
                {column === 4 ? (<TrCount card = {card} display = {display} isSmallDevice = {isSmallDevice} group = {group} number={typeLesson.studentsNumber}/>) : (<></>)}
                <tr className='table__tr'>
                    <td className='table__td'>Примечание <p>(для составления расписания)</p></td>
                    <td className='table__td'></td>
                    <td className='table__td'><textarea className='table__textarea'></textarea></td>
                </tr>
            </tbody>
        </table>
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
    )(Table);