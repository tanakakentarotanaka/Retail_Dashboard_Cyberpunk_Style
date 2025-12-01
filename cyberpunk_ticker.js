/**
 * Cyberpunk Ticker (Marquee) Visualization v2
 * - Added: Custom Font Size option
 * - Scrolls text from Right to Left
 * - Mixes custom text with data
 * - Hover to pause
 */

looker.plugins.visualizations.add({
  // --- 1. 設定項目 ---
  options: {
    // --- 任意メッセージ設定 ---
    customMessage: {
      type: "string",
      label: "【固定】表示メッセージ",
      default: "WELCOME TO THE DATA STREAM",
      placeholder: "表示したい文字を入力",
      section: "Custom Content",
      order: 1
    },
    customLink: {
      type: "string",
      label: "【固定】リンク先URL (http://...)",
      default: "",
      placeholder: "https://google.com",
      section: "Custom Content",
      order: 2
    },
    customColor: {
      type: "string",
      label: "【固定】文字色",
      default: "#ff00ff", // ピンク
      display: "color",
      section: "Custom Content",
      order: 3
    },

    // --- データ表示設定 ---
    dataColor: {
      type: "string",
      label: "【データ】文字色",
      default: "#00ffff", // シアン
      display: "color",
      section: "Data Content",
      order: 1
    },
    showLabel: {
      type: "boolean",
      label: "項目名を表示 (Category: Value)",
      default: true,
      section: "Data Content",
      order: 2
    },

    // --- 全体デザイン設定 ---
    scrollSpeed: {
      type: "number",
      label: "流れる速さ (秒)",
      default: 20,
      min: 5,
      max: 100,
      section: "Style",
      order: 1
    },
    fontSize: {
      type: "number",
      label: "フォントサイズ (px)",
      default: 24,
      min: 10,
      max: 100,
      section: "Style",
      order: 2
    },
    backgroundColor: {
      type: "string",
      label: "背景色",
      default: "#000000",
      display: "color",
      section: "Style",
      order: 3
    },
    glowStrength: {
      type: "number",
      label: "ネオン光の強さ",
      default: 5,
      min: 0,
      max: 20,
      section: "Style",
      order: 4
    }
  },

  // --- 2. 初期化処理 ---
  create: function(element, config) {
    element.innerHTML = "";

    // コンテナスタイル (スキャンライン背景など)
    element.style.fontFamily = "'Courier New', Courier, monospace";
    element.style.overflow = "hidden";
    element.style.whiteSpace = "nowrap";
    element.style.position = "relative";
    element.style.height = "100%";
    element.style.display = "flex";
    element.style.alignItems = "center";

    // 背景の走査線エフェクト
    this.bg = element.appendChild(document.createElement("div"));
    Object.assign(this.bg.style, {
      position: "absolute",
      top: 0, left: 0, width: "100%", height: "100%",
      background: "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))",
      backgroundSize: "100% 2px, 3px 100%",
      pointerEvents: "none",
      zIndex: 0
    });

    // 流れるテキストのラッパー
    this.tickerWrap = element.appendChild(document.createElement("div"));
    Object.assign(this.tickerWrap.style, {
      display: "inline-block",
      paddingLeft: "100%",
      animationIterationCount: "infinite",
      animationTimingFunction: "linear",
      zIndex: 1
    });

    // CSS定義
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes ticker-scroll {
        0% { transform: translate3d(0, 0, 0); }
        100% { transform: translate3d(-100%, 0, 0); }
      }
      .ticker-content:hover {
        animation-play-state: paused !important;
        cursor: pointer;
      }
      .ticker-item {
        display: inline-block;
        padding: 0 2rem;
        font-weight: bold;
        transition: color 0.2s;
        /* font-size は updateAsync で動的に設定 */
      }
      .ticker-item:hover {
        text-shadow: 0 0 15px #ffffff !important;
        color: #ffffff !important;
      }
      .ticker-link {
        text-decoration: none;
        color: inherit;
      }
    `;
    element.appendChild(style);
  },

  // --- 3. 描画処理 ---
  updateAsync: function(data, element, config, queryResponse, details, done) {
    this.clearErrors();

    // 設定値
    const customMsg = config.customMessage;
    const customLink = config.customLink;
    const customColor = config.customColor || "#ff00ff";
    const dataColor = config.dataColor || "#00ffff";
    const speed = config.scrollSpeed || 20;
    const fontSize = config.fontSize || 24; // フォントサイズ取得
    const bgColor = config.backgroundColor || "#000000";
    const glow = config.glowStrength || 5;
    const showLabel = config.showLabel != null ? config.showLabel : true;

    // 背景色更新
    element.style.backgroundColor = bgColor;

    // コンテンツ生成
    this.tickerWrap.innerHTML = "";
    this.tickerWrap.className = "ticker-content";
    this.tickerWrap.style.animation = `ticker-scroll ${speed}s linear infinite`;

    // 共通スタイル適用ヘルパー
    const applyStyle = (span, color) => {
      span.style.color = color;
      span.style.textShadow = `0 0 ${glow}px ${color}`;
      span.style.fontSize = `${fontSize}px`; // ここでサイズ適用
    };

    // --- 1. 固定メッセージ ---
    if (customMsg) {
      const itemSpan = document.createElement("span");
      itemSpan.className = "ticker-item";
      applyStyle(itemSpan, customColor);

      if (customLink) {
        const anchor = document.createElement("a");
        anchor.href = customLink;
        anchor.target = "_blank";
        anchor.className = "ticker-link";
        anchor.textContent = `★ ${customMsg} ★`;
        itemSpan.appendChild(anchor);
      } else {
        itemSpan.textContent = `★ ${customMsg} ★`;
      }
      this.tickerWrap.appendChild(itemSpan);
    }

    // --- 2. データ ---
    if (data.length > 0 && queryResponse.fields.dimensions.length > 0) {
      const dimName = queryResponse.fields.dimensions[0].name;
      const measures = queryResponse.fields.measures;

      data.forEach(row => {
        const itemSpan = document.createElement("span");
        itemSpan.className = "ticker-item";
        applyStyle(itemSpan, dataColor);

        const dimVal = LookerCharts.Utils.textForCell(row[dimName]);
        let textContent = dimVal;

        const measVals = measures.map(m => {
          const val = LookerCharts.Utils.textForCell(row[m.name]);
          return showLabel ? `${m.label_short || m.label}: ${val}` : val;
        }).join(" / ");

        if (measVals) {
          textContent += ` [ ${measVals} ]`;
        }

        itemSpan.textContent = textContent;

        const separator = document.createElement("span");
        separator.style.opacity = 0.5;
        separator.style.marginRight = "10px";
        separator.style.fontSize = `${fontSize}px`; // 区切り文字もサイズ合わせる
        separator.style.color = dataColor; // 色合わせる
        separator.textContent = " /// ";

        this.tickerWrap.appendChild(itemSpan);
        this.tickerWrap.appendChild(separator);
      });
    }

    done();
  }
});
