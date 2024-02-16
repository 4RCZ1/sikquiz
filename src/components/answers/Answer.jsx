import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function Answer({content, isCorrect, validate, onChange, explanation, updateChecked, checked}) {
  const backgroundColor = validate && ((checked && !isCorrect) || (!checked && isCorrect)) ? 'red' : 'transparent';
  const localOnChange = (event) => {
    updateChecked(event.target.checked);
    const val = (event.target.checked && !isCorrect) || (!event.target.checked && isCorrect)
    console.log('val', val);
    onChange(!val);
  }

  return (
    <>
      <FormControlLabel
        checked={checked}
        control={<Checkbox checked={checked}/>}
        label={content}
        labelPlacement="end"
        style={{backgroundColor, width: "100%", padding: 10}}
        onChange={localOnChange}
      />
      {validate && ((checked && !isCorrect) || (!checked && isCorrect)) && explanation && <div style={{color:'#2bcdff'}}>{explanation}</div>}
    </>
  );
}