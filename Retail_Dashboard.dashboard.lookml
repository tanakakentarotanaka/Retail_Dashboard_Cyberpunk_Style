---
- dashboard: retail_dashboard_cyberpunk_style
  title: Retail Dashboard (Cyberpunk style)
  layout: newspaper
  preferred_viewer: dashboards-next
  crossfilter_enabled: true
  description: ''
  preferred_slug: KZjT2fRb3CN8T1zvXgFvrf
  theme_name: Cyberpunk_2025
  elements:
  - name: ''
    type: text
    title_text: ''
    subtitle_text: ''
    body_text: "<style>\n@import url('https://fonts.googleapis.com/css2?family=Zen+Dots&display=swap');\n\
      </style>\n\n<div style=\"\n  width: 100%;\n  background-color: #161925;\n  border-bottom:\
      \ 1px solid #2C3044;\n  font-family: 'Zen Dots', sans-serif;\n  margin-bottom:\
      \ 10px;\n  padding-top: 10px;\n\">\n  <nav style=\"\n    display: flex;\n  \
      \  gap: 8px;\n    align-items: center;\n    padding-left: 10px;\n    flex-wrap:\
      \ wrap;\n  \">\n    \n    <a href=\"https://padawanjp.jp.looker.com/folders/home\"\
      \ target=\"_blank\" rel=\"noopener noreferrer\" style=\"\n      text-decoration:\
      \ none;\n      color: #94A3B8;\n      padding: 10px 24px;\n      border-radius:\
      \ 8px 8px 0 0;\n      font-weight: 500;\n      border-bottom: 3px solid transparent;\n\
      \      transition: color 0.2s ease;\n    \">\n      Home\n    </a>\n\n    <a\
      \ href=\"/dashboards/3\" target=\"_blank\" rel=\"noopener noreferrer\" style=\"\
      \n      text-decoration: none;\n      color: #FFFFFF;\n      background-color:\
      \ rgba(127, 0, 255, 0.15);\n      padding: 10px 24px;\n      border-radius:\
      \ 8px 8px 0 0;\n      font-weight: bold;\n      border-bottom: 3px solid #E100FF;\n\
      \      text-shadow: 0 0 8px rgba(225, 0, 255, 0.6);\n      transition: all 0.2s\
      \ ease;\n    \">\n      Layout\n    </a>\n\n    <a href=\"https://docs.google.com/document/d/1yW4y7zE53hOD5R19wxFHR2xUF0BsgzEPJN2j-C7owjM/edit?resourcekey=0-RFvCHMXgY5vz8yCuCk0x0g&tab=t.qu0vnjmjwk7q\"\
      \ target=\"_blank\" rel=\"noopener noreferrer\" style=\"\n      text-decoration:\
      \ none;\n      color: #94A3B8;\n      padding: 10px 24px;\n      border-radius:\
      \ 8px 8px 0 0;\n      font-weight: 500;\n      border-bottom: 3px solid transparent;\n\
      \      transition: color 0.2s ease;\n    \">\n      Guide\n    </a>\n\n    <a\
      \ href=\"https://docs.google.com/presentation/d/1YAJ4bQ30MrCJfbdooZKpSphX6u0LWxuXbY3plXH2-Fg/edit?resourcekey=0-rm058HzNCQ4MDLs28WNfcg&slide=id.g3b33eee606e_0_505#slide=id.g3b33eee606e_0_505\"\
      \ target=\"_blank\" rel=\"noopener noreferrer\" style=\"\n      text-decoration:\
      \ none;\n      color: #94A3B8;\n      padding: 10px 24px;\n      border-radius:\
      \ 8px 8px 0 0;\n      font-weight: 500;\n      border-bottom: 3px solid transparent;\n\
      \      transition: color 0.2s ease;\n    \">\n      How to Build\n    </a>\n\
      \n    <a href=\"https://drive.google.com/drive/folders/165-d0aPru38N3YheA0UsIfet5lNfGUl9?resourcekey=0-m5B9vs4GLhpCOtvNOtWkZg&usp=drive_link\"\
      \ target=\"_blank\" rel=\"noopener noreferrer\" style=\"\n      text-decoration:\
      \ none;\n      color: #94A3B8;\n      padding: 10px 24px;\n      border-radius:\
      \ 8px 8px 0 0;\n      font-weight: 500;\n      border-bottom: 3px solid transparent;\n\
      \      transition: color 0.2s ease;\n    \">\n      Google Drive(Resources)\n\
      \    </a>\n  </nav>\n</div>\n"
    row: 0
    col: 0
    width: 24
    height: 2
  - title: 新しいタイル
    name: 新しいタイル
    model: custom_theme_vis_sample
    explore: store_inventory_data
    type: custom_viz_dashboard_cyberpunk::cyberpunk-custom-advanced-cross-filter
    fields: [store_inventory_data.product_category, sales_data.total_gross_profit]
    sorts: [sales_data.total_gross_profit desc 0]
    limit: 500
    column_limit: 50
    hidden_fields: []
    hidden_points_if_no: []
    series_labels: {}
    show_view_names: false
    selection_mode: multi
    title_override: ''
    selected_measure: sales_data.total_gross_profit
    vis_type: data_bar
    bar_position: row
    bar_direction: left
    show_measure_val: true
    measure_format: "$#,##0"
    data_bar_opacity: 70
    color_min: "#fafcff"
    color_mid: "#f7bdff"
    color_max: "#E100FF"
    global_bg_color: "#E100FF"
    global_bg_opacity: 0
    bg_image_size: cover
    bg_image_repeat: no-repeat
    bg_image_position: center center
    header_font_size: '14'
    header_text_color: "#94A3B8"
    search_btn_pos: right
    search_box_border_color: "#37aba7"
    search_box_border_width: 1
    search_box_radius: 4
    search_shadow_depth: low
    search_box_bg: "#ffffff"
    search_box_opacity: 10
    search_text_color: "#d6d6d6"
    search_btn_bg_color: "#f8f9fa"
    search_btn_bg_opacity: 10
    search_btn_text_color: "#2c8784"
    btn_border_color: "#37aba7"
    btn_border_width: 1
    btn_shadow_depth: low
    search_menu_bg_color: "#ffffff"
    search_menu_bg_opacity: 100
    search_menu_text_color: "#333333"
    list_border_color: "#48ded9"
    list_border_width: 1
    list_radius: 4
    list_shadow_depth: inset
    list_font_size: '13'
    list_text_color: "#e3e3e3"
    list_bg_color: "#000000"
    list_bg_opacity: 20
    checkbox_color: "#E100FF"
    checkbox_unchecked_border: "#3d9994"
    checkbox_unchecked_bg: "#ffffff"
    checkbox_unchecked_opacity: 10
    row_hover_color: "#f1f3f4"
    row_hover_opacity: 50
    row_active_text_color: "#e3e3e3"
    row_active_bg_color: "#000000"
    row_active_opacity: 40
    x_axis_gridlines: false
    y_axis_gridlines: true
    show_y_axis_labels: true
    show_y_axis_ticks: true
    y_axis_tick_density: default
    y_axis_tick_density_custom: 5
    show_x_axis_label: true
    show_x_axis_ticks: true
    y_axis_scale_mode: linear
    x_axis_reversed: false
    y_axis_reversed: false
    plot_size_by_field: false
    trellis: ''
    stacking: ''
    limit_displayed_rows: false
    legend_position: center
    point_style: none
    show_value_labels: false
    label_density: 25
    x_axis_scale: auto
    y_axis_combined: true
    ordering: none
    show_null_labels: false
    show_totals_labels: false
    show_silhouette: false
    totals_color: "#808080"
    defaults_version: 0
    title_hidden: true
    listen: {}
    row: 2
    col: 0
    width: 4
    height: 7
  - title: 新しいタイル
    name: 新しいタイル (2)
    model: custom_theme_vis_sample
    explore: store_inventory_data
    type: custom_viz_dashboard_cyberpunk::cyberpunk_kpi_card
    fields: [sales_data.total_gross_profit]
    limit: 500
    column_limit: 50
    hidden_fields: []
    hidden_points_if_no: []
    series_labels: {}
    show_view_names: true
    mainColor: "#00ffff"
    glowStrength: 10
    labelOverride: GROSS RROFIT
    subLabelOverride: ''
    hidden_pivots: {}
    defaults_version: 0
    title_hidden: true
    listen: {}
    row: 2
    col: 4
    width: 4
    height: 3
  - title: 新しいタイル (コピー)
    name: 新しいタイル (コピー)
    model: custom_theme_vis_sample
    explore: store_inventory_data
    type: custom_viz_dashboard_cyberpunk::cyberpunk-custom-advanced-cross-filter
    fields: [sales_data.total_gross_profit, store_inventory_data.product_name]
    sorts: [sales_data.total_gross_profit desc]
    limit: 500
    column_limit: 50
    hidden_fields: []
    hidden_points_if_no: []
    series_labels: {}
    show_view_names: false
    selection_mode: multi
    title_override: ''
    selected_measure: sales_data.total_gross_profit
    vis_type: data_bar
    bar_position: row
    bar_direction: left
    show_measure_val: true
    measure_format: "$#,##0"
    data_bar_opacity: 70
    color_min: "#fafcff"
    color_mid: "#f7bdff"
    color_max: "#E100FF"
    global_bg_color: "#E100FF"
    global_bg_opacity: 0
    bg_image_size: cover
    bg_image_repeat: no-repeat
    bg_image_position: center center
    header_font_size: '14'
    header_text_color: "#94A3B8"
    search_btn_pos: right
    search_box_border_color: "#37aba7"
    search_box_border_width: 1
    search_box_radius: 4
    search_shadow_depth: low
    search_box_bg: "#ffffff"
    search_box_opacity: 10
    search_text_color: "#d6d6d6"
    search_btn_bg_color: "#f8f9fa"
    search_btn_bg_opacity: 10
    search_btn_text_color: "#2c8784"
    btn_border_color: "#37aba7"
    btn_border_width: 1
    btn_shadow_depth: low
    search_menu_bg_color: "#ffffff"
    search_menu_bg_opacity: 100
    search_menu_text_color: "#333333"
    list_border_color: "#48ded9"
    list_border_width: 1
    list_radius: 4
    list_shadow_depth: inset
    list_font_size: '13'
    list_text_color: "#e3e3e3"
    list_bg_color: "#000000"
    list_bg_opacity: 20
    checkbox_color: "#E100FF"
    checkbox_unchecked_border: "#3d9994"
    checkbox_unchecked_bg: "#ffffff"
    checkbox_unchecked_opacity: 10
    row_hover_color: "#f1f3f4"
    row_hover_opacity: 50
    row_active_text_color: "#e3e3e3"
    row_active_bg_color: "#000000"
    row_active_opacity: 40
    x_axis_gridlines: false
    y_axis_gridlines: true
    show_y_axis_labels: true
    show_y_axis_ticks: true
    y_axis_tick_density: default
    y_axis_tick_density_custom: 5
    show_x_axis_label: true
    show_x_axis_ticks: true
    y_axis_scale_mode: linear
    x_axis_reversed: false
    y_axis_reversed: false
    plot_size_by_field: false
    trellis: ''
    stacking: ''
    limit_displayed_rows: false
    legend_position: center
    point_style: none
    show_value_labels: false
    label_density: 25
    x_axis_scale: auto
    y_axis_combined: true
    ordering: none
    show_null_labels: false
    show_totals_labels: false
    show_silhouette: false
    totals_color: "#808080"
    defaults_version: 0
    title_hidden: true
    listen: {}
    row: 9
    col: 0
    width: 4
    height: 8
  - title: 新しいタイル (コピー 3)
    name: 新しいタイル (コピー 3)
    model: custom_theme_vis_sample
    explore: store_inventory_data
    type: custom_viz_dashboard_cyberpunk::cyberpunk_kpi_card
    fields: [sales_data.total_sales_ex_tax]
    limit: 500
    column_limit: 50
    hidden_fields: []
    hidden_points_if_no: []
    series_labels: {}
    show_view_names: true
    mainColor: "#50ff46"
    glowStrength: 10
    labelOverride: Sales
    subLabelOverride: ''
    hidden_pivots: {}
    defaults_version: 0
    title_hidden: true
    listen: {}
    row: 2
    col: 12
    width: 4
    height: 3
  - title: 新しいタイル (コピー 2)
    name: 新しいタイル (コピー 2)
    model: custom_theme_vis_sample
    explore: store_inventory_data
    type: custom_viz_dashboard_cyberpunk::cyberpunk_kpi_card
    fields: [sales_data.total_total_cost]
    limit: 500
    column_limit: 50
    hidden_fields: []
    hidden_points_if_no: []
    series_labels: {}
    show_view_names: true
    mainColor: "#ff5d79"
    glowStrength: 10
    labelOverride: COST
    subLabelOverride: ''
    hidden_pivots: {}
    defaults_version: 0
    title_hidden: true
    listen: {}
    row: 2
    col: 8
    width: 4
    height: 3
  - title: 新しいタイル
    name: 新しいタイル (3)
    model: custom_theme_vis_sample
    explore: store_inventory_data
    type: custom_viz_dashboard_cyberpunk::retail-store-shelf-map-viz
    fields: [store_inventory_data.product_name, store_inventory_data.x_coord, store_inventory_data.y_coord,
      store_inventory_data.related_products_json, store_inventory_data.count]
    sorts: [store_inventory_data.count desc 0]
    limit: 500
    column_limit: 50
    hidden_fields: []
    hidden_points_if_no: []
    series_labels: {}
    show_view_names: true
    edit_mode: false
    layout_data: "[]"
    floor_plan_url: https://screenshot.googleplex.com/79y2qwPNcwvSCkY.png
    canvas_height: 0
    canvas_width: 0
    point_radius: 5
    bg_fit_type: none
    bg_scale_w: 101
    bg_scale_h: 101
    bg_pan_x: 0
    bg_pan_y: 0
    color_safe: "#fafcff"
    color_danger: "#ff17be"
    color_max_limit: 3
    gap_threshold: 0.15
    prevent_overlap: true
    tooltip_max_items: 5
    tooltip_sort_type: score2_desc
    tooltip_stock_label: ''
    tooltip_related_title: Products bought together
    tooltip_score1_label: This Store
    tooltip_score2_label: All Stores
    tooltip_value_suffix: "%"
    tooltip_alert_message: Please review the layout.
    tooltip_opacity: 0.8
    tooltip_bg_color: "#1F2336"
    tooltip_border_color: "#999999"
    dim_color: "#000000"
    dim_opacity: 0.5
    line_normal_color: "#4abfbf"
    line_alert_color: "#ff2af9"
    tooltip_title_size: 20
    tooltip_title_color: "#fff"
    tooltip_stock_size: 8
    tooltip_stock_color: "#fff"
    tooltip_list_header_size: 11
    tooltip_list_header_color: "#fff"
    tooltip_list_item_size: 11
    tooltip_list_item_color: "#FFF"
    tooltip_score_size: 11
    tooltip_score_color: "#e3e3e3"
    tooltip_alert_size: 10
    tooltip_alert_color: "#d02ed4"
    cyber_line_color: "#5cfff6"
    cyber_line_opacity: 0.5
    cyber_line_width_scale: 10
    label_show_default: true
    label_default_color: "#ffffff"
    label_default_size: 10
    label_bg_color: "#ff85e9"
    label_bg_opacity: 0.5
    label_related_color: "#fceff9"
    label_related_size: 12
    line_label_color: "#54d4d9"
    line_label_width: 10
    label_distance: 15
    search_btn_text: Seacrh
    search_btn_width: 80
    search_position: top_left
    search_bg_color: "#000000"
    search_bg_opacity: 0.5
    search_border_color: "#a1229e"
    search_input_text_color: "#ffffff"
    search_placeholder_color: "#999999"
    mainColor: "#00ffff"
    glowStrength: 10
    labelOverride: GROSS RROFIT
    subLabelOverride: ''
    hidden_pivots: {}
    defaults_version: 0
    title_hidden: true
    listen: {}
    row: 5
    col: 4
    width: 12
    height: 10
  - title: 新しいタイル
    name: 新しいタイル (4)
    model: custom_theme_vis_sample
    explore: store_inventory_data
    type: custom_viz_dashboard_cyberpunk::futuristic_donut_chart
    fields: [store_inventory_data.product_category, sales_data.total_gross_profit,
      sales_data.min_unit_price, sales_data.max_unit_price]
    sorts: [sales_data.total_gross_profit desc 0]
    limit: 500
    column_limit: 50
    hidden_fields: []
    hidden_points_if_no: []
    series_labels: {}
    show_view_names: true
    backgroundColor: "#1A1A2E"
    showLegend: true
    ringWidth: 30
    glowStrength: 15
    centerLabelText: Profit by Category
    scrollbarColor: "#fff4fe"
    scrollbarOpacity: 0.8
    ringColor1: "#00ffff"
    ringColor2: "#d100d1"
    ringColor3: "#a0a0b0"
    ringColor4: "#00ff99"
    hidden_pivots: {}
    defaults_version: 0
    title_hidden: true
    listen: {}
    row: 2
    col: 16
    width: 8
    height: 6
  - title: 新しいタイル
    name: 新しいタイル (5)
    model: custom_theme_vis_sample
    explore: store_inventory_data
    type: custom_viz_dashboard_cyberpunk::cyberpunk_bar_chart
    fields: [sales_data.created_month_name_en, sales_data.total_quantity]
    sorts: [sales_data.created_month_name_en]
    limit: 500
    column_limit: 50
    hidden_fields: []
    hidden_points_if_no: []
    series_labels: {}
    show_view_names: false
    chartTitle: Total Quantity
    titleColor: "#ff00ff"
    titleSize: 24
    barColorStart: "#7F00FF"
    barColorEnd: "#E100FF"
    glowStrength: 15
    axisColor: "#94A3B8"
    axisFontSize: 12
    showGrid: true
    hidden_pivots: {}
    x_axis_gridlines: false
    y_axis_gridlines: true
    show_y_axis_labels: true
    show_y_axis_ticks: true
    y_axis_tick_density: default
    y_axis_tick_density_custom: 5
    show_x_axis_label: true
    show_x_axis_ticks: true
    y_axis_scale_mode: linear
    x_axis_reversed: false
    y_axis_reversed: false
    plot_size_by_field: false
    trellis: ''
    stacking: ''
    limit_displayed_rows: false
    legend_position: center
    point_style: none
    show_value_labels: false
    label_density: 25
    x_axis_scale: auto
    y_axis_combined: true
    ordering: none
    show_null_labels: false
    show_totals_labels: false
    show_silhouette: false
    totals_color: "#808080"
    defaults_version: 0
    title_hidden: true
    listen: {}
    row: 8
    col: 16
    width: 8
    height: 7
  - title: 新しいタイル
    name: 新しいタイル (6)
    model: custom_theme_vis_sample
    explore: store_inventory_data
    type: custom_viz_dashboard_cyberpunk::cyberpunk_ticker
    fields: [sales_data.average_gross_profit, sales_data.average_quantity, store_inventory_data.product_name]
    filters:
      sales_data.event_name: Black Friday
    sorts: [sales_data.average_gross_profit desc 0]
    limit: 5
    column_limit: 50
    hidden_fields: []
    hidden_points_if_no: []
    series_labels: {}
    show_view_names: false
    customMessage: BLACK FRIDAY IS COMING SOON /// CHECK OUT THE MOST POPULAR ITEMS
      FROM LAST YEAR >>> LEVERAGE DATA TO OPTIMIZE YOUR STORE LAYOUT.
    customLink: https://www.google.com/
    customColor: "#ff00ff"
    dataColor: "#00ffff"
    showLabel: true
    scrollSpeed: 40
    fontSize: 15
    backgroundColor: "#1A1A2E"
    glowStrength: 9
    hidden_pivots: {}
    x_axis_gridlines: false
    y_axis_gridlines: true
    show_y_axis_labels: true
    show_y_axis_ticks: true
    y_axis_tick_density: default
    y_axis_tick_density_custom: 5
    show_x_axis_label: true
    show_x_axis_ticks: true
    y_axis_scale_mode: linear
    x_axis_reversed: false
    y_axis_reversed: false
    plot_size_by_field: false
    trellis: ''
    stacking: ''
    limit_displayed_rows: false
    legend_position: center
    point_style: none
    show_value_labels: false
    label_density: 25
    x_axis_scale: auto
    y_axis_combined: true
    ordering: none
    show_null_labels: false
    show_totals_labels: false
    show_silhouette: false
    totals_color: "#808080"
    defaults_version: 0
    title_hidden: true
    listen: {}
    row: 15
    col: 4
    width: 20
    height: 2
