import React from 'react';
import { ComponentKey } from "../PropertiesTable";
import Tables from "../Tables";

const PropertyTabs = ({componentKey} : {componentKey: ComponentKey}) => {
    const ref = React.useRef(null);
    // get nodes from each pane
    React.useEffect(() => {
        const children = Array.from((ref.current as HTMLElement).childNodes).filter((node: HTMLElement) => node.nodeName === 'DIV');
        children.forEach((child: HTMLElement) => {
            const hasTable = !!child.querySelector('studs-table');
            if(!hasTable) {
                console.log('test');
                const tab = ref.current?.querySelector(`#${child.getAttribute('aria-labelledby')}`);
                if(tab) tab.toggleAttribute('disabled', true);
            }
        })
    }, [ref.current]);



    return (
        <studs-tabs ref={ref}>
            <studs-button slot='tab' button-type="tertiary">Properties</studs-button>
            <div slot='panel'>
                <h2>Properties</h2>

                <Tables componentKey={componentKey}></Tables>
            </div>
            <studs-button slot='tab' button-type="tertiary">Slots</studs-button>
            <div slot='panel'>
                <h2>Slots</h2>

                <Tables componentKey={componentKey} type="slots"></Tables>
            </div>
            <studs-button slot='tab' button-type="tertiary">Events</studs-button>
            <div slot='panel'>
                <h2>Events</h2>

                <Tables componentKey={componentKey} type="events"></Tables>
            </div>
        </studs-tabs>
    )
};

export default PropertyTabs;