import React from 'react';

const CharsRadioButtons = (props) => {
  return(
  <>
    <div id={`choice${props.name}`}>
      {props.name}
          : None selected
        </div>
    {/* <RadioRowWrapper> */}
    <input type="radio" key={`${props.name}${Math.random()}`} onClick={props.handleCharRadioClick} required="required" name={`${props.name}`} value="1" />
    <input type="radio" key={`${props.name}${Math.random()}`} onClick={props.handleCharRadioClick} required="required" name={`${props.name}`} value="2" />
    <input type="radio" key={`${props.name}${Math.random()}`} onClick={props.handleCharRadioClick} required="required" name={`${props.name}`} value="3" />
    <input type="radio" key={`${props.name}${Math.random()}`} onClick={props.handleCharRadioClick} required="required" name={`${props.name}`} value="4" />
    <input type="radio" key={`${props.name}${Math.random()}`} onClick={props.handleCharRadioClick} required="required" name={`${props.name}`} value="5" />
    {/* </RadioRowWrapper> */}
    {/* <CharWorstBestWrapper> */}
    <div>
      {props.charsObject[props.name][0]}
    </div>
    <div>
      {props.charsObject[props.name][4]}
    </div>
    {/* </CharWorstBestWrapper> */}
  </>
  )
};

export default CharsRadioButtons;