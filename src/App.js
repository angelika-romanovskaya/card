import './App.css';
import {connect} from 'react-redux'
import {getData as getDataAction} from './redux/module/data'
import {setInfo as setPodgroupsAction} from './redux/module/podgroups'
import Card from './components/Card/Card';
import { useEffect } from 'react';
import Button from './components/Button/Button';

function App({data, getData, setInfo}) {
  useEffect(()=>{
    getData();
  },[])

  useEffect(()=>{
    let groups = [];
    data.forEach(element => {
      groups.push(element.podgroups)
    });
    setInfo(groups);
  },[data])

  return (
    <div className='container'>
      <div className="App">
        {data.map((item,i)=> <Card key={i} id={i} item = {item}/>)}
      </div>
      <Button/>
    </div>
  );
}

const mapStateToProps = function(state) {
  return {
    data: state.data.data,
    podgroups:state.podgroups.podgroups
  }
}

export default connect(
    mapStateToProps,
    {
      setInfo: setPodgroupsAction,
      getData: getDataAction
    }
  )(App);
