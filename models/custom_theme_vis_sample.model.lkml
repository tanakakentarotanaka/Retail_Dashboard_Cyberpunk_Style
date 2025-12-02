connection: "tanaka_connect"
label: "cutom_viz_sample_cyberpunk"

# include all the views
include: "/views/**/*.view.lkml"

datagroup: retail_sample_default_datagroup {
  # sql_trigger: SELECT MAX(id) FROM etl_log;;
  max_cache_age: "1 hour"
}

persist_with: retail_sample_default_datagroup
label: "cyberpunk model"
explore: store_inventory_data {
  label: "product_locations"
  join:  sales_data{
    type: left_outer
    relationship: one_to_many
    sql_on: ${store_inventory_data.product_id} = ${sales_data.product_id} ;;
  }
}
