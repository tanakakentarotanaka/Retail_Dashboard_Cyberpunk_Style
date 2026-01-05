project_name: "custom_theme_vis_sample"

visualization: {
  id: "cyberpunk_ticker"
  label: "cyberpunk_ticker"
  file: "custom_viz/cyberpunk_ticker.js"
  dependencies: ["https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.min.js"]
}

visualization: {
  id: "cyberpunk_kpi_card"
  label: "cyberpunk_kpi"
  file: "custom_viz/cyberpunk_kpi.js"
  dependencies: ["https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.min.js"]
}

visualization: {
  id: "cyberpunk_bar_chart"
  label: "cyberpunk_viz"
  file: "custom_viz/cyberpunk_viz.js"
  dependencies: ["https://d3js.org/d3.v7.min.js"]
}

visualization: {
  id: "futuristic_donut_chart"
  label: "cyberpunk_futuristic_donut"
  file: "custom_viz/cyberpunk_futuristic_donut.js"
  dependencies: ["https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.min.js"]
}

visualization: {
  id: "cyberpunk-custom-advanced-cross-filter"
  label: "cyberpunk_filter"
  file: "custom_viz/cyberpunk_filter.js"
  # 外部ライブラリ依存なしのためdependenciesは省略
}

visualization: {
  id: "retail-store-shelf-map-viz"
  label: "cyberpunk-store_shelf_map"
  file: "custom_viz/store_shelf_map.js"
  # 外部ライブラリとしてD3.jsを読み込みます
  dependencies: ["https://d3js.org/d3.v7.min.js"]
}
