import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { DuskmoonEchartsGL } from '../echarts_gl';

window.__DUSKMOON_DEBUG__ = true;

const meta = {
  title: 'ECharts/dm-echarts-gl',
  tags: ['autodocs'],
  render: ({ loading, renderer, innerHTML }) => html`
    <div style="width:800px;height:480px;border: 1px solid #ccc;">
      <dm-echarts-gl ?loading=${loading} renderer=${renderer}>${innerHTML}</dm-echarts-gl>
    </div>
  `,
  argTypes: {
    loading: {
      control: { type: 'boolean' },
    },
    innerHTML: {
      control: { type: 'text' },
    },
  },
  args: {},
} satisfies Meta<DuskmoonEchartsGL>;

export default meta;

type Story = StoryObj<DuskmoonEchartsGL>;

export const Primary: Story = {
  args: {
    loading: false,
    innerHTML: JSON.stringify({
      graphic: {
        elements: [
          {
            type: 'text',
            left: 'center',
            top: 'center',
            style: {
              text: 'Duskmoon GL!',
              fontSize: 80,
              fontWeight: 'bold',
              lineDash: [0, 200],
              lineDashOffset: 0,
              fill: 'transparent',
              stroke: '#000',
              lineWidth: 1,
            },
            keyframeAnimation: {
              duration: 3000,
              loop: true,
              keyframes: [
                {
                  percent: 0.7,
                  style: {
                    fill: 'transparent',
                    lineDashOffset: 200,
                    lineDash: [200, 0],
                  },
                },
                {
                  // Stop for a while.
                  percent: 0.8,
                  style: {
                    fill: 'transparent',
                  },
                },
                {
                  percent: 1,
                  style: {
                    fill: 'orange',
                  },
                },
              ],
            },
          },
        ],
      },
    }),
  },
};

import topoImg from './assets/world.topo.bathy.200401.jpg';
import bathImg from './assets/bathymetry_bw_composite_4k.jpg';

export const Globe: Story = {
  args: {
    loading: false,
    innerHTML: JSON.stringify({
      backgroundColor: '#222',
      globe: {
        baseTexture: `${topoImg}`,
        heightTexture: `${bathImg}`,
        shading: 'lambert',
        light: {
          ambient: {
            intensity: 0.6
          },
          main: {
            intensity: 0.6
          }
        },
        viewControl: {
          autoRotate: true
        }
      },
      series: {
        type: 'lines3D',
        coordinateSystem: 'globe',
        blendMode: 'lighter',
        lineStyle: {
          width: 1,
          color: 'rgb(50, 50, 150)',
          opacity: 0.1
        },
        data: [],
      }
    }),
  },
};