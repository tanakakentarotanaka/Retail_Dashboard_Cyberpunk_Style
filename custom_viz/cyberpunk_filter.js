looker.plugins.visualizations.add({
  id: "cyberpunk-custom-advanced-cross-filter",
  label: "Single Item Cross Filter (Zen Dots + Hannari Mincho)",

  // ============================================================
  //  Configuration Options Definition
  // ============================================================
  options: {
    // --- General Settings ---
    selection_mode: {
      label: "Selection Mode",
      type: "string",
      display: "select",
      values: [
        { "Multi-select (Checkbox)": "multi" },
        { "Single-select (Radio)": "single" }
      ],
      default: "multi",
      section: "General Settings",
      order: 1
    },
    title_override: {
      label: "Title Override (Leave empty for field name)",
      type: "string",
      default: "",
      section: "General Settings",
      order: 2
    },

    // --- Visualization (Data Bar) Settings ---
    selected_measure: {
      label: "Measure to Display",
      type: "string",
      display: "select",
      values: [{ "None": "" }],
      default: "",
      section: "Visualization Settings",
      order: 1
    },
    vis_type: {
      label: "Visualization Type",
      type: "string",
      display: "select",
      values: [
        { "None": "none" },
        { "Data Bar": "data_bar" },
        { "Color Scale": "color_scale" }
      ],
      default: "none",
      section: "Visualization Settings",
      order: 2
    },
    bar_position: {
      label: "Display Area",
      type: "string",
      display: "select",
      values: [
        { "Full Width Row": "row" },
        { "Number Only": "number" }
      ],
      default: "row",
      section: "Visualization Settings",
      order: 3
    },
    bar_direction: {
      label: "[Bar] Anchor Position",
      type: "string",
      display: "select",
      values: [
        { "Left": "left" },
        { "Right": "right" }
      ],
      default: "left",
      section: "Visualization Settings",
      order: 4
    },
    show_measure_val: {
      label: "Show Measure Value",
      type: "boolean",
      default: true,
      section: "Visualization Settings",
      order: 5
    },
    measure_format: {
      label: "Measure Format",
      type: "string",
      default: "",
      placeholder: "#,##0",
      section: "Visualization Settings",
      order: 6
    },

    // --- Color Settings (for Data Bar) ---
    header_vis_colors: {
      type: 'string',
      label: '--- Data Bar Color Settings ---',
      display: 'heading',
      section: 'Visualization Settings',
      order: 10
    },
    data_bar_opacity: {
      label: "Opacity (%)",
      type: "number",
      display_size: 'half',
      default: 70,
      min: 0, max: 100,
      section: "Visualization Settings",
      order: 11
    },
    color_min: {
      label: "Min Value Color",
      type: "string",
      display: "color",
      display_size: 'half',
      default: "#f8696b",
      section: "Visualization Settings",
      order: 12
    },
    color_mid: {
      label: "Mid Value Color",
      type: "string",
      display: "color",
      display_size: 'half',
      default: "#ffeb84",
      section: "Visualization Settings",
      order: 13
    },
    color_max: {
      label: "Max Value Color",
      type: "string",
      display: "color",
      display_size: 'half',
      default: "#63be7b",
      section: "Visualization Settings",
      order: 14
    },

    // ============================================================
    //  Design Settings
    // ============================================================

    // --- Global Settings ---
    header_design_global: {
      type: 'string',
      label: '--- Global Settings ---',
      display: 'heading',
      section: 'Design',
      order: 1
    },
    global_bg_color: {
      label: "Global Background",
      type: "string",
      display: "color",
      display_size: 'third',
      default: "#ffffff",
      section: 'Design',
      order: 3
    },
    global_bg_opacity: {
      label: "Opacity (%)",
      type: "number",
      display_size: 'third',
      default: 100,
      min: 0, max: 100,
      section: 'Design',
      order: 4
    },

    // --- Background Image Settings ---
    header_bg_image: {
      type: 'string',
      label: '--- Background Image Settings ---',
      display: 'heading',
      section: 'Design',
      order: 5
    },
    bg_image_url: {
      label: "Image URL",
      type: "string",
      display: "text",
      placeholder: "https://example.com/image.jpg",
      section: 'Design',
      order: 6
    },
    bg_image_size: {
      label: "Image Size",
      type: "string",
      display: "select",
      values: [
        { "Cover": "cover" },
        { "Contain": "contain" },
        { "Auto": "auto" }
      ],
      default: "cover",
      display_size: 'third',
      section: 'Design',
      order: 7
    },
    bg_image_repeat: {
      label: "Image Repeat",
      type: "string",
      display: "select",
      values: [
        { "No Repeat": "no-repeat" },
        { "Repeat": "repeat" }
      ],
      default: "no-repeat",
      display_size: 'third',
      section: 'Design',
      order: 8
    },
    bg_image_position: {
      label: "Image Position",
      type: "string",
      display: "select",
      values: [
        { "Center": "center center" },
        { "Top": "center top" },
        { "Bottom": "center bottom" },
        { "Left": "left center" },
        { "Right": "right center" }
      ],
      default: "center center",
      display_size: 'third',
      section: 'Design',
      order: 9
    },

    // --- Title Settings ---
    header_design_title: {
      type: 'string',
      label: '--- Title ---',
      display: 'heading',
      section: 'Design',
      order: 10
    },
    header_font_size: {
      label: "Font Size",
      type: "string",
      display_size: 'third',
      default: "14",
      placeholder: "14",
      section: 'Design',
      order: 11
    },
    header_text_color: {
      label: "Text Color",
      type: "string",
      display: "color",
      display_size: 'third',
      default: "#444444",
      section: 'Design',
      order: 12
    },
    // 【追加】タイトル太字設定
    header_font_bold: {
      label: "Bold Title",
      type: "boolean",
      display_size: 'third',
      default: false,
      section: 'Design',
      order: 13
    },

    // --- Search Box Settings ---
    header_design_search: {
      type: 'string',
      label: '--- Search Box & Button ---',
      display: 'heading',
      section: 'Design',
      order: 19
    },
    show_search: {
      label: "Show Search Box",
      type: "boolean",
      default: true,
      section: 'Design',
      order: 20
    },
    search_btn_pos: {
      label: "Button Position",
      type: "string",
      display: "select",
      values: [
        { "Left": "left" },
        { "Right": "right" }
      ],
      default: "left",
      section: 'Design',
      order: 21
    },
    // Search Box
    search_box_border_color: {
        label: "Search Border Color",
        type: "string",
        display: "color",
        display_size: 'third',
        default: "#cccccc",
        section: 'Design',
        order: 22
    },
    search_box_border_width: {
        label: "Search Border Width (px)",
        type: "number",
        display_size: 'third',
        default: 1,
        section: 'Design',
        order: 23
    },
    search_box_radius: {
        label: "Search Radius (px)",
        type: "number",
        display_size: 'third',
        default: 4,
        section: 'Design',
        order: 24
    },
    search_shadow_depth: {
        label: "Search Light/Shadow",
        type: "string",
        display: "select",
        values: [
            { "Flat (None)": "none" },
            { "Low Depth": "low" },
            { "Medium Depth": "medium" },
            { "High Depth": "high" }
        ],
        default: "none",
        section: 'Design',
        order: 25
    },
    search_box_bg: {
      label: "Search Bg",
      type: "string",
      display: "color",
      display_size: 'third',
      default: "#ffffff",
      section: 'Design',
      order: 26
    },
    search_box_opacity: {
      label: "Search Bg Opacity (%)",
      type: "number",
      display_size: 'third',
      default: 100,
      min: 0, max: 100,
      section: 'Design',
      order: 27
    },
    search_text_color: {
      label: "Search Text",
      type: "string",
      display: "color",
      display_size: 'third',
      default: "#333333",
      section: 'Design',
      order: 28
    },

    // Button Settings
    search_btn_bg_color: {
      label: "Btn Background",
      type: "string",
      display: "color",
      display_size: 'third',
      default: "#f8f9fa",
      section: 'Design',
      order: 29
    },
    search_btn_bg_opacity: {
      label: "Btn Opacity (%)",
      type: "number",
      display_size: 'third',
      default: 100,
      min: 0, max: 100,
      section: 'Design',
      order: 30
    },
    search_btn_text_color: {
      label: "Btn Text",
      type: "string",
      display: "color",
      display_size: 'third',
      default: "#555555",
      section: 'Design',
      order: 31
    },
    btn_border_color: {
        label: "Btn Border Color",
        type: "string",
        display: "color",
        display_size: 'third',
        default: "#cccccc",
        section: 'Design',
        order: 32
    },
    btn_border_width: {
        label: "Btn Border Width (px)",
        type: "number",
        display_size: 'third',
        default: 1,
        section: 'Design',
        order: 33
    },
    btn_shadow_depth: {
        label: "Btn Light/Shadow",
        type: "string",
        display: "select",
        values: [
            { "Flat (None)": "none" },
            { "Low Depth": "low" },
            { "Medium Depth": "medium" },
            { "High Depth": "high" }
        ],
        default: "none",
        section: 'Design',
        order: 34
    },

    // Search Menu Settings
    search_menu_bg_color: {
        label: "Menu Bg",
        type: "string",
        display: "color",
        display_size: 'third',
        default: "#ffffff",
        section: 'Design',
        order: 35
    },
    search_menu_bg_opacity: {
        label: "Menu Opacity (%)",
        type: "number",
        display_size: 'third',
        default: 100,
        min: 0, max: 100,
        section: 'Design',
        order: 36
    },
    search_menu_text_color: {
        label: "Menu Text",
        type: "string",
        display: "color",
        display_size: 'third',
        default: "#333333",
        section: 'Design',
        order: 37
    },


    // --- List Item Settings ---
    header_design_list: {
      type: 'string',
      label: '--- List Items Box ---',
      display: 'heading',
      section: 'Design',
      order: 40
    },
    list_border_color: {
        label: "List Border Color",
        type: "string",
        display: "color",
        display_size: 'third',
        default: "#eeeeee",
        section: 'Design',
        order: 41
    },
    list_border_width: {
        label: "List Border Width (px)",
        type: "number",
        display_size: 'third',
        default: 1,
        section: 'Design',
        order: 42
    },
    list_radius: {
        label: "List Radius (px)",
        type: "number",
        display_size: 'third',
        default: 4,
        section: 'Design',
        order: 43
    },
    list_shadow_depth: {
        label: "List Light/Shadow",
        type: "string",
        display: "select",
        values: [
            { "Flat (None)": "none" },
            { "Low Depth": "low" },
            { "Medium Depth": "medium" },
            { "High Depth": "high" },
            { "Inset (Inner Shadow)": "inset" }
        ],
        default: "none",
        section: 'Design',
        order: 44
    },
    list_font_size: {
      label: "Font Size",
      type: "string",
      default: "13",
      display_size: 'half',
      placeholder: "13",
      section: 'Design',
      order: 45
    },
    list_text_color: {
      label: "Text Color",
      type: "string",
      display: "color",
      display_size: 'half',
      default: "#333333",
      section: 'Design',
      order: 46
    },
    list_bg_color: {
      label: "Background",
      type: "string",
      display: "color",
      display_size: 'half',
      default: "#ffffff",
      section: 'Design',
      order: 47
    },
    list_bg_opacity: {
      label: "Bg Opacity (%)",
      type: "number",
      display_size: 'half',
      default: 100,
      min: 0, max: 100,
      section: 'Design',
      order: 48
    },

    // Checkbox Settings
    checkbox_color: {
      label: "Checked Color",
      type: "string",
      display: "color",
      display_size: 'half',
      default: "#1967d2",
      section: 'Design',
      order: 50
    },
    checkbox_unchecked_border: {
      label: "Unchecked Border",
      type: "string",
      display: "color",
      display_size: 'half',
      default: "#999999",
      section: 'Design',
      order: 51
    },
    // 【追加】 未チェック時の背景色
    checkbox_unchecked_bg: {
      label: "Unchecked Bg Color",
      type: "string",
      display: "color",
      display_size: 'half',
      default: "#ffffff",
      section: 'Design',
      order: 52
    },
    // 【追加】 未チェック時の不透明度
    checkbox_unchecked_opacity: {
      label: "Unchecked Opacity (%)",
      type: "number",
      display_size: 'half',
      default: 100,
      min: 0, max: 100,
      section: 'Design',
      order: 53
    },

    // --- Row Interaction Settings ---
    header_design_row: {
      type: 'string',
      label: '--- Hover / Selected Row ---',
      display: 'heading',
      section: 'Design',
      order: 60
    },
    row_hover_color: {
      label: "Hover Background",
      type: "string",
      display: "color",
      display_size: 'half',
      default: "#f1f3f4",
      section: 'Design',
      order: 61
    },
    // 【追加】Hover Opacity
    row_hover_opacity: {
      label: "Hover Opacity (%)",
      type: "number",
      display_size: 'half',
      default: 100,
      min: 0, max: 100,
      section: 'Design',
      order: 62
    },
    row_active_text_color: {
      label: "Selected Text",
      type: "string",
      display: "color",
      display_size: 'third',
      default: "#1967d2",
      section: 'Design',
      order: 63
    },
    row_active_bg_color: {
      label: "Selected Bg",
      type: "string",
      display: "color",
      display_size: 'third',
      default: "#e8f0fe",
      section: 'Design',
      order: 64
    },
    // 【追加】Selected Opacity (一貫性のために追加)
    row_active_opacity: {
      label: "Selected Opacity (%)",
      type: "number",
      display_size: 'third',
      default: 100,
      min: 0, max: 100,
      section: 'Design',
      order: 65
    },
  },

  /**
   * Initialization: Create DOM elements and define basic CSS
   */
  create: function(element, config) {
    // ▼▼▼ フォントURL定義 (Zen Dots) ▼▼▼
    const fontUrl = "https://cdn.jsdelivr.net/gh/tanakakentarotanaka/240322_kentarotanaka@master/zen-dots-v14-latin-regular%20(2).woff2";

    element.innerHTML = `
      <style>
        /* ▼▼▼ 追加: Google Fonts "Hannari Mincho" 読み込み ▼▼▼ */
        @import url('https://fonts.googleapis.com/css2?family=Hannari+Mincho&display=swap');

        /* ▼▼▼ フォント読み込み設定 (Zen Dots) ▼▼▼ */
        @font-face {
          font-family: 'Zen Dots';
          src: url('${fontUrl}') format('woff2');
          font-display: swap;
        }

        /*
         * Main Container and CSS Variable Definitions
         */
        .cv-container {
          /* Defaults (will be overridden by JS) */
          --global-bg: transparent;
          --bg-image: none;
          --bg-size: cover;
          --bg-repeat: no-repeat;
          --bg-position: center center;

          --header-font-size: 14px;
          --header-text-color: #444;
          /* ▼▼▼ タイトルフォント太さ変数 ▼▼▼ */
          --header-font-weight: normal;

          /* Search Box Styles */
          --search-box-bg: #fff;
          --search-text-color: #333;
          --search-placeholder-color: #999;
          --search-border-color: #ccc;
          --search-border-width: 1px;
          --search-radius: 4px;
          --search-shadow: none;

          /* Search Button Styles */
          --search-btn-bg: #f8f9fa;
          --search-btn-text: #555;
          --btn-border-color: #ccc;
          --btn-border-width: 1px;
          --btn-shadow: none;

          /* Menu Styles */
          --search-menu-bg: #fff;
          --search-menu-text: #333;

          /* List Box Styles */
          --list-bg: transparent;
          --list-font-size: 13px;
          --list-text-color: #333;
          --list-border-color: #eee;
          --list-border-width: 1px;
          --list-radius: 4px;
          --list-shadow: none;

          /* Items */
          --checkbox-color: #1967d2;
          --checkbox-unchecked-border: #999999;
          --checkbox-unchecked-bg: #ffffff;
          --row-hover-bg: #f1f3f4;
          --row-active-bg: #e8f0fe;
          --row-active-text: #1967d2;
          --data-bar-opacity: 0.7;

          /* ▼▼▼ Zen Dotsを優先し、日本語は Hannari Mincho にフォールバック ▼▼▼ */
          font-family: 'Zen Dots', 'Hannari Mincho', sans-serif;
          width: 100%;
          height: 100%;
          overflow: hidden;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          position: relative;
          z-index: 0;
        }

        /* ▼▼▼ フォーム要素にも同じフォント設定を適用 ▼▼▼ */
        .cv-container input,
        .cv-container button,
        .cv-container .search-box,
        .cv-container .mode-btn {
          font-family: 'Zen Dots', 'Hannari Mincho', sans-serif;
        }

        /* Background Layers */
        .cv-container::before {
          content: "";
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          z-index: -2;
          background-image: var(--bg-image);
          background-size: var(--bg-size);
          background-repeat: var(--bg-repeat);
          background-position: var(--bg-position);
          pointer-events: none;
        }
        .cv-container::after {
          content: "";
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          z-index: -1;
          background-color: var(--global-bg);
          pointer-events: none;
        }

        /* Layout */
        .filter-wrapper {
          display: flex;
          flex-direction: column;
          height: 100%;
          width: 100%;
          padding: 8px;
          box-sizing: border-box;
        }

        .group-label {
          /* ▼▼▼ フォントウェイトを変数で制御 ▼▼▼ */
          font-weight: var(--header-font-weight);
          margin-bottom: 6px;
          font-size: var(--header-font-size);
          color: var(--header-text-color);
          flex-shrink: 0;
          line-height: 1.4;
          font-family: 'Zen Dots', 'Hannari Mincho', serif;
        }

        /* --- Search Area Styles --- */
        .search-area {
          display: flex;
          gap: 4px;
          margin-bottom: 6px;
          flex-shrink: 0;
          position: relative;
          font-size: var(--list-font-size);
        }

        .mode-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.4em 0.6em;

          /* Dynamic Border/Shadow */
          border-width: var(--btn-border-width);
          border-style: solid;
          border-color: var(--btn-border-color);
          border-radius: var(--search-radius);
          box-shadow: var(--btn-shadow);

          background-color: var(--search-btn-bg);
          color: var(--search-btn-text);
          cursor: pointer;
          font-size: 0.85em;
          transition: all 0.2s ease;
        }
        .mode-btn:hover { filter: brightness(0.95); }
        .mode-btn:active { transform: translateY(1px); }

        .search-box {
          flex: 1;
          padding: 0.4em 0.6em;

          /* Dynamic Border/Shadow */
          border-width: var(--search-border-width);
          border-style: solid;
          border-color: var(--search-border-color);
          border-radius: var(--search-radius);
          box-shadow: var(--search-shadow);

          font-size: inherit;
          /* font-family: inherit; <-- 削除 */
          color: var(--search-text-color);
          background-color: var(--search-box-bg);
          min-width: 0;
          box-sizing: border-box;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .search-box:focus {
           outline: none;
           border-color: var(--checkbox-color);
        }
        .search-box::placeholder {
          color: var(--search-placeholder-color);
          opacity: 1;
        }

        /* Search Mode Toggle Menu */
        .mode-menu {
          display: none;
          position: absolute;
          top: 105%;
          background-color: var(--search-menu-bg);
          color: var(--search-menu-text);
          border: 1px solid #ccc;
          border-radius: 4px;
          box-shadow: 0 4px 8px rgba(0,0,0,0.15);
          z-index: 2000;
          min-width: 160px;
          padding: 4px 0;
          max-height: 200px;
          overflow-y: auto;
          font-size: 13px;
          /* ▼▼▼ 追加: 検索メニューは見やすいフォントに変更 ▼▼▼ */
          font-family: 'Courier New', monospace;
          font-weight: bold;
        }
        .mode-menu.show { display: flex; }
        .mode-item {
          padding: 8px 12px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .mode-item:hover { background-color: rgba(0,0,0,0.05); }
        .mode-item.active {
          background-color: rgba(25, 103, 210, 0.1);
          font-weight: 600;
        }
        .mode-divider { height: 1px; background: #eee; margin: 2px 0; flex-shrink: 0; }

        /* --- List Display Area --- */
        .scroll-area {
          flex: 1;
          overflow-y: auto;

          /* Dynamic Border/Shadow */
          border-width: var(--list-border-width);
          border-style: solid;
          border-color: var(--list-border-color);
          border-radius: var(--list-radius);
          box-shadow: var(--list-shadow);

          padding: 2px;
          min-height: 0;
          background-color: var(--list-bg);
        }

        /* Row Styles */
        .item-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.4em 0.6em;
          cursor: pointer;
          font-size: var(--list-font-size);
          color: var(--list-text-color);
          user-select: none;
          border-radius: 3px;
          transition: background-color 0.1s;
          position: relative;
          margin-bottom: 1px;
          line-height: 1.4;
          /* ▼▼▼ 追加: リストアイテムは見やすいフォントに変更 ▼▼▼ */
          font-family: 'Courier New', monospace;
          font-weight: bold;
        }
        .item-row:hover { background-color: var(--row-hover-bg); }
        .item-row.active {
          background-color: var(--row-active-bg);
          color: var(--row-active-text);
          font-weight: 500;
        }

        .item-left {
          display: flex;
          align-items: center;
          overflow: hidden;
          flex: 1;
          margin-right: 8px;
          z-index: 2;
          position: relative;
        }

        /* Custom Checkbox */
        .item-left input {
          position: absolute;
          opacity: 0;
          cursor: pointer;
          height: 100%; width: 100%;
          left: 0; top: 0; margin: 0; z-index: 3;
        }

        .checkmark {
          height: 16px; width: 16px;
          background-color: var(--checkbox-unchecked-bg);
          border: 2px solid var(--checkbox-unchecked-border);
          margin-right: 8px;
          flex-shrink: 0;
          position: relative;
          z-index: 1;
          box-sizing: border-box;
          transition: all 0.1s;
        }
        .item-left label {
          cursor: pointer;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: inherit;
          z-index: 2;
        }
        .item-left input[type="checkbox"] ~ .checkmark { border-radius: 3px; }
        .item-left input[type="radio"] ~ .checkmark { border-radius: 50%; }

        .item-left input:checked ~ .checkmark {
          background-color: var(--checkbox-color) !important;
          border-color: var(--checkbox-color) !important;
        }
        .checkmark:after {
          content: "";
          position: absolute;
          display: none;
        }
        .item-left input:checked ~ .checkmark:after { display: block; }

        .item-left input[type="checkbox"] ~ .checkmark:after {
          left: 4px; top: 0px;
          width: 4px; height: 9px;
          border: solid white;
          border-width: 0 2px 2px 0;
          transform: rotate(45deg);
        }
        .item-left input[type="radio"] ~ .checkmark:after {
          left: 3px; top: 3px;
          width: 6px; height: 6px;
          border-radius: 50%;
          background: white;
        }

        .item-right {
          flex-shrink: 0;
          text-align: right;
          font-weight: 400;
          color: inherit;
          opacity: 0.9;
          font-size: 0.95em;
          z-index: 2;
          position: relative;
          min-width: 4em;
          padding: 0 0.4em;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          justify-content: center;
        }

        .data-bar {
          position: absolute;
          bottom: 0;
          height: 3px;
          border-radius: 1.5px;
          opacity: var(--data-bar-opacity);
          pointer-events: none;
          z-index: 1;
        }

        .viz-error {
          color: #c00; padding: 10px; background: #ffebeb;
          border-radius: 4px; font-size: 12px;
        }
      </style>
      <div id="viz-root" class="cv-container"></div>
    `;
  },

  /**
   * Data Update & Rendering
   */
  updateAsync: function(data, element, config, queryResponse, details, done) {
    const root = element.querySelector("#viz-root");

    // --- Helper Functions ---

    const fixPx = (val, defaultVal) => {
      if (!val && val !== 0) return defaultVal;
      if (typeof val === 'number' || (typeof val === 'string' && /^\d+$/.test(val.trim()))) {
        return val + "px";
      }
      return val;
    };

    const hexToRgba = (hex, opacityPercent) => {
      if (!hex) return 'transparent';
      if (hex === 'transparent') return 'transparent';
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      let alpha = 1.0;
      if (opacityPercent !== undefined && opacityPercent !== null && opacityPercent !== "") {
        alpha = Number(opacityPercent) / 100;
        if (alpha < 0) alpha = 0; if (alpha > 1) alpha = 1;
      }
      return result ? `rgba(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}, ${alpha})` : hex;
    };

    const setVar = (name, val) => root.style.setProperty(name, val);

    // --- Lighting/Shadow Logic (D3 Style Depth) ---
    const getShadowStyle = (depth) => {
        switch(depth) {
            case "low":
                return "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)";
            case "medium":
                return "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)";
            case "high":
                return "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)";
            case "inset":
                return "inset 0 2px 4px rgba(0,0,0,0.06)";
            case "none":
            default:
                return "none";
        }
    };

    // Apply General Design Settings
    setVar('--global-bg', hexToRgba(config.global_bg_color, config.global_bg_opacity));

    const bgImageUrl = config.bg_image_url ? `url('${config.bg_image_url}')` : 'none';
    setVar('--bg-image', bgImageUrl);
    setVar('--bg-size', config.bg_image_size || 'cover');
    setVar('--bg-repeat', config.bg_image_repeat || 'no-repeat');
    setVar('--bg-position', config.bg_image_position || 'center center');

    setVar('--header-font-size', fixPx(config.header_font_size, '14px'));
    setVar('--header-text-color', config.header_text_color || '#444');

    // 【追加】タイトル太字設定反映
    setVar('--header-font-weight', config.header_font_bold ? 'bold' : 'normal');

    // --- Search & Button Styles ---
    setVar('--search-box-bg', hexToRgba(config.search_box_bg || '#ffffff', config.search_box_opacity));
    setVar('--search-text-color', config.search_text_color || '#333');
    setVar('--search-placeholder-color', config.search_placeholder_color || '#999');
    setVar('--search-border-color', config.search_box_border_color || '#ccc');
    setVar('--search-border-width', fixPx(config.search_box_border_width, '1px'));
    setVar('--search-radius', fixPx(config.search_box_radius, '4px'));
    setVar('--search-shadow', getShadowStyle(config.search_shadow_depth));

    setVar('--search-btn-bg', hexToRgba(config.search_btn_bg_color || '#f8f9fa', config.search_btn_bg_opacity));
    setVar('--search-btn-text', config.search_btn_text_color || '#555');
    setVar('--btn-border-color', config.btn_border_color || '#ccc');
    setVar('--btn-border-width', fixPx(config.btn_border_width, '1px'));
    setVar('--btn-shadow', getShadowStyle(config.btn_shadow_depth));

    setVar('--search-menu-bg', hexToRgba(config.search_menu_bg_color || '#fff', config.search_menu_bg_opacity));
    setVar('--search-menu-text', config.search_menu_text_color || '#333');

    // --- List Box Styles ---
    setVar('--list-bg', hexToRgba(config.list_bg_color, config.list_bg_opacity));
    setVar('--list-font-size', fixPx(config.list_font_size, '13px'));
    setVar('--list-text-color', config.list_text_color || '#333');
    setVar('--list-border-color', config.list_border_color || '#eee');
    setVar('--list-border-width', fixPx(config.list_border_width, '1px'));
    setVar('--list-radius', fixPx(config.list_radius, '4px'));
    setVar('--list-shadow', getShadowStyle(config.list_shadow_depth));

    setVar('--checkbox-color', hexToRgba(config.checkbox_color || '#1967d2', config.checkbox_opacity));
    setVar('--checkbox-unchecked-border', config.checkbox_unchecked_border || '#999999');
    setVar('--checkbox-unchecked-bg', hexToRgba(config.checkbox_unchecked_bg || '#ffffff', config.checkbox_unchecked_opacity));

    // 【修正】HoverとSelectedにOpacityを適用
    setVar('--row-hover-bg', hexToRgba(config.row_hover_color || '#f1f3f4', config.row_hover_opacity));
    setVar('--row-active-bg', hexToRgba(config.row_active_bg_color || '#e8f0fe', config.row_active_opacity));

    setVar('--row-active-text', config.row_active_text_color || '#1967d2');
    const barOpacityVal = (config.data_bar_opacity !== undefined) ? config.data_bar_opacity : 70;
    setVar('--data-bar-opacity', barOpacityVal / 100);

    // Initialize/Maintain Search State
    if (!this.searchState) {
      this.searchState = { mode: "contains", placeholder: "Search...", text: "" };
    }

    // --- Color Utility Functions ---
    const hexToRgbObj = (hex) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) } : { r: 0, g: 0, b: 0 };
    };

    const interpolateColor = (color1, color2, factor) => {
      const result = {
        r: Math.round(color1.r + factor * (color2.r - color1.r)),
        g: Math.round(color1.g + factor * (color2.g - color1.g)),
        b: Math.round(color1.b + factor * (color2.b - color1.b))
      };
      return `rgb(${result.r}, ${result.g}, ${result.b})`;
    };

    const getGradientColor = (value, min, mid, max, cMin, cMid, cMax) => {
      const rgbMin = hexToRgbObj(cMin || "#f8696b");
      const rgbMid = hexToRgbObj(cMid || "#ffeb84");
      const rgbMax = hexToRgbObj(cMax || "#63be7b");
      if (value <= min) return `rgb(${rgbMin.r}, ${rgbMin.g}, ${rgbMin.b})`;
      if (value >= max) return `rgb(${rgbMax.r}, ${rgbMax.g}, ${rgbMax.b})`;
      if (value < mid) {
        const factor = (value - min) / (mid - min);
        return interpolateColor(rgbMin, rgbMid, factor);
      } else {
        const factor = (value - mid) / (max - mid);
        return interpolateColor(rgbMid, rgbMax, factor);
      }
    };

    const formatValue = (value, pattern) => {
      if (value === null || value === undefined) return "";
      if (!pattern) return value;
      const num = Number(value);
      if (isNaN(num)) return value;
      let formattedNum = "";
      const useComma = pattern.includes(",");
      let decimals = 0;
      const dotMatch = pattern.match(/\.(0+)/);
      if (dotMatch) decimals = dotMatch[1].length;
      if (useComma) {
        formattedNum = num.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
      } else {
        formattedNum = num.toFixed(decimals);
      }
      if (/[#0]/.test(pattern)) return pattern.replace(/[#0,.]+/, formattedNum);
      return formattedNum + pattern;
    };

    try {
      if (!root) { if (done) done(); return; }

      const renderError = (msg) => {
         root.innerHTML = `<div class="viz-error">${msg}</div>`;
         if (done) done();
      };

      if (!queryResponse || !queryResponse.fields || !data) { if (done) done(); return; }

      const dimField = queryResponse.fields.dimensions && queryResponse.fields.dimensions[0];
      if (!dimField) { renderError("No dimension selected."); return; }

      const measures = queryResponse.fields.measures || [];
      const measureOptions = [{ "None": "" }];
      measures.forEach(m => {
        const obj = {}; obj[m.label_short || m.label] = m.name; measureOptions.push(obj);
      });
      const defaultMeasure = measures.length > 0 ? measures[0].name : "";

      const newOptions = {
        ...this.options,
        selected_measure: {
          ...this.options.selected_measure,
          values: measureOptions,
          default: defaultMeasure
        }
      };
      this.trigger('registerOptions', newOptions);

      // Retrieve configuration
      const dimName = dimField.name;
      const selectedMeasureName = (config.selected_measure === undefined) ? defaultMeasure : config.selected_measure;
      const showMeasureVal = config.show_measure_val !== false;
      const formatPattern = config.measure_format || "";
      const selectionMode = config.selection_mode || "multi";
      const inputType = selectionMode === "multi" ? "checkbox" : "radio";
      const crossfilterEnabled = details.crossfilterEnabled;
      const searchBtnPos = config.search_btn_pos || "left";
      const visType = config.vis_type || "none";
      const barPos = config.bar_position || "row";
      const barDir = config.bar_direction || "left";
      const cMin = config.color_min || "#f8696b";
      const cMid = config.color_mid || "#ffeb84";
      const cMax = config.color_max || "#63be7b";
      // 【追加】検索ボックスの表示設定取得
      const showSearch = config.show_search !== false;

      let minVal = Infinity; let maxVal = -Infinity;
      const uniqueValuesMap = new Map();

      data.forEach(row => {
        const dimCell = row[dimName];
        if (dimCell && dimCell.value !== null && dimCell.value !== undefined) {
          const val = String(dimCell.value);
          const rendered = dimCell.rendered !== undefined ? dimCell.rendered : `${val}`;
          let measureVal = null; let measureRendered = null;
          if (selectedMeasureName && row[selectedMeasureName]) {
            measureVal = row[selectedMeasureName].value;
            measureRendered = row[selectedMeasureName].rendered || measureVal;
            const num = Number(measureVal);
            if (!isNaN(num)) {
              if (num < minVal) minVal = num;
              if (num > maxVal) maxVal = num;
            }
          }
          if (!uniqueValuesMap.has(val)) {
            uniqueValuesMap.set(val, {
              value: val, label: rendered, measureValue: measureVal, measureRendered: measureRendered,
              rowContext: row, element: null
            });
          }
        }
      });

      if (minVal === Infinity) { minVal = 0; maxVal = 0; } else { minVal = Math.min(minVal, 0); }
      const items = Array.from(uniqueValuesMap.values());
      const midVal = (minVal + maxVal) / 2;

      // Build DOM
      const wrapper = document.createElement("div");
      wrapper.className = "filter-wrapper";

      const labelDiv = document.createElement("div");
      labelDiv.className = "group-label";
      labelDiv.innerText = config.title_override || dimField.label_short || dimField.label;
      wrapper.appendChild(labelDiv);

      const searchArea = document.createElement("div");
      searchArea.className = "search-area";

      const modeBtn = document.createElement("div");
      modeBtn.className = "mode-btn";
      modeBtn.innerHTML = "▼";
      modeBtn.title = "Search Options";
      modeBtn.tabIndex = 0;

      const modeMenu = document.createElement("div");
      modeMenu.className = "mode-menu";
      if (searchBtnPos === "right") { modeMenu.style.left = "auto"; modeMenu.style.right = "0"; }
      else { modeMenu.style.left = "0"; modeMenu.style.right = "auto"; }

      const modes = [
        { id: "contains", label: "Contains (Default)", placeholder: "Search..." },
        { id: "exclude",  label: "Exclude (Not)",   placeholder: "Text to exclude..." },
        { id: "range",    label: "Number Range", placeholder: "e.g., 100-500" },
        { isDivider: true },
        { id: "regex",    label: "Regex", placeholder: "Regular Expression..." }
      ];

      const searchInput = document.createElement("input");
      searchInput.type = "text";
      searchInput.className = "search-box";
      searchInput.placeholder = this.searchState.placeholder;
      searchInput.value = this.searchState.text || "";

      if (searchBtnPos === "right") {
        searchArea.appendChild(searchInput); searchArea.appendChild(modeBtn);
      } else {
        searchArea.appendChild(modeBtn); searchArea.appendChild(searchInput);
      }
      searchArea.appendChild(modeMenu);

      const scrollArea = document.createElement("div");
      scrollArea.className = "scroll-area";

      items.forEach(item => {
        const rowDiv = document.createElement("div");
        rowDiv.className = "item-row";

        const leftDiv = document.createElement("div");
        leftDiv.className = "item-left";

        const input = document.createElement("input");
        input.type = inputType;
        input.name = `filter_${dimName}`;
        input.value = item.value;

        let isSelected = false;
        if (crossfilterEnabled) {
          const state = LookerCharts.Utils.getCrossfilterSelection(item.rowContext, null);
          isSelected = (state === 1);
        }
        input.checked = isSelected;
        if (isSelected) rowDiv.classList.add("active");

        const checkmark = document.createElement("span");
        checkmark.className = "checkmark";

        const label = document.createElement("label");
        label.innerText = item.label;
        label.title = item.label;

        leftDiv.appendChild(input); leftDiv.appendChild(checkmark); leftDiv.appendChild(label);
        rowDiv.appendChild(leftDiv);

        if (selectedMeasureName && item.measureValue !== null) {
          const rightDiv = document.createElement("div");
          rightDiv.className = "item-right";
          const numVal = Number(item.measureValue);
          const isValidNum = !isNaN(numVal);
          let displayVal = formatPattern ? formatValue(item.measureValue, formatPattern) : item.measureRendered;

          const textSpan = document.createElement("span");
          textSpan.innerText = showMeasureVal ? displayVal : "";
          if (!showMeasureVal) textSpan.innerHTML = "&nbsp;";
          textSpan.style.zIndex = "2"; textSpan.style.position = "relative";
          rightDiv.appendChild(textSpan);

          if (isValidNum && visType !== "none") {
            const rgbColor = getGradientColor(numVal, minVal, midVal, maxVal, cMin, cMid, cMax);
            if (visType === "data_bar") {
              const bar = document.createElement("div");
              bar.className = "data-bar";
              bar.style.backgroundColor = rgbColor;
              let range = maxVal - minVal;
              if (range === 0) range = 1;
              const widthPct = Math.max(0, Math.min(100, ((numVal - minVal) / range) * 100));
              bar.style.width = `${widthPct}%`;
              if (barPos === "row") {
                if (barDir === "left") bar.style.left = "0"; else bar.style.right = "0";
                rowDiv.appendChild(bar);
              } else {
                if (barDir === "left") bar.style.left = "0"; else bar.style.right = "0";
                rightDiv.appendChild(bar);
              }
            } else if (visType === "color_scale") {
              const alpha = barOpacityVal / 100;
              const rgbaColor = rgbColor.replace("rgb", "rgba").replace(")", `, ${alpha})`);
              if (barPos === "row") rowDiv.style.backgroundColor = rgbaColor;
              else { rightDiv.style.backgroundColor = rgbaColor; rightDiv.style.color = "#333"; }
            }
          }
          rowDiv.appendChild(rightDiv);
        }

        rowDiv.addEventListener("click", (event) => {
          if (!crossfilterEnabled) return;
          let eventToPass = event;
          if (selectionMode === "multi") {
            eventToPass = {
                target: event.target, currentTarget: event.currentTarget,
                metaKey: true, ctrlKey: true, shiftKey: event.shiftKey, altKey: event.altKey,
                type: 'click', preventDefault: () => {}, stopPropagation: () => {}
            };
          }
          LookerCharts.Utils.toggleCrossfilter({ row: item.rowContext, pivot: null, event: eventToPass });
        });
        item.element = rowDiv;
        scrollArea.appendChild(rowDiv);
      });

      const applyFilter = () => {
        const term = searchInput.value;
        this.searchState.text = term;
        const mode = this.searchState.mode;
        items.forEach(item => {
          if (!item.element) return;
          let isMatch = true;
          const text = String(item.label).toLowerCase();
          const termLow = term.toLowerCase();
          if (!term) { isMatch = true; } else {
            try {
              switch (mode) {
                case "contains": isMatch = text.indexOf(termLow) > -1; break;
                case "exclude": isMatch = text.indexOf(termLow) === -1; break;
                case "range":
                  const parts = term.split("-");
                  if (parts.length === 2) {
                    const min = parseFloat(parts[0]); const max = parseFloat(parts[1]); const val = parseFloat(item.value);
                    if (!isNaN(min) && !isNaN(max) && !isNaN(val)) isMatch = (val >= min && val <= max);
                    else isMatch = false;
                  } else isMatch = true;
                  break;
                case "regex":
                  const regex = new RegExp(term, "i");
                  isMatch = regex.test(item.label);
                  break;
              }
            } catch (e) { isMatch = false; }
          }
          item.element.style.display = isMatch ? "flex" : "none";
        });
      };

      const handleModeSelect = (m, item) => {
          this.searchState.mode = m.id;
          this.searchState.placeholder = m.placeholder;
          searchInput.placeholder = m.placeholder;
          searchInput.value = "";
          this.searchState.text = "";
          modeMenu.querySelectorAll(".mode-item").forEach(el => el.classList.remove("active"));
          item.classList.add("active");
          modeMenu.classList.remove("show");
          applyFilter();
          modeBtn.focus();
      };

      modes.forEach(m => {
        if (m.isDivider) {
          const div = document.createElement("div"); div.className = "mode-divider"; modeMenu.appendChild(div); return;
        }
        const item = document.createElement("div"); item.className = "mode-item"; item.tabIndex = 0; item.setAttribute("role", "button");
        if (m.id === this.searchState.mode) item.classList.add("active");
        item.innerText = m.label;
        item.onclick = (e) => { e.stopPropagation(); handleModeSelect(m, item); };
        item.onkeydown = (e) => {
            if (e.key === "Enter" || e.key === " ") { e.preventDefault(); e.stopPropagation(); handleModeSelect(m, item); }
            else if (e.key === "ArrowDown") {
               e.preventDefault(); let next = item.nextElementSibling;
               while(next && next.classList.contains("mode-divider")) next = next.nextElementSibling;
               if (next) next.focus();
            } else if (e.key === "ArrowUp") {
               e.preventDefault(); let prev = item.previousElementSibling;
               while(prev && prev.classList.contains("mode-divider")) prev = prev.previousElementSibling;
               if (prev) prev.focus();
            } else if (e.key === "Escape") { modeMenu.classList.remove("show"); modeBtn.focus(); }
        };
        modeMenu.appendChild(item);
      });

      modeBtn.onclick = (e) => {
          e.stopPropagation();
          const isShown = modeMenu.classList.toggle("show");
          if (isShown) {
              const activeItem = modeMenu.querySelector(".mode-item.active") || modeMenu.querySelector(".mode-item");
              if (activeItem) requestAnimationFrame(() => activeItem.focus());
          }
      };
      modeBtn.onkeydown = (e) => { if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") { e.preventDefault(); modeBtn.click(); } };
      searchInput.onclick = (e) => e.stopPropagation();
      searchInput.oninput = applyFilter;

      // 【追加】設定がOnの場合のみ検索エリアを表示
      if (showSearch) {
        wrapper.appendChild(searchArea);
      }
      wrapper.appendChild(scrollArea);
      applyFilter();

      requestAnimationFrame(() => { root.innerHTML = ""; root.appendChild(wrapper); });

      if (!window._cv_menu_closer_attached) {
        window.addEventListener("click", (e) => {
          if (!e.target.closest(".search-area")) document.querySelectorAll(".mode-menu.show").forEach(el => el.classList.remove("show"));
        });
        window._cv_menu_closer_attached = true;
      }
      if (done) done();
    } catch (error) {
      console.error("Custom Filter Error:", error);
      if (root) root.innerHTML = `<div class="viz-error">Error: ${error.message}</div>`;
      if (done) done();
    }
  }
});
