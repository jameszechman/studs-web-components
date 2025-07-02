import {StudsButton, StudsAccordion, StudsAccordionItem, StudsChip, StudsDropdown, Studs} from "./index";
import { createRoot } from 'react-dom/client';

Studs.init();

export const App = () => {
    return (
        <>
        <StudsChip deletable>Chip</StudsChip>
        <StudsButton buttonType="cta">Button</StudsButton>
        <StudsAccordion defaultOpen={true} enableSearch={true} enableHeader={true}>
            <StudsAccordionItem open={true}>
                <h1>Accordion item</h1>
                <p>Accordion item content</p>
                <p>Test</p>
            </StudsAccordionItem>
        </StudsAccordion>
        <StudsDropdown options={[
            {
                "value": "1",
                "label": "Option 1"
            },
            {
                "value": "2",
                "label": "Option 2"
            },
            {
                "value": "3",
                "label": "Option 3"
            },
            {
                "value": "4",
                "label": "Option 4"
            }
            ]} selected="2"/>
        </>
    )
}

const root = createRoot(document.getElementById('root'))
root.render(<App />)
