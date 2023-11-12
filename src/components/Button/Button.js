import React, { useEffect } from 'react'
import './button.css'
import {connect} from 'react-redux'
import {getData as getDataAction, postData as postDataAction} from '../../redux/module/data'
import {setData as setDataAction} from '../../redux/module/data'

function Button({data, postData, getData}) {

  useEffect(()=>{
    getData();
  },[])

  return (
    <button onClick={()=>postData(data)} className='btn__save'>Сохранить</button>
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
      setData: setDataAction,
      getData: getDataAction,
      postData: postDataAction
    }
  )(Button);