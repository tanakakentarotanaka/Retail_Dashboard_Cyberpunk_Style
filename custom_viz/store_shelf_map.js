/**
 * store_layout_builder.js (Ver 54.0 - Cyberpunk Beam Configurable)
 * 修正内容:
 * 1. optionsにサイバーパンク風ビームの色、透明度、太さ倍率の設定を追加
 * 2. create関数でCSS変数を使用したスタイル定義に変更
 * 3. renderViz関数で設定値を読み込み、CSS変数の更新と太さ計算への適用を実装
 */

looker.plugins.visualizations.add({
  id: "retail-store-ultimate-map-v54-0",
  label: "店舗マップ (Zen Dots & Courier) v54.0",

  options: {
    // --- セクション1: 基本・グラフ設定 ---
    edit_mode: { type: "boolean", label: "🔧 編集モード", default: false, section: "1. 基本・グラフ設定", order: 1 },
    layout_data: { type: "string", label: "レイアウトデータ(JSON)", display: "text", default: "[]", section: "1. 基本・グラフ設定", order: 2 },
    floor_plan_url: { type: "string", label: "フロアマップ画像URL", display: "text", section: "1. 基本・グラフ設定", order: 3 },
    canvas_height: { type: "number", label: "高さ(px) 0=自動", default: 0, display_size: "half", section: "1. 基本・グラフ設定", order: 4 },
    canvas_width: { type: "number", label: "幅(px) 0=自動", default: 0, display_size: "half", section: "1. 基本・グラフ設定", order: 5 },
    point_radius: { type: "number", label: "点のサイズ", default: 6, display_size: "half", section: "1. 基本・グラフ設定", order: 6 },

    // --- セクション1.5: 背景画像の微調整 ---
    bg_header: { type: "string", label: "--- 背景画像の調整 ---", display: "heading", section: "1. 基本・グラフ設定", order: 7 },
    bg_fit_type: {
      type: "string", label: "画像描画モード", display: "select",
      values: [
        {"引き伸ばして埋める (Stretch)": "none"},
        {"比率維持して全体表示 (Fit)": "xMidYMid meet"},
        {"比率維持して隙間なく埋める (Cover)": "xMidYMid slice"}
      ],
      default: "none", display_size: "normal", section: "1. 基本・グラフ設定", order: 8
    },
    bg_scale_w: { type: "number", label: "横幅 拡大率(%)", default: 100, display_size: "half", section: "1. 基本・グラフ設定", order: 9 },
    bg_scale_h: { type: "number", label: "縦幅 拡大率(%)", default: 100, display_size: "half", section: "1. 基本・グラフ設定", order: 10 },
    bg_pan_x: { type: "number", label: "位置調整 X(px)", default: 0, display_size: "half", section: "1. 基本・グラフ設定", order: 11 },
    bg_pan_y: { type: "number", label: "位置調整 Y(px)", default: 0, display_size: "half", section: "1. 基本・グラフ設定", order: 12 },

    color_safe: { type: "string", label: "正常時の色(0件)", display: "color", default: "#52c41a", display_size: "third", section: "1. 基本・グラフ設定", order: 20 },
    color_danger: { type: "string", label: "警告時の色(最大)", display: "color", default: "#ff4d4f", display_size: "third", section: "1. 基本・グラフ設定", order: 21 },
    color_max_limit: { type: "number", label: "最大色の基準件数", default: 5, display_size: "third", section: "1. 基本・グラフ設定", order: 22 },
    gap_threshold: { type: "number", label: "警告閾値(0.0-1.0)", default: 0.15, display_size: "half", section: "1. 基本・グラフ設定", order: 23 },
    prevent_overlap: { type: "boolean", label: "プロットの重なりを防止", default: true, display_size: "half", section: "1. 基本・グラフ設定", order: 24 },

    // --- セクション2: ツールチップ設定 ---
    tooltip_header_data: { type: "string", label: "--- データ制御 ---", display: "heading", section: "2. ツールチップ設定", order: 5 },
    tooltip_max_items: { type: "number", label: "表示件数の上限", default: 5, display_size: "half", section: "2. ツールチップ設定", order: 6 },
    tooltip_sort_type: {
      type: "string", label: "並び替え順", display: "select",
      values: [{ "スコア2 降順": "score2_desc" }, { "スコア2 昇順": "score2_asc" }, { "スコア1 降順": "score1_desc" }, { "スコア1 昇順": "score1_asc" }],
      default: "score2_desc", display_size: "half", section: "2. ツールチップ設定", order: 7
    },
    tooltip_header_text: { type: "string", label: "--- 文言設定 ---", display: "heading", section: "2. ツールチップ設定", order: 10 },
    tooltip_stock_label: { type: "string", label: "在庫ラベル", default: "", placeholder: "在庫数", display_size: "half", section: "2. ツールチップ設定", order: 11 },
    tooltip_related_title: { type: "string", label: "関連リストのタイトル", default: "一緒に買われる商品", display_size: "half", section: "2. ツールチップ設定", order: 12 },
    tooltip_score1_label: { type: "string", label: "スコア1ラベル", default: "メインスコア", display_size: "third", section: "2. ツールチップ設定", order: 13 },
    tooltip_score2_label: { type: "string", label: "スコア2ラベル", default: "比較スコア", display_size: "third", section: "2. ツールチップ設定", order: 14 },
    tooltip_value_suffix: { type: "string", label: "単位", default: "%", display_size: "third", section: "2. ツールチップ設定", order: 15 },
    tooltip_alert_message: { type: "string", label: "警告メッセージ", default: "改善余地あり！配置を見直してください", display_size: "normal", section: "2. ツールチップ設定", order: 16 },

    tooltip_header_design: { type: "string", label: "--- デザイン設定 ---", display: "heading", section: "2. ツールチップ設定", order: 20 },
    tooltip_opacity: { type: "number", label: "背景不透明度", display: "text", default: 0.9, display_size: "third", section: "2. ツールチップ設定", order: 21 },
    tooltip_bg_color: { type: "string", label: "背景色", display: "color", default: "#ffffff", display_size: "third", section: "2. ツールチップ設定", order: 22 },
    tooltip_border_color: { type: "string", label: "枠線色", display: "color", default: "#999999", display_size: "third", section: "2. ツールチップ設定", order: 23 },
    dim_color: { type: "string", label: "非選択時のグレーアウト色", display: "color", default: "#000000", display_size: "half", section: "2. ツールチップ設定", order: 24 },
    dim_opacity: { type: "number", label: "グレーアウト不透明度", display: "text", default: 0.5, display_size: "half", section: "2. ツールチップ設定", order: 25 },
    line_normal_color: { type: "string", label: "関連線（通常）の色", display: "color", default: "#999999", display_size: "half", section: "2. ツールチップ設定", order: 26 },
    line_alert_color: { type: "string", label: "関連線（警告）の色", display: "color", default: "#d32f2f", display_size: "half", section: "2. ツールチップ設定", order: 27 },

    tooltip_header_font: { type: "string", label: "--- フォント詳細設定 ---", display: "heading", section: "2. ツールチップ設定", order: 30 },
    tooltip_title_size: { type: "number", label: "商品名サイズ", default: 14, display_size: "half", section: "2. ツールチップ設定", order: 31 },
    tooltip_title_color: { type: "string", label: "商品名カラー", display: "color", default: "#000000", display_size: "half", section: "2. ツールチップ設定", order: 32 },
    tooltip_stock_size: { type: "number", label: "在庫文字サイズ", default: 12, display_size: "half", section: "2. ツールチップ設定", order: 33 },
    tooltip_stock_color: { type: "string", label: "在庫文字カラー", display: "color", default: "#666666", display_size: "half", section: "2. ツールチップ設定", order: 34 },
    tooltip_list_header_size: { type: "number", label: "見出し文字サイズ", default: 11, display_size: "half", section: "2. ツールチップ設定", order: 35 },
    tooltip_list_header_color: { type: "string", label: "見出し文字カラー", display: "color", default: "#555555", display_size: "half", section: "2. ツールチップ設定", order: 36 },
    tooltip_list_item_size: { type: "number", label: "リスト商品名サイズ", default: 12, display_size: "half", section: "2. ツールチップ設定", order: 37 },
    tooltip_list_item_color: { type: "string", label: "リスト商品名カラー", display: "color", default: "#333333", display_size: "half", section: "2. ツールチップ設定", order: 38 },
    tooltip_score_size: { type: "number", label: "スコア文字サイズ", default: 11, display_size: "half", section: "2. ツールチップ設定", order: 39 },
    tooltip_score_color: { type: "string", label: "スコア文字色", display: "color", default: "#666666", display_size: "half", section: "2. ツールチップ設定", order: 40 },
    tooltip_alert_size: { type: "number", label: "警告文字サイズ", default: 10, display_size: "half", section: "2. ツールチップ設定", order: 41 },
    tooltip_alert_color: { type: "string", label: "警告文字色", display: "color", default: "#d32f2f", display_size: "half", section: "2. ツールチップ設定", order: 42 },

    // --- ▼▼▼ 追加: セクション2.5: サイバーパンク風ビーム設定 ▼▼▼ ---
    cyber_header: { type: "string", label: "--- サイバーパンク風ビーム設定 ---", display: "heading", section: "2. ツールチップ設定", order: 50 },
    cyber_line_color: { type: "string", label: "ビームの色(ネオン)", display: "color", default: "#00f3ff", display_size: "third", section: "2. ツールチップ設定", order: 51 },
    cyber_line_opacity: { type: "number", label: "ビームの不透明度(0.0-1.0)", default: 0.9, min: 0, max: 1, step: 0.1, display_size: "third", section: "2. ツールチップ設定", order: 52 },
    cyber_line_width_scale: { type: "number", label: "太さの倍率", default: 20, min: 1, max: 100, display_size: "third", section: "2. ツールチップ設定", order: 53 },
    // ------------------------------------------------------------------

    // --- セクション3: ラベル設定 ---
    label_show_default: { type: "boolean", label: "ラベルを常時表示する", default: false, section: "3. ラベル設定", order: 1 },
    label_default_color: { type: "string", label: "通常ラベル文字色", display: "color", default: "#333333", display_size: "third", section: "3. ラベル設定", order: 2 },
    label_default_size: { type: "number", label: "通常ラベルサイズ", default: 10, display_size: "third", section: "3. ラベル設定", order: 3 },
    label_bg_color: { type: "string", label: "ラベル背景色", display: "color", default: "#ffffff", display_size: "third", section: "3. ラベル設定", order: 4 },
    label_bg_opacity: { type: "number", label: "ラベル背景不透明度", display: "text", default: 0.7, display_size: "third", section: "3. ラベル設定", order: 5 },
    label_related_color: { type: "string", label: "関係商品のラベル色", display: "color", default: "#d32f2f", display_size: "third", section: "3. ラベル設定", order: 6 },
    label_related_size: { type: "number", label: "関係ラベルサイズ", default: 11, display_size: "third", section: "3. ラベル設定", order: 7 },
    line_label_color: { type: "string", label: "ラベル引出線の色", display: "color", default: "#999999", display_size: "third", section: "3. ラベル設定", order: 8 },
    line_label_width: { type: "number", label: "ラベル引出線の太さ", default: 1, display_size: "third", section: "3. ラベル設定", order: 9 },
    label_distance: { type: "number", label: "ラベルと点の距離(px)", default: 15, display_size: "third", section: "3. ラベル設定", order: 10 },

    // --- セクション4: 検索ボタン設定 ---
    search_btn_text: { type: "string", label: "ボタン文字/アイコン", default: "Seacrh", display_size: "half", section: "4. 検索ボタン設定", order: 1 },
    search_btn_width: { type: "number", label: "ボタンの幅(px)", default: 80, display_size: "half", section: "4. 検索ボタン設定", order: 2 },
    search_position: {
      type: "string", label: "配置位置", display: "select",
      values: [
        {"右上": "top_right"}, {"左上": "top_left"},
        {"右下": "bottom_right"}, {"左下": "bottom_left"}
      ],
      default: "top_left", display_size: "normal", section: "4. 検索ボタン設定", order: 3
    },
    search_bg_color: { type: "string", label: "背景色", display: "color", default: "#220044", display_size: "third", section: "4. 検索ボタン設定", order: 4 },
    search_bg_opacity: { type: "number", label: "背景不透明度", default: 0.8, display_size: "third", section: "4. 検索ボタン設定", order: 5 },
    search_border_color: { type: "string", label: "枠線色", display: "color", default: "#cc00ff", display_size: "third", section: "4. 検索ボタン設定", order: 6 },
    search_input_text_color: { type: "string", label: "入力文字色", display: "color", default: "#ffffff", display_size: "half", section: "4. 検索ボタン設定", order: 7 },
    search_placeholder_color: { type: "string", label: "プレースホルダー色", display: "color", default: "#dddddd", display_size: "half", section: "4. 検索ボタン設定", order: 8 },
  },

  hexToRgba: function(hex, alpha) {
    if (!hex) return `rgba(255, 255, 255, ${alpha})`;
    let r = 0, g = 0, b = 0;
    if (hex.length === 4) { r = "0x" + hex[1] + hex[1]; g = "0x" + hex[2] + hex[2]; b = "0x" + hex[3] + hex[3]; }
    else if (hex.length === 7) { r = "0x" + hex[1] + hex[2]; g = "0x" + hex[3] + hex[4]; b = "0x" + hex[5] + hex[6]; }
    return `rgba(${+r}, ${+g}, ${+b}, ${alpha})`;
  },

  isTooltipFixed: false,

  create: function(element, config) {
    const fontUrl = "https://cdn.jsdelivr.net/gh/tanakakentarotanaka/240322_kentarotanaka@master/zen-dots-v14-latin-regular%20(2).woff2";

    element.innerHTML = `
      <style>
        @font-face {
          font-family: 'Zen Dots';
          src: url('${fontUrl}') format('woff2');
          font-display: swap;
        }

        .viz-box {
          width: 100%; height: 100%; display: flex; flex-direction: column;
          font-family: 'Courier New', monospace;
          overflow: hidden; position: relative;
          /* ▼▼▼ 追加: CSS変数の初期定義 ▼▼▼ */
          --cyber-color: #00f3ff;
          --cyber-opacity: 0.9;
        }

        .toolbar { height: 45px; background: #fff; border-bottom: 1px solid #ccc; display: none; align-items: center; padding: 0 10px; gap: 10px; z-index: 100; box-shadow: 0 2px 5px rgba(0,0,0,0.1); flex-shrink: 0; }
        .toolbar button { cursor: pointer; border: 1px solid #999; border-radius: 4px; background: #f8f9fa; font-size: 12px; transition: all 0.2s; padding: 5px 12px; }
        .toolbar button:hover { background: #e2e6ea; }
        .toolbar button.del-btn { background: #d32f2f; color: white; border-color: #b71c1c; font-weight: bold; margin-left: auto; }

        .search-container { position: absolute; z-index: 1000; display: flex; gap: 5px; align-items: center; transition: all 0.3s ease; }

        .search-btn {
          font-family: 'Zen Dots', sans-serif;
          border-radius: 4px; height: 32px; cursor: pointer;
          display: flex; align-items: center; justify-content: center; font-size: 14px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.3); border-style: solid; border-width: 1px;
          white-space: nowrap; overflow: hidden; font-weight: bold;
        }
        .search-btn:hover { filter: brightness(1.2); }
        .search-input-wrapper {
          display: none; border-radius: 4px; box-shadow: 0 2px 5px rgba(0,0,0,0.3);
          padding: 0 5px; border-style: solid; border-width: 1px; align-items: center;
        }
        .search-input { border: none; outline: none; padding: 6px; font-size: 14px; width: 180px; background: transparent; font-family: 'Courier New', monospace; }

        .search-clear {
          cursor: pointer; font-weight: bold; padding: 0 5px; font-size: 14px; opacity: 0.7;
          font-family: 'Zen Dots', sans-serif;
        }
        .search-clear:hover { opacity: 1.0; }

        .canvas-scroll-wrapper { flex: 1; position: relative; background: #000; overflow: auto; }
        .canvas-content { position: relative; overflow: hidden; transform-origin: top left; }
        .debug-info { position: absolute; bottom: 5px; left: 5px; font-size: 10px; color: #666; background: rgba(255,255,255,0.8); padding: 2px 5px; pointer-events: none; z-index: 90; }
        .shelf-rect { vector-effect: non-scaling-stroke; }
        .shelf-rect.selected { stroke: #0044ff !important; stroke-width: 3px !important; stroke-dasharray: 4,2; }

        .tooltip {
          position: absolute; padding: 12px; display: none; z-index: 9999;
          opacity: 0; transition: opacity 0.1s ease;
          border-radius: 4px; box-shadow: 0 4px 12px rgba(0,0,0,0.25);
          border-style: solid; border-width: 1px;
          min-width: 200px; max-width: 320px; pointer-events: none !important;
        }
        .tooltip.fixed { pointer-events: auto !important; cursor: move; box-shadow: 0 8px 20px rgba(0,0,0,0.4); border-width: 2px; }
        .rank-list { margin: 6px 0 0 0; padding-left: 12px; list-style: none; }
        .rank-list li { margin-bottom: 6px; padding-bottom: 6px; border-bottom: 1px dashed #eee; }
        .rank-list li:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
        .rank-row { display: flex; justify-content: space-between; align-items: center; }
        .score-row { margin-top: 1px; text-align: right; }
        .alert-text { font-weight: bold; display: block; margin-top: 2px;}

        .label-group { pointer-events: none !important; }
        .label-text { font-family: 'Courier New', monospace; text-anchor: middle; alignment-baseline: middle; pointer-events: none; }
        .label-bg { stroke-width: 1px; pointer-events: none; }
        .label-link { stroke-width: 1px; opacity: 0.6; pointer-events: none; }
        .temp-line { pointer-events: none !important; }
        .temp-label-group { pointer-events: none !important; }

        /* ▼▼▼ 変更: CSS変数を使用したサイバーパンク風ビームの定義 ▼▼▼ */
        .cyber-line {
           stroke: var(--cyber-color) !important; /* 変数を使用 */
           stroke-linecap: round;
           /* 発光の色も変数で制御 */
           filter: drop-shadow(0 0 3px var(--cyber-color)) drop-shadow(0 0 8px var(--cyber-color));
           opacity: var(--cyber-opacity); /* 変数を使用 */
           mix-blend-mode: screen;
        }
      </style>
      <style id="viz-custom-styles"></style>
    `;

    this.container = d3.select(element).append("div").attr("class", "viz-box");
    const tb = this.container.append("div").attr("class", "toolbar");
    this.toolbar = tb;
    this.statusSpan = tb.append("span").style("font-weight","bold").style("font-size","12px").text("🔧 編集モード");
    tb.append("span").text("背景:").style("font-size","11px").style("margin-left","10px");
    const inpColorNode = document.createElement("input"); inpColorNode.type = "color";
    inpColorNode.onchange = (e) => this.actionColor(element, e.target.value);
    tb.node().appendChild(inpColorNode); this.inpColor = d3.select(inpColorNode);
    const btnDelNode = document.createElement("button"); btnDelNode.className = "del-btn"; btnDelNode.innerText = "🗑️ 削除";
    btnDelNode.onclick = (e) => { e.stopPropagation(); e.preventDefault(); this.actionDelete(element); };
    tb.node().appendChild(btnDelNode); this.btnDel = d3.select(btnDelNode);

    const searchCont = this.container.append("div").attr("class", "search-container");
    this.searchBtn = searchCont.append("button").attr("class", "search-btn");
    this.searchInputWrap = searchCont.append("div").attr("class", "search-input-wrapper");
    this.searchInput = this.searchInputWrap.append("input").attr("class", "search-input").attr("list", "viz-search-list").attr("placeholder", "...");
    this.searchClear = this.searchInputWrap.append("span").attr("class", "search-clear").html("✕");
    this.searchDatalist = searchCont.append("datalist").attr("id", "viz-search-list");

    this.searchBtn.on("click", () => {
        this.searchInputWrap.style("display", "flex");
        this.searchBtn.style("display", "none");
        this.searchInput.node().focus();
    });
    this.searchClear.on("click", () => {
        this.searchInput.property("value", "");
        this.searchInputWrap.style("display", "none");
        this.searchBtn.style("display", "flex");
        this.clearSelection();
    });

    const scrollWrapper = this.container.append("div").attr("class", "canvas-scroll-wrapper");
    const cvContent = scrollWrapper.append("div").attr("class", "canvas-content");
    this.svg = cvContent.append("svg");

    this.bgLayer = this.svg.append("g");
    this.shelfLayer = this.svg.append("g");
    this.vizLayer = this.svg.append("g");
    this.labelLayer = this.svg.append("g");
    this.dimLayer = this.svg.append("g");
    this.frontLayer = this.svg.append("g");

    this.debugDiv = scrollWrapper.append("div").attr("class", "debug-info").text("Ready");

    this.tooltip = d3.select(element).append("div").attr("class", "tooltip");
    const dragTooltip = d3.drag()
      .on("start", (e) => { d3.select(e.sourceEvent.target).style("cursor", "grabbing"); })
      .on("drag", (e) => {
        const t = this.tooltip;
        t.style("left", (parseFloat(t.style("left")) + e.dx) + "px").style("top", (parseFloat(t.style("top")) + e.dy) + "px");
      })
      .on("end", (e) => { d3.select(e.sourceEvent.target).style("cursor", "move"); });
    this.tooltip.call(dragTooltip);

    this.svg.on("click", (e) => {
      e.preventDefault();
      if(e.target.tagName === 'svg' || e.target.tagName === 'image') {
        if (element._selectedId) { element._selectedId = null; this.render(element); }
        this.clearSelection();
      }
    });
    this.svg.on("mousedown", (e) => { if(e.target.tagName === 'image') e.preventDefault(); });
  },

  clearSelection: function() {
      this.isTooltipFixed = false;
      this.tooltip.classed("fixed", false).style("display", "none");
      this.vizLayer.selectAll("circle").transition().duration(200).attr("stroke", "#fff");
      this.dimLayer.selectAll("*").remove();
      this.frontLayer.selectAll("*").remove();
      if(this._lastDefColor) {
        this.labelLayer.selectAll("text").attr("fill", this._lastDefColor).style("font-weight", "normal");
        this.labelLayer.selectAll("rect").attr("stroke", this._lastBorderColor).attr("stroke-width", 1);
      }
  },

  updateAsync: function(data, element, config, queryResponse, details, done) {
    this.clearErrors();
    const wrapper = element.querySelector(".canvas-scroll-wrapper");
    const wrapperWidth = wrapper.clientWidth || 500;
    const wrapperHeight = wrapper.clientHeight || 500;

    const fixedWidth = config.canvas_width ? Number(config.canvas_width) : 0;
    const fixedHeight = config.canvas_height ? Number(config.canvas_height) : 0;
    this.w = fixedWidth > 0 ? fixedWidth : wrapperWidth;
    this.h = fixedHeight > 0 ? fixedHeight : wrapperHeight;

    this.svg.attr("width", this.w).attr("height", this.h);
    d3.select(element).select(".canvas-content").style("width", this.w + "px").style("height", this.h + "px");

    if (!element._shelvesData) {
      try { element._shelvesData = JSON.parse(config.layout_data || "[]"); }
      catch(e) { element._shelvesData = []; }
    }
    if (!config.edit_mode) element._selectedId = null;

    element._vizConfig = config;
    this.data = data;
    this.qr = queryResponse;

    this.render(element);
    done();
  },

  render: function(element) {
    const shelves = element._shelvesData || [];
    const selectedId = element._selectedId;
    const isEdit = element._vizConfig.edit_mode;
    const config = element._vizConfig;
    const w = this.w;
    const h = this.h;

    this.applySearchStyles(config);

    if (isEdit) {
      this.toolbar.style("display", "flex");
      this.btnDel.property("disabled", !selectedId);
      this.inpColor.property("disabled", !selectedId);
      this.debugDiv.text(`棚数: ${shelves.length} | 選択ID: ${selectedId || 'なし'}`);
      this.svg.on("dblclick", (e) => {
        if(e.target.tagName !== 'svg' && e.target.tagName !== 'image') return;
        const [mx, my] = d3.pointer(e);
        this.actionAdd(element, mx, my);
      });
    } else {
      this.toolbar.style("display", "none");
      this.svg.on("dblclick", null);
      this.debugDiv.text("");
    }

    // --- ★ 背景描画 (微調整機能付き) ---
    this.bgLayer.selectAll("*").remove();
    if(element._vizConfig.floor_plan_url) {
      const bgScaleW = (config.bg_scale_w !== undefined ? config.bg_scale_w : 100) / 100;
      const bgScaleH = (config.bg_scale_h !== undefined ? config.bg_scale_h : 100) / 100;
      const bgPanX = config.bg_pan_x || 0;
      const bgPanY = config.bg_pan_y || 0;
      const fitType = config.bg_fit_type || "none";

      this.bgLayer.append("image")
        .attr("href", element._vizConfig.floor_plan_url)
        .attr("x", bgPanX)
        .attr("y", bgPanY)
        .attr("width", w * bgScaleW)
        .attr("height", h * bgScaleH)
        .attr("preserveAspectRatio", fitType)
        .style("pointer-events", "none");
    }

    this.shelfLayer.selectAll("*").remove();
    shelves.forEach(shelf => {
      const g = this.shelfLayer.append("g").attr("transform", `translate(${shelf.x/100*w}, ${shelf.y/100*h})`)
        .style("cursor", isEdit ? "grab" : "default");
      g.on("click", (e) => {
        if(!isEdit) return;
        e.stopPropagation();
        element._selectedId = shelf.id;
        this.render(element);
      });
      const rect = g.append("rect").attr("width", shelf.w/100*w).attr("height", shelf.h/100*h)
        .attr("fill", shelf.fill || "#e0e0e0").attr("stroke", shelf.stroke || "#999").attr("stroke-width", 1)
        .attr("class", shelf.id === selectedId ? "shelf-rect selected" : "shelf-rect");
      if (shelf.isTransparent) rect.attr("fill", "transparent");

      if(isEdit) {
        g.call(d3.drag().on("drag", (e) => {
             shelf.x += e.dx/w*100; shelf.y += e.dy/h*100;
             g.attr("transform", `translate(${shelf.x/100*w}, ${shelf.y/100*h})`);
          }).on("end", () => this.saveToLooker(element)));
        g.append("circle").attr("cx", shelf.w/100*w).attr("cy", shelf.h/100*h)
          .attr("r", 8).attr("fill", "blue").attr("stroke", "white").style("cursor", "nwse-resize")
          .call(d3.drag().on("drag", (e) => {
              e.sourceEvent.stopPropagation();
              shelf.w += e.dx/w*100; shelf.h += e.dy/h*100;
              if(shelf.w < 2) shelf.w = 2; if(shelf.h < 2) shelf.h = 2;
              rect.attr("width", shelf.w/100*w).attr("height", shelf.h/100*h);
              d3.select(e.sourceEvent.target).attr("cx", shelf.w/100*w).attr("cy", shelf.h/100*h);
            }).on("end", () => this.saveToLooker(element)));
      }
    });

    this.renderViz(w, h, element._vizConfig);
  },

  applySearchStyles: function(config) {
    const bgRgba = this.hexToRgba(config.search_bg_color || "#220044", config.search_bg_opacity !== undefined ? config.search_bg_opacity : 0.8);
    const borderColor = config.search_border_color || "#cc00ff";
    const textColor = config.search_input_text_color || "#ffffff";
    const placeholderColor = config.search_placeholder_color || "#dddddd";
    const btnText = config.search_btn_text || "Seacrh";
    const btnWidth = config.search_btn_width || 80;
    const position = config.search_position || "top_left";

    const cont = this.container.select(".search-container");
    cont.style("top", null).style("bottom", null).style("left", null).style("right", null);

    switch (position) {
      case "top_left": cont.style("top", "10px").style("left", "10px"); break;
      case "top_right": cont.style("top", "10px").style("right", "10px"); break;
      case "bottom_left": cont.style("bottom", "10px").style("left", "10px"); break;
      case "bottom_right": cont.style("bottom", "10px").style("right", "10px"); break;
    }

    this.searchBtn
      .text(btnText)
      .style("width", btnWidth + "px")
      .style("background-color", bgRgba)
      .style("border-color", borderColor)
      .style("color", textColor);

    this.searchInputWrap
      .style("background-color", bgRgba)
      .style("border-color", borderColor);

    this.searchInput.style("color", textColor);
    this.searchClear.style("color", textColor);

    this.container.select("#viz-custom-styles").text(`
      .search-input::placeholder { color: ${placeholderColor}; opacity: 1; }
      .search-input::-ms-input-placeholder { color: ${placeholderColor}; }
    `);
  },

  actionAdd: function(element, mx, my) {
    const newId = "s_" + Date.now();
    element._shelvesData.push({ id: newId, x: mx/this.w*100, y: my/this.h*100, w: 15, h: 10, fill: "#e0e0e0", stroke: "#999" });
    element._selectedId = newId;
    this.render(element); this.saveToLooker(element);
  },
  actionDelete: function(element) {
    if(!element._selectedId) return;
    element._shelvesData = element._shelvesData.filter(s => s.id !== element._selectedId);
    element._selectedId = null;
    this.render(element); this.saveToLooker(element);
  },
  actionColor: function(element, color) {
    if(!element._selectedId) return;
    const target = element._shelvesData.find(s => s.id === element._selectedId);
    if(target) { target.fill = color; this.render(element); this.saveToLooker(element); }
  },
  saveToLooker: function(element) {
    this.trigger("updateConfig", [{ layout_data: JSON.stringify(element._shelvesData) }]);
  },

  renderViz: function(w, h, config) {
    this.vizLayer.selectAll("*").remove();
    this.labelLayer.selectAll("*").remove();
    this.dimLayer.selectAll("*").remove();
    this.frontLayer.selectAll("*").remove();

    // --- ▼▼▼ 追加: サイバーパンク設定の適用 ▼▼▼ ---
    // 1. 設定値の取得
    const cyberColor = config.cyber_line_color || "#00f3ff";
    const cyberOpacity = config.cyber_line_opacity !== undefined ? config.cyber_line_opacity : 0.9;
    const cyberWidthScale = config.cyber_line_width_scale !== undefined ? config.cyber_line_width_scale : 20;

    // 2. CSS変数の更新 (コンテナ要素にスタイルを適用することで、配下の要素が継承する)
    this.container.style("--cyber-color", cyberColor);
    this.container.style("--cyber-opacity", cyberOpacity);
    // ---------------------------------------------------

    if(!this.data || !this.qr || this.qr.fields.dimensions.length < 4) return;

    const xScale = d3.scaleLinear().domain([0,100]).range([0,w]);
    const yScale = d3.scaleLinear().domain([0,100]).range([h,0]);
    const colorScale = d3.scaleLinear().domain([0, config.color_max_limit || 5]).range([config.color_safe || "#52c41a", config.color_danger || "#ff4d4f"]).clamp(true);

    const showDefaultLabels = config.label_show_default;
    const defLabelColor = config.label_default_color || "#333";
    const defLabelSize = config.label_default_size || 10;
    const relLabelColor = config.label_related_color || "#d32f2f";
    const relLabelSize = config.label_related_size || 11;
    const bgRgba = this.hexToRgba(config.tooltip_bg_color || "#ffffff", config.tooltip_opacity || 0.9);
    const labelBgRgba = this.hexToRgba(config.label_bg_color || "#ffffff", config.label_bg_opacity || 0.7);
    const borderColor = config.tooltip_border_color || "#999999";
    const targetRadius = config.point_radius || 6;
    const gapThreshold = config.gap_threshold || 0.15;
    const preventOverlap = config.prevent_overlap !== false;
    const overlapPadding = 2;
    const dimColor = config.dim_color || "#000000";
    const dimOpacity = config.dim_opacity !== undefined ? config.dim_opacity : 0.5;
    const lineLabelColor = config.line_label_color || "#999999";
    const lineLabelWidth = config.line_label_width || 1;
    const lineAlertColor = config.line_alert_color || "#d32f2f";
    const labelDistance = config.label_distance || 15;

    this._lastDefColor = defLabelColor;
    this._lastBorderColor = borderColor;

    const stockLbl = config.tooltip_stock_label || this.qr.fields.measures[0].label || "在庫";
    const relTitle = config.tooltip_related_title || "一緒に買われる商品";
    const s1Lbl = config.tooltip_score1_label || "メインスコア";
    const s2Lbl = config.tooltip_score2_label || "比較スコア";
    const suff = config.tooltip_value_suffix || "%";
    const alert = config.tooltip_alert_message || "改善余地あり！配置を見直してください";
    const sType = config.tooltip_sort_type || "score2_desc";
    const maxItm = config.tooltip_max_items || 5;
    const tSize = config.tooltip_title_size || 14;
    const stSize = config.tooltip_stock_size || 12;
    const hSize = config.tooltip_list_header_size || 11;
    const iSize = config.tooltip_list_item_size || 12;
    const scSize = config.tooltip_score_size || 11;
    const aSize = config.tooltip_alert_size || 10;
    const tColor = config.tooltip_title_color || "#000000";
    const stColor = config.tooltip_stock_color || "#666666";
    const hColor = config.tooltip_list_header_color || "#555555";
    const iColor = config.tooltip_list_item_color || "#333333";
    const sColor = config.tooltip_score_color || "#666666";
    const aColor = config.tooltip_alert_color || "#d32f2f";

    const points = this.data.map(d => {
       const dims = this.qr.fields.dimensions;
       let rel = [];
       try { rel = JSON.parse(d[dims[3].name].value); } catch(e){}
       const rawX = Number(d[dims[1].name].value);
       const rawY = Number(d[dims[2].name].value);
       let alertCount = 0;
       if (rel && Array.isArray(rel)) {
         alertCount = rel.filter(r => {
           const v1 = r.score1 ?? r.local_score ?? (r.score || 0);
           const v2 = r.score2 ?? r.global_score ?? (r.score || 0);
           return (v2 - v1) > gapThreshold;
         }).length;
       }
       return {
         name: d[dims[0].name].value,
         ox: xScale(rawX), oy: yScale(rawY),
         x: xScale(rawX), y: yScale(rawY),
         stock: Number(d[this.qr.fields.measures[0].name].value),
         stockLabel: d[this.qr.fields.measures[0].name].rendered || d[this.qr.fields.measures[0].name].value,
         rel: rel, r: targetRadius,
         alertCount: alertCount
       };
    });

    this.searchDatalist.selectAll("*").remove();
    points.forEach(p => { this.searchDatalist.append("option").attr("value", p.name); });

    if (preventOverlap && points.length > 0) {
      const simulation = d3.forceSimulation(points)
        .force("x", d3.forceX(d => d.ox).strength(0.1))
        .force("y", d3.forceY(d => d.oy).strength(0.1))
        .force("collide", d3.forceCollide(d => d.r + overlapPadding).iterations(5))
        .stop();
      for (let i = 0; i < 40; ++i) simulation.tick();
    }

    const map = new Map(points.map(p => [p.name, p]));
    const drawCircle = (selection, d, extraR=0) => {
      selection.append("circle")
        .attr("cx", d.x).attr("cy", d.y)
        .attr("r", d.r + extraR)
        .attr("fill", colorScale(d.alertCount))
        .attr("stroke", "#fff").attr("stroke-width", 2)
        .style("pointer-events", "none");
    };

    if (showDefaultLabels) {
      const labelNodes = points.map(p => ({ type: "label", name: p.name, ox: p.x, oy: p.y, x: p.ox, y: p.oy + p.r + 20, r: targetRadius }));
      const obstacleNodes = points.map(p => ({ type: "obstacle", fx: p.ox, fy: p.oy, x: p.ox, y: p.oy, radius: p.r + 12 }));
      const allNodes = labelNodes.concat(obstacleNodes);
      const labels = this.labelLayer.selectAll(".label-group").data(labelNodes).enter().append("g").attr("class", "label-group");
      labels.each(function(d) {
        const g = d3.select(this);
        const text = g.append("text").text(d.name).attr("class", "label-text").attr("fill", defLabelColor).style("font-size", defLabelSize + "px");
        const bbox = text.node().getBBox();
        d.width = bbox.width + 8; d.height = bbox.height + 4; d.radius = Math.max(d.width, d.height) * 0.55;
        g.insert("rect", "text").attr("class", "label-bg").attr("x", bbox.x-4).attr("y", bbox.y-2).attr("width", d.width).attr("height", d.height).attr("rx", 3).attr("fill", labelBgRgba).attr("stroke", borderColor);
      });
      const links = this.labelLayer.selectAll(".label-link").data(labelNodes).enter().insert("line", ".label-group").attr("class", "label-link").attr("stroke", lineLabelColor).attr("stroke-width", lineLabelWidth);
      const simulation = d3.forceSimulation(allNodes)
        .force("x", d3.forceX(d => d.ox).strength(d => d.type === "label" ? 0.05 : 0))
        .force("y", d3.forceY(d => { if (d.type !== "label") return d.oy; return d.oy + d.r + d.height + labelDistance; }).strength(d => d.type === "label" ? 0.2 : 0))
        .force("collide", d3.forceCollide(d => d.radius).strength(1.0).iterations(15))
        .force("charge", d3.forceManyBody().strength(d => d.type === "label" ? -30 : -10).distanceMax(100))
        .stop();
      for (let i = 0; i < 300; ++i) simulation.tick();
      labelNodes.forEach(d => {
        if(d.type === "label") {
          d.x = Math.max(d.width/2 + 2, Math.min(w - d.width/2 - 2, d.x));
          d.y = Math.max(d.height/2 + 2, Math.min(h - d.height/2 - 2, d.y));
        }
      });
      labels.attr("transform", d => `translate(${d.x}, ${d.y})`);
      links.attr("x1", d => d.ox).attr("y1", d => d.oy).attr("x2", d => d.x).attr("y2", d => d.y).style("display", d => Math.sqrt((d.x - d.ox)**2 + (d.y - d.oy)**2) > (d.r + 5) ? "block" : "none");
    }

    const circles = this.vizLayer.selectAll("circle").data(points).enter().append("circle")
      .attr("cx", d => d.x).attr("cy", d => d.y)
      .attr("fill", d => colorScale(d.alertCount))
      .attr("stroke", "#fff").attr("stroke-width", 2).style("cursor", "pointer").attr("r", 0);
    circles.transition().duration(800).ease(d3.easeElasticOut).attr("r", targetRadius);

    const calcTooltipPos = (mx, my, contW, contH, tipW, tipH) => {
       let left = mx + 15; let top = my + 15;
       if (left + tipW > contW) left = mx - tipW - 15;
       if (top + tipH > contH) top = my - tipH - 15;
       if (left < 10) left = 10; else if (left + tipW > contW - 10) left = contW - tipW - 10;
       if (top < 10) top = 10; else if (top + tipH > contH - 10) top = contH - tipH - 10;
       return { left, top };
    };

    const highlightPoint = (d, coords) => {
       if (dimOpacity > 0) {
         this.dimLayer.append("rect").attr("width", w).attr("height", h).attr("fill", dimColor).attr("opacity", dimOpacity).style("pointer-events", "none");
       }
       drawCircle(this.frontLayer, d, d.r * 0.5);
       this.tooltip.style("background-color", bgRgba).style("border-color", borderColor);

       let listHtml = "";
       if(d.rel && d.rel.length > 0) {
           const sorted = d.rel.sort((a,b) => {
             const v1a = a.score1 ?? a.local_score ?? (a.score||0); const v1b = b.score1 ?? b.local_score ?? (b.score||0);
             const v2a = a.score2 ?? a.global_score ?? (a.score||0); const v2b = b.score2 ?? b.global_score ?? (b.score||0);
             if(sType === "score1_asc") return v1a - v1b; if(sType === "score1_desc") return v1b - v1a;
             if(sType === "score2_asc") return v2a - v2b; return v2b - v2a;
           });
           const limited = sorted.slice(0, maxItm);
           listHtml += `<div style="margin-top:8px; margin-bottom:4px; font-weight:bold; border-bottom:1px solid #eee; font-size:${hSize}px; color:${hColor};">${relTitle}</div><ul class="rank-list">`;
           limited.forEach(r => {
             const t = map.get(r.name);
             const val1 = r.score1 ?? r.local_score ?? (r.score || 0); const val2 = r.score2 ?? r.global_score ?? (r.score || 0);
             const gap = val2 - val1; const isAlert = gap > gapThreshold;
             listHtml += `<li><div class="rank-row"><span style="font-weight:600; font-size:${iSize}px; color:${iColor};">${r.name}</span></div><div class="score-row" style="color:${sColor}; font-size:${scSize}px;">${s1Lbl}: <b>${Math.round(val1*100)}${suff}</b> / ${s2Lbl}: <b>${Math.round(val2*100)}${suff}</b></div>${isAlert ? `<span class="alert-text" style="font-size:${aSize}px; color:${aColor};">${alert}</span>` : ''}</li>`;
             if(t) {
               // --- 修正箇所: サイバーパンク風ビーム (設定値反映) ---
               if(val1 > 0.05) {
                   const normLine = this.frontLayer.append("line")
                     .attr("class", "temp-line cyber-line")
                     .attr("x1", d.x).attr("y1", d.y)
                     .attr("x2", d.x).attr("y2", d.y)
                     // ▼▼▼ 変更: 設定した倍率(cyberWidthScale)を使用 ▼▼▼
                     // 最低幅も少し調整 (例: 倍率の1/5など)
                     .attr("stroke-width", Math.max(cyberWidthScale / 5, val1 * cyberWidthScale))
                     // ▲▲▲ 変更ここまで ▲▲▲
                     .style("pointer-events", "none");

                   // アニメーション実行
                   normLine.transition().duration(400).attr("x2", t.x).attr("y2", t.y);
               }

               if(isAlert) {
                 const line = this.frontLayer.append("line").attr("class", "temp-line").attr("x1", d.x).attr("y1", d.y).attr("x2", d.x).attr("y2", d.y).attr("stroke", lineAlertColor).attr("stroke-width", gap*6).attr("stroke-dasharray", "4,3").style("pointer-events", "none");
                 line.transition().duration(400).attr("x2", t.x).attr("y2", t.y);
               }
               drawCircle(this.frontLayer, t);
               if (showDefaultLabels) {
                 const lblNode = this.labelLayer.selectAll(".label-group").filter(l => l.name === t.name).datum();
                 if(lblNode) {
                    if (Math.sqrt((lblNode.x - lblNode.ox)**2 + (lblNode.y - lblNode.oy)**2) > (lblNode.r + 5)) {
                        this.frontLayer.append("line").attr("x1", lblNode.ox).attr("y1", lblNode.oy).attr("x2", lblNode.x).attr("y2", lblNode.y).attr("stroke", relLabelColor).attr("stroke-width", 2).style("pointer-events", "none");
                    }
                    const fg = this.frontLayer.append("g").attr("transform", `translate(${lblNode.x}, ${lblNode.y})`).style("pointer-events", "none");
                    const txt = fg.append("text").text(t.name).attr("class", "label-text").attr("fill", relLabelColor).style("font-size", defLabelSize+"px").style("font-weight", "bold");
                    const bb = txt.node().getBBox();
                    fg.insert("rect", "text").attr("x", bb.x-4).attr("y", bb.y-2).attr("width", bb.width+8).attr("height", bb.height+4).attr("rx", 3).attr("fill", labelBgRgba).attr("stroke", relLabelColor).attr("stroke-width", 2);
                 }
               } else {
                 const tempG = this.frontLayer.append("g").attr("class", "temp-label-group").attr("transform", `translate(${t.x}, ${t.y - t.r - 10})`);
                 const tempText = tempG.append("text").text(t.name).attr("fill", relLabelColor).style("font-size", relLabelSize+"px").style("font-weight","bold").style("text-anchor","middle").style("pointer-events", "none");
                 const tb = tempText.node().getBBox();
                 tempG.insert("rect","text").attr("x", tb.x-4).attr("y", tb.y-2).attr("width", tb.width+8).attr("height", tb.height+4).attr("fill", labelBgRgba).attr("stroke", relLabelColor).attr("rx", 3).style("pointer-events", "none");
               }
             }
           });
           if (sorted.length > maxItm) listHtml += `<li style="text-align:center; font-size:10px; color:#999;">他 ${sorted.length - maxItm} 件...</li>`;
           listHtml += "</ul>";
         } else { listHtml = "<div style='color:#999; margin-top:5px;'>関連データなし</div>"; }
         const html = `<div style="font-weight:bold; font-size:${tSize}px; color:${tColor};">${d.name}</div><div style="font-size:${stSize}px; color:${stColor};">${stockLbl}: ${d.stockLabel}</div>${listHtml}`;
         this.tooltip.html(html).style("display", "block").style("opacity", 0);
         const tipRect = this.tooltip.node().getBoundingClientRect();
         const contW = this.container.node().clientWidth; const contH = this.container.node().clientHeight;
         const pos = calcTooltipPos(coords.x, coords.y, contW, contH, tipRect.width, tipRect.height);
         this.tooltip.style("left", pos.left + "px").style("top", pos.top + "px").transition().duration(200).style("opacity", 1);
         if (showDefaultLabels) {
           const lblNode = this.labelLayer.selectAll(".label-group").filter(l => l.name === d.name).datum();
           if(lblNode) {
              if (Math.sqrt((lblNode.x - lblNode.ox)**2 + (lblNode.y - lblNode.oy)**2) > (lblNode.r + 5)) {
                  this.frontLayer.append("line").attr("x1", lblNode.ox).attr("y1", lblNode.oy).attr("x2", lblNode.x).attr("y2", lblNode.y).attr("stroke", relLabelColor).attr("stroke-width", 2).style("pointer-events", "none");
              }
              const fg = this.frontLayer.append("g").attr("transform", `translate(${lblNode.x}, ${lblNode.y})`).style("pointer-events", "none");
              const txt = fg.append("text").text(d.name).attr("class", "label-text").attr("fill", relLabelColor).style("font-size", defLabelSize+"px").style("font-weight", "bold");
              const bb = txt.node().getBBox();
              fg.insert("rect", "text").attr("x", bb.x-4).attr("y", bb.y-2).attr("width", bb.width+8).attr("height", bb.height+4).attr("rx", 3).attr("fill", labelBgRgba).attr("stroke", relLabelColor).attr("stroke-width", 2);
           }
         }
    };

    this.searchInput.on("change", (e) => {
        const val = e.target.value;
        const target = map.get(val);
        if (target) {
            this.clearSelection();
            this.isTooltipFixed = true;
            this.tooltip.classed("fixed", true);
            highlightPoint(target, {x: target.x + 10, y: target.y + 10});
        }
    });

    circles
      .on("click", (e, d) => {
         e.stopPropagation();
         this.isTooltipFixed = true;
         this.tooltip.classed("fixed", true);
      })
      .on("mouseover", (e, d) => {
         if (this.isTooltipFixed) return;
         const [mx, my] = d3.pointer(e, this.container.node());
         highlightPoint(d, {x: mx, y: my});
      })
      .on("mousemove", (e) => {
         if (this.isTooltipFixed) return;
         const [mx, my] = d3.pointer(e, this.container.node());
         const tipRect = this.tooltip.node().getBoundingClientRect();
         const contW = this.container.node().clientWidth; const contH = this.container.node().clientHeight;
         const pos = calcTooltipPos(mx, my, contW, contH, tipRect.width, tipRect.height);
         this.tooltip.style("left", pos.left + "px").style("top", pos.top + "px");
      })
      .on("mouseout", (e, d) => {
         if (this.isTooltipFixed) return;
         this.tooltip.transition().duration(200).style("opacity", 0).on("end", function() { d3.select(this).style("display", "none"); });
         this.dimLayer.selectAll("*").remove();
         this.frontLayer.selectAll("*").remove();
      });
  }
});
