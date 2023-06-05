import React from 'react';
const Loading = ({ref}) => {
    return ( <>
    <div id="loadingDiv" ref={ref} className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </> );
}
 
export default Loading;