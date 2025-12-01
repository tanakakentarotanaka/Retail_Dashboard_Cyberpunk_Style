connection: "tanaka_connect"

# include all the views
include: "/views/**/*.view.lkml"

datagroup: custom_theme_vis_sample_default_datagroup {
  # sql_trigger: SELECT MAX(id) FROM etl_log;;
  max_cache_age: "1 hour"
}

persist_with: custom_theme_vis_sample_default_datagroup
