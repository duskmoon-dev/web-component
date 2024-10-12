# @duskmoon-dev/echarts-el

Provides html custom elements: 

- `dm-echarts`
- `dm-echarts-gl`

```html
<dm-echarts>
    {JSON.stringify(config)}
</dm-echarts>

<dm-echarts-gl>
    {JSON.stringify(config)}
</dm-echarts-gl>
```

Trigger events when chart changes

```js
export const CHART_INIT_EVENT = 'chart-initialized';

export const CHART_UPDATED_EVENT = 'chart-updated';

export const CHART_RESET_EVENT = 'chart-reset';

export const CHART_DISPOSE_EVENT = 'chart-dispose';
```

## For developer

To install dependencies:

```shell
bun install
```

To Show storybook:

```shell
bun run storybook
```

To build:

```shell
bun run build
```

To publish:

```shell
npm publish
```
