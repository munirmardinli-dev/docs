"use client"
import { Cards } from 'nextra/components'
import AcUnitIcon from '@mui/icons-material/AcUnit';

export default function CardComponents () {
	return <Cards>
  <Cards.Card
    icon={<AcUnitIcon />}
    title="Callout"
    href="/docs/built-ins/callout"
  />
  <Cards.Card
    icon={<AcUnitIcon />}
    title="Tabs"
    href="/docs/built-ins/tabs"
  />
  <Cards.Card
    icon={<AcUnitIcon />}
    title="Steps"
    href="/docs/built-ins/steps"
  />
</Cards>
};
