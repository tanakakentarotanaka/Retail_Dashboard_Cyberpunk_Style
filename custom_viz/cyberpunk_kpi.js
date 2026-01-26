looker.plugins.visualizations.add({
  // --- 1. 設定項目 ---
  options: {
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
    // --- ラベル設定 ---
    labelFontSize: {
      type: "number",
      label: "ラベル: サイズ (px)",
      default: 14,
      section: "Style"
    },
    labelBold: {
      type: "boolean",
      label: "ラベル: 太字にする",
      default: false,
      section: "Style"
    },
    // --- メイン数値設定 ---
    mainFontSize: {
      type: "number",
      label: "数値: サイズ (0で自動)",
      default: 0,
      section: "Style"
    },
    mainBold: {
      type: "boolean",
      label: "数値: 太字にする",
      default: true,
      section: "Style"
    },
    // --- サブ情報設定 ---
    subFontSize: {
      type: "number",
      label: "サブ情報: サイズ (px)",
      default: 12,
      section: "Style"
    },
    subBold: {
      type: "boolean",
      label: "サブ情報: 太字にする",
      default: false,
      section: "Style"
    },
    // --- コンテンツ設定 ---
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

    const style = document.createElement('style');
    style.innerHTML = `
      /* 日本語用: はんなり明朝 */
      @import url('https://fonts.googleapis.com/css2?family=Hannari+Mincho&display=swap');

      /* 英語・数字用: Zen Dots */
      @font-face {
        font-family: 'Zen Dots';
        src: url('${zenDotsUrl}') format('woff2');
        font-display: swap;
      }
    `;
    element.appendChild(style);

    // 複合フォント定義
    const compositeFontFamily = "'Zen Dots', 'Hannari Mincho', 'Courier New', serif";

    element.style.fontFamily = compositeFontFamily;
    element.style.backgroundColor = "#1a1a2e";
    element.style.color = "#ffffff";
    element.style.overflow = "hidden";
    element.style.height = "100%";
    element.style.borderRadius = "8px";

    element.innerHTML = "";
    element.appendChild(style);

    this.container = element.appendChild(document.createElement("div"));
    this.container.style.width = "100%";
    this.container.style.height = "100%";
    this.container.style.display = "flex";
    this.container.style.justifyContent = "center";
    this.container.style.alignItems = "center";

    this.svg = d3.select(this.container).append("svg");

    const defs = this.svg.append("defs");
    const filter = defs.append("filter").attr("id", "kpi-glow");
    filter.append("feGaussianBlur").attr("stdDeviation", "4").attr("result", "coloredBlur");
    const feMerge = filter.append("feMerge");
    feMerge.append("feMergeNode").attr("in", "coloredBlur");
    feMerge.append("feMergeNode").attr("in", "SourceGraphic");

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

    // フォントサイズ
    const labelFontSize = config.labelFontSize || 14;
    const subFontSize = config.subFontSize || 12;

    // ▼▼▼ 太字設定の取得 (undefinedの場合はデフォルト値を使用) ▼▼▼
    const isLabelBold = (typeof config.labelBold === 'undefined') ? false : config.labelBold;
    const isMainBold = (typeof config.mainBold === 'undefined') ? true : config.mainBold;
    const isSubBold = (typeof config.subBold === 'undefined') ? false : config.subBold;

    const currentFontFamily = "'Zen Dots', 'Hannari Mincho', 'Courier New', serif";

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

    const width = element.clientWidth;
    const height = element.clientHeight;
    this.svg.attr("width", width).attr("height", height);

    // メイン数値のフォントサイズ決定
    let mainFontSizeValue;
    if (config.mainFontSize && config.mainFontSize > 0) {
      mainFontSizeValue = config.mainFontSize + "px";
    } else {
      mainFontSizeValue = Math.min(width, height) * 0.25 + "px";
    }

    this.svg.select("#kpi-glow feGaussianBlur").attr("stdDeviation", glow / 2);
    this.svg.selectAll(".content").remove();
    const g = this.svg.append("g").attr("class", "content");

    // 背景・枠線
    g.append("rect").attr("width", width).attr("height", height).attr("fill", "url(#grid-pattern)");

    const bracketSize = 15;
    const padding = 10;
    const strokeWidth = 2;
    const x = padding;
    const y = padding;

    const drawPath = (d) => g.append("path").attr("d", d).attr("stroke", mainColor).attr("stroke-width", strokeWidth).attr("fill", "none").style("filter", "url(#kpi-glow)");
    drawPath(`M ${x} ${y+bracketSize} L ${x} ${y} L ${x+bracketSize} ${y}`);
    drawPath(`M ${width-x-bracketSize} ${y} L ${width-x} ${y} L ${width-x} ${y+bracketSize}`);
    drawPath(`M ${width-x} ${height-y-bracketSize} L ${width-x} ${height-y} L ${width-x-bracketSize} ${height-y}`);
    drawPath(`M ${x+bracketSize} ${height-y} L ${x} ${height-y} L ${x} ${height-y-bracketSize}`);

    g.append("line").attr("x1", width*0.3).attr("y1", padding).attr("x2", width*0.7).attr("y2", padding).attr("stroke", mainColor).attr("opacity", 0.3);
    g.append("line").attr("x1", width*0.3).attr("y1", height-padding).attr("x2", width*0.7).attr("y2", height-padding).attr("stroke", mainColor).attr("opacity", 0.3);

    // --- テキスト描画 ---

    // 1. ラベル
    g.append("text")
      .attr("x", width / 2)
      .attr("y", height * 0.3)
      .attr("text-anchor", "middle")
      .style("fill", mainColor)
      .style("font-size", labelFontSize + "px")
      // ▼▼▼ 太字設定を適用 ▼▼▼
      .style("font-weight", isLabelBold ? "bold" : "normal")
      .style("letter-spacing", "2px")
      .style("text-transform", "uppercase")
      .style("opacity", 0.8)
      .style("font-family", currentFontFamily)
      .style("filter", "url(#kpi-glow)")
      .text(labelText);

    // 2. メイン数値
    const textObj = g.append("text")
      .attr("x", width / 2)
      .attr("y", height * 0.6)
      .attr("text-anchor", "middle")
      .attr("dy", "0.2em")
      .style("fill", "#ffffff")
      .style("font-size", mainFontSizeValue)
      // ▼▼▼ 太字設定を適用 ▼▼▼
      .style("font-weight", isMainBold ? "bold" : "normal")
      .style("font-family", currentFontFamily)
      .style("filter", "url(#kpi-glow)")
      .text(0);

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

    // 3. サブ情報
    if (subValueText) {
      g.append("text")
        .attr("x", width / 2)
        .attr("y", height * 0.85)
        .attr("text-anchor", "middle")
        .style("fill", "#cccccc")
        .style("font-size", subFontSize + "px")
        // ▼▼▼ 太字設定を適用 ▼▼▼
        .style("font-weight", isSubBold ? "bold" : "normal")
        .style("letter-spacing", "1px")
        .style("font-family", currentFontFamily)
        .text(subValueText);
    }

    done();
  }
});
