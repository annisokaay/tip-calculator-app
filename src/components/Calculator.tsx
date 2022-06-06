import { useState } from 'react';
import { toNumber } from '../utils/toNumber';
import { CustomInput } from './common/Input';

export function Calculator() {
  const tipOptions = [5, 10, 15, 25, 50];

  const [isCustomTipActive, setIsCustomTipActive] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [bill, setBill] = useState(0);
  const [tip, setTip] = useState(5);
  const [peopleCount, setPeopleCount] = useState(0);

  const isCalculatable = bill && peopleCount;
  const tipAmount = isCalculatable ? (bill * (tip / 100)) / peopleCount : 0;
  const total = isCalculatable ? bill / peopleCount + tipAmount : 0;

  const handleReset = () => {
    setBill(0);
    setPeopleCount(0);
    setTip(5);
    setIsCustomTipActive(false);
  };

  const onTipSelect = (tip: number) => {
    if (isCustomTipActive) setIsCustomTipActive(false);

    setTip(tip);
  };

  return (
    <div className='app-container'>
      <div className='form'>
        <div>
          <label>Bill</label>
          <CustomInput
            className='bill'
            name='bill'
            value={bill}
            onChange={(e) => setBill(toNumber(e.target.value))}
          />
        </div>

        <div>
          <label>Select Tip %</label>
          <div className='tip-amount'>
            {tipOptions.map((option) => (
              <button
                type='button'
                key={option}
                className={'tip-button' + (option === tip ? ' selected' : '')}
                onClick={() => onTipSelect(option)}
              >
                {option + '%'}
              </button>
            ))}

            {isCustomTipActive ? (
              <CustomInput
                name='tip'
                value={tip}
                onChange={(e) => setTip(toNumber(e.target.value))}
              />
            ) : (
              <button
                type='button'
                className='tip-button'
                onClick={() => {
                  setTip(0);
                  setIsCustomTipActive((isActive) => !isActive);
                }}
              >
                Custom
              </button>
            )}
          </div>
        </div>

        <div>
          <div className='input-error'>
            <label>Number of People</label>
            {validationError && <div className='error'>{validationError}</div>}
          </div>
          <CustomInput
            name='peopleCount'
            className='people'
            value={peopleCount}
            onChange={(e) => {
              const peopleCount = toNumber(e.target.value);
              if (peopleCount === 0) {
                setValidationError("Can't be zero");
              } else if (validationError) setValidationError('');

              setPeopleCount(peopleCount);
            }}
          />
        </div>
      </div>

      <div className='result'>
        <div>
          <div>
            <span className='title'>Tip Amount</span>
            <span className='subtitle'>/ person</span>
          </div>
          <div className='total-amount'>${tipAmount.toFixed(2)}</div>
        </div>
        <div>
          <div>
            <span className='title'>Total</span>
            <span className='subtitle'>/ person</span>
          </div>
          <div className='total-amount'>${total.toFixed(2)}</div>
        </div>

        <button className='reset' type='reset' onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
}
