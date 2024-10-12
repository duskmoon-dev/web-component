import { customElement, property } from 'lit/decorators.js';
import { DuskmoonEcharts } from './echarts';
import { type EChartsInitOpts } from 'echarts';
import 'echarts-gl';

declare global {
  interface HTMLElementTagNameMap {
    'dm-echarts-gl': DuskmoonEchartsGL;
  }
  interface Window { __DUSKMOON_DEBUG__: boolean | undefined; }
}

export { DuskmoonEchartsGL };

@customElement('dm-echarts-gl')
class DuskmoonEchartsGL extends DuskmoonEcharts {
  @property({ type: String, attribute: true, reflect: true })
  renderer: EChartsInitOpts['renderer'] = 'canvas';
}
