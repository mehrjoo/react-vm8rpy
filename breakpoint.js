import React, {
  useState,
  useEffect,
  createContext,
  useContext} from 'react';

const defaultValue = {}

const BreakpointContext = createContext(defaultValue);

const initQueries = {  
  xs: '(min-width: 1px)',
  sm: '(min-width: 576px)', 
  md: '(min-width: 768px)', 
  lg: '(min-width: 992px)', 
  xl: '(min-width: 1200px)', 
  portrait: '(orientation: portrait)', 
}

const BreakpointProvider = ({children, queries = initQueries}) => {
  const [queryMatch, setQueryMatch] = useState({});

  useEffect(() => {
    const mediaQueryLists = {};
    const keys = Object.keys(queries);
    let isAttached = false;

    const handleQueryListener = () => {
      const updatedMatches = keys.reduce((acc, media) => {
        acc[media] = !!(mediaQueryLists[media] && mediaQueryLists[media].matches);
        return acc;
      }, {})
      setQueryMatch(updatedMatches)
    }

    if (window && window.matchMedia) {
      const matches = {};
      keys.forEach(media => {
        if (typeof queries[media] === 'string') {
          mediaQueryLists[media] = window.matchMedia(queries[media]);
          matches[media] = mediaQueryLists[media].matches
        } else {
          matches[media] = false
        }
      });
      setQueryMatch(matches);
      isAttached = true;
      keys.forEach(media => {
        if(typeof queries[media] === 'string') {
          mediaQueryLists[media].addListener(handleQueryListener)
        }
      });
    }

    return () => {
      if(isAttached) {
        keys.forEach(media => {
          if(typeof queries[media] === 'string') {
            mediaQueryLists[media].removeListener(handleQueryListener)
          }
        });
      }
    }
  }, [queries]);

  return (
    <BreakpointContext.Provider value={queryMatch}>
      {children}
    </BreakpointContext.Provider>
  )

}

function useBreakpoint() {
  const context = useContext(BreakpointContext);
  if(context === defaultValue) {
    throw new Error('useBreakpoint must be used within BreakpointProvider');
  }
  return context;
}
export {useBreakpoint, BreakpointProvider};

/*
//BreakpointProvider
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BreakpointProvider} from './breakpoint'



const queries = {
  xs: '(max-width: 320px)',
  sm: '(max-width: 720px)',
  md: '(max-width: 1024px)',
  or: '(orientation: portrait)', // we can check orientation also
}

ReactDOM.render(
<BreakpointProvider queries={queries}>
  <App />
</BreakpointProvider>, document.getElementById('root'));
*/

/*
// useBreakpoint
import React from 'react'
import {useBreakpoint} from './breakpoint.js'

const Usage = () => {
  const breakpoints = useBreakpoint();
  
  const matchingList = Object.keys(breakpoints).map(media => (
    <li key={media}>{media} ---- {breakpoints[media] ? 'Yes' : 'No'}</li>
  ))
  
  return (
    <ol>
      {matchingList}
    </ol>
  )
}
*/