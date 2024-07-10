import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { LogoGsmlgDev } from '../gsmlg_dev';

const meta = {
  title: 'Logo/gsmlg-dev',
  tags: ['autodocs'],
  render: ({ width, height }) => html`<logo-gsmlg-dev width=${width} height=${height} />`,
  argTypes: {
    width: {
      control: { type: 'number' },
    },
    height: {
      control: { type: 'number' },
    },
  },
  args: {},
} satisfies Meta<LogoGsmlgDev>;

export default meta;

type Story = StoryObj<LogoGsmlgDev>;

export const Primary: Story = {
  args: {
    width: 200,
    height: 40,
  },
};
