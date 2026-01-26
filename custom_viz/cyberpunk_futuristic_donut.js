/**
 * Futuristic Donut Chart Visualization v13
 * (Added Hover Effect: Enlarge & Glow Labels)
 */

looker.plugins.visualizations.add({
  // --- 1. 設定項目 ---
  options: {
    // --- デザイン設定 ---
    backgroundColor: {
      type: "string",
      label: "背景色",
      default: "#2a1a4a",
      display: "color",
      section: "Style",
      order: 1
    },
    showLegend: {
      type: "boolean",
      label: "凡例リストを表示",
      default: true,
      section: "Style",
      order: 2
    },
    showLeaderLines: {
      type: "boolean",
      label: "引出線ラベルを表示",
      default: true,
      section: "Style",
      order: 3
    },
    leaderLineColor: {
      type: "string",
      label: "引出線の色",
      default: "#ffffff",
      display: "color",
      section: "Style",
      order: 4
    },
    ringWidth: {
      type: "number",
      label: "メインリングの太さ",
      default: 30,
      min: 10,
      max: 100,
      section: "Style",
      order: 5
    },
    glowStrength: {
      type: "number",
      label: "ネオン光の強さ",
      default: 15,
      min: 0,
      max: 30,
      section: "Style",
      order: 6
    },
    centerLabelText: {
      type: "string",
      label: "中央ラベル",
      default: "TOTAL",
      section: "Style",
      order: 7
    },

    // --- 凡例 (Legend) 設定 ---
    scrollbarColor: {
      type: "string",
      label: "スクロールバーの色",
      default: "#00ffff",
      display: "color",
      section: "Legend",
      order: 1
    },
    scrollbarOpacity: {
      type: "number",
      label: "スクロールバーの不透明度",
      default: 0.8,
      min: 0.1,
      max: 1.0,
      step: 0.1,
      section: "Legend",
      order: 2
    },

    // --- カラー設定 ---
    ringColor1: {
      type: "string",
      label: "外周リング1の色 (Measure 2)",
      default: "#00ffff",
      display: "color",
      section: "Ring Colors"
    },
    ringColor2: {
      type: "string",
      label: "外周リング2の色 (Measure 3)",
      default: "#d100d1",
      display: "color",
      section: "Ring Colors"
    },
    ringColor3: {
      type: "string",
      label: "内周リング1の色 (Measure 4)",
      default: "#a0a0b0",
      display: "color",
      section: "Ring Colors"
    },
    ringColor4: {
      type: "string",
      label: "内周リング2の色 (Measure 5)",
      default: "#00ff99",
      display: "color",
      section: "Ring Colors"
    }
  },

  // --- 2. 初期化処理 ---
  create: function(element, config) {
    element.style.fontFamily = "'Courier New', Courier, monospace";
    element.style.backgroundColor = config.backgroundColor || "#2a1a4a";
    element.style.color = "#ffffff";
    element.style.overflow = "hidden";
    element.style.height = "100%";
    element.style.borderRadius = "8px";
    element.innerHTML = "";

    this.wrapper = element.appendChild(document.createElement("div"));
    this.wrapper.style.display = "flex";
    this.wrapper.style.width = "100%";
    this.wrapper.style.height = "100%";
    this.wrapper.style.alignItems = "center";
    this.wrapper.style.justifyContent = "center";

    // グラフエリア
    this.chartContainer = this.wrapper.appendChild(document.createElement("div"));
    this.chartContainer.style.flexGrow = "1";
    this.chartContainer.style.height = "100%";
    this.chartContainer.style.position = "relative";
    this.chartContainer.style.overflow = "hidden";

    // 凡例エリア
    this.legendContainer = this.wrapper.appendChild(document.createElement("div"));
    this.legendContainer.style.width = "220px";
    this.legendContainer.style.height = "90%";
    this.legendContainer.style.marginRight = "10px";
    this.legendContainer.style.padding = "10px";
    this.legendContainer.style.overflowY = "auto";
    this.legendContainer.style.backgroundColor = "rgba(0, 0, 0, 0.4)";
    this.legendContainer.style.border = "1px solid rgba(0, 255, 255, 0.3)";
    this.legendContainer.style.boxShadow = "0 0 10px rgba(0, 255, 255, 0.1), inset 0 0 20px rgba(0, 0, 0, 0.8)";
    this.legendContainer.style.borderRadius = "4px";
    this.legendContainer.style.display = "none";

    // スタイルタグ
    this.styleTag = document.createElement("style");
    this.styleTag.id = "cyber-scrollbar-style";
    document.head.appendChild(this.styleTag);

    this.svg = d3.select(this.chartContainer).append("svg");

    // フィルター
    const defs = this.svg.append("defs");
    const filter = defs.append("filter").attr("id", "futuristic-glow");
    filter.append("feGaussianBlur").attr("stdDeviation", "4").attr("result", "coloredBlur");
    const feMerge = filter.append("feMerge");
    feMerge.append("feMergeNode").attr("in", "coloredBlur");
    feMerge.append("feMergeNode").attr("in", "SourceGraphic");

    this.mainGroup = this.svg.append("g");

    this.tooltip = d3.select(element).append("div")
      .style("position", "absolute")
      .style("visibility", "hidden")
      .style("background-color", "rgba(40, 20, 60, 0.95)")
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
      this.chartContainer.innerHTML = '<div style="padding:20px; color:#00ffff;">Loading...</div>';
      done(); return;
    }
    if (queryResponse.fields.dimensions.length === 0 || queryResponse.fields.measures.length === 0) {
      this.addError({ title: "データ不足", message: "ディメンションとメジャーを選択してください。" });
      return;
    }

    // --- 設定値取得 ---
    const bgColor = config.backgroundColor || "#2a1a4a";
    element.style.backgroundColor = bgColor;
    const showLegend = config.showLegend !== false;
    this.legendContainer.style.display = showLegend ? "block" : "none";
    const showLeaderLines = config.showLeaderLines !== false;
    const leaderLineColor = config.leaderLineColor || "#ffffff";

    const scrollColor = config.scrollbarColor || "#00ffff";
    const scrollOpacity = config.scrollbarOpacity != null ? config.scrollbarOpacity : 0.8;

    const hexToRgba = (hex, alpha) => {
      let r = 0, g = 0, b = 0;
      if (hex.length === 4) {
        r = parseInt(hex[1] + hex[1], 16);
        g = parseInt(hex[2] + hex[2], 16);
        b = parseInt(hex[3] + hex[3], 16);
      } else if (hex.length === 7) {
        r = parseInt(hex.substring(1, 3), 16);
        g = parseInt(hex.substring(3, 5), 16);
        b = parseInt(hex.substring(5, 7), 16);
      }
      return `rgba(${r},${g},${b},${alpha})`;
    };
    const thumbColor = hexToRgba(scrollColor, scrollOpacity);

    this.styleTag.innerHTML = `
      ::-webkit-scrollbar { width: 6px; }
      ::-webkit-scrollbar-track { background: rgba(0,0,0,0.2); }
      ::-webkit-scrollbar-thumb { background: ${thumbColor}; border-radius: 3px; box-shadow: 0 0 5px ${thumbColor}; }
      .legend-item:hover { background: rgba(255, 255, 255, 0.1); cursor: pointer; }
    `;

    // --- サイズ計算 ---
    const width = this.chartContainer.clientWidth;
    const height = this.chartContainer.clientHeight;
    const margin = showLeaderLines ? 80 : 40;
    const radius = Math.min(width, height) / 2 - margin;

    this.svg.attr("width", width).attr("height", height);
    this.mainGroup.attr("transform", `translate(${width / 2}, ${height / 2})`);

    const glow = config.glowStrength || 15;
    this.svg.select("#futuristic-glow feGaussianBlur").attr("stdDeviation", glow / 3);

    // --- データ処理 ---
    const dimension = queryResponse.fields.dimensions[0];
    const measures = queryResponse.fields.measures;
    const measureTotals = measures.map(m => d3.sum(data, d => d[m.name].value));

    const pieColors = ["#d100d1", "#ff00ff", "#ffffff", "#00ffff", "#8a2be2", "#4b0082", "#00ced1", "#ff1493"];
    const colorScale = d3.scaleOrdinal(pieColors);

    // --- 凡例描画 ---
    if (showLegend) {
      this.legendContainer.innerHTML = "";
      const totalValue = measureTotals[0];

      data.forEach((d, i) => {
        const dimVal = LookerCharts.Utils.textForCell(d[dimension.name]);
        const measVal = d[measures[0].name].value;
        const formattedMeas = LookerCharts.Utils.textForCell(d[measures[0].name]);
        const color = colorScale(i);
        const percent = (measVal / totalValue * 100).toFixed(1) + "%";

        const item = document.createElement("div");
        item.className = "legend-item";
        item.style.display = "flex";
        item.style.alignItems = "center";
        item.style.marginBottom = "8px";
        item.style.padding = "4px";
        item.style.fontSize = "11px";
        item.style.color = "#ccc";
        item.style.borderLeft = "2px solid transparent";
        item.style.transition = "all 0.2s";

        const marker = document.createElement("div");
        marker.style.width = "10px";
        marker.style.height = "10px";
        marker.style.backgroundColor = color;
        marker.style.marginRight = "8px";
        marker.style.boxShadow = `0 0 5px ${color}`;

        const textDiv = document.createElement("div");
        textDiv.style.flexGrow = "1";
        textDiv.innerHTML = `<span style="color:#fff; font-weight:bold;">${dimVal}</span>`;

        const valDiv = document.createElement("div");
        valDiv.style.textAlign = "right";
        valDiv.innerHTML = `<div style="color:${color}">${percent}</div><div style="font-size:9px; opacity:0.7;">${formattedMeas}</div>`;

        item.appendChild(marker);
        item.appendChild(textDiv);
        item.appendChild(valDiv);

        // --- 凡例ホバー時のインタラクション ---
        item.onmouseenter = () => {
          item.style.borderLeft = `2px solid ${color}`;
          // 円グラフのハイライト
          this.mainGroup.selectAll(".data-arc path").style("opacity", 0.3);
          this.mainGroup.select(`#arc-path-${i}`).style("opacity", 1).style("filter", "url(#futuristic-glow)").attr("stroke", "#fff").attr("stroke-width", 2);

          // 引出線テキストの拡大
          if (showLeaderLines) {
            d3.select(`#leader-text-${i}`)
              .transition().duration(200)
              .style("font-size", "13px")
              .style("fill", "#fff")
              .style("text-shadow", `0 0 10px ${color}`);
          }
        };

        item.onmouseleave = () => {
          item.style.borderLeft = "2px solid transparent";
          // 円グラフ復帰
          this.mainGroup.selectAll(".data-arc path").style("opacity", 1).style("filter", "url(#futuristic-glow)").attr("stroke", "none");

          // 引出線テキスト復帰
          if (showLeaderLines) {
            d3.select(`#leader-text-${i}`)
              .transition().duration(200)
              .style("font-size", "10px")
              .style("fill", leaderLineColor)
              .style("text-shadow", "none");
          }
        };

        this.legendContainer.appendChild(item);
      });
    }

    // --- グラフ描画 ---
    this.mainGroup.selectAll("*").remove();
    this.svg.select("#path-defs").remove();
    const pathDefs = this.svg.append("defs").attr("id", "path-defs");

    const graphicsLayer = this.mainGroup.append("g");
    const textLayer = this.mainGroup.append("g");
    const leaderLineLayer = this.mainGroup.append("g");

    const mainRingWidth = config.ringWidth || 30;
    const mainInnerRadius = radius - mainRingWidth;

    const ringRadii = [
      { r: radius + 10 },
      { r: radius + 22 },
      { r: mainInnerRadius - 15 },
      { r: mainInnerRadius - 25 }
    ];

    const pie = d3.pie().value(d => d[measures[0].name].value).sort(null).padAngle(0.02);
    const mainArc = d3.arc().innerRadius(mainInnerRadius).outerRadius(radius);
    const mainArcHover = d3.arc().innerRadius(mainInnerRadius - 5).outerRadius(radius + 5);

    const arcs = graphicsLayer.selectAll(".data-arc")
      .data(pie(data))
      .enter().append("g").attr("class", "data-arc");

    arcs.append("path")
      .attr("id", (d, i) => `arc-path-${i}`)
      .attr("d", mainArc)
      .attr("fill", (d, i) => colorScale(i))
      .style("filter", "url(#futuristic-glow)")
      .transition().duration(1000)
      .attrTween("d", d => {
        const i = d3.interpolate(d.startAngle + 0.1, d.endAngle);
        return t => { d.endAngle = i(t); return mainArc(d); };
      });

    // --- 装飾リング描画（省略なし） ---
    const ringColors = [
      config.ringColor1 || "#00ffff", config.ringColor2 || "#d100d1",
      config.ringColor3 || "#a0a0b0", config.ringColor4 || "#00ff99"
    ];
    const maxVal = (measureTotals.length > 1) ? d3.max(measureTotals.slice(1)) : 1;

    ringRadii.forEach((layout, i) => {
      const measureIndex = i + 1;
      if (measures.length > measureIndex) {
        const value = measureTotals[measureIndex];
        const color = ringColors[i];
        const labelText = measures[measureIndex].label_short || measures[measureIndex].label;
        const ratio = maxVal > 0 ? (value / maxVal) : 0;
        const startAngle = 0;
        const endAngle = startAngle + (Math.PI * 2 * ratio);

        graphicsLayer.append("path")
          .attr("d", d3.arc().innerRadius(layout.r).outerRadius(layout.r + 2).startAngle(0).endAngle(Math.PI * 2))
          .attr("fill", color).style("opacity", 0.15);

        const barArc = d3.arc().innerRadius(layout.r).outerRadius(layout.r + 4).startAngle(startAngle);
        graphicsLayer.append("path")
          .datum({ endAngle: startAngle })
          .attr("fill", color)
          .style("filter", "url(#futuristic-glow)").style("opacity", 0.9)
          .transition().duration(1200).ease(d3.easeCubicOut)
          .attrTween("d", function(d) {
            const interpolate = d3.interpolate(startAngle, endAngle);
            return function(t) { d.endAngle = interpolate(t); return barArc(d); };
          });

        // Ring Label
        const textRadius = layout.r + 5;
        const pathId = `label-curve-${i}`;
        pathDefs.append("path").attr("id", pathId).attr("d", d3.arc().innerRadius(textRadius).outerRadius(textRadius).startAngle(0).endAngle(Math.PI * 1.5)());
        const textEl = textLayer.append("text").style("fill", color).style("font-size", "10px").style("font-weight", "bold").style("letter-spacing", "1px").style("filter", "url(#futuristic-glow)").style("opacity", 0).attr("dy", "-0.3em");
        textEl.append("textPath").attr("href", `#${pathId}`).attr("startOffset", "0%").attr("text-anchor", "start").text(`${labelText}: ${value.toLocaleString()}`);
        textEl.transition().delay(500).duration(1000).style("opacity", 1);
      }
    });

    // --- 引出線 (Leader Lines) ---
    if (showLeaderLines) {
      const lineTotal = measureTotals[0];
      const outerRadius = radius + 35;
      const labelArc = d3.arc().innerRadius(outerRadius).outerRadius(outerRadius);
      const lineData = pie(data).filter(d => (d.endAngle - d.startAngle) > 0.15);

      const lines = leaderLineLayer.selectAll(".leader-lines")
        .data(lineData)
        .enter().append("g");

      lines.append("circle")
        .attr("r", 2)
        .attr("transform", d => `translate(${mainArc.centroid(d)})`)
        .attr("fill", leaderLineColor)
        .style("filter", "url(#futuristic-glow)");

      lines.append("polyline")
        .attr("points", d => {
          const posA = mainArc.centroid(d);
          const posB = labelArc.centroid(d);
          const posC = labelArc.centroid(d);
          const midAngle = d.startAngle + (d.endAngle - d.startAngle) / 2;
          posC[0] = (outerRadius + 15) * (midAngle < Math.PI ? 1 : -1);
          return [posA, posB, posC];
        })
        .style("fill", "none").style("stroke", leaderLineColor).style("stroke-width", "1px").style("stroke-opacity", "0.6").style("stroke-dasharray", "2,2");

      lines.append("text")
        .attr("id", d => `leader-text-${d.index}`) // IDを付与して選択可能に
        .attr("transform", d => {
          const pos = labelArc.centroid(d);
          const midAngle = d.startAngle + (d.endAngle - d.startAngle) / 2;
          const x = (outerRadius + 20) * (midAngle < Math.PI ? 1 : -1);
          return `translate(${x}, ${pos[1]})`;
        })
        .attr("dy", "0.35em")
        .style("text-anchor", d => {
          const midAngle = d.startAngle + (d.endAngle - d.startAngle) / 2;
          return midAngle < Math.PI ? "start" : "end";
        })
        .style("font-size", "10px")
        .style("fill", leaderLineColor)
        .style("font-weight", "bold")
        .style("transition", "all 0.3s ease") // CSS Transitionも追加
        .each(function(d) {
           const el = d3.select(this);
           const dimText = LookerCharts.Utils.textForCell(d.data[dimension.name]);
           const val = d.data[measures[0].name].value;
           const pct = (val / lineTotal * 100).toFixed(1) + "%";
           el.append("tspan").text(dimText).attr("x", 0).attr("dy", "-0.6em");
           el.append("tspan").text(pct).attr("x", 0).attr("dy", "1.2em").style("fill", colorScale(d.index)).style("font-size", "9px");
        });
    }

    // --- ツールチップ & マウスインタラクション更新 ---
    const tooltip = d3.select(this.tooltip);
    arcs.on("mouseover", function(event, d) {
      // 1. パイの変形
      d3.select(this).select("path").transition().attr("d", mainArcHover).style("brightness", "1.3");

      // 2. ツールチップ表示
      const dimVal = LookerCharts.Utils.textForCell(d.data[dimension.name]);
      const measVal = LookerCharts.Utils.textForCell(d.data[measures[0].name]);
      const color = d3.select(this).select("path").attr("fill");
      tooltip.style("visibility", "visible").style("border-color", color).style("box-shadow", `0 0 15px ${color}`)
        .html(`<div style="font-weight:bold; color:${color};">${dimVal}</div><div style="color:#fff;">${measVal}</div>`);

      // 3. 引出線テキストの拡大 & 発光
      if (showLeaderLines) {
        d3.select(`#leader-text-${d.index}`)
          .transition().duration(200)
          .style("font-size", "13px") // 拡大
          .style("fill", "#fff")
          .style("text-shadow", `0 0 10px ${color}`); // ネオン発光
      }

    }).on("mousemove", e => tooltip.style("top", (e.pageY-15)+"px").style("left", (e.pageX+15)+"px"))
      .on("mouseout", function(event, d) {
      // 1. パイ復帰
      d3.select(this).select("path").transition().attr("d", mainArc).style("brightness", "1.0");
      tooltip.style("visibility", "hidden");

      // 2. 引出線テキスト復帰
      if (showLeaderLines) {
        d3.select(`#leader-text-${d.index}`)
          .transition().duration(200)
          .style("font-size", "10px") // 元に戻す
          .style("fill", leaderLineColor)
          .style("text-shadow", "none");
      }
    });

    const centerLabel = config.centerLabelText || "TOTAL";
    textLayer.append("text").attr("text-anchor","middle").attr("dy","-1.2em")
      .style("fill","#00ffff").style("font-size","14px").style("letter-spacing","2px").style("filter","url(#futuristic-glow)").text(centerLabel);
    textLayer.append("text").attr("text-anchor","middle").attr("dy","0.5em")
      .style("fill","#ffffff").style("font-size","24px").style("font-weight","bold").style("filter","url(#futuristic-glow)")
      .text(measureTotals[0].toLocaleString());

    done();
  }
});
