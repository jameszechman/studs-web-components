import { expect, fixture, html } from '@open-wc/testing';
import { describe, it } from 'vitest';

import { StudsTable } from '../../src/components/display/table';

const htmlTableContent = html`<table>
  <caption>
    Table
  </caption>
  <colgroup span="2">
    <col span="2" />
    <col />
  </colgroup>
  <thead>
    <tr>
      <th>first column</th>
      <th>second column</th>
      <th>third column</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>
        <studs-chip deletable="">Chip</studs-chip>
        <studs-chip deletable="">Chip</studs-chip>
      </td>
      <td>3</td>
    </tr>
    <tr>
      <td>1</td>
      <td>
        <studs-chip deletable="">Chip</studs-chip>
        <studs-chip deletable="">Chip</studs-chip>
      </td>
      <td>3</td>
    </tr>
    <tr>
      <td>1</td>
      <td>
        <studs-chip deletable="">Chip</studs-chip>
        <studs-chip deletable="">Chip</studs-chip>
      </td>
      <td>3</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td>1</td>
      <td>
        <studs-chip deletable="">Chip</studs-chip>
        <studs-chip deletable="">Chip</studs-chip>
      </td>
      <td>3</td>
    </tr>
  </tfoot>
</table>`;

describe('StudsTable', async () => {
  it('should render', async () => {
    const el = await fixture<StudsTable>(html`
      <studs-table fixed-offset="0px" size="medium"
        >${htmlTableContent}</studs-table
      >
    `);
    expect(el).to.be.instanceOf(StudsTable);
  });
});
