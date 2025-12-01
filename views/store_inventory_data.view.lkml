view: store_inventory_data {
  sql_table_name: `retail.store_inventory_data` ;;
  dimension: product_id {
    primary_key: yes
    type: string
    sql: ${TABLE}.product_id ;;
  }
  dimension: product_category {
    type: string
    sql: ${TABLE}.category ;;
  }
  dimension: product_name {
    type: string
    sql: ${TABLE}.product_name ;;
  }
  dimension: stock_percent {
    type: number
    sql: ${TABLE}.stock_percent ;;
  }
  measure: total_stock_percent {
    type: sum
    sql: ${stock_percent} ;;
  }
  dimension: x_coord {
    type: number
    sql: ${TABLE}.x_coord ;;
  }
  dimension: y_coord {
    type: number
    sql: ${TABLE}.y_coord ;;
  }
  dimension: related_products_json {
    label: "Related Products(JSON)"
    type: string
    sql: ${TABLE}.related_json ;;
  }
  measure: count {
    type: count
    drill_fields: [product_name]
  }
}
