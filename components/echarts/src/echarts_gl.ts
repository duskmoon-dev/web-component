import { customElement } from 'lit/decorators.js';
import { DuskmoonEcharts } from './echarts';
import 'echarts-gl';

declare global {
  interface HTMLElementTagNameMap {
    'dm-echarts-gl': DuskmoonEchartsGL;
  }
  interface Window { __DUSKMOON_DEBUG__: boolean | undefined; }
}

export { DuskmoonEchartsGL };

@customElement('dm-echarts-gl')
class DuskmoonEchartsGL extends DuskmoonEcharts {}
