looker.plugins.visualizations.add({
  // --- 1. 設定項目 ---
  options: {
    fontStyle: {
      type: "string",
      label: "フォントスタイル (Language)",
      display: "select",
      values: [
        { "Cyberpunk (Zen Dots)": "zen" },
        { "はんなり明朝 (Japanese)": "hannari" }
      ],
      default: "zen",
      section: "Style",
      order: 1 // 設定メニューの一番上に表示
    },
    mainColor: {
      type: "string",
      label: "アクセントカラー(枠線・数値)",
      default: "#00ffff", // シアン
      display: "color",
      section: "Style"
    },
    glowStrength: {
      type: "number",
      label: "ネオン光の強さ",
      default: 10,
      min: 0,
      max: 30,
      section: "Style"
    },
    labelOverride: {
      type: "string",
      label: "ラベル名の上書き (空欄で自動)",
      default: "",
      section: "Content"
    },
    subLabelOverride: {
      type: "string",
      label: "サブ情報の上書き (2つ目のメジャー)",
      default: "",
      section: "Content"
    }
  },

  // --- 2. 初期化処理 ---
  create: function(element, config) {
    const zenDotsUrl = "https://cdn.jsdelivr.net/gh/tanakakentarotanaka/240322_kentarotanaka@master/zen-dots-v14-latin-regular%20(2).woff2";

    // スタイルタグを作成してフォントを定義
    // ▼▼▼ 変更: はんなり明朝(@import) と Zen Dots(@font-face) 両方を定義 ▼▼▼
    const style = document.createElement('style');
    style.innerHTML = `
      @import url('https://fonts.googleapis.com/css2?family=Hannari+Mincho&display=swap');

      @font-face {
        font-family: 'Zen Dots';
        src: url('${zenDotsUrl}') format('woff2');
        font-display: swap;
      }
    `;
    element.appendChild(style);

    // コンテナのスタイル設定
    element.style.backgroundColor = "#1a1a2e";
    element.style.color = "#ffffff";
    element.style.overflow = "hidden";
    element.style.height = "100%";
    element.style.borderRadius = "8px";

    // 初期化時に中身をクリア
    element.innerHTML = "";

    // Styleタグを再注入（innerHTMLクリアで消えるため）
    element.appendChild(style);

    this.container = element.appendChild(document.createElement("div"));
    this.container.style.width = "100%";
    this.container.style.height = "100%";
    this.container.style.display = "flex";
    this.container.style.justifyContent = "center";
    this.container.style.alignItems = "center";

    // SVG領域作成
    this.svg = d3.select(this.container).append("svg");

    // フィルター定義（発光効果）
    const defs = this.svg.append("defs");
    const filter = defs.append("filter").attr("id", "kpi-glow");
    filter.append("feGaussianBlur").attr("stdDeviation", "4").attr("result", "coloredBlur");
    const feMerge = filter.append("feMerge");
    feMerge.append("feMergeNode").attr("in", "coloredBlur");
    feMerge.append("feMergeNode").attr("in", "SourceGraphic");

    // 背景のグリッドパターン定義
    const pattern = defs.append("pattern")
      .attr("id", "grid-pattern")
      .attr("width", 20)
      .attr("height", 20)
      .attr("patternUnits", "userSpaceOnUse");
    pattern.append("path")
      .attr("d", "M 20 0 L 0 0 0 20")
      .attr("fill", "none")
      .attr("stroke", "rgba(255, 255, 255, 0.05)")
      .attr("stroke-width", 1);
  },

  // --- 3. 描画処理 ---
  updateAsync: function(data, element, config, queryResponse, details, done) {
    this.clearErrors();

    // エラーハンドリング
    if (typeof d3 === "undefined") {
      this.container.innerHTML = '<div style="color:#00ffff;">Loading...</div>';
      done(); return;
    }
    if (queryResponse.fields.measures.length === 0) {
      this.addError({ title: "データ不足", message: "メジャーを少なくとも1つ選択してください。" });
      return;
    }

    // --- 設定値の取得 ---
    const mainColor = config.mainColor || "#00ffff";
    const glow = config.glowStrength || 10;
    const labelText = config.labelOverride || queryResponse.fields.measures[0].label_short || queryResponse.fields.measures[0].label;

    // ▼▼▼ 追加: フォント選択ロジック ▼▼▼
    const fontMode = config.fontStyle || "zen";
    // はんなり明朝が選ばれたら明朝体、それ以外（デフォルト）はZen Dots
    const currentFontFamily = (fontMode === "hannari")
      ? "'Hannari Mincho', 'Hiragino Mincho ProN', serif"
      : "'Zen Dots', 'Courier New', monospace";

    // コンテナ自体のフォントも更新
    element.style.fontFamily = currentFontFamily;


    // データ取得
    const mainMeasureName = queryResponse.fields.measures[0].name;
    const mainValueRaw = data[0][mainMeasureName].value;
    const mainValueFormatted = LookerCharts.Utils.textForCell(data[0][mainMeasureName]);

    let subValueText = "";
    if (queryResponse.fields.measures.length > 1) {
      const subMeasureName = queryResponse.fields.measures[1].name;
      const subLabel = config.subLabelOverride || queryResponse.fields.measures[1].label_short || "Secondary";
      const subVal = LookerCharts.Utils.textForCell(data[0][subMeasureName]);
      subValueText = `${subLabel}: ${subVal}`;
    }

    // SVGサイズ更新
    const width = element.clientWidth;
    const height = element.clientHeight;
    this.svg.attr("width", width).attr("height", height);

    // フィルター更新
    this.svg.select("#kpi-glow feGaussianBlur").attr("stdDeviation", glow / 2);

    // 描画クリア
    this.svg.selectAll(".content").remove();
    const g = this.svg.append("g").attr("class", "content");

    // --- 背景デザイン ---
    g.append("rect")
      .attr("width", width)
      .attr("height", height)
      .attr("fill", "url(#grid-pattern)");

    // HUDフレーム
    const bracketSize = 15;
    const padding = 10;
    const strokeWidth = 2;
    const w = width - padding * 2;
    const h = height - padding * 2;
    const x = padding;
    const y = padding;

    // 四隅の描画
    g.append("path").attr("d", `M ${x} ${y+bracketSize} L ${x} ${y} L ${x+bracketSize} ${y}`)
      .attr("stroke", mainColor).attr("stroke-width", strokeWidth).attr("fill", "none").style("filter", "url(#kpi-glow)");
    g.append("path").attr("d", `M ${width-x-bracketSize} ${y} L ${width-x} ${y} L ${width-x} ${y+bracketSize}`)
      .attr("stroke", mainColor).attr("stroke-width", strokeWidth).attr("fill", "none").style("filter", "url(#kpi-glow)");
    g.append("path").attr("d", `M ${width-x} ${height-y-bracketSize} L ${width-x} ${height-y} L ${width-x-bracketSize} ${height-y}`)
      .attr("stroke", mainColor).attr("stroke-width", strokeWidth).attr("fill", "none").style("filter", "url(#kpi-glow)");
    g.append("path").attr("d", `M ${x+bracketSize} ${height-y} L ${x} ${height-y} L ${x} ${height-y-bracketSize}`)
      .attr("stroke", mainColor).attr("stroke-width", strokeWidth).attr("fill", "none").style("filter", "url(#kpi-glow)");

    // 装飾ライン
    g.append("line")
      .attr("x1", width * 0.3).attr("y1", padding)
      .attr("x2", width * 0.7).attr("y2", padding)
      .attr("stroke", mainColor).attr("stroke-width", 1).attr("opacity", 0.3);
    g.append("line")
      .attr("x1", width * 0.3).attr("y1", height - padding)
      .attr("x2", width * 0.7).attr("y2", height - padding)
      .attr("stroke", mainColor).attr("stroke-width", 1).attr("opacity", 0.3);


    // --- テキスト描画 ---

    // 1. ラベル（上部）
    g.append("text")
      .attr("x", width / 2)
      .attr("y", height * 0.3)
      .attr("text-anchor", "middle")
      .style("fill", mainColor)
      .style("font-size", "14px")
      .style("letter-spacing", "2px")
      .style("text-transform", "uppercase")
      .style("opacity", 0.8)
      // ▼▼▼ 変更: 変数化したフォントを適用 ▼▼▼
      .style("font-family", currentFontFamily)
      .style("filter", "url(#kpi-glow)")
      .text(labelText);

    // 2. メイン数値（中央）
    const textObj = g.append("text")
      .attr("x", width / 2)
      .attr("y", height * 0.6)
      .attr("text-anchor", "middle")
      .attr("dy", "0.2em")
      .style("fill", "#ffffff")
      .style("font-size", Math.min(width, height) * 0.25 + "px")
      .style("font-weight", "bold")
      // ▼▼▼ 変更: 変数化したフォントを適用 ▼▼▼
      .style("font-family", currentFontFamily)
      .style("filter", "url(#kpi-glow)")
      .text(0);

    // 数値のアニメーション
    textObj.transition()
      .duration(1000)
      .tween("text", function() {
        const that = d3.select(this);
        const i = d3.interpolateNumber(0, mainValueRaw);
        return function(t) {
          if (t === 1) {
             that.text(mainValueFormatted);
          } else {
             const val = i(t);
             that.text(Math.floor(val).toLocaleString());
          }
        };
      });

    // 3. サブ情報（下部）
    if (subValueText) {
      g.append("text")
        .attr("x", width / 2)
        .attr("y", height * 0.85)
        .attr("text-anchor", "middle")
        .style("fill", "#cccccc")
        .style("font-size", "12px")
        .style("letter-spacing", "1px")
        // ▼▼▼ 変更: 変数化したフォントを適用 ▼▼▼
        .style("font-family", currentFontFamily)
        .text(subValueText);
    }

    done();
  }
});
