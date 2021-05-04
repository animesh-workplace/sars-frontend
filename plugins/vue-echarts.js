import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { GraphChart } from 'echarts/charts'
import { TitleComponent } from 'echarts/components'

import Vue from 'vue'
import VChart from 'vue-echarts'

use([
  CanvasRenderer,
  GraphChart,
  TitleComponent
])

Vue.use(VChart)
