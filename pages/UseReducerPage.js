import React,{useState, useEffect, useReducer} from 'react';
import moment from 'moment';
import _ from 'lodash';

const getDaySpans = (endOfMonth) => _
    .chain(1)
    .range( endOfMonth + 1)
    .chunk(7)
    .tap((a) => { console.debug('getDaySpans', a); return a; })
    .value();

const initialState = {    
    year: moment().get('year'),
    month: moment().get('month'),
    endOfMonth: moment().endOf('month').date(),
    spans: getDaySpans(moment().endOf('month').date()),
    selectedSpan:0,
  };

function reducer(state, action) {
  switch (action.type) {
    case 'SELECT_MONTH':
      const {year, month} = action.payload; 
      const endOfMonth = moment({year, month}).endOf('month').date();
      return {
      ...state,
      year, 
      month,
      endOfMonth,
      spans: getDaySpans(endOfMonth),
      selectedSpan: (endOfMonth === 28 && state.selectedSpan === 4)
        ? state.selectedSpan -1 : state.selectedSpan, 
      };
    case 'SELECT_SPAN':
    const {selectedSpan} = action.payload;
      return {
        ...state,
        selectedSpan
      };
    default:
      throw new Error('unknown action type');
  }
}




export default ({ name }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetch = async () => {
    console.log('fetch', _.pick(state,['year','month','endOfMonth','selectedSpan']))
  }

  useEffect(()=>{
    fetch()
  },[name,state]);

  const handleMonthChange =({year, month})=>{
    dispatch({type: 'SELECT_MONTH', payload:{year, month}});    
  }

  const handleSpanChange =(selectedSpan)=>{
    dispatch({type: 'SELECT_SPAN', payload:{selectedSpan}});    
  }

  const calendar = [{year:2021, month:1},{year:2020, month:4}]
  
  return(
    <>
    Use Reducer
    {calendar.map((date,i) => (
      <div style={{margin:5}} key={i} onClick={()=>handleMonthChange(date)}>
      {moment(date).format('YYYY MMM')}
      </div>))}
    
    {state.spans.map((span,i)=>(
      <span key={i}
        style={{margin:5,color:(i === state.selectedSpan)? 'blue':'inherit'}}
        onClick={()=>handleSpanChange(i)}
      >
        {`${_.first(span)}${span.length === 1 ? '' : `-${_.last(span)}`}`}
      </span>
    ))}
    
    <div>{JSON.stringify(state)}</div>
    </>
    )
};
