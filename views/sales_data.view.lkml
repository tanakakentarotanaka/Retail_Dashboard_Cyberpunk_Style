view: sales_data {
  sql_table_name: `looker-428505.retail.sales_data` ;;
  measure: average_tax_amount {
    type: average
    sql: ${tax_amount} ;;
  }

  measure: total_tax_amount {
    type: sum
    sql: ${tax_amount} ;;
  }

  measure: average_x_coord {
    type: average
    sql: ${x_coord} ;;
  }

  measure: total_x_coord {
    type: sum
    sql: ${x_coord} ;;
  }

  measure: average_quantity {
    type: average
    sql: ${quantity} ;;
  }

  measure: total_quantity {
    type: sum
    sql: ${quantity} ;;
  }

  measure: average_total_cost {
    type: average
    sql: ${total_cost} ;;
  }

  measure: total_total_cost {
    type: sum
    sql: ${total_cost} ;;
  }

  measure: average_sales_inc_tax {
    type: average
    sql: ${sales_inc_tax} ;;
  }

  measure: total_sales_inc_tax {
    type: sum
    sql: ${sales_inc_tax} ;;
  }

  measure: average_gross_profit {
    type: average
    sql: ${gross_profit} ;;
  }

  measure: total_gross_profit {
    type: sum
    sql: ${gross_profit} ;;
  }

  measure: average_unit_price {
    type: average
    sql: ${unit_price} ;;
  }

  measure: total_unit_price {
    type: sum
    sql: ${unit_price} ;;
  }

  measure: max_unit_price {
    type: max
    sql: ${unit_price} ;;
  }

  measure: min_unit_price {
    type: min
    sql: ${unit_price} ;;
  }

  measure: average_y_coord {
    type: average
    sql: ${y_coord} ;;
  }

  measure: total_y_coord {
    type: sum
    sql: ${y_coord} ;;
  }

  measure: average_sales_ex_tax {
    type: average
    sql: ${sales_ex_tax} ;;
  }

  measure: total_sales_ex_tax {
    type: sum
    sql: ${sales_ex_tax} ;;
  }


  dimension: event_name {
    type: string
    sql: ${TABLE}.event_name ;;
  }
  dimension: gross_profit {
    type: number
    sql: ${TABLE}.gross_profit ;;
  }
  dimension_group: order {
    type: time
    timeframes: [raw, date, week, month, month_name,quarter, year]
    convert_tz: no
    datatype: date
    sql: ${TABLE}.order_date ;;
  }
  dimension: order_month_name_label {
    group_label: "Order"
    label: "Order Month Name" # チャートに表示される名前

    # 元のmonth_nameを参照します（これでソート順は維持されます）
    sql: ${order_month_name} ;;

    # Liquidを使って "|" で文字を区切り、最初の部分（月名）だけを表示します
    html: {{ value | split: '|' | first }} ;;
  }
  dimension: created_month_name_en {
    label: "Order Month (En)"
    type: string
    # BigQueryのフォーマット関数を使用
    # %B = January, February (フルネーム)
    # %b = Jan, Feb (短縮形)
    sql: FORMAT_DATE('%b', ${TABLE}.order_date) ;;

    # 【重要】ここでソート順を数値フィールドに指定する
    order_by_field: order_month
  }

  dimension: order_id {
    primary_key: yes
    type: string
    sql: ${TABLE}.order_id ;;
  }
  dimension: product_id {
    type: string
    sql: ${TABLE}.product_id ;;
  }
  dimension: product_name {
    type: string
    sql: ${TABLE}.product_name ;;
  }
  dimension: quantity {
    type: number
    sql: ${TABLE}.quantity ;;
  }
  dimension: related_json {
    type: string
    sql: ${TABLE}.related_json ;;
  }
  dimension: sales_ex_tax {
    type: number
    sql: ${TABLE}.sales_ex_tax ;;
  }
  dimension: sales_inc_tax {
    type: number
    sql: ${TABLE}.sales_inc_tax ;;
  }
  dimension: store_name {
    type: string
    sql: ${TABLE}.store_name ;;
  }
  dimension: tax_amount {
    type: number
    sql: ${TABLE}.tax_amount ;;
  }
  dimension: total_cost {
    type: number
    sql: ${TABLE}.total_cost ;;
  }
  dimension: unit_price {
    type: number
    sql: ${TABLE}.unit_price ;;
  }
  dimension: x_coord {
    type: number
    sql: ${TABLE}.x_coord ;;
  }
  dimension: y_coord {
    type: number
    sql: ${TABLE}.y_coord ;;
  }
  measure: count {
    type: count
    drill_fields: [product_name, event_name, store_name]
  }
}
