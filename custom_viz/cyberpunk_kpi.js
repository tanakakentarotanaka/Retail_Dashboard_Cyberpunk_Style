/**
 * Cyberpunk KPI Card Visualization (Zen Dots Font Version)
 * Features: HUD style layout, Neon glow, Count-up animation
 */

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
    // ▼▼▼ 追加: フォント読み込み用のStyleタグを注入 ▼▼▼
    const fontUrl = "https://cdn.jsdelivr.net/gh/tanakakentarotanaka/240322_kentarotanaka@master/zen-dots-v14-latin-regular%20(2).woff2";

    // スタイルタグを作成してフォントを定義
    const style = document.createElement('style');
    style.innerHTML = `
      @font-face {
        font-family: 'Zen Dots';
        src: url('${fontUrl}') format('woff2');
        font-display: swap;
      }
    `;
    element.appendChild(style);
    // ▲▲▲ 追加終わり ▲▲▲

    // コンテナのスタイル設定
    // ▼▼▼ 変更: フォントをZen Dotsに変更 ▼▼▼
    element.style.fontFamily = "'Zen Dots', 'Courier New', monospace";

    element.style.backgroundColor = "#1a1a2e"; // ダッシュボード共通の背景色
    element.style.color = "#ffffff";
    element.style.overflow = "hidden";
    element.style.height = "100%";
    element.style.borderRadius = "8px";
    element.innerHTML = "";

    // StyleタグがinnerHTML=""で消えないように再度追加（念の為）
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

    // 設定値
    const mainColor = config.mainColor || "#00ffff";
    const glow = config.glowStrength || 10;
    const labelText = config.labelOverride || queryResponse.fields.measures[0].label_short || queryResponse.fields.measures[0].label;

    // データ取得
    // 1つ目のメジャー：メインの数値
    const mainMeasureName = queryResponse.fields.measures[0].name;
    const mainValueRaw = data[0][mainMeasureName].value;
    const mainValueFormatted = LookerCharts.Utils.textForCell(data[0][mainMeasureName]);

    // 2つ目のメジャー（あれば）：サブ情報として表示
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

    // 1. グリッド背景
    g.append("rect")
      .attr("width", width)
      .attr("height", height)
      .attr("fill", "url(#grid-pattern)");

    // 2. HUDフレーム（四隅のブラケット）
    const bracketSize = 15;
    const padding = 10;
    const strokeWidth = 2;

    // パス生成関数
    const drawBracket = (x, y, rotate) => {
      g.append("path")
        .attr("d", `M ${x} ${y + bracketSize} L ${x} ${y} L ${x + bracketSize} ${y}`)
        .attr("fill", "none")
        .attr("stroke", mainColor)
        .attr("stroke-width", strokeWidth)
        .attr("transform", `rotate(${rotate}, ${x}, ${y})`) // 回転中心をコーナーに
        .style("filter", "url(#kpi-glow)");
    };

    // 左上 (0度), 右上 (90度), 右下 (180度), 左下 (270度)
    // 回転ロジックは単純化のため座標計算で実装
    const w = width - padding * 2;
    const h = height - padding * 2;
    const x = padding;
    const y = padding;

    // 左上
    g.append("path").attr("d", `M ${x} ${y+bracketSize} L ${x} ${y} L ${x+bracketSize} ${y}`)
      .attr("stroke", mainColor).attr("stroke-width", strokeWidth).attr("fill", "none").style("filter", "url(#kpi-glow)");
    // 右上
    g.append("path").attr("d", `M ${width-x-bracketSize} ${y} L ${width-x} ${y} L ${width-x} ${y+bracketSize}`)
      .attr("stroke", mainColor).attr("stroke-width", strokeWidth).attr("fill", "none").style("filter", "url(#kpi-glow)");
    // 右下
    g.append("path").attr("d", `M ${width-x} ${height-y-bracketSize} L ${width-x} ${height-y} L ${width-x-bracketSize} ${height-y}`)
      .attr("stroke", mainColor).attr("stroke-width", strokeWidth).attr("fill", "none").style("filter", "url(#kpi-glow)");
    // 左下
    g.append("path").attr("d", `M ${x+bracketSize} ${height-y} L ${x} ${height-y} L ${x} ${height-y-bracketSize}`)
      .attr("stroke", mainColor).attr("stroke-width", strokeWidth).attr("fill", "none").style("filter", "url(#kpi-glow)");

    // 装飾ライン（上下中央に薄い線）
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
      // ▼▼▼ 親要素のフォントを継承させるため削除、もしくは明示的に指定 ▼▼▼
      .style("font-family", "'Zen Dots', monospace")
      .style("filter", "url(#kpi-glow)")
      .text(labelText);

    // 2. メイン数値（中央）
    // カウントアップアニメーション用のオブジェクトを作成
    const textObj = g.append("text")
      .attr("x", width / 2)
      .attr("y", height * 0.6)
      .attr("text-anchor", "middle")
      .attr("dy", "0.2em") // 垂直方向の微調整
      .style("fill", "#ffffff")
      .style("font-size", Math.min(width, height) * 0.25 + "px") // コンテナサイズに応じて可変
      .style("font-weight", "bold")
      // ▼▼▼ 変更: Courier New から Zen Dotsへ ▼▼▼
      .style("font-family", "'Zen Dots', monospace")
      .style("filter", "url(#kpi-glow)")
      .text(0); // 初期値0

    // 数値のアニメーション (D3 transition)
    textObj.transition()
      .duration(1000)
      .tween("text", function() {
        const that = d3.select(this);
        const i = d3.interpolateNumber(0, mainValueRaw);
        return function(t) {
          // 生の数値をフォーマットしてテキストに設定
          // ここでは簡易的にtoLocaleStringを使用するが、Lookerのフォーマットを維持したい場合は
          // 最終フレームで mainValueFormatted に置き換える
          if (t === 1) {
             that.text(mainValueFormatted);
          } else {
             // 簡易フォーマット (整数または少数)
             const val = i(t);
             that.text(Math.floor(val).toLocaleString());
          }
        };
      });

    // 3. サブ情報（下部・あれば表示）
    if (subValueText) {
      g.append("text")
        .attr("x", width / 2)
        .attr("y", height * 0.85)
        .attr("text-anchor", "middle")
        .style("fill", "#cccccc")
        .style("font-size", "12px")
        .style("letter-spacing", "1px")
         // ▼▼▼ Zen Dotsを適用 ▼▼▼
        .style("font-family", "'Zen Dots', monospace")
        .text(subValueText);
    }

    done();
  }
});
