import React, { useMemo } from 'react';
import { FORM_PROPS } from '@site/src/utils/constants';
import PropertiesTable, { ComponentKey } from '../PropertiesTable';

type TablesProps = {
  hideHeader?: boolean;
  args: Array<argsType>;
  includesFormProps?: boolean;
  componentKey?: ComponentKey;
  type?: 'properties' | 'slots' | 'methods' | 'events';
  headers: Array<
    | 'heightPxRem'
    | 'state'
    | 'behavior'
    | 'size'
    | 'use case'
    | 'title'
    | 'name'
    | 'description'
    | 'reflects'
    | 'type'
    | 'arguments'
    | 'default'
    | 'selection'
    | 'command'
  >;
};

enum STABLE_HEADERS {
  'heightPxRem' = 'Height (px/rem)',
  'state' = 'State',
  'behavior' = 'Behavior',
  'size' = 'Size',
  'use case' = 'Use case',
  'title' = 'Title',
  'name' = 'Name',
  'description' = 'Description',
  'reflects' = 'Reflects',
  'type' = 'Type',
  'default' = 'Default',
  'arguments' = 'Arguments',
  'selection' = 'Selection',
  'command' = 'Command',
}

type argsType = {
  name?: string | undefined;
  description?: JSX.Element | undefined;
  reflects?: boolean | undefined;
  type?: string | undefined;
  arguments?: string | undefined;
  default?: React.ReactNode | undefined;
};

const Tables = (props: TablesProps) => {
  const { componentKey, type, args = [], headers = [], includesFormProps } = props;

  const mergedArgs = includesFormProps ? [...FORM_PROPS, ...args] : args;

  const mapColumn = useMemo(
    () => (row: argsType, colName: string) => {
      if (
        colName === 'description' ||
        colName === 'reflects' ||
        colName === 'behavior' ||
        colName === 'use case' ||
        colName === 'state' ||
        colName === 'size' ||
        colName === 'selection' ||
        colName === 'heightPxRem'
      ) {
        return row[colName];
      }

      if (colName === 'title') {
        return <b>{row[colName]}</b>;
      }

      if (!row[colName]) {
        return '-';
      }

      return (
        <code
          style={{
            backgroundColor: 'rgba(0 0 0 / 0.025)',
            backgroundBlendMode: 'darken',
            borderRadius: '0.25rem',
            padding: '0.125em 0.25em',
          }}
        >
          {row[colName]}
        </code>
      );
    },
    []
  );

  if (componentKey) {
    return <PropertiesTable componentKey={componentKey} type={type} />;
  }

  return (
    <>
      <studs-table>
        <table style={{ maxWidth: '100%', overflowX: 'auto' }}>
          {!props.hideHeader && (
            <thead>
              <tr>
                {headers.map((col) => (
                  <th key={col}>{STABLE_HEADERS[col]}</th>
                ))}
              </tr>
            </thead>
          )}
          <tbody>
            {mergedArgs.map((row, idx) => (
              <tr key={idx}>
                {headers.map((col) => (
                  <td key={col}>{mapColumn(row, col)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </studs-table>
    </>
  );
};

export default Tables;
