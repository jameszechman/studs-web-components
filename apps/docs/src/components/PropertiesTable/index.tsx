import React from 'react';
import {
  useActiveDocContext,
} from '@docusaurus/plugin-content-docs/client';

export type ComponentKey = string;

type TablesProps = {
  componentKey?: ComponentKey;
  type: 'properties' | 'slots' | 'methods' | 'events';
  forSlot?: boolean;
};

const PropertiesTable = ({componentKey, type = 'properties'}: TablesProps) => {
  const docsContext = useActiveDocContext();
  // Dynamically import the component metadata
  const meta = () => {
    try {
      return require(`../../../versioned_components/${docsContext.activeVersion.name}/custom-element.json`);
    } catch (e) {
      const latest = require('@site/versions.json')[0];
      return require(`@site/versioned_components/${latest}/custom-element.json`);
    }
  }
  // const meta = require(`../../../versioned_components/${docsContext.activeVersion.name}/custom-element.json`);
  const component = meta()?.tags?.find((item: any) => item.name === `studs-${componentKey}`);
  if (!component) return <>This component does not have {type} defined for version <code>{docsContext.activeVersion.name}</code></>;

  const columns = () => {
    switch(type) {
      case "properties":
        return ['Name', 'Attribute', 'Type', 'Default', 'Description',];
      case "slots":
      case "methods":
      case "events":
        return ['Name', 'Description'];
      default:
        return ['Name', 'Attribute', 'Type', 'Default', 'Description'];
    }
  }

  const rows = () => {
    switch (type) {
      case 'properties':
        return component?.properties;
      case 'slots':
        return component?.slots;
      case 'methods':
        return component?.methods;
      case 'events':
        return component?.events;
      default:
        return component?.properties;
    }
  }

  if (!rows()) return <>This component does not have {type} defined for version <code>{docsContext.activeVersion.name}</code></>;

  return (
    <studs-table>
      <table style={{ maxWidth: '100%', overflowX: 'auto' }}>
        <thead>
          <tr>
            {columns().map((column) => <td key={column}>{column}</td>)}
          </tr>
        </thead>
        <tbody>
          {!!rows() && rows().map((item) => {
            if(item.name === 'styles') return null;
            const keys = columns();
            return (
              <tr key={item.name}>
                {keys.map(key => {
                  const k = key.toLowerCase();
                  return <td key={key}>
                    {item[k] ? <code dangerouslySetInnerHTML={{ __html: item[k] }}></code> : ''}
                  </td>})}
              </tr>
            );
          })}
        </tbody>
      </table>
    </studs-table>
  );
};

export default PropertiesTable;
