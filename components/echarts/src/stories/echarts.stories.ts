import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { DuskmoonEcharts } from '../echarts';

window.__DUSKMOON_DEBUG__ = true;

const meta = {
  title: 'ECharts/dm-echarts',
  tags: ['autodocs'],
  render: ({ loading, renderer, innerHTML }) => html`
    <div style="width:800px;height:480px;border: 1px solid #ccc;">
      <dm-echarts ?loading=${loading} renderer=${renderer}>${innerHTML}</dm-echarts>
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
} satisfies Meta<DuskmoonEcharts>;

export default meta;

type Story = StoryObj<DuskmoonEcharts>;

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
              text: 'Best in the World!',
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

export const Loading: Story = {
  args: {
    loading: true,
  },
};

export const Top: Story = {
  args: {
    loading: false,
    innerHTML: JSON.stringify({
      tooltip: {
        show: true,
      },
      grid: {
        x: 0,
        y: 0,
        x2: 0,
        y2: 0,
      },
      xAxis: [
        {
          min: 0,
          scale: true,
          type: 'value',
        },
      ],
      yAxis: [
        {
          type: 'category',
          show: false,
          data: ['2021-01', '2021-02', '2021-03', '2021-04', '2021-05', '2021-06'],
        },
      ],
      series: [
        {
          type: 'bar',
          data: [2123, 3354, 4012, 2175, 5800, 2630],
        },
      ],
    }),
  }
};

export const Pie: Story = {
  args: {
    loading: false,
    innerHTML: JSON.stringify({
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {d}%',
      },
      legend: {
        orient: 'vertical',
        x: 'left',
        data: [],
      },
      series: [
        {
          type: 'pie',
          radius: '65%',
          sort: 'ascending',
          center: ['50%', '55%'],
          selectedMode: 'single',
          data: [{ name: 'NODATA', value: 1 }],
          itemStyle: { normal: { labelLine: { length: 30 } } },
        },
      ],
    }),
  },
};

export const Line: Story = {
  args: {
    loading: false,
    innerHTML: JSON.stringify({
      tooltip: {
        trigger: 'axis',
        formatter: '{b}<br/>{a} : ${c}',
      },
      toolbox: {
        show: false,
      },
      grid: {
        x: 80,
        x2: 80,
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: ['2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021'],
        },
      ],
      yAxis: [
        {
          type: 'value',
        },
      ],
      series: [
        {
          name: 'ETH Price',
          type: 'line',
          smooth: true,
          itemStyle: { normal: { areaStyle: { type: 'default' } } },
          data: [400, 500, 1000, 2000, 4000, 2000, 3000, 2000],
        },
      ],
    }),
  },
};

export const Radar: Story = {
  args: {
    loading: false,
    innerHTML: JSON.stringify({
      title: {
        text: 'Basic Radar Chart',
      },
      legend: {
        data: ['Allocated Budget', 'Actual Spending'],
      },
      radar: {
        // shape: 'circle',
        indicator: [
          { name: 'Sales', max: 6500 },
          { name: 'Administration', max: 16000 },
          { name: 'Information Technology', max: 30000 },
          { name: 'Customer Support', max: 38000 },
          { name: 'Development', max: 52000 },
          { name: 'Marketing', max: 25000 },
        ],
      },
      series: [
        {
          name: 'Budget vs spending',
          type: 'radar',
          data: [
            {
              value: [4200, 3000, 20000, 35000, 50000, 18000],
              name: 'Allocated Budget',
            },
            {
              value: [5000, 14000, 28000, 26000, 42000, 21000],
              name: 'Actual Spending',
            },
          ],
        },
      ],
    }),
  },
};
