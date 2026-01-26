/**
 * Cyberpunk Bar Chart Visualization v5 (Date Enhanced)
 * Features:
 * - Neon Glow Effects
 * - Japanese Date Formatting (Month on axis, Year on change)
 * - Vertical Year Separators
 */

looker.plugins.visualizations.add({
  // --- 1. 設定項目 (Options) ---
  options: {
    // --- タイトル設定 ---
    chartTitle: {
      type: "string",
      label: "チャートタイトル",
      default: "SYSTEM_STATUS",
      placeholder: "タイトルを入力",
      section: "Title",
      order: 1
    },
    titleColor: {
      type: "string",
      label: "タイトル文字色 (発光色)",
      default: "#00ffff",
      display: "color",
      section: "Title",
      order: 2
    },
    titleSize: {
      type: "number",
      label: "タイトルサイズ(px)",
      default: 24,
      min: 10,
      max: 50,
      section: "Title",
      order: 3
    },

    // --- バー（グラフ）設定 ---
    barColorStart: {
      type: "string",
      label: "バーの色 (上部/開始)",
      default: "#7F00FF",
      display: "color",
      section: "Bar Style",
      order: 1
    },
    barColorEnd: {
      type: "string",
      label: "バーの色 (下部/終了)",
      default: "#E100FF",
      display: "color",
      section: "Bar Style",
      order: 2
    },
    glowStrength: {
      type: "number",
      label: "バーの光の強さ",
      default: 15,
      min: 0,
      max: 50,
      section: "Bar Style",
      order: 3
    },

    // --- 軸（Axis）設定 ---
    axisColor: {
      type: "string",
      label: "軸ラベルの色 (発光色)",
      default: "#00ffff",
      display: "color",
      section: "Axis",
      order: 1
    },
    axisFontSize: {
      type: "number",
      label: "軸フォントサイズ",
      default: 12,
      min: 8,
      max: 20,
      section: "Axis",
      order: 2
    },
    showGrid: {
      type: "boolean",
      label: "グリッド線を表示",
      default: true,
      section: "Axis",
      order: 3
    }
  },

  // --- 2. 初期化処理 ---
  create: function(element, config) {
    element.innerHTML = "";

    // コンテナスタイル
    element.style.fontFamily = "'Courier New', Courier, monospace";
    element.style.backgroundColor = "#161925";
    element.style.color = "#94A3B8";
    element.style.overflow = "hidden";
    element.style.height = "100%";
    element.style.borderRadius = "8px";

    // SVG領域
    this.svg = d3.select(element).append("svg");

    // ツールチップ
    this.tooltip = d3.select(element).append("div")
      .style("position", "absolute")
      .style("visibility", "hidden")
      .style("background-color", "rgba(31, 35, 54, 0.95)")
      .style("border", "1px solid #ffffff")
      .style("border-radius", "4px")
      .style("padding", "8px")
      .style("color", "#fff")
      .style("font-size", "12px")
      .style("box-shadow", "0 0 15px rgba(255, 255, 255, 0.5)")
      .style("pointer-events", "none")
      .style("z-index", "10");
  },

  // --- 3. 描画処理 ---
  updateAsync: function(data, element, config, queryResponse, details, done) {
    this.clearErrors();

    if (typeof d3 === "undefined") {
      element.innerHTML = '<div style="padding:20px; color:#7F00FF;">Loading...</div>';
      done(); return;
    }

    if (queryResponse.fields.dimensions.length === 0 || queryResponse.fields.measures.length === 0) {
      this.addError({ title: "データ不足", message: "ディメンションとメジャーを選択してください。" });
      return;
    }

    // --- 設定値の取得 ---
    const titleText = config.chartTitle || "";
    const titleColor = config.titleColor || "#00ffff";
    const titleSize = config.titleSize || 24;

    const startColor = config.barColorStart || "#7F00FF";
    const endColor = config.barColorEnd || "#E100FF";
    const glow = config.glowStrength != null ? config.glowStrength : 15;

    const axisColor = config.axisColor || "#00ffff";
    const axisFontSize = config.axisFontSize || 12;
    const showGrid = config.showGrid != null ? config.showGrid : true;

    // --- 描画領域計算 ---
    // 年を表示するために下部のマージンを少し増やします (60 -> 80)
    const titleMargin = titleText ? (titleSize * 2) + 20 : 30;
    const margin = { top: titleMargin, right: 30, bottom: 80, left: 70 };
    const width = element.clientWidth - margin.left - margin.right;
    const height = element.clientHeight - margin.top - margin.bottom;

    const svg = this.svg.attr("width", element.clientWidth).attr("height", element.clientHeight);
    svg.selectAll("*").remove();

    // --- フィルター定義 ---
    const defs = svg.append("defs");
    const barFilter = defs.append("filter").attr("id", "bar-neon-glow");
    barFilter.append("feGaussianBlur").attr("stdDeviation", glow / 2.5).attr("result", "coloredBlur");
    const barFeMerge = barFilter.append("feMerge");
    barFeMerge.append("feMergeNode").attr("in", "coloredBlur");
    barFeMerge.append("feMergeNode").attr("in", "SourceGraphic");

    const textFilter = defs.append("filter").attr("id", "text-neon-glow")
      .attr("x", "-50%").attr("y", "-50%").attr("width", "200%").attr("height", "200%");
    textFilter.append("feGaussianBlur").attr("in", "SourceGraphic").attr("stdDeviation", "5").attr("result", "blur1");
    textFilter.append("feGaussianBlur").attr("in", "SourceGraphic").attr("stdDeviation", "2").attr("result", "blur2");
    const textFeMerge = textFilter.append("feMerge");
    textFeMerge.append("feMergeNode").attr("in", "blur1");
    textFeMerge.append("feMergeNode").attr("in", "blur2");
    textFeMerge.append("feMergeNode").attr("in", "SourceGraphic");

    const gradient = defs.append("linearGradient").attr("id", "bar-gradient")
      .attr("x1", "0%").attr("y1", "0%").attr("x2", "0%").attr("y2", "100%");
    gradient.append("stop").attr("offset", "0%").attr("stop-color", startColor);
    gradient.append("stop").attr("offset", "100%").attr("stop-color", endColor);

    // --- タイトル描画 ---
    if (titleText) {
      svg.append("rect")
          .attr("x", 20).attr("y", 20)
          .attr("width", 5).attr("height", titleSize + 8)
          .attr("fill", titleColor)
          .style("filter", "url(#text-neon-glow)");

      svg.append("text")
          .attr("x", 35).attr("y", 20 + titleSize)
          .text(titleText)
          .attr("fill", titleColor)
          .style("font-family", "'Courier New', monospace")
          .style("font-size", `${titleSize}px`)
          .style("font-weight", "bold")
          .style("letter-spacing", "4px")
          .style("text-transform", "uppercase")
          .style("filter", "url(#text-neon-glow)");
    }

    // --- チャート描画 ---
    const chart = svg.append("g").attr("transform", `translate(${margin.left}, ${margin.top})`);
    const dimension = queryResponse.fields.dimensions[0];
    const measure = queryResponse.fields.measures[0];

    const x = d3.scaleBand().range([0, width]).padding(0.3).domain(data.map(d => d[dimension.name].value));
    const y = d3.scaleLinear().range([height, 0]).domain([0, d3.max(data, d => d[measure.name].value) * 1.1]);

    // --- X軸の描画 (カスタマイズ) ---
    // 日付パース用のヘルパー
    const parseDateSafe = (val) => {
      const d = new Date(val);
      return isNaN(d.getTime()) ? null : d;
    };

    const xAxis = chart.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x).tickFormat(d => {
        // ラベルを「◯月」にする
        const date = parseDateSafe(d);
        if (!date) return d; // パースできない場合はそのまま表示
        return (date.getMonth() + 1) + "月";
      }));

    xAxis.selectAll("path, line").attr("stroke", axisColor).attr("opacity", 0.6).style("filter", "url(#text-neon-glow)");
    xAxis.selectAll("text")
      .style("fill", axisColor)
      .style("font-size", `${axisFontSize}px`)
      .style("font-family", "'Courier New', monospace")
      .style("font-weight", "bold")
      .style("filter", "url(#text-neon-glow)");

    // --- 年の表示と区切り線 (ここを追加) ---
    let prevYear = null;
    const bandStep = x.step(); // バーごとの間隔
    const bandPadding = bandStep - x.bandwidth(); // パディングの合計幅

    data.forEach((d, i) => {
      const val = d[dimension.name].value;
      const date = parseDateSafe(val);
      if (!date) return;

      const year = date.getFullYear();

      // 年が変わったタイミング、または最初のデータのときに処理
      if (prevYear !== null && year !== prevYear) {
        // --- 縦線 (区切り線) ---
        // バーの左端(x(val)) から、パディングの半分戻った位置を区切りとする
        const lineX = x(val) - (bandPadding / 2);

        chart.append("line")
          .attr("x1", lineX).attr("x2", lineX)
          .attr("y1", 0).attr("y2", height + 40) // 軸より少し下まで伸ばす
          .attr("stroke", axisColor)
          .attr("stroke-width", 1)
          .attr("stroke-dasharray", "4,3") // 破線
          .attr("opacity", 0.5)
          .style("filter", "url(#text-neon-glow)");

        // --- 年ラベル (区切り箇所に表示) ---
        chart.append("text")
          .attr("x", x(val)) // その年の最初の月の下に表示
          .attr("y", height + 45) // 月ラベルの下
          .text(year + "年")
          .attr("fill", axisColor)
          .style("font-family", "'Courier New', monospace")
          .style("font-size", `${axisFontSize + 2}px`)
          .style("font-weight", "bold")
          .style("text-anchor", "middle") // 中央揃え
          // 少し右（バーの中央）に寄せる
          .attr("transform", `translate(${x.bandwidth()/2}, 0)`)
          .style("filter", "url(#text-neon-glow)");

      } else if (i === 0) {
        // --- 最初のデータの年表示 ---
        chart.append("text")
          .attr("x", x(val))
          .attr("y", height + 45)
          .text(year + "年")
          .attr("fill", axisColor)
          .style("font-family", "'Courier New', monospace")
          .style("font-size", `${axisFontSize + 2}px`)
          .style("font-weight", "bold")
          .style("text-anchor", "middle")
          .attr("transform", `translate(${x.bandwidth()/2}, 0)`)
          .style("filter", "url(#text-neon-glow)");
      }

      prevYear = year;
    });


    // --- Y軸 ---
    const yAxis = chart.append("g").call(d3.axisLeft(y).ticks(5).tickSize(showGrid ? -width : 6));
    yAxis.select(".domain").remove();
    yAxis.selectAll(".tick line")
      .attr("stroke", showGrid ? "#2d3748" : axisColor)
      .attr("stroke-dasharray", showGrid ? "2,2" : "0")
      .attr("opacity", showGrid ? 0.4 : 0.8)
      .style("filter", showGrid ? "none" : "url(#text-neon-glow)");

    yAxis.selectAll("text")
      .style("fill", axisColor)
      .style("font-size", `${axisFontSize}px`)
      .style("font-family", "'Courier New', monospace")
      .style("font-weight", "bold")
      .style("filter", "url(#text-neon-glow)");

    // --- バー描画 ---
    const bars = chart.selectAll(".bar").data(data).enter().append("rect")
      .attr("class", "bar")
      .attr("x", d => x(d[dimension.name].value)).attr("width", x.bandwidth())
      .attr("fill", "url(#bar-gradient)").attr("y", height).attr("height", 0)
      .style("filter", "url(#bar-neon-glow)");

    bars.transition().duration(800).ease(d3.easeCubicOut)
      .attr("y", d => y(d[measure.name].value)).attr("height", d => height - y(d[measure.name].value));

    // --- イベント処理 ---
    const tooltipDiv = this.tooltip;
    bars.on("click", (event, d) => {
      if (!details.crossfilterEnabled) return;
      LookerCharts.Utils.toggleCrossfilter({ row: d, event: event });
    });
    bars.on("mouseover", (event, d) => {
      d3.select(event.currentTarget).style("filter", "url(#bar-neon-glow) brightness(1.3)");

      // ツールチップ内の日付表記も見やすく修正
      const dVal = parseDateSafe(d[dimension.name].value);
      const label = dVal ? `${dVal.getFullYear()}年${dVal.getMonth()+1}月` : LookerCharts.Utils.textForCell(d[dimension.name]);

      tooltipDiv.style("visibility", "visible").style("border-color", startColor).style("box-shadow", `0 0 15px ${startColor}`)
        .html(`<div style="font-weight:bold; color:${axisColor}">${label}</div><div style="color:${endColor}; font-size:14px; font-weight:bold;">${LookerCharts.Utils.textForCell(d[measure.name])}</div>`);
    }).on("mousemove", event => tooltipDiv.style("top", (event.pageY-15)+"px").style("left", (event.pageX+15)+"px"))
      .on("mouseout", event => {
        d3.select(event.currentTarget).style("filter", "url(#bar-neon-glow)");
        tooltipDiv.style("visibility", "hidden");
      });
    bars.style("opacity", d => details.crossfilterEnabled && LookerCharts.Utils.getCrossfilterSelection(d, queryResponse.fields.dimensions) === 2 ? 0.2 : 1);

    done();
  }
});
