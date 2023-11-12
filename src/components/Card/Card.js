import React from 'react'
import Table from '../Table/Table';
import './card.css'
import { FaBookOpen } from 'react-icons/fa6';

function Card({item, id}) {

  return (
    <div id={id} className='card'>
       <h1 className='card__title'><FaBookOpen className='card__icon'/>{item.subjectName}</h1>
        <div className='card__table'>
          <div className='card__info'>
            <span className='info__type'>Группа</span>
            <span className='info__meaning'>{item.groupName}</span>
            <span className='info__type'>Курс</span>
            <span className='info__meaning'>{item.course}</span>
          </div>
          <div className='card__info'>
            <span className='info__type'>Количество курсантов</span>
            <span className='info__meaning'>{item.studentsNumber}</span>
            <span className='info__type'>Семестр</span>
            <span className='info__meaning'>{item.semestr}</span>
          </div>
        </div>
        <Table typeLesson={item}/>
    </div>
  )
}

export default Card;