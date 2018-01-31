import * as React from 'react';
import * as ReactDOM from 'react-dom';

export interface MonthAutocompleteProps {
  input?: string[]
  months?: string[]
};

export class MonthAutocomplete extends React.Component<MonthAutocompleteProps, {}> {

  render() {
    <div>
      <input ref='inputMonth' type='text' list={months} />
      <datalist id={months}>
        {months.options.map((month, i) => <option key={i}>{month}</option>)}
      </datalist>
    </div>
  }

  get value() {
    return this.refs.inputMonth.value;
  }

  set value(inputValue) {
    this.refs.inputMonth.value = inputValue;
  }

}

  const months = [
    'January', 
    'February', 
    'March', 
    'April', 
    'May', 
    'June', 
    'July', 
    'August', 
    'September', 
    'October', 
    'November', 
    'December'
  ];
