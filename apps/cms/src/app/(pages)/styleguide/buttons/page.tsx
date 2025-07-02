import React, { Fragment } from 'react'
import { Metadata } from 'next'
import Link from 'next/link'

import { CallToActionBlock } from '../../../_blocks/CallToAction'
import { Button } from '../../../_components/Button'
import { Gutter } from '../../../_components/Gutter'
import { VerticalPadding } from '../../../_components/VerticalPadding'
import { mergeOpenGraph } from '../../../_utilities/mergeOpenGraph'

export default async function ButtonsPage() {
  return (
    <Fragment>
      <Gutter>
        <p>
          <Link href="/styleguide">Styleguide</Link>
          {' / '}
          <span>Buttons</span>
        </p>
        <h1>Buttons</h1>
      </Gutter>
      <Gutter>
        <VerticalPadding bottom="large" top="none">
          <Button label="Default Button" buttonType="tertiary" />
          <br /> <br />
          <Button label="Primary Button" buttonType="primary" />
          <br /> <br />
          <Button label="Secondary Button" buttonType="secondary" />
          <br /> <br />
          <Button label="Secondary Button" buttonType="link" />
          <br /> <br />
          <Button icon="info" buttonType="floating" />
          <br /> <br />
          <Button icon="info" buttonType="icon" />
          <br /> <br />
          <Button icon="close" buttonType="close" />
          <br /> <br />
          <Button label="Small Button" size='small' />
          <br /> <br />
          <Button label="Large Button" size='large' />
        </VerticalPadding>
      </Gutter>
    </Fragment>
  )
}

export const metadata: Metadata = {
  title: 'Buttons',
  description: 'Styleguide for Buttons',
  openGraph: mergeOpenGraph({
    title: 'Buttons',
    url: '/styleguide/buttons',
  }),
}
