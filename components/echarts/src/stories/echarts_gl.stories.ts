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
import earthImg from './assets/earth.jpg';
import starfieldImg from './assets/starfield.jpg';

export const Globe: Story = {
  args: {
    loading: false,
    innerHTML: JSON.stringify({
      backgroundColor: '#222',
      globe: {
        baseTexture: `${earthImg}`,
        heightTexture: `${bathImg}`,
        environment: `${starfieldImg}`,
        shading: 'color',
        light: {
          ambient: {
            intensity: 1
          },
          main: {
            intensity: 1
          }
        },
        viewControl: {
          autoRotate: true
        }
      },
      series: [
        {
          type: 'scatter3D',
          coordinateSystem: 'globe',
          label: { 
            show: true, 
            distance: 5,
            formatter: '{b}'
          },
          stack: 'value',
          stackStrategy: 'all',
          data: [
            {
              name: 'Beijing',
              value: [116.401159, 39.902798, 0],
            },
            {
              name: 'Guangzhou',
              value: [113.295827, 23.116548, 0],
            },
          ],
          silent: false,
          itemStyle: {
            color: 'lightblue'
          }
        },
        {
          type: 'lines3D',
          coordinateSystem: 'globe',
          name: 'line',
          effect: {
            show: true,
            trailWidth: Math.E,
            trailLength: Math.E,
            trailOpacity: .75,
            trailColor: 'rgb(230, 30, 60)'
          },
          lineStyle: {
            width: Math.E,
            color: 'rgb(250, 50, 50)',
            opacity: 0.5
          },
          blendMode: 'lighter',
          data: [
            [
              [116.401159, 39.902798, 1],
              [113.295827, 23.116548, 1],
            ],
          ],
        },
      ],
    }),
  },
};