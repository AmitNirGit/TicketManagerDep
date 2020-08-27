import React from 'react';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const ControlPanel = (props) => (
  <form className='form'>
    <div className='label-checkbox'>
      <TextField
        id='searchInput'
        label='filter by topic'
        onChange={props.searchHandler}
      />
    </div>

    <div>
      <FormControl component='fieldset'>
        <FormLabel component='legend'>Show:</FormLabel>
        <RadioGroup
          row
          aria-label='filter'
          name='filter1'
          value={props.selectedRadioValue}
          onChange={props.handleRadioChange}>
          <FormControlLabel value='All' control={<Radio />} label='All' />
          <FormControlLabel value='Solved' control={<Radio />} label='Solved' />
          <FormControlLabel
            value='Unsolved'
            control={<Radio />}
            label='Unsolved'
          />
        </RadioGroup>
      </FormControl>
    </div>
  </form>
);

export default ControlPanel;
