import { useState } from 'react'
import './App.css'
import { StudsButton, StudsDropdown, StudsChip, StudsAccordion, StudsAccordionItem } from '@studs/react'



function App() {
  const [count, setCount] = useState(0)

  function onChange() {
    console.log('change');
  }

  const options = [
    {label: "Option 1", value: "1"},
    {label: "Option 2", value: "2"},
    {label: "Option 3", value: "3"},
    {label: "Option 4", value: "4"},
    {label: "Option 5", value: "5"},
    {label: "Option 6", value: "6"},
    {label: "Option 7", value: "7"},
    {label: "Option 8", value: "8"},
    {label: "Option 9", value: "9"},
    {label: "Option 10", value: "10"},
    {label: "Option 11", value: "11"},
    {label: "Option 12", value: "12"},
    {label: "Option 13", value: "13"},
    {label: "Option 14", value: "14"},
    {label: "Option 15", value: "15"},
    {label: "Option 16", value: "16"},
    {label: "Option 17", value: "17"},
    {label: "Option 18", value: "18"},
    {label: "Option 19", value: "19"},
    {label: "Option 20", value: "20"},
    {label: "Option 21", value: "21"},
    {label: "Option 22", value: "22"},
    {label: "Option 23", value: "23"},
    {label: "Option 24", value: "24"},
    {label: "Option 25", value: "25"},
    {label: "Option 26", value: "26"},
    {label: "Option 27", value: "27"},
    {label: "Option 28", value: "28"},
    {label: "Option 29", value: "29"},
    {label: "Option 30", value: "30"},
    {label: "Option 31", value: "31"}
  ]

  return (
    <>
      <StudsAccordion>
        <StudsAccordionItem>
          <div slot="title">Accordion 1</div>
          <div>
            <StudsDropdown options={options} selected="2" onChange={onChange} />
            {/* <StudsRadioGroup>
              <StudsRadio label="Radio 1" value="1" />
              <StudsRadio label="Radio 2" value="2" />
              <StudsRadio label="Radio 3" value="3" />
            </StudsRadioGroup> */}
          </div>
        </StudsAccordionItem>
      </StudsAccordion>
      <div className="card">
        <StudsButton button-type="primary" onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </StudsButton>
        <StudsDropdown options={[{label: "Option 1", value: "1"}, {label: "Option 2", value: "2"}]} selected="2" onChange={onChange} />
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <StudsChip>{count}</StudsChip>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
