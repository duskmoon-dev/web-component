import { LitElement, html, css, type PropertyValueMap } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import * as echarts from 'echarts';
import { type EChartsInitOpts } from 'echarts';

import * as events from './events';

declare global {
  interface HTMLElementTagNameMap {
    'dm-echarts': DuskmoonEcharts;
  }
  interface Window { __DUSKMOON_DEBUG__: boolean | undefined; }
}

export { DuskmoonEcharts };

@customElement('dm-echarts')
class DuskmoonEcharts extends LitElement {
  static override styles = css`
    :host {
      display: flex;
      width: inherit;
      height: inherit;
    }
    #container {
      display: flex;
      flex: 1 1 auto;
    }
  `;

  get chartContainer() : HTMLDivElement {
    return this.renderRoot.querySelector('#container') as HTMLDivElement;
  }

  chart: echarts.ECharts | undefined;
  resizeObserver: ResizeObserver | undefined;
  observer: MutationObserver | undefined;

  @property({ type: String, attribute: true, reflect: true })
  renderer: EChartsInitOpts['renderer'] = 'svg';

  @property({ type: Boolean, attribute: true, reflect: true })
  loading: boolean = false;

  override connectedCallback() {
    super.connectedCallback();
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    if (this.parentElement) {
      this.resizeObserver?.unobserve(this.parentElement);
    }
    const evt = new CustomEvent(events.CHART_DISPOSE_EVENT, {
      detail: {
        chart: this.chart,
        options: this.options,
      },
    });
    this.dispatchEvent(evt);
    this.chart?.dispose();
    this.observer?.disconnect();
  }

  override firstUpdated() {
    this.chart = echarts.init(this.chartContainer, {}, { renderer: this.renderer });
    this.resizeObserver = new ResizeObserver((_entries) => {
      this.chart?.resize();
    });
    if (this.parentElement) {
      this.resizeObserver.observe(this.parentElement);
    }
    this.observer = new MutationObserver(() => {
      this.updateChart();
    });
    this.observer.observe(this, { subtree: true, childList: true, attributes: true });
    const evt = new CustomEvent(events.CHART_INIT_EVENT, {
      detail: {
        chart: this.chart,
        options: this.options,
      },
    });
    this.dispatchEvent(evt);
  }

  override attributeChangedCallback(
    name: string,
    _old: string | null,
    value: string | null,
  ): void {
    super.attributeChangedCallback(name, _old, value);
    if (name === 'loading') {
      this.resetChart();
    }
  }

  override render() {
    return html` <div id="container"></div> `;
  }

  override updated(_p: PropertyValueMap<any> | Map<PropertyKey, unknown>) {
    super.updated(_p);

    this.updateChart();
  }

  updateChart() {
    this.chart?.setOption(this.options);
    const evt = new CustomEvent(events.CHART_UPDATED_EVENT, {
      detail: {
        chart: this.chart,
        options: this.options,
      },
    });
    this.dispatchEvent(evt);
  }

  resetChart() {
    this.chart?.setOption(this.options, true);
    const evt = new CustomEvent(events.CHART_RESET_EVENT, {
      detail: {
        chart: this.chart,
        options: this.options,
      },
    });
    this.dispatchEvent(evt);
  }

  _options = {};

  get options() {
    if (this.loading) {
      return this.loadingOptions;
    }
    try {
      const data = JSON.parse(this.textContent ?? '{}');
      this._options = data;
      return data;
    } catch (e) {
      if (window.__DUSKMOON_DEBUG__ === true) {
        console.error(e);
      }
      return this._options;
    }
  }

  get loadingOptions() {
    return {
      graphic: {
        elements: [
          {
            type: 'group',
            left: 'center',
            top: 'center',
            children: new Array(7).fill(0).map((_val, i) => ({
              type: 'rect',
              x: i * 20,
              shape: {
                x: 0,
                y: -40,
                width: 10,
                height: 80,
              },
              style: {
                fill: '#5470c6',
              },
              keyframeAnimation: {
                duration: 1000,
                delay: i * 200,
                loop: true,
                keyframes: [
                  {
                    percent: 0.5,
                    scaleY: 0.3,
                    easing: 'cubicIn',
                  },
                  {
                    percent: 1,
                    scaleY: 1,
                    easing: 'cubicOut',
                  },
                ],
              },
            })),
          },
        ],
      },
    };
  }
}
