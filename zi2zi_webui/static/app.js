(() => {
  "use strict";

  const VIEW_META = {
    zh: {
      simple: ["快速出字向导", "4 步完成模型准备、字体上传、快速生字与 TTF 字库导出，随时可切回高级模式"],
      projects: ["项目与备份", "创建、切换或删除字体项目，以及导入导出项目迁移包"],
      assets: ["素材与模型", "配置基础模型、上传源字体与目标风格素材，并自动提取风格参考图"],
      train: ["数据与训练", "从公共字集构建训练对，启动或续训单卡 LoRA 微调"],
      monitor: ["训练监控", "多轮次对比 Loss、学习率、显存占用、评估指标与字形演化快照"],
      generate: ["字形生成", "按文本或标准字集预设批量生成缺失字形，支持地区分流与多候选"],
      review: ["审阅与导出", "逐字审阅候选字形，批量矢量化并合入生成可安装 TTF 字库"],
      jobs: ["任务队列", "查看后台排队与执行状态、实时日志，支持取消与重试"],
    },
    en: {
      simple: ["Quick Start Wizard", "Configure project, model, and fonts in 4 streamlined steps to generate and export TTF fonts"],
      projects: ["Projects & Backup", "Create, switch, or delete font projects and export/import portable packages"],
      assets: ["Assets & Base Model", "Manage base checkpoints, upload source fonts and target style assets"],
      train: ["Dataset & Training", "Build paired glyph datasets and launch or resume LoRA fine-tuning"],
      monitor: ["Training Monitor", "Compare loss, learning rate, resources, metrics, and glyph snapshots across runs"],
      generate: ["Glyph Generation", "Synthesize missing glyphs from custom text or presets with regional routing"],
      review: ["Review & Export", "Inspect candidates, pick overrides, vectorize, and package installable TTF fonts"],
      jobs: ["Jobs & Logs", "Track queued and active tasks, inspect live logs, cancel or retry"],
    },
  };

  const I18N = {
    zh: {
      brandSub: "Font Studio",
      modeSimple: "简易模式",
      modeAdvanced: "高级模式",
      quickStartSection: "快速引导",
      navSimpleWizard: "快速出字向导",
      viewLogs: "查看日志",
      simpleStep1Title: "准备项目与基础模型",
      simpleStep1Hint: "新建一个字体项目，并挂载或一键下载官方基础模型",
      simpleProjectBoxTitle: "字体项目",
      simpleModelBoxTitle: "基础模型",
      simpleAttachBtn: "挂载",
      simpleDownloadModelBtn: "一键下载官方 JiT-B/16",
      simpleUploadLocalToggle: "导入本地权重",
      simpleStep2Title: "上传参考源字体与目标风格字体",
      simpleStep2Hint: "源字体提供清晰字形结构（如思源黑体），目标字体提供你想模仿的笔触风格",
      simpleSourceFontLabel: "参考源字体 (.ttf / .otf / .ttc)",
      simpleTargetFontLabel: "目标风格字体 (.ttf / .otf / .ttc)",
      simpleDropTargetFont: "点击或拖拽上传目标风格字体",
      simpleSaveAssetsBtn: "保存字体并提取风格参考",
      simpleStep3Title: "开始生字（或先快速微调）",
      simpleStep3Hint: "新手可直接输入文字生成测试效果；想要更还原笔触可先运行一键微调",
      simpleTabDirectGen: "直接生字（推荐先试）",
      simpleTabQuickTrain: "先快速微调（效果更佳）",
      simpleTextLabel: "输入想要生成的文字",
      simpleFillSample: "填入示例文本",
      simpleQuickPresetsLabel: "或快捷勾选常用字符集",
      simpleStartGenBtn: "立即开始生成字形",
      simpleTrainPresetLabel: "选择微调强度",
      simpleTrainTipLabel: "说明",
      simpleBuildDatasetBtn: "1. 构建训练数据",
      simpleStartTrainBtn: "2. 开始快速微调",
      simpleGoMonitorBtn: "切到高级模式看曲线",
      simpleStep4Title: "导出可安装字库 (.ttf) 与试写",
      simpleStep4Hint: "自动采用最新生成批次与推荐矢量化参数，一键合成可安装 TrueType 字体",
      simpleBuildFontBtn: "一键导出 TTF 字库",
      simplePreviewTitle: "实时试写",
      activeProject: "当前项目",
      newProjectShort: "+ 新建",
      workflowSection: "工作流",
      navProjects: "项目与备份",
      navAssets: "素材与模型",
      navTrain: "数据与训练",
      navMonitor: "训练监控",
      navGenerate: "字形生成",
      navReview: "审阅与导出",
      systemSection: "系统",
      navJobs: "任务队列",
      deviceLabel: "计算设备",
      diskLabel: "可用磁盘",
      openTensorboard: "打开 TensorBoard",
      createProjectTitle: "新建项目",
      createProjectHint: "每个项目独立管理素材、数据集、微调权重与导出字库",
      createBtn: "创建项目",
      projectListTitle: "项目列表",
      refresh: "刷新",
      currentProjectTitle: "当前项目概览",
      confirmDeleteProjectText: "确认永久删除当前项目及其全部本地文件",
      deleteProjectBtn: "删除项目",
      exportPackageTitle: "导出项目迁移包",
      exportPackageHint: "将当前项目打包为 .zi2zi-project.zip 便于备份或迁移",
      packageMode: "打包模式",
      includeSharedModels: "同时打包共享基础模型",
      exportPackageBtn: "开始导出项目包",
      exportedPackagesTitle: "已导出的迁移包",
      importPackageTitle: "导入项目迁移包",
      importPackageHint: "先上传并检查包内容，再确认作为新项目导入",
      dropPackage: "点击选择或拖拽 .zi2zi-project.zip 文件",
      inspectPackageBtn: "预检项目包",
      confirmImportText: "已核对内容，确认导入为新项目",
      importPackageBtn: "确认导入",
      baseModelTitle: "基础模型管理",
      baseModelHint: "下载官方预训练模型、挂载共享库模型，或导入本地受信任权重",
      downloadOfficialTitle: "官方预训练下载",
      modelVariant: "模型规格",
      downloadModelBtn: "加入下载队列",
      sharedModelsTitle: "本地共享模型库",
      selectSharedModel: "选择已有模型",
      attachModelBtn: "挂载到当前项目",
      uploadLocalModelTitle: "导入本地 Checkpoint",
      dropCheckpoint: "选择 .pth / .pt / .ckpt",
      trustCheckpointText: "确认该权重来源可信 (pickle 加载确认)",
      importModelBtn: "导入并挂载",
      fontAssetsTitle: "源字体与目标风格素材",
      fontAssetsHint: "上传标准字形作为源字体，上传需要学习的风格字体或已渲染字形图作为目标素材",
      modeFont: "目标字体文件 (.ttf / .otf / .ttc)",
      modeGlyphs: "目标字形图片 (多张 .png / .jpg)",
      globalSourceFontsLabel: "全局源字体（必选，可多选作为回退链）",
      dropSourceFonts: "点击或拖拽上传源字体文件",
      regionalFontsSummary: "可选：按地区覆盖源字体（SC / TC / JP / KR）",
      saveAssetsBtn: "保存素材并构建风格参考池",
      savedAssetsTitle: "当前项目已保存素材",
      datasetBuildTitle: "构建训练数据集",
      datasetBuildHint: "从源字体与目标素材的公共字集中采样生成训练与验证对",
      quickScale: "快速规模预设",
      trainCountLabel: "训练字数",
      testCountLabel: "验证字数",
      charsetFilterLabel: "字符集范围",
      workersLabel: "渲染并行线程",
      checkCapacityBtn: "检测可用字数上限",
      buildDatasetBtn: "提交数据集构建任务",
      loraTrainingTitle: "启动 LoRA 微调训练",
      loraTrainingHint: "基于已挂载的基础模型和数据集启动单卡微调",
      datasetPathLabel: "数据集目录（留空自动使用最新数据集）",
      trainDeviceLabel: "训练设备",
      qualityProfileLabel: "训练预设档位",
      epochsLabel: "训练轮数 (Epochs)",
      hflipLabel: "水平翻转概率 (0.0 – 0.5)",
      startTrainingBtn: "开始 LoRA 微调",
      resumeRunTitle: "续训或管理已有训练轮次",
      resumeRunBtn: "从 checkpoint-last 续训",
      confirmDeleteRunText: "确认删除所选训练记录及权重",
      deleteRunBtn: "删除记录",
      monitorSelectTitle: "训练运行选择与对比（最多 5 个）",
      refreshMetrics: "刷新指标",
      exportMetrics: "导出 CSV / JSON / PNG",
      snapshotsTitle: "字形演化快照（每对：目标真值 -> 当前生成）",
      paramsTableTitle: "超参数对比",
      checkpointsAlertsTitle: "检查点与告警记录",
      charsetSelectionTitle: "选择要生成的字符",
      charsetSelectionHint: "目标字体中已存在的字符会自动跳过，仅生成缺失字形",
      customTextLabel: "自定义文本（直接输入或粘贴任意字符）",
      presetCharsetsLabel: "标准字符集预设",
      customCharsetFileLabel: "可选：上传自定义字符列表文件 (.txt)",
      dropCharsetFile: "点击或拖拽上传字符表文件",
      genParamsTitle: "推理参数",
      genCheckpointLabel: "生成权重 (LoRA / Base)",
      genDeviceLabel: "推理设备",
      primaryRegionLabel: "主地区字形",
      seedLabel: "随机种子 (Seed)",
      candidatesLabel: "每字候选数 (1–8)",
      splitRegionsText: "按地区拆分子任务（使用对应地区源字体渲染）",
      unlockCandidatesText: "解锁超过 64 字时的多候选生成保护",
      submitGenerationBtn: "提交字形生成任务",
      subtabReview: "字形审阅与候选选优",
      subtabExport: "矢量化与字库导出",
      loadBatch: "载入批次",
      prevPage: "上一页",
      nextPage: "下一页",
      candidateInspectorTitle: "候选对比",
      fontBuildTitle: "导出 TrueType 字库 (.ttf)",
      fontBuildHint: "将审阅后的字形批量矢量化，并合入目标底字生成可安装字库",
      exportBatchLabel: "选择生成批次",
      fontFamilyLabel: "字体家族名 (英文 / ASCII 推荐)",
      fontStyleLabel: "字重样式",
      fontVersionLabel: "版本号",
      fontDesignerLabel: "作者 / 设计师",
      fontLicenseLabel: "许可声明",
      thresholdLabel: "二值化阈值 (0–255)",
      despeckleLabel: "去噪面积阈值",
      profilesLabel: "排版规格",
      buildFontBtn: "开始构建字库",
      artifactsPreviewTitle: "导出产物与实时试写",
      downloadableFilesTitle: "下载文件",
      svgPreviewTitle: "SVG 矢量化抽样",
      jobsListTitle: "后台任务队列",
      onlyCurrentProject: "仅当前项目",
      retryJob: "重试",
      cancelJob: "取消",
    },
    en: {
      brandSub: "Font Studio",
      modeSimple: "Simple",
      modeAdvanced: "Advanced",
      quickStartSection: "Quick Start",
      navSimpleWizard: "Quick Wizard",
      viewLogs: "View Logs",
      simpleStep1Title: "Project & Base Model",
      simpleStep1Hint: "Create a font project and attach or download the official base model",
      simpleProjectBoxTitle: "Font Project",
      simpleModelBoxTitle: "Base Model",
      simpleAttachBtn: "Attach",
      simpleDownloadModelBtn: "Download Official JiT-B/16",
      simpleUploadLocalToggle: "Import Local Checkpoint",
      simpleStep2Title: "Upload Source & Target Fonts",
      simpleStep2Hint: "Source font provides clean glyph structure; target font provides the style to imitate",
      simpleSourceFontLabel: "Reference Source Font (.ttf / .otf / .ttc)",
      simpleTargetFontLabel: "Target Style Font (.ttf / .otf / .ttc)",
      simpleDropTargetFont: "Click or drop target style font",
      simpleSaveAssetsBtn: "Save Fonts & Extract Style Pool",
      simpleStep3Title: "Generate Glyphs (or Quick Fine-Tune)",
      simpleStep3Hint: "Try direct generation first, or run one-click LoRA fine-tuning for closer style fidelity",
      simpleTabDirectGen: "Direct Generation (Recommended First)",
      simpleTabQuickTrain: "Quick Fine-Tune (Better Fidelity)",
      simpleTextLabel: "Text to Generate",
      simpleFillSample: "Fill Sample Text",
      simpleQuickPresetsLabel: "Or pick common character presets",
      simpleStartGenBtn: "Start Generating Glyphs",
      simpleTrainPresetLabel: "Fine-Tune Intensity",
      simpleTrainTipLabel: "Guide",
      simpleBuildDatasetBtn: "1. Build Dataset",
      simpleStartTrainBtn: "2. Start Fine-Tune",
      simpleGoMonitorBtn: "Open Monitor in Advanced Mode",
      simpleStep4Title: "Export Installable Font (.ttf) & Test",
      simpleStep4Hint: "Uses the latest generated batch with recommended vectorization settings",
      simpleBuildFontBtn: "Export TTF Font",
      simplePreviewTitle: "Live Specimen",
      activeProject: "Active Project",
      newProjectShort: "+ New",
      workflowSection: "Workflow",
      navProjects: "Projects & Backup",
      navAssets: "Assets & Model",
      navTrain: "Dataset & Train",
      navMonitor: "Monitor",
      navGenerate: "Generation",
      navReview: "Review & Export",
      systemSection: "System",
      navJobs: "Job Queue",
      deviceLabel: "Device",
      diskLabel: "Disk Free",
      openTensorboard: "Open TensorBoard",
      createProjectTitle: "Create Project",
      createProjectHint: "Each project isolates assets, datasets, checkpoints, and font builds",
      createBtn: "Create Project",
      projectListTitle: "Projects",
      refresh: "Refresh",
      currentProjectTitle: "Project Overview",
      confirmDeleteProjectText: "Confirm permanent deletion of this project and all local files",
      deleteProjectBtn: "Delete Project",
      exportPackageTitle: "Export Project Package",
      exportPackageHint: "Bundle current project as .zi2zi-project.zip for backup or migration",
      packageMode: "Mode",
      includeSharedModels: "Include shared base models",
      exportPackageBtn: "Export Package",
      exportedPackagesTitle: "Exported Packages",
      importPackageTitle: "Import Project Package",
      importPackageHint: "Inspect archive contents before importing as a new project",
      dropPackage: "Click or drop .zi2zi-project.zip here",
      inspectPackageBtn: "Inspect Package",
      confirmImportText: "Verified package contents, confirm import as new project",
      importPackageBtn: "Confirm Import",
      baseModelTitle: "Base Model",
      baseModelHint: "Download official checkpoints, attach shared library models, or import local weights",
      downloadOfficialTitle: "Official Pretrained",
      modelVariant: "Model Variant",
      downloadModelBtn: "Queue Download",
      sharedModelsTitle: "Shared Model Library",
      selectSharedModel: "Select Model",
      attachModelBtn: "Attach to Project",
      uploadLocalModelTitle: "Import Local Checkpoint",
      dropCheckpoint: "Select .pth / .pt / .ckpt",
      trustCheckpointText: "I trust this checkpoint source (pickle load consent)",
      importModelBtn: "Import & Attach",
      fontAssetsTitle: "Source Fonts & Target Style Assets",
      fontAssetsHint: "Upload clean source fonts and the target style font or rendered glyph images",
      modeFont: "Target Font File (.ttf / .otf / .ttc)",
      modeGlyphs: "Target Glyph Images (.png / .jpg)",
      globalSourceFontsLabel: "Global Source Fonts (fallback chain)",
      dropSourceFonts: "Click or drop source font files",
      regionalFontsSummary: "Optional: Regional Source Font Overrides (SC / TC / JP / KR)",
      saveAssetsBtn: "Save Assets & Build Style Pool",
      savedAssetsTitle: "Saved Project Assets",
      datasetBuildTitle: "Build Training Dataset",
      datasetBuildHint: "Sample paired source and target glyphs from common codepoints",
      quickScale: "Quick Size Preset",
      trainCountLabel: "Training Glyphs",
      testCountLabel: "Validation Glyphs",
      charsetFilterLabel: "Charset Scope",
      workersLabel: "Parallel Workers",
      checkCapacityBtn: "Check Capacity",
      buildDatasetBtn: "Queue Dataset Build",
      loraTrainingTitle: "Start LoRA Training",
      loraTrainingHint: "Fine-tune the attached base model on the prepared dataset",
      datasetPathLabel: "Dataset Directory (blank uses latest)",
      trainDeviceLabel: "Training Device",
      qualityProfileLabel: "Quality Profile",
      epochsLabel: "Epochs",
      hflipLabel: "Horizontal Flip Prob (0.0 – 0.5)",
      startTrainingBtn: "Start Training",
      resumeRunTitle: "Resume or Manage Runs",
      resumeRunBtn: "Resume from checkpoint-last",
      confirmDeleteRunText: "Confirm permanent deletion of selected run",
      deleteRunBtn: "Delete Run",
      monitorSelectTitle: "Compare Training Runs (up to 5)",
      refreshMetrics: "Refresh Metrics",
      exportMetrics: "Export CSV / JSON / PNG",
      snapshotsTitle: "Glyph Evolution Snapshots (target -> generated)",
      paramsTableTitle: "Hyperparameter Comparison",
      checkpointsAlertsTitle: "Checkpoints & Alerts",
      charsetSelectionTitle: "Select Target Characters",
      charsetSelectionHint: "Characters already in the target font are automatically skipped",
      customTextLabel: "Custom Text",
      presetCharsetsLabel: "Standard Charset Presets",
      customCharsetFileLabel: "Optional: Upload Custom Charset File (.txt)",
      dropCharsetFile: "Click or drop charset file",
      genParamsTitle: "Inference Settings",
      genCheckpointLabel: "Checkpoint (LoRA / Base)",
      genDeviceLabel: "Device",
      primaryRegionLabel: "Primary Region",
      seedLabel: "Seed",
      candidatesLabel: "Candidates per Glyph (1–8)",
      splitRegionsText: "Split jobs by region (use regional source fonts)",
      unlockCandidatesText: "Unlock multi-candidate generation above 64 glyphs",
      submitGenerationBtn: "Queue Glyph Generation",
      subtabReview: "Review & Pick Candidates",
      subtabExport: "Vectorize & Export Font",
      loadBatch: "Load Batch",
      prevPage: "Prev",
      nextPage: "Next",
      candidateInspectorTitle: "Candidates",
      fontBuildTitle: "Export TrueType Font (.ttf)",
      fontBuildHint: "Vectorize selected glyphs and merge into an installable TTF font",
      exportBatchLabel: "Generation Batch",
      fontFamilyLabel: "Font Family Name",
      fontStyleLabel: "Style Name",
      fontVersionLabel: "Version",
      fontDesignerLabel: "Designer",
      fontLicenseLabel: "License",
      thresholdLabel: "Threshold (0–255)",
      despeckleLabel: "Despeckle Area",
      profilesLabel: "Build Profiles",
      buildFontBtn: "Build Font",
      artifactsPreviewTitle: "Artifacts & Live Specimen",
      downloadableFilesTitle: "Downloadable Files",
      svgPreviewTitle: "Vectorized SVG Samples",
      jobsListTitle: "Background Jobs",
      onlyCurrentProject: "Current Project Only",
      retryJob: "Retry",
      cancelJob: "Cancel",
    },
  };

  const CHART_COLORS = [
    "#2563eb",
    "#16a34a",
    "#d97706",
    "#dc2626",
    "#7c3aed",
    "#0891b2",
    "#db2777",
    "#4b5563",
  ];

  const state = {
    lang: localStorage.getItem("zi2zi_lang") || "zh",
    uiMode: localStorage.getItem("zi2zi_ui_mode") || "simple",
    theme:
      localStorage.getItem("zi2zi_theme") ||
      (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"),
    view: (localStorage.getItem("zi2zi_ui_mode") || "simple") === "simple" ? "simple" : "projects",
    devices: [],
    presets: [],
    projects: [],
    sharedModels: [],
    exportPackages: [],
    jobs: [],
    activeProjectId: localStorage.getItem("zi2zi_project") || "",
    projectDetail: null,
    inputMode: "font",
    stagedImportPath: "",
    selectedRunIds: [],
    reviewPage: 1,
    reviewTotalPages: 1,
    activeReviewCodepoint: "",
    selectedJobId: "",
    previewFontCounter: 0,
    pollTimer: null,
  };

  const $ = (id) => document.getElementById(id);

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function basename(path) {
    if (!path) return "";
    return String(path).split(/[\\/]/).pop() || path;
  }

  function toast(message, kind = "info") {
    const stack = $("toastStack");
    const node = document.createElement("div");
    node.className = `toast ${kind}`;
    node.textContent = message;
    stack.appendChild(node);
    setTimeout(() => {
      node.remove();
    }, 4200);
  }

  async function api(url, options = {}) {
    const config = { ...options };
    if (config.body && !(config.body instanceof FormData) && typeof config.body === "object") {
      config.headers = { "Content-Type": "application/json", ...(config.headers || {}) };
      config.body = JSON.stringify(config.body);
    }
    const resp = await fetch(url, config);
    let data = null;
    try {
      data = await resp.json();
    } catch {
      data = null;
    }
    if (!resp.ok) {
      const detail = (data && (data.detail || data.message)) || `HTTP ${resp.status}`;
      throw new Error(detail);
    }
    return data;
  }

  function applyTheme() {
    document.documentElement.setAttribute("data-theme", state.theme);
    localStorage.setItem("zi2zi_theme", state.theme);
    $("themeToggleBtn").textContent =
      state.lang === "en"
        ? state.theme === "dark"
          ? "Light"
          : "Dark"
        : state.theme === "dark"
        ? "浅色"
        : "深色";
  }

  function applyLanguage() {
    localStorage.setItem("zi2zi_lang", state.lang);
    document.documentElement.lang = state.lang === "en" ? "en" : "zh-CN";
    const dict = I18N[state.lang] || I18N.zh;
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (dict[key]) el.textContent = dict[key];
    });
    $("langToggleBtn").textContent = state.lang === "en" ? "中文" : "EN";
    applyTheme();
    updateViewHeader();
    updateInputModeLabels();
  }

  function updateViewHeader() {
    const meta = (VIEW_META[state.lang] || VIEW_META.zh)[state.view] || ["", ""];
    $("viewTitle").textContent = meta[0];
    $("viewSubtitle").textContent = meta[1];
  }

  function switchView(viewName) {
    state.view = viewName;
    document.querySelectorAll(".view").forEach((el) => {
      el.classList.toggle("active", el.id === `view-${viewName}`);
    });
    document.querySelectorAll(".nav-item").forEach((el) => {
      el.classList.toggle("active", el.getAttribute("data-view") === viewName);
    });
    $("sidebar").classList.remove("open");
    updateViewHeader();

    if (viewName === "simple") {
      renderSimpleWizard();
      refreshArtifacts();
    } else if (viewName === "monitor") {
      refreshDashboard();
    } else if (viewName === "review") {
      loadReviewPage(1);
      refreshArtifacts();
    } else if (viewName === "jobs") {
      refreshJobs();
    }
  }

  function applyUiMode(mode, navigate = true) {
    state.uiMode = mode === "advanced" ? "advanced" : "simple";
    localStorage.setItem("zi2zi_ui_mode", state.uiMode);
    document.querySelectorAll("#uiModeSwitcher .mode-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.uiMode === state.uiMode);
    });
    const isSimple = state.uiMode === "simple";
    $("simpleNavGroup").classList.toggle("hidden", !isSimple);
    $("advancedNavGroup").classList.toggle("hidden", isSimple);
    if (navigate) {
      if (isSimple && state.view !== "jobs") {
        switchView("simple");
      } else if (!isSimple && state.view === "simple") {
        switchView("projects");
      }
    }
  }

  function getDefaultDevice(forTraining = false) {
    const candidates = forTraining
      ? state.devices.filter((d) => d.training_supported)
      : state.devices;
    const list = candidates.length ? candidates : state.devices;
    const gpu = list.find((d) => d.backend === "cuda");
    return (gpu || list[0] || { id: "cpu" }).id;
  }

  function renderSimpleWizard() {
    const detail = state.projectDetail;
    const s1 = $("simpleStep1Status");
    const s2 = $("simpleStep2Status");
    const s3 = $("simpleStep3Status");
    const s4 = $("simpleStep4Status");

    if (!detail) {
      s1.textContent = state.lang === "en" ? "Pending" : "待配置";
      s1.className = "pill";
      s2.textContent = state.lang === "en" ? "Pending" : "待上传";
      s2.className = "pill";
      s3.textContent = state.lang === "en" ? "Waiting" : "等待前序步骤";
      s3.className = "pill";
      s4.textContent = state.lang === "en" ? "Pending" : "待生成";
      s4.className = "pill";
      $("simpleProjectStatus").textContent =
        state.lang === "en"
          ? "No project selected. Create one above."
          : "尚未创建项目，请在上方输入名称并创建。";
      $("simpleModelStatus").textContent =
        state.lang === "en" ? "Create a project first." : "创建项目后即可挂载或下载基础模型。";
      $("simpleAssetsStatus").textContent = "";
      $("simpleGenHint").textContent =
        state.lang === "en"
          ? "Complete steps 1 and 2 before generating."
          : "请先完成第 1、2 步后再开始生字。";
      return;
    }

    const m = detail.manifest;
    const hasModel = Boolean(m.base_model);
    const hasSource = (m.global_source_fonts || []).length > 0;
    const hasTarget = (m.target_assets || []).length > 0;
    const hasRefs = (m.style_reference_pool || []).length >= 8;
    const hasAssets = hasSource && hasTarget && hasRefs;
    const hasBatches = (detail.generation_batches || []).length > 0;

    s1.textContent = hasModel
      ? state.lang === "en"
        ? "Ready"
        : "已就绪"
      : state.lang === "en"
      ? "Need Model"
      : "缺基础模型";
    s1.className = `pill ${hasModel ? "ok" : "warn"}`;

    s2.textContent = hasAssets
      ? state.lang === "en"
        ? "Ready"
        : "已就绪"
      : state.lang === "en"
      ? "Pending"
      : "待上传";
    s2.className = `pill ${hasAssets ? "ok" : ""}`;

    s3.textContent =
      hasModel && hasAssets
        ? hasBatches
          ? state.lang === "en"
            ? `${detail.generation_batches.length} Batch(es)`
            : `已生成 ${detail.generation_batches.length} 批`
          : state.lang === "en"
          ? "Ready to Run"
          : "可开始生字"
        : state.lang === "en"
        ? "Waiting"
        : "等待前序步骤";
    s3.className = `pill ${hasBatches ? "ok" : hasModel && hasAssets ? "accent" : ""}`;

    s4.textContent = hasBatches
      ? state.lang === "en"
        ? "Ready to Export"
        : "可一键导出"
      : state.lang === "en"
      ? "Generate First"
      : "等待生成批次";
    s4.className = `pill ${hasBatches ? "accent" : ""}`;

    $("simpleProjectStatus").textContent =
      state.lang === "en"
        ? `Active: ${m.name} (${m.id.slice(0, 8)})`
        : `当前项目：${m.name}（可在左上角切换其他项目）`;
    $("simpleModelStatus").textContent = hasModel
      ? (state.lang === "en" ? "Attached: " : "已挂载：") + basename(m.base_model)
      : state.lang === "en"
      ? "No model attached yet. Select a shared model or download JiT-B/16."
      : "尚未挂载模型：可直接从上方选择，或点「一键下载官方 JiT-B/16」。";
    $("simpleAssetsStatus").textContent = hasAssets
      ? state.lang === "en"
        ? `Source: ${(m.global_source_fonts || []).map(basename).join(", ")} | Target: ${(
            m.target_assets || []
          )
            .map(basename)
            .join(", ")} | Style refs: ${(m.style_reference_pool || []).length}`
        : `已保存 · 源字体：${(m.global_source_fonts || []).map(basename).join(", ")} | 目标字体：${(
            m.target_assets || []
          )
            .map(basename)
            .join(", ")} | 风格参考图：${(m.style_reference_pool || []).length} 张`
      : state.lang === "en"
      ? "Upload both source and target fonts, then click Save."
      : "请同时选择源字体和目标风格字体后点击保存。";

    const ckpt = detail.preferred_checkpoint || m.base_model || "";
    const dev = getDefaultDevice(false);
    $("simpleGenHint").textContent = ckpt
      ? state.lang === "en"
        ? `Auto weight: ${basename(ckpt)} · Device: ${dev}`
        : `将自动使用权重：${basename(ckpt)} · 设备：${dev}`
      : state.lang === "en"
      ? "Attach a base model in Step 1 first."
      : "请先在第 1 步挂载基础模型。";

    const trainStatus = $("simpleTrainStatus");
    if (detail.dataset_path) {
      trainStatus.textContent =
        state.lang === "en"
          ? `Dataset ready (${basename(detail.dataset_path)}). Click "2. Start Fine-Tune" to train LoRA.`
          : `数据集已就绪（${basename(detail.dataset_path)}），可直接点击「2. 开始快速微调」。`;
    } else {
      trainStatus.textContent =
        state.lang === "en"
          ? 'Click "1. Build Dataset" first, then "2. Start Fine-Tune" after it completes.'
          : "先点击「1. 构建训练数据」，待任务完成后再点击「2. 开始快速微调」。";
    }
  }

  function updateInputModeLabels() {
    const isGlyphs = state.inputMode === "glyphs";
    $("targetAssetsLabel").textContent =
      state.lang === "en"
        ? isGlyphs
          ? "Target Rendered Glyph Images (8+ PNG/JPG)"
          : "Target Style Font File (.ttf / .otf / .ttc)"
        : isGlyphs
        ? "目标风格字形图片（至少 8 张 .png / .jpg）"
        : "目标风格字体文件（.ttf / .otf / .ttc）";
    $("targetDropText").textContent =
      state.lang === "en"
        ? isGlyphs
          ? "Click or drop rendered glyph images"
          : "Click or drop target style font"
        : isGlyphs
        ? "点击或拖拽上传多张目标字形图片"
        : "点击或拖拽上传目标风格字体";
  }

  function requireProject() {
    if (!state.activeProjectId) {
      toast(
        state.lang === "en" ? "Create or select a project first." : "请先创建或选择一个项目。",
        "error"
      );
      return false;
    }
    return true;
  }

  async function bootstrap() {
    const data = await api(`/api/bootstrap?lang=${encodeURIComponent(state.lang)}`);
    state.devices = data.devices || [];
    state.presets = data.presets || [];
    state.projects = data.projects || [];
    state.sharedModels = data.shared_models || [];
    state.exportPackages = data.export_packages || [];
    state.jobs = data.jobs || [];

    $("tensorboardLink").href = data.tensorboard_url || "http://127.0.0.1:6006";
    $("sidebarDisk").textContent = `${data.disk_free_gb ?? 0} GB`;
    const firstGpu = state.devices.find((d) => d.backend === "cuda") || state.devices[0];
    $("sidebarDevice").textContent = firstGpu ? firstGpu.name : "CPU";

    populateDeviceSelects();
    renderSharedModels();
    renderExportPackages();
    renderPresets();
    renderProjectsList();
    renderJobsState();
    renderSimpleWizard();

    if (
      state.activeProjectId &&
      state.projects.some((p) => p.id === state.activeProjectId)
    ) {
      await selectProject(state.activeProjectId, false);
    } else if (state.projects.length > 0) {
      await selectProject(state.projects[0].id, false);
    } else {
      state.activeProjectId = "";
      state.projectDetail = null;
      renderProjectDetail();
    }
  }

  function populateDeviceSelects() {
    const trainSelect = $("trainDevice");
    const genSelect = $("genDeviceSelect");
    const prevTrain = trainSelect.value;
    const prevGen = genSelect.value;
    trainSelect.innerHTML = "";
    genSelect.innerHTML = "";
    const trainDevices = state.devices.filter((d) => d.training_supported);
    const listTrain = trainDevices.length ? trainDevices : state.devices;
    listTrain.forEach((dev) => {
      const opt = document.createElement("option");
      opt.value = dev.id;
      opt.textContent = dev.memory_total_gb
        ? `${dev.name} (${dev.memory_total_gb} GB)`
        : dev.name;
      trainSelect.appendChild(opt);
    });
    state.devices.forEach((dev) => {
      const opt = document.createElement("option");
      opt.value = dev.id;
      opt.textContent = dev.memory_total_gb
        ? `${dev.name} (${dev.memory_total_gb} GB)`
        : dev.name;
      genSelect.appendChild(opt);
    });
    if (prevTrain && [...trainSelect.options].some((o) => o.value === prevTrain)) {
      trainSelect.value = prevTrain;
    }
    if (prevGen && [...genSelect.options].some((o) => o.value === prevGen)) {
      genSelect.value = prevGen;
    }
  }

  function renderProjectsList() {
    const switcher = $("globalProjectSelect");
    const list = $("projectList");
    switcher.innerHTML = "";
    list.innerHTML = "";

    if (!state.projects.length) {
      const opt = document.createElement("option");
      opt.value = "";
      opt.textContent = state.lang === "en" ? "No projects yet" : "暂无项目";
      switcher.appendChild(opt);
      list.innerHTML = `<div class="empty-state">${
        state.lang === "en" ? "Create a project to begin." : "创建一个项目以开始使用。"
      }</div>`;
      return;
    }

    state.projects.forEach((proj) => {
      const opt = document.createElement("option");
      opt.value = proj.id;
      opt.textContent = `${proj.name} (${proj.id.slice(0, 8)})`;
      if (proj.id === state.activeProjectId) opt.selected = true;
      switcher.appendChild(opt);

      const row = document.createElement("div");
      row.className = `list-row${proj.id === state.activeProjectId ? " selected" : ""}`;
      row.innerHTML = `
        <div>
          <div class="list-row-title">${escapeHtml(proj.name)}</div>
          <div class="list-row-sub mono">${escapeHtml(proj.id.slice(0, 8))} · ${escapeHtml(
        proj.input_mode
      )}</div>
        </div>
        <span class="pill ${proj.base_model ? "ok" : ""}">${
        proj.base_model
          ? state.lang === "en"
            ? "Model Ready"
            : "模型就绪"
          : state.lang === "en"
          ? "No Model"
          : "未挂载模型"
      }</span>
      `;
      row.addEventListener("click", () => selectProject(proj.id));
      list.appendChild(row);
    });
  }

  async function selectProject(projectId, notify = false) {
    state.activeProjectId = projectId || "";
    localStorage.setItem("zi2zi_project", state.activeProjectId);
    renderProjectsList();
    if (!state.activeProjectId) {
      state.projectDetail = null;
      renderProjectDetail();
      return;
    }
    try {
      state.projectDetail = await api(`/api/projects/${encodeURIComponent(state.activeProjectId)}`);
      state.selectedRunIds = (state.projectDetail.runs || [])
        .slice(0, 2)
        .map((r) => r.id);
      renderProjectDetail();
      renderSimpleWizard();
      if (state.view === "simple") refreshArtifacts();
      if (state.view === "monitor") refreshDashboard();
      if (state.view === "review") {
        loadReviewPage(1);
        refreshArtifacts();
      }
      if (notify) {
        toast(
          state.lang === "en"
            ? `Switched to ${state.projectDetail.manifest.name}`
            : `已切换至项目：${state.projectDetail.manifest.name}`,
          "info"
        );
      }
    } catch (err) {
      toast(err.message, "error");
    }
  }

  function renderProjectDetail() {
    const detail = state.projectDetail;
    const pills = $("projectReadinessPills");
    const overview = $("projectOverviewBody");
    const modelStatus = $("currentModelStatus");
    const assetsSummary = $("savedAssetsSummary");

    if (!detail) {
      pills.innerHTML = "";
      overview.innerHTML = `<div class="empty-state">${
        state.lang === "en" ? "No project selected" : "尚未选择项目"
      }</div>`;
      modelStatus.textContent = "";
      assetsSummary.innerHTML = "";
      $("trainDatasetPath").value = "";
      $("manageRunSelect").innerHTML = "";
      $("genCheckpointSelect").innerHTML = "";
      $("reviewBatchSelect").innerHTML = "";
      $("exportBatchSelect").innerHTML = "";
      return;
    }

    const m = detail.manifest;
    const hasModel = Boolean(m.base_model);
    const hasSource = (m.global_source_fonts || []).length > 0;
    const hasTarget = (m.target_assets || []).length > 0;
    const hasRefs = (m.style_reference_pool || []).length >= 8;
    const hasDataset = Boolean(detail.dataset_path);

    pills.innerHTML = [
      { ok: hasModel, zh: "模型", en: "Model" },
      { ok: hasSource && hasTarget && hasRefs, zh: "素材", en: "Assets" },
      { ok: hasDataset, zh: "数据集", en: "Dataset" },
      { ok: (detail.runs || []).length > 0, zh: "训练", en: "Runs" },
    ]
      .map(
        (item) =>
          `<span class="pill ${item.ok ? "ok" : ""}">${
            state.lang === "en" ? item.en : item.zh
          }</span>`
      )
      .join("");

    const kv = (k, v) =>
      `<div class="kv-item"><span class="kv-key">${escapeHtml(k)}</span><span class="kv-val">${escapeHtml(
        v || "—"
      )}</span></div>`;

    overview.innerHTML =
      kv(state.lang === "en" ? "Name" : "项目名称", m.name) +
      kv("ID", m.id) +
      kv(state.lang === "en" ? "Input Mode" : "输入模式", m.input_mode) +
      kv(state.lang === "en" ? "Base Model" : "基础模型", basename(m.base_model)) +
      kv(
        state.lang === "en" ? "Style References" : "风格参考池",
        `${(m.style_reference_pool || []).length}`
      ) +
      kv(state.lang === "en" ? "Training Runs" : "训练记录数", `${(detail.runs || []).length}`);

    modelStatus.textContent = m.base_model
      ? (state.lang === "en" ? "Current Base Model: " : "当前基础模型：") + m.base_model
      : state.lang === "en"
      ? "No base model attached yet."
      : "尚未挂载基础模型。";

    state.inputMode = m.input_mode === "glyphs" ? "glyphs" : "font";
    document.querySelectorAll("#inputModeSwitch .seg-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.mode === state.inputMode);
    });
    updateInputModeLabels();

    const regionalSummary = Object.entries(m.regional_source_fonts || {})
      .filter(([, arr]) => arr && arr.length)
      .map(([reg, arr]) => `${reg}: ${arr.map(basename).join(", ")}`)
      .join(" | ");

    assetsSummary.innerHTML =
      kv(
        state.lang === "en" ? "Global Source Fonts" : "全局源字体",
        (m.global_source_fonts || []).map(basename).join(", ")
      ) +
      kv(
        state.lang === "en" ? "Target Assets" : "目标素材",
        (m.target_assets || []).map(basename).join(", ")
      ) +
      kv(
        state.lang === "en" ? "Style Reference Pool" : "已提取风格参考图",
        `${(m.style_reference_pool || []).length} / 8+`
      ) +
      kv(state.lang === "en" ? "Regional Overrides" : "地区覆盖源字体", regionalSummary);

    $("trainDatasetPath").value = detail.dataset_path || "";

    const runSel = $("manageRunSelect");
    runSel.innerHTML = "";
    if (!(detail.runs || []).length) {
      const opt = document.createElement("option");
      opt.value = "";
      opt.textContent = state.lang === "en" ? "No training runs" : "暂无训练记录";
      runSel.appendChild(opt);
    } else {
      detail.runs.forEach((run) => {
        const opt = document.createElement("option");
        opt.value = run.id;
        opt.textContent = `${run.id.slice(0, 8)} · ${run.status}`;
        runSel.appendChild(opt);
      });
    }

    renderMonitorRunChips();

    const ckptSel = $("genCheckpointSelect");
    ckptSel.innerHTML = "";
    if (!(detail.generation_checkpoints || []).length) {
      const opt = document.createElement("option");
      opt.value = "";
      opt.textContent = state.lang === "en" ? "No checkpoints available" : "暂无可用权重";
      ckptSel.appendChild(opt);
    } else {
      detail.generation_checkpoints.forEach((item) => {
        const opt = document.createElement("option");
        opt.value = item.path;
        opt.textContent = item.label;
        if (item.path === detail.preferred_checkpoint) opt.selected = true;
        ckptSel.appendChild(opt);
      });
    }

    $("genPrimaryRegion").value = m.primary_region || "SC";
    $("genSplitRegions").checked = m.split_regions !== false;
    const savedPresets = new Set(m.charset_presets || []);
    document.querySelectorAll(".preset-checkbox").forEach((box) => {
      box.checked = savedPresets.has(box.value);
      box.closest(".preset-card")?.classList.toggle("checked", box.checked);
    });

    [$("reviewBatchSelect"), $("exportBatchSelect")].forEach((sel) => {
      const prev = sel.value;
      sel.innerHTML = "";
      if (!(detail.generation_batches || []).length) {
        const opt = document.createElement("option");
        opt.value = "";
        opt.textContent = state.lang === "en" ? "No generation batches" : "暂无生成批次";
        sel.appendChild(opt);
      } else {
        detail.generation_batches.forEach((b) => {
          const opt = document.createElement("option");
          opt.value = b.path;
          opt.textContent = b.label;
          if (b.path === prev || (!prev && b.path === detail.preferred_batch)) {
            opt.selected = true;
          }
          sel.appendChild(opt);
        });
      }
    });
  }

  function renderSharedModels() {
    [$("sharedModelSelect"), $("simpleSharedModelSelect")].forEach((sel) => {
      if (!sel) return;
      const prev = sel.value;
      sel.innerHTML = "";
      if (!state.sharedModels.length) {
        const opt = document.createElement("option");
        opt.value = "";
        opt.textContent = state.lang === "en" ? "Shared library is empty" : "共享目录暂无模型";
        sel.appendChild(opt);
        return;
      }
      state.sharedModels.forEach((item) => {
        const opt = document.createElement("option");
        opt.value = item.path;
        const tag = item.architecture ? ` · ${item.architecture}` : "";
        opt.textContent = `${item.name} (${item.size_mb} MB${tag})`;
        if (item.path === prev) opt.selected = true;
        sel.appendChild(opt);
      });
    });
  }

  function renderExportPackages() {
    const box = $("exportPackagesList");
    if (!state.exportPackages.length) {
      box.innerHTML = `<div class="empty-state">${
        state.lang === "en" ? "No exported packages yet." : "暂无已导出的项目迁移包。"
      }</div>`;
      return;
    }
    box.innerHTML = state.exportPackages
      .map(
        (pkg) => `
      <div class="file-item">
        <span class="mono">${escapeHtml(pkg.name)} (${pkg.size_mb} MB)</span>
        <a href="${escapeHtml(pkg.url)}" download="${escapeHtml(pkg.name)}">${
          state.lang === "en" ? "Download" : "下载"
        }</a>
      </div>`
      )
      .join("");
  }

  function renderPresets() {
    const grid = $("genPresetsGrid");
    grid.innerHTML = state.presets
      .map(
        (p) => {
          const count = p.expected_count ?? p.count;
          const suffix = count !== undefined && count !== null ? ` (${count})` : "";
          return `
      <label class="preset-card">
        <input type="checkbox" class="preset-checkbox" value="${escapeHtml(p.id)}" />
        <div>
          <div class="preset-card-title">${escapeHtml(p.label)}${escapeHtml(suffix)}</div>
          <div class="preset-card-sub">${escapeHtml(p.description || p.region || "")}</div>
        </div>
      </label>`;
        }
      )
      .join("");
    grid.querySelectorAll(".preset-checkbox").forEach((box) => {
      box.addEventListener("change", () => {
        box.closest(".preset-card").classList.toggle("checked", box.checked);
      });
    });

    const quickHost = $("simpleQuickPresets");
    if (quickHost) {
      const quickIds = ["latin-ascii", "cjk-punctuation", "zh-Hans-3500", "zh-Hans-6500"];
      const quickList = state.presets.filter((p) => quickIds.includes(p.id));
      const displayList = quickList.length ? quickList : state.presets.slice(0, 4);
      quickHost.innerHTML = displayList
        .map((p) => {
          const count = p.expected_count ?? p.count;
          const suffix = count !== undefined && count !== null ? ` (${count})` : "";
          return `
            <label class="quick-preset-chip">
              <input type="checkbox" class="simple-preset-checkbox" value="${escapeHtml(p.id)}" />
              <span>${escapeHtml(p.label)}${escapeHtml(suffix)}</span>
            </label>`;
        })
        .join("");
      quickHost.querySelectorAll(".simple-preset-checkbox").forEach((box) => {
        box.addEventListener("change", () => {
          box.closest(".quick-preset-chip").classList.toggle("checked", box.checked);
        });
      });
    }
  }

  function renderLineChart(containerId, seriesList) {
    const host = $(containerId);
    host.innerHTML = "";
    if (!seriesList || !seriesList.length) {
      host.innerHTML = `<div class="empty-state">${
        state.lang === "en" ? "No telemetry points yet" : "暂无指标数据"
      }</div>`;
      return;
    }
    let minX = Infinity,
      maxX = -Infinity,
      minY = Infinity,
      maxY = -Infinity;
    seriesList.forEach((s) => {
      s.points.forEach((pt) => {
        const x = Number(pt.x);
        const y = Number(pt.y);
        if (Number.isFinite(x) && Number.isFinite(y)) {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      });
    });
    if (!Number.isFinite(minX)) {
      host.innerHTML = `<div class="empty-state">No numeric data</div>`;
      return;
    }
    if (minX === maxX) maxX = minX + 1;
    if (minY === maxY) {
      minY -= 0.5;
      maxY += 0.5;
    }
    const padY = (maxY - minY) * 0.08;
    minY -= padY;
    maxY += padY;

    const W = 520,
      H = 190,
      pl = 52,
      pr = 12,
      pt = 12,
      pb = 24;
    const iw = W - pl - pr;
    const ih = H - pt - pb;
    const sx = (x) => pl + ((x - minX) / (maxX - minX)) * iw;
    const sy = (y) => pt + ih - ((y - minY) / (maxY - minY)) * ih;

    const fmt = (v) =>
      Math.abs(v) < 0.01 && v !== 0 ? v.toExponential(1) : Number(v.toFixed(3)).toString();

    let gridLines = "";
    for (let i = 0; i <= 4; i++) {
      const yVal = minY + ((maxY - minY) * i) / 4;
      const yPos = sy(yVal);
      gridLines += `<line x1="${pl}" y1="${yPos}" x2="${W - pr}" y2="${yPos}" stroke="var(--border)" stroke-width="1" />`;
      gridLines += `<text x="${pl - 6}" y="${yPos + 4}" text-anchor="end" font-size="10" fill="var(--text-muted)">${escapeHtml(
        fmt(yVal)
      )}</text>`;
    }
    for (let i = 0; i <= 4; i++) {
      const xVal = minX + ((maxX - minX) * i) / 4;
      const xPos = sx(xVal);
      gridLines += `<text x="${xPos}" y="${H - 6}" text-anchor="middle" font-size="10" fill="var(--text-muted)">${Math.round(
        xVal
      )}</text>`;
    }

    let paths = "";
    const legendItems = [];
    seriesList.forEach((s, idx) => {
      const color = CHART_COLORS[idx % CHART_COLORS.length];
      const valid = s.points.filter(
        (p) => Number.isFinite(Number(p.x)) && Number.isFinite(Number(p.y))
      );
      if (!valid.length) return;
      const d = valid
        .map((p, i) => `${i === 0 ? "M" : "L"}${sx(Number(p.x)).toFixed(1)},${sy(Number(p.y)).toFixed(1)}`)
        .join(" ");
      paths += `<path d="${d}" fill="none" stroke="${color}" stroke-width="1.8" />`;
      const last = valid[valid.length - 1];
      legendItems.push(
        `<span class="legend-item"><span class="legend-swatch" style="background:${color}"></span>${escapeHtml(
          s.label
        )} (${escapeHtml(fmt(Number(last.y)))})</span>`
      );
    });

    host.innerHTML = `
      <svg class="chart-svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none">
        ${gridLines}
        ${paths}
      </svg>
      <div class="chart-legend">${legendItems.join("")}</div>
    `;
  }

  function renderMonitorRunChips() {
    const container = $("monitorRunsCheckboxes");
    const runs = (state.projectDetail && state.projectDetail.runs) || [];
    if (!runs.length) {
      container.innerHTML = `<div class="empty-state">${
        state.lang === "en" ? "No training runs yet." : "当前项目暂无训练记录。"
      }</div>`;
      return;
    }
    container.innerHTML = runs
      .map((run) => {
        const checked = state.selectedRunIds.includes(run.id);
        return `
        <label class="run-chip ${checked ? "active" : ""}">
          <input type="checkbox" class="monitor-run-box" value="${escapeHtml(run.id)}" ${
          checked ? "checked" : ""
        } />
          <span class="mono">${escapeHtml(run.id.slice(0, 8))}</span>
          <span class="pill">${escapeHtml(run.status)}</span>
        </label>`;
      })
      .join("");
    container.querySelectorAll(".monitor-run-box").forEach((box) => {
      box.addEventListener("change", () => {
        const boxes = [...container.querySelectorAll(".monitor-run-box:checked")];
        if (boxes.length > 5) {
          box.checked = false;
          toast(
            state.lang === "en" ? "Select at most 5 runs." : "最多同时对比 5 个训练记录。",
            "error"
          );
          return;
        }
        state.selectedRunIds = boxes.map((b) => b.value);
        renderMonitorRunChips();
        refreshDashboard();
      });
    });
  }

  async function refreshDashboard() {
    if (!state.activeProjectId) return;
    try {
      const data = await api(
        `/api/projects/${encodeURIComponent(state.activeProjectId)}/training/dashboard`,
        {
          method: "POST",
          body: { run_ids: state.selectedRunIds, language: state.lang },
        }
      );
      if (state.projectDetail) {
        state.projectDetail.runs = data.runs || [];
      }
      renderLineChart("chart-loss", data.series.loss);
      renderLineChart("chart-lr", data.series.lr);
      renderLineChart("chart-resources", data.series.resources);
      renderLineChart("chart-evaluation", data.series.evaluation);

      const summary = [data.summary, data.error ? `Error: ${data.error}` : ""]
        .filter(Boolean)
        .join("\n");
      $("monitorSummaryBar").textContent = summary;

      const snapBox = $("monitorSnapshots");
      if (!data.snapshots || !data.snapshots.length) {
        snapBox.innerHTML = `<div class="empty-state">${
          state.lang === "en" ? "No evaluation snapshots yet." : "暂无验证快照。"
        }</div>`;
      } else {
        snapBox.innerHTML = data.snapshots
          .map(
            (s) => `
          <div class="snapshot-item" data-url="${escapeHtml(s.url)}" data-cap="${escapeHtml(
              s.caption
            )}">
            <img src="${escapeHtml(s.url)}" loading="lazy" alt="${escapeHtml(s.caption)}" />
            <div class="snapshot-cap">${escapeHtml(s.caption)}</div>
          </div>`
          )
          .join("");
        snapBox.querySelectorAll(".snapshot-item").forEach((card) => {
          card.addEventListener("click", () =>
            openModal(card.dataset.url, card.dataset.cap)
          );
        });
      }

      const pWrap = $("monitorParamsTable");
      if (!data.parameter_rows || !data.parameter_rows.length) {
        pWrap.innerHTML = `<div class="empty-state">—</div>`;
      } else {
        pWrap.innerHTML = `
          <table class="flat-table">
            <thead><tr>${data.parameter_headers
              .map((h) => `<th>${escapeHtml(h)}</th>`)
              .join("")}</tr></thead>
            <tbody>${data.parameter_rows
              .map(
                (row) =>
                  `<tr>${row.map((cell) => `<td class="mono">${escapeHtml(cell)}</td>`).join("")}</tr>`
              )
              .join("")}</tbody>
          </table>`;
      }

      const ckptBox = $("monitorCheckpoints");
      ckptBox.innerHTML =
        data.checkpoints && data.checkpoints.length
          ? `<table class="flat-table"><thead><tr><th>Run</th><th>Epoch</th><th>Kind</th><th>Metric</th></tr></thead><tbody>${data.checkpoints
              .map(
                (c) =>
                  `<tr><td class="mono">${escapeHtml(c.run)}</td><td>${escapeHtml(
                    c.epoch
                  )}</td><td>${escapeHtml(c.kind)}</td><td>${escapeHtml(c.metric)}</td></tr>`
              )
              .join("")}</tbody></table>`
          : `<div class="empty-state">${
              state.lang === "en" ? "No checkpoints logged" : "暂无检查点记录"
            }</div>`;

      const alertBox = $("monitorAlerts");
      alertBox.innerHTML =
        data.alerts && data.alerts.length
          ? `<table class="flat-table"><thead><tr><th>Run</th><th>Step</th><th>Alert</th></tr></thead><tbody>${data.alerts
              .map(
                (a) =>
                  `<tr><td class="mono">${escapeHtml(a.run)}</td><td>${escapeHtml(
                    a.step
                  )}</td><td>${escapeHtml(a.alert)}</td></tr>`
              )
              .join("")}</tbody></table>`
          : `<div class="empty-state">${
              state.lang === "en" ? "No alerts" : "无告警"
            }</div>`;
    } catch (err) {
      toast(err.message, "error");
    }
  }

  async function loadReviewPage(page = 1) {
    if (!state.activeProjectId) return;
    const batch = $("reviewBatchSelect").value;
    const grid = $("reviewGlyphGrid");
    if (!batch) {
      grid.innerHTML = `<div class="empty-state">${
        state.lang === "en" ? "No generation batch selected." : "请先选择或生成一个字形批次。"
      }</div>`;
      $("reviewPageInfo").textContent = "0 / 0";
      return;
    }
    const search = $("reviewSearchInput").value.trim();
    try {
      const data = await api(
        `/api/projects/${encodeURIComponent(state.activeProjectId)}/review/page?batch_path=${encodeURIComponent(
          batch
        )}&search=${encodeURIComponent(search)}&page=${page}&page_size=100`
      );
      state.reviewPage = data.page;
      state.reviewTotalPages = data.total_pages;
      $("reviewPageInfo").textContent = `${data.page} / ${data.total_pages}`;
      if (!data.items.length) {
        grid.innerHTML = `<div class="empty-state">${
          state.lang === "en" ? "No matching glyphs." : "未找到匹配的字形。"
        }</div>`;
        return;
      }
      grid.innerHTML = data.items
        .map(
          (item) => `
        <div class="glyph-cell${item.manual ? " manual" : ""}${
            item.codepoint === state.activeReviewCodepoint ? " active" : ""
          }" data-cp="${escapeHtml(item.codepoint)}">
          <img src="${escapeHtml(item.url)}" loading="lazy" alt="${escapeHtml(item.codepoint)}" />
          <div class="glyph-meta">
            <span>${escapeHtml(item.char)}</span>
            <span class="mono">${escapeHtml(item.codepoint.replace("U+", ""))}</span>
          </div>
        </div>`
        )
        .join("");
      grid.querySelectorAll(".glyph-cell").forEach((cell) => {
        cell.addEventListener("click", () => {
          state.activeReviewCodepoint = cell.dataset.cp;
          grid.querySelectorAll(".glyph-cell").forEach((c) => c.classList.remove("active"));
          cell.classList.add("active");
          loadCandidates(cell.dataset.cp);
        });
      });
    } catch (err) {
      toast(err.message, "error");
    }
  }

  async function loadCandidates(codepoint) {
    const batch = $("reviewBatchSelect").value;
    const body = $("candidateInspectorBody");
    if (!batch || !codepoint) return;
    try {
      const data = await api(
        `/api/projects/${encodeURIComponent(
          state.activeProjectId
        )}/review/candidates?batch_path=${encodeURIComponent(
          batch
        )}&codepoint=${encodeURIComponent(codepoint)}`
      );
      body.className = "";
      body.innerHTML = `
        <div class="kv-item">
          <span class="kv-key">${escapeHtml(data.codepoint)}</span>
          <span class="kv-val" style="font-size:20px;font-weight:600">${escapeHtml(data.char)}</span>
        </div>
        <div class="candidate-list" style="margin-top:10px">
          ${data.candidates
            .map(
              (c) => `
            <div class="candidate-card${c.selected ? " selected" : ""}" data-path="${escapeHtml(
                c.path
              )}">
              <img src="${escapeHtml(c.url)}" alt="${escapeHtml(c.name)}" />
              <div class="candidate-card-foot">${escapeHtml(c.name)}${
                c.selected ? " (Selected)" : ""
              }</div>
            </div>`
            )
            .join("")}
        </div>
        <div class="action-row" style="margin-top:10px">
          <button class="btn btn-ghost btn-xs" id="clearCandidateBtn" type="button">${
            state.lang === "en" ? "Reset to Default" : "清除手动覆盖"
          }</button>
        </div>
      `;
      body.querySelectorAll(".candidate-card").forEach((card) => {
        card.addEventListener("click", async () => {
          try {
            await api(
              `/api/projects/${encodeURIComponent(state.activeProjectId)}/review/select`,
              {
                method: "POST",
                body: {
                  batch_path: batch,
                  codepoint,
                  image_path: card.dataset.path,
                },
              }
            );
            toast(`${codepoint} updated`, "ok");
            loadCandidates(codepoint);
            loadReviewPage(state.reviewPage);
          } catch (err) {
            toast(err.message, "error");
          }
        });
      });
      $("clearCandidateBtn").addEventListener("click", async () => {
        try {
          await api(
            `/api/projects/${encodeURIComponent(
              state.activeProjectId
            )}/review/select?codepoint=${encodeURIComponent(codepoint)}`,
            { method: "DELETE" }
          );
          toast(`${codepoint} reset`, "info");
          loadCandidates(codepoint);
          loadReviewPage(state.reviewPage);
        } catch (err) {
          toast(err.message, "error");
        }
      });
    } catch (err) {
      toast(err.message, "error");
    }
  }

  async function refreshArtifacts() {
    if (!state.activeProjectId) return;
    try {
      const data = await api(
        `/api/projects/${encodeURIComponent(state.activeProjectId)}/export/artifacts`
      );
      const list = $("exportArtifactsList");
      const simpleList = $("simpleArtifactsList");
      const artifactHtml = !data.artifacts.length
        ? `<div class="empty-state">${
          state.lang === "en" ? "No built fonts yet." : "尚未导出字体产物。"
        }</div>`
        : data.artifacts
            .map(
              (a) => `
          <div class="file-item">
            <span class="mono">${escapeHtml(a.name)} (${a.size_kb} KB)</span>
            <a href="${escapeHtml(a.url)}" download="${escapeHtml(a.name)}">${
              state.lang === "en" ? "Download" : "下载"
            }</a>
          </div>`
            )
            .join("");
      list.innerHTML = artifactHtml;
      if (simpleList) simpleList.innerHTML = artifactHtml;

      const svgGrid = $("exportSvgGrid");
      if (!data.svgs.length) {
        svgGrid.innerHTML = `<div class="empty-state">—</div>`;
      } else {
        svgGrid.innerHTML = data.svgs
          .slice(0, 48)
          .map(
            (s) => `
          <div class="svg-tile">
            <img src="${escapeHtml(s.url)}" loading="lazy" alt="${escapeHtml(s.name)}" />
            <span>${escapeHtml(s.name.replace(".svg", ""))}</span>
          </div>`
          )
          .join("");
      }

      if (data.preview_font_url) {
        state.previewFontCounter += 1;
        const family = `Zi2ZiPreview_${state.previewFontCounter}`;
        let styleEl = document.getElementById("dynamicFontPreviewStyle");
        if (!styleEl) {
          styleEl = document.createElement("style");
          styleEl.id = "dynamicFontPreviewStyle";
          document.head.appendChild(styleEl);
        }
        styleEl.textContent = `@font-face { font-family: "${family}"; src: url("${data.preview_font_url}&v=${state.previewFontCounter}") format("truetype"); }`;
        $("specimenTextarea").style.fontFamily = `"${family}", sans-serif`;
        $("previewFontBadge").textContent = data.preview_font_name;
        if ($("simpleSpecimenTextarea")) {
          $("simpleSpecimenTextarea").style.fontFamily = `"${family}", sans-serif`;
          $("simplePreviewFontBadge").textContent = data.preview_font_name;
        }
      } else {
        $("specimenTextarea").style.fontFamily = "inherit";
        $("previewFontBadge").textContent =
          state.lang === "en" ? "No built TTF yet" : "暂无可预览字库";
        if ($("simpleSpecimenTextarea")) {
          $("simpleSpecimenTextarea").style.fontFamily = "inherit";
          $("simplePreviewFontBadge").textContent =
            state.lang === "en" ? "No built TTF yet" : "暂无可预览字库";
        }
      }
    } catch (err) {
      toast(err.message, "error");
    }
  }

  function statusPillClass(status) {
    if (status === "completed") return "ok";
    if (status === "running" || status === "queued") return "accent";
    if (status === "failed") return "danger";
    return "warn";
  }

  function renderJobsState() {
    const active = state.jobs.filter((j) => j.status === "running" || j.status === "queued");
    const badge = $("activeJobsBadge");
    if (active.length) {
      badge.textContent = String(active.length);
      badge.classList.remove("hidden");
      const running = active.find((j) => j.status === "running") || active[0];
      $("topJobDot").className = "status-dot running";
      $("topJobText").textContent =
        state.lang === "en"
          ? `${running.job_type} (${active.length})`
          : `${running.job_type} 运行中 (${active.length})`;
      if ($("simpleJobBanner")) {
        $("simpleJobBanner").classList.remove("hidden");
        const pct = Math.round((running.progress || 0) * 100);
        $("simpleJobBannerText").textContent =
          state.lang === "en"
            ? `Running ${running.job_type} (${pct}%) — ${active.length} active job(s)`
            : `正在执行 ${running.job_type}（进度 ${pct}%），当前共 ${active.length} 个活动任务`;
      }
    } else {
      badge.classList.add("hidden");
      $("topJobDot").className = "status-dot ok";
      $("topJobText").textContent = state.lang === "en" ? "Idle" : "空闲";
      if ($("simpleJobBanner")) {
        $("simpleJobBanner").classList.add("hidden");
      }
    }

    const wrap = $("jobsTableWrap");
    if (!wrap) return;
    if (!state.jobs.length) {
      wrap.innerHTML = `<div class="empty-state">${
        state.lang === "en" ? "No jobs yet." : "暂无后台任务。"
      }</div>`;
      return;
    }

    wrap.innerHTML = `
      <table class="flat-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>${state.lang === "en" ? "Type" : "类型"}</th>
            <th>${state.lang === "en" ? "Status" : "状态"}</th>
            <th>${state.lang === "en" ? "Device" : "设备"}</th>
            <th>${state.lang === "en" ? "Progress" : "进度"}</th>
          </tr>
        </thead>
        <tbody>
          ${state.jobs
            .map(
              (j) => `
            <tr data-id="${escapeHtml(j.id)}" class="${
                j.id === state.selectedJobId ? "selected" : ""
              }">
              <td class="mono">${escapeHtml(j.id.slice(0, 8))}</td>
              <td>${escapeHtml(j.job_type)}</td>
              <td><span class="pill ${statusPillClass(j.status)}">${escapeHtml(
                j.status
              )}</span></td>
              <td class="mono">${escapeHtml(j.gpu || "—")}</td>
              <td class="mono">${Math.round((j.progress || 0) * 100)}%</td>
            </tr>`
            )
            .join("")}
        </tbody>
      </table>`;

    wrap.querySelectorAll("tbody tr").forEach((tr) => {
      tr.addEventListener("click", () => selectJob(tr.dataset.id));
    });
  }

  async function refreshJobs() {
    const onlyCurrent = $("jobsOnlyCurrentProject")?.checked;
    const query =
      onlyCurrent && state.activeProjectId
        ? `?project_id=${encodeURIComponent(state.activeProjectId)}`
        : "";
    try {
      const data = await api(`/api/jobs${query}`);
      const prevRunning = state.jobs.some((j) => j.status === "running" || j.status === "queued");
      state.jobs = data.jobs || [];
      const nowRunning = state.jobs.some((j) => j.status === "running" || j.status === "queued");
      renderJobsState();
      if (state.selectedJobId && state.view === "jobs") {
        await loadJobLog(state.selectedJobId);
      }
      if (prevRunning && !nowRunning) {
        const [modelsData, pkgData, projData] = await Promise.all([
          api("/api/models/shared"),
          api("/api/project-packages"),
          api("/api/projects"),
        ]);
        state.sharedModels = modelsData.models || [];
        state.exportPackages = pkgData.packages || [];
        state.projects = projData.projects || [];
        renderSharedModels();
        renderExportPackages();
        renderProjectsList();
        if (state.activeProjectId) {
          await selectProject(state.activeProjectId, false);
        }
      }
    } catch {
      // Ignore transient poll errors
    }
  }

  async function selectJob(jobId) {
    state.selectedJobId = jobId;
    renderJobsState();
    await loadJobLog(jobId);
  }

  async function loadJobLog(jobId) {
    try {
      const data = await api(`/api/jobs/${encodeURIComponent(jobId)}/log`);
      const job = data.job;
      $("logPanelTitle").textContent = `${job.job_type} · ${job.id.slice(0, 8)}`;
      $("logPanelMeta").textContent = `Status: ${job.status} | GPU: ${job.gpu || "—"} | Exit: ${
        job.exit_code ?? "—"
      }${job.error ? " | Error: " + job.error : ""}`;
      const viewer = $("jobLogOutput");
      const atBottom = viewer.scrollTop + viewer.clientHeight >= viewer.scrollHeight - 40;
      viewer.textContent = data.log || "(empty log)";
      if (atBottom) viewer.scrollTop = viewer.scrollHeight;

      const canCancel = job.status === "queued" || job.status === "running";
      const canRetry = ["failed", "cancelled", "interrupted"].includes(job.status);
      $("cancelJobBtn").classList.toggle("hidden", !canCancel);
      $("retryJobBtn").classList.toggle("hidden", !canRetry);
    } catch (err) {
      toast(err.message, "error");
    }
  }

  function openModal(url, caption) {
    $("modalImage").src = url;
    $("modalCaption").textContent = caption || "";
    $("imageModal").classList.remove("hidden");
  }

  function setupDropzones() {
    document.querySelectorAll(".dropzone").forEach((zone) => {
      const inputId = zone.dataset.input;
      const input = $(inputId);
      const labelEl = zone.querySelector(".dropzone-files");

      const updateNames = () => {
        if (!labelEl) return;
        const files = [...(input.files || [])];
        labelEl.textContent = files.length
          ? files.length <= 3
            ? files.map((f) => f.name).join(", ")
            : `${files.length} files (${files[0].name}, ...)`
          : "";
      };

      zone.addEventListener("click", () => input.click());
      input.addEventListener("change", updateNames);
      zone.addEventListener("dragover", (e) => {
        e.preventDefault();
        zone.classList.add("dragover");
      });
      zone.addEventListener("dragleave", () => zone.classList.remove("dragover"));
      zone.addEventListener("drop", (e) => {
        e.preventDefault();
        zone.classList.remove("dragover");
        if (e.dataTransfer && e.dataTransfer.files.length) {
          input.files = e.dataTransfer.files;
          updateNames();
        }
      });
    });
  }

  function bindEvents() {
    document.querySelectorAll(".nav-item").forEach((btn) => {
      btn.addEventListener("click", () => switchView(btn.dataset.view));
    });
    $("mobileMenuBtn").addEventListener("click", () => {
      $("sidebar").classList.toggle("open");
    });
    $("topJobPill").addEventListener("click", () => switchView("jobs"));
    $("quickNewProjectBtn").addEventListener("click", () => {
      if (state.uiMode === "simple") {
        switchView("simple");
        $("simpleNewProjectName").focus();
      } else {
        switchView("projects");
        $("newProjectName").focus();
      }
    });

    document.querySelectorAll("#uiModeSwitcher .mode-btn").forEach((btn) => {
      btn.addEventListener("click", () => applyUiMode(btn.dataset.uiMode, true));
    });

    $("simpleViewLogsBtn").addEventListener("click", () => switchView("jobs"));

    $("simpleCreateProjectBtn").addEventListener("click", async () => {
      const name = $("simpleNewProjectName").value.trim();
      if (!name) {
        toast(state.lang === "en" ? "Enter a project name." : "请输入项目名称。", "error");
        return;
      }
      try {
        const res = await api("/api/projects", { method: "POST", body: { name } });
        $("simpleNewProjectName").value = "";
        const listData = await api("/api/projects");
        state.projects = listData.projects || [];
        await selectProject(res.project.id, false);
        toast(
          state.lang === "en"
            ? `Project "${res.project.name}" created.`
            : `已创建项目「${res.project.name}」`,
          "ok"
        );
      } catch (err) {
        toast(err.message, "error");
      }
    });

    $("simpleAttachModelBtn").addEventListener("click", async () => {
      if (!requireProject()) return;
      const modelPath = $("simpleSharedModelSelect").value;
      if (!modelPath) {
        toast(
          state.lang === "en"
            ? "No shared model found. Click download below."
            : "共享库暂无模型，请点击下方「一键下载官方 JiT-B/16」。",
          "error"
        );
        return;
      }
      try {
        const res = await api(
          `/api/projects/${encodeURIComponent(state.activeProjectId)}/models/attach-shared`,
          { method: "POST", body: { model_path: modelPath } }
        );
        toast(
          res.validation_job_id
            ? `已挂载模型，正在校验：${res.validation_job_id.slice(0, 8)}`
            : state.lang === "en"
            ? "Base model attached."
            : "已挂载基础模型。",
          "ok"
        );
        await selectProject(state.activeProjectId, false);
        refreshJobs();
      } catch (err) {
        toast(err.message, "error");
      }
    });

    $("simpleDownloadDefaultBtn").addEventListener("click", async () => {
      try {
        const res = await api("/api/models/download", {
          method: "POST",
          body: { model_name: "JiT-B/16" },
        });
        toast(
          state.lang === "en"
            ? `Queued JiT-B/16 download: ${res.job_id.slice(0, 8)}`
            : `已加入 JiT-B/16 下载队列：${res.job_id.slice(0, 8)}`,
          "ok"
        );
        refreshJobs();
      } catch (err) {
        toast(err.message, "error");
      }
    });

    $("simpleToggleUploadModelBtn").addEventListener("click", () => {
      $("simpleLocalModelBox").classList.toggle("hidden");
    });

    $("simpleUploadModelBtn").addEventListener("click", async () => {
      if (!requireProject()) return;
      const file = $("simpleLocalModelFile").files[0];
      if (!file) {
        toast(state.lang === "en" ? "Select a checkpoint file." : "请先选择权重文件。", "error");
        return;
      }
      const fd = new FormData();
      fd.append("file", file);
      fd.append("trusted", $("simpleTrustLocalModel").checked ? "true" : "false");
      try {
        await api(
          `/api/projects/${encodeURIComponent(state.activeProjectId)}/models/import`,
          { method: "POST", body: fd }
        );
        $("simpleLocalModelBox").classList.add("hidden");
        toast(state.lang === "en" ? "Model imported & attached." : "本地模型已导入并挂载。", "ok");
        await bootstrap();
      } catch (err) {
        toast(err.message, "error");
      }
    });

    $("simpleSaveAssetsBtn").addEventListener("click", async () => {
      if (!requireProject()) return;
      const fd = new FormData();
      fd.append("input_mode", "font");
      [...($("simpleSourceFontsInput").files || [])].forEach((f) =>
        fd.append("source_fonts", f)
      );
      [...($("simpleTargetFontInput").files || [])].forEach((f) =>
        fd.append("target_files", f)
      );
      try {
        await api(`/api/projects/${encodeURIComponent(state.activeProjectId)}/assets`, {
          method: "POST",
          body: fd,
        });
        toast(
          state.lang === "en"
            ? "Fonts saved and style references extracted."
            : "字体已保存，风格参考池已自动提取。",
          "ok"
        );
        await selectProject(state.activeProjectId, false);
      } catch (err) {
        toast(err.message, "error");
      }
    });

    document.querySelectorAll("#simpleStep3Tabs .seg-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelectorAll("#simpleStep3Tabs .seg-btn").forEach((b) => {
          b.classList.toggle("active", b === btn);
        });
        document.querySelectorAll(".simple-pane").forEach((p) => {
          p.classList.toggle("active", p.id === btn.dataset.simpleTab);
        });
      });
    });

    $("simpleFillSampleBtn").addEventListener("click", () => {
      $("simpleGenText").value = "永和九年岁在癸丑暮春之初会于会稽山阴之兰亭";
      $("simpleGenText").dispatchEvent(new Event("input"));
    });

    $("simpleGenText").addEventListener("input", () => {
      const unique = new Set([...$("simpleGenText").value.replace(/\s+/g, "")]);
      $("simpleCharCounter").textContent =
        state.lang === "en"
          ? `${unique.size} unique characters`
          : `${unique.size} 个去重字符`;
    });

    $("simpleStartGenBtn").addEventListener("click", async () => {
      if (!requireProject()) return;
      const presets = [...document.querySelectorAll(".simple-preset-checkbox:checked")].map(
        (b) => b.value
      );
      const text = $("simpleGenText").value;
      if (!text.trim() && !presets.length) {
        toast(
          state.lang === "en"
            ? "Enter text or select at least one preset."
            : "请输入想要生成的文字，或勾选至少一个常用字符集。",
          "error"
        );
        return;
      }
      const detail = state.projectDetail;
      const ckpt =
        (detail && (detail.preferred_checkpoint || detail.manifest.base_model)) || "";
      const fd = new FormData();
      fd.append("text", text);
      fd.append("preset_ids", JSON.stringify(presets));
      fd.append("split_regions", "false");
      fd.append("primary_region", "SC");
      fd.append("device", getDefaultDevice(false));
      fd.append("generation_checkpoint", ckpt);
      fd.append("seed", "42");
      fd.append("candidates", "1");
      fd.append("allow_large_candidates", "false");
      try {
        const res = await api(
          `/api/projects/${encodeURIComponent(state.activeProjectId)}/generation/build`,
          { method: "POST", body: fd }
        );
        if (res.message) {
          toast(res.message, "info");
        } else {
          toast(
            state.lang === "en"
              ? `Queued ${res.generated_count} glyph(s) for generation.`
              : `已开始生成 ${res.generated_count} 个字形（自动跳过已有 ${res.skipped_existing_count} 字）。`,
            "ok"
          );
          refreshJobs();
        }
      } catch (err) {
        toast(err.message, "error");
      }
    });

    $("simpleBuildDatasetBtn").addEventListener("click", async () => {
      if (!requireProject()) return;
      const mode = $("simpleTrainPreset").value;
      const trainCount = mode === "fast" ? 500 : 3000;
      const testCount = mode === "fast" ? 8 : 64;
      try {
        const res = await api(
          `/api/projects/${encodeURIComponent(state.activeProjectId)}/dataset/build`,
          {
            method: "POST",
            body: {
              train_count: trainCount,
              test_count: testCount,
              charset: "auto",
              workers: 4,
            },
          }
        );
        toast(
          state.lang === "en"
            ? `Dataset build queued: ${res.job_id.slice(0, 8)}`
            : `已提交训练数据构建任务：${res.job_id.slice(0, 8)}`,
          "ok"
        );
        refreshJobs();
      } catch (err) {
        toast(err.message, "error");
      }
    });

    $("simpleStartTrainBtn").addEventListener("click", async () => {
      if (!requireProject()) return;
      const mode = $("simpleTrainPreset").value;
      const epochs = mode === "fast" ? 10 : 20;
      const quality = mode === "fast" ? "economy" : "balanced";
      const dsPath = (state.projectDetail && state.projectDetail.dataset_path) || "";
      try {
        const res = await api(
          `/api/projects/${encodeURIComponent(state.activeProjectId)}/training/start`,
          {
            method: "POST",
            body: {
              dataset_path: dsPath,
              device: getDefaultDevice(true),
              quality,
              epochs,
              horizontal_flip_prob: 0.0,
            },
          }
        );
        toast(
          state.lang === "en"
            ? `LoRA fine-tuning started: ${res.job_id.slice(0, 8)}`
            : `已启动快速微调任务：${res.job_id.slice(0, 8)}`,
          "ok"
        );
        await selectProject(state.activeProjectId, false);
        refreshJobs();
      } catch (err) {
        toast(err.message, "error");
      }
    });

    $("simpleGoMonitorBtn").addEventListener("click", () => {
      applyUiMode("advanced", false);
      switchView("monitor");
    });

    $("simpleBuildFontBtn").addEventListener("click", async () => {
      if (!requireProject()) return;
      const detail = state.projectDetail;
      const batch =
        (detail &&
          (detail.preferred_batch ||
            (detail.generation_batches && detail.generation_batches[0]?.path))) ||
        "";
      if (!batch) {
        toast(
          state.lang === "en"
            ? "Generate glyphs in Step 3 first."
            : "请先在第 3 步生成至少一批字形。",
          "error"
        );
        return;
      }
      const family = $("simpleExportFamily").value.trim() || "MyCustomFont";
      try {
        const res = await api(
          `/api/projects/${encodeURIComponent(state.activeProjectId)}/export/build`,
          {
            method: "POST",
            body: {
              generation_batch: batch,
              family,
              style: "Regular",
              version: "1.0",
              designer: "",
              license_text: "",
              profiles: ["proportional"],
              threshold: 180,
              despeckle: 4,
            },
          }
        );
        toast(
          state.lang === "en"
            ? `Font build queued (${res.glyph_count} glyphs)`
            : `已开始合成 TTF 字库（共 ${res.glyph_count} 字）`,
          "ok"
        );
        refreshJobs();
      } catch (err) {
        toast(err.message, "error");
      }
    });

    $("simpleRefreshArtifactsBtn").addEventListener("click", refreshArtifacts);
    $("globalProjectSelect").addEventListener("change", (e) => {
      if (e.target.value) selectProject(e.target.value, true);
    });

    $("themeToggleBtn").addEventListener("click", () => {
      state.theme = state.theme === "dark" ? "light" : "dark";
      applyTheme();
    });
    $("langToggleBtn").addEventListener("click", async () => {
      state.lang = state.lang === "en" ? "zh" : "en";
      applyLanguage();
      await bootstrap();
    });

    $("closeModalBtn").addEventListener("click", () => $("imageModal").classList.add("hidden"));
    $("imageModal").addEventListener("click", (e) => {
      if (e.target === $("imageModal")) $("imageModal").classList.add("hidden");
    });

    $("createProjectBtn").addEventListener("click", async () => {
      const name = $("newProjectName").value.trim();
      if (!name) {
        toast(state.lang === "en" ? "Enter a project name." : "请输入项目名称。", "error");
        return;
      }
      try {
        const res = await api("/api/projects", { method: "POST", body: { name } });
        $("newProjectName").value = "";
        const listData = await api("/api/projects");
        state.projects = listData.projects || [];
        await selectProject(res.project.id, false);
        toast(
          state.lang === "en"
            ? `Project "${res.project.name}" created.`
            : `已创建项目「${res.project.name}」`,
          "ok"
        );
      } catch (err) {
        toast(err.message, "error");
      }
    });

    $("refreshProjectsBtn").addEventListener("click", bootstrap);

    $("deleteProjectBtn").addEventListener("click", async () => {
      if (!requireProject()) return;
      const confirmed = $("confirmDeleteProject").checked;
      if (!confirmed) {
        toast(
          state.lang === "en"
            ? "Check the confirmation box first."
            : "请先勾选确认删除复选框。",
          "error"
        );
        return;
      }
      try {
        await api(`/api/projects/${encodeURIComponent(state.activeProjectId)}`, {
          method: "DELETE",
          body: { confirmed: true },
        });
        $("confirmDeleteProject").checked = false;
        state.activeProjectId = "";
        toast(state.lang === "en" ? "Project deleted." : "项目已永久删除。", "ok");
        await bootstrap();
      } catch (err) {
        toast(err.message, "error");
      }
    });

    $("exportPackageBtn").addEventListener("click", async () => {
      if (!requireProject()) return;
      try {
        const res = await api(
          `/api/projects/${encodeURIComponent(state.activeProjectId)}/export`,
          {
            method: "POST",
            body: {
              mode: $("exportPackageMode").value,
              include_shared_models: $("exportIncludeShared").checked,
            },
          }
        );
        toast(`Export job queued: ${res.job_id.slice(0, 8)}`, "ok");
        refreshJobs();
      } catch (err) {
        toast(err.message, "error");
      }
    });

    $("inspectPackageBtn").addEventListener("click", async () => {
      const file = $("importPackageFile").files[0];
      if (!file) {
        toast(state.lang === "en" ? "Select a .zip file first." : "请先选择 .zip 文件。", "error");
        return;
      }
      const fd = new FormData();
      fd.append("file", file);
      try {
        const res = await api("/api/project-packages/inspect", { method: "POST", body: fd });
        state.stagedImportPath = res.staged_path;
        const info = res.inspection;
        $("packageInspectionBox").textContent =
          `Project: ${info.project_name || "?"} (${info.mode || "?"})\n` +
          `Files: ${info.file_count ?? "?"} | Runs: ${info.training_run_count ?? 0}\n` +
          `Warnings: ${(info.warnings || []).join("; ") || "None"}`;
        $("packageInspectionBox").classList.remove("hidden");
        $("confirmImportRow").classList.remove("hidden");
        $("confirmImportPackage").checked = false;
        toast(state.lang === "en" ? "Package verified." : "项目包预检通过。", "ok");
      } catch (err) {
        toast(err.message, "error");
      }
    });

    $("importPackageBtn").addEventListener("click", async () => {
      if (!state.stagedImportPath) return;
      if (!$("confirmImportPackage").checked) {
        toast(state.lang === "en" ? "Confirm import first." : "请先勾选确认导入。", "error");
        return;
      }
      try {
        const res = await api("/api/project-packages/import", {
          method: "POST",
          body: { staged_path: state.stagedImportPath, confirmed: true },
        });
        state.stagedImportPath = "";
        $("packageInspectionBox").classList.add("hidden");
        $("confirmImportRow").classList.add("hidden");
        toast(`Import job queued: ${res.job_id.slice(0, 8)}`, "ok");
        refreshJobs();
      } catch (err) {
        toast(err.message, "error");
      }
    });

    $("downloadOfficialBtn").addEventListener("click", async () => {
      try {
        const res = await api("/api/models/download", {
          method: "POST",
          body: { model_name: $("officialModelSelect").value },
        });
        toast(`Download queued: ${res.job_id.slice(0, 8)}`, "ok");
        refreshJobs();
      } catch (err) {
        toast(err.message, "error");
      }
    });

    $("refreshSharedModelsBtn").addEventListener("click", async () => {
      const data = await api("/api/models/shared");
      state.sharedModels = data.models || [];
      renderSharedModels();
      toast(state.lang === "en" ? "Refreshed." : "已刷新共享模型列表。", "info");
    });

    $("attachSharedModelBtn").addEventListener("click", async () => {
      if (!requireProject()) return;
      const modelPath = $("sharedModelSelect").value;
      if (!modelPath) {
        toast(state.lang === "en" ? "No model selected." : "请先选择一个共享模型。", "error");
        return;
      }
      try {
        const res = await api(
          `/api/projects/${encodeURIComponent(state.activeProjectId)}/models/attach-shared`,
          { method: "POST", body: { model_path: modelPath } }
        );
        toast(
          res.validation_job_id
            ? `Model attached. Validation queued: ${res.validation_job_id.slice(0, 8)}`
            : state.lang === "en"
            ? "Base model attached."
            : "已挂载基础模型。",
          "ok"
        );
        await selectProject(state.activeProjectId, false);
        refreshJobs();
      } catch (err) {
        toast(err.message, "error");
      }
    });

    $("uploadLocalModelBtn").addEventListener("click", async () => {
      if (!requireProject()) return;
      const file = $("localModelFile").files[0];
      if (!file) {
        toast(state.lang === "en" ? "Select a checkpoint file." : "请先选择权重文件。", "error");
        return;
      }
      const fd = new FormData();
      fd.append("file", file);
      fd.append("trusted", $("trustLocalModel").checked ? "true" : "false");
      try {
        await api(
          `/api/projects/${encodeURIComponent(state.activeProjectId)}/models/import`,
          { method: "POST", body: fd }
        );
        toast(state.lang === "en" ? "Model imported & attached." : "本地模型导入并挂载成功。", "ok");
        await bootstrap();
      } catch (err) {
        toast(err.message, "error");
      }
    });

    document.querySelectorAll("#inputModeSwitch .seg-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.inputMode = btn.dataset.mode;
        document.querySelectorAll("#inputModeSwitch .seg-btn").forEach((b) => {
          b.classList.toggle("active", b === btn);
        });
        updateInputModeLabels();
      });
    });

    $("saveAssetsBtn").addEventListener("click", async () => {
      if (!requireProject()) return;
      const fd = new FormData();
      fd.append("input_mode", state.inputMode);
      const appendFiles = (field, inputId) => {
        [...($(inputId).files || [])].forEach((f) => fd.append(field, f));
      };
      appendFiles("source_fonts", "sourceFontsInput");
      appendFiles("target_files", "targetAssetsInput");
      appendFiles("sc_fonts", "scFontsInput");
      appendFiles("tc_fonts", "tcFontsInput");
      appendFiles("jp_fonts", "jpFontsInput");
      appendFiles("kr_fonts", "krFontsInput");
      try {
        await api(`/api/projects/${encodeURIComponent(state.activeProjectId)}/assets`, {
          method: "POST",
          body: fd,
        });
        toast(
          state.lang === "en"
            ? "Assets saved and style reference pool updated."
            : "素材已保存并构建风格参考池。",
          "ok"
        );
        await selectProject(state.activeProjectId, false);
      } catch (err) {
        toast(err.message, "error");
      }
    });

    document.querySelectorAll(".dataset-preset-btn").forEach((btn) => {
      btn.addEventListener("click", async () => {
        try {
          const res = await api(`/api/dataset/preset/${encodeURIComponent(btn.dataset.preset)}`);
          $("datasetTrainCount").value = res.train_count;
          $("datasetTestCount").value = res.test_count;
        } catch (err) {
          toast(err.message, "error");
        }
      });
    });

    $("checkCapacityBtn").addEventListener("click", async () => {
      if (!requireProject()) return;
      try {
        const res = await api(
          `/api/projects/${encodeURIComponent(state.activeProjectId)}/dataset/capacity`,
          {
            method: "POST",
            body: {
              charset: $("datasetCharset").value,
              test_count: Number($("datasetTestCount").value || 64),
            },
          }
        );
        $("datasetCapacityInfo").textContent =
          state.lang === "en"
            ? `Usable common glyphs: ${res.capacity} (max train: ${res.max_train})`
            : `检测到公共可用字数：${res.capacity}（扣除验证集后最多可训练 ${res.max_train} 字）`;
      } catch (err) {
        toast(err.message, "error");
      }
    });

    $("buildDatasetBtn").addEventListener("click", async () => {
      if (!requireProject()) return;
      try {
        const res = await api(
          `/api/projects/${encodeURIComponent(state.activeProjectId)}/dataset/build`,
          {
            method: "POST",
            body: {
              train_count: Number($("datasetTrainCount").value),
              test_count: Number($("datasetTestCount").value),
              charset: $("datasetCharset").value,
              workers: Number($("datasetWorkers").value || 4),
            },
          }
        );
        $("trainDatasetPath").value = res.dataset_path;
        $("datasetCapacityInfo").textContent = `Dataset job ${res.job_id.slice(
          0,
          8
        )} queued -> ${res.dataset_path}`;
        toast(`Dataset job queued: ${res.job_id.slice(0, 8)}`, "ok");
        refreshJobs();
      } catch (err) {
        toast(err.message, "error");
      }
    });

    $("startTrainingBtn").addEventListener("click", async () => {
      if (!requireProject()) return;
      try {
        const res = await api(
          `/api/projects/${encodeURIComponent(state.activeProjectId)}/training/start`,
          {
            method: "POST",
            body: {
              dataset_path: $("trainDatasetPath").value.trim(),
              device: $("trainDevice").value,
              quality: $("trainQuality").value,
              epochs: Number($("trainEpochs").value),
              horizontal_flip_prob: Number($("trainHflip").value || 0),
            },
          }
        );
        toast(`Training started (${res.architecture}): ${res.job_id.slice(0, 8)}`, "ok");
        await selectProject(state.activeProjectId, false);
        refreshJobs();
      } catch (err) {
        toast(err.message, "error");
      }
    });

    $("resumeRunBtn").addEventListener("click", async () => {
      if (!requireProject()) return;
      const runId = $("manageRunSelect").value;
      if (!runId) {
        toast(state.lang === "en" ? "Select a run first." : "请先选择训练记录。", "error");
        return;
      }
      try {
        const res = await api(
          `/api/projects/${encodeURIComponent(state.activeProjectId)}/training/resume`,
          {
            method: "POST",
            body: {
              run_id: runId,
              dataset_path: $("trainDatasetPath").value.trim(),
              device: $("trainDevice").value,
              epochs: Number($("trainEpochs").value),
              horizontal_flip_prob: Number($("trainHflip").value || 0),
            },
          }
        );
        toast(`Resumed as ${res.run_id.slice(0, 8)}`, "ok");
        await selectProject(state.activeProjectId, false);
        refreshJobs();
      } catch (err) {
        toast(err.message, "error");
      }
    });

    $("deleteRunBtn").addEventListener("click", async () => {
      if (!requireProject()) return;
      const runId = $("manageRunSelect").value;
      if (!runId) return;
      if (!$("confirmDeleteRun").checked) {
        toast(state.lang === "en" ? "Check confirmation first." : "请先勾选确认删除。", "error");
        return;
      }
      try {
        await api(
          `/api/projects/${encodeURIComponent(
            state.activeProjectId
          )}/training/runs/${encodeURIComponent(runId)}?confirmed=true`,
          { method: "DELETE" }
        );
        $("confirmDeleteRun").checked = false;
        toast(state.lang === "en" ? "Run deleted." : "已删除该训练记录。", "ok");
        await selectProject(state.activeProjectId, false);
      } catch (err) {
        toast(err.message, "error");
      }
    });

    $("refreshMonitorBtn").addEventListener("click", refreshDashboard);
    $("exportMetricsBtn").addEventListener("click", async () => {
      if (!requireProject()) return;
      const runId = state.selectedRunIds[0];
      if (!runId) {
        toast(state.lang === "en" ? "Select at least one run." : "请先勾选一个训练记录。", "error");
        return;
      }
      try {
        const res = await api(
          `/api/projects/${encodeURIComponent(state.activeProjectId)}/training/export-metrics`,
          { method: "POST", body: { run_id: runId } }
        );
        $("monitorExportFiles").innerHTML = (res.files || [])
          .map(
            (f) => `
          <div class="file-item">
            <span class="mono">${escapeHtml(f.name)}</span>
            <a href="${escapeHtml(f.url)}" download="${escapeHtml(f.name)}">${
              state.lang === "en" ? "Download" : "下载"
            }</a>
          </div>`
          )
          .join("");
        toast(state.lang === "en" ? "Metrics exported." : "指标与图表已导出。", "ok");
      } catch (err) {
        toast(err.message, "error");
      }
    });

    $("genCustomText").addEventListener("input", () => {
      const unique = new Set([...$("genCustomText").value.replace(/\s+/g, "")]);
      $("genCharCounter").textContent =
        state.lang === "en"
          ? `${unique.size} unique characters`
          : `${unique.size} 个去重字符`;
    });

    $("submitGenerationBtn").addEventListener("click", async () => {
      if (!requireProject()) return;
      const presets = [...document.querySelectorAll(".preset-checkbox:checked")].map(
        (b) => b.value
      );
      const fd = new FormData();
      fd.append("text", $("genCustomText").value);
      fd.append("preset_ids", JSON.stringify(presets));
      fd.append("split_regions", $("genSplitRegions").checked ? "true" : "false");
      fd.append("primary_region", $("genPrimaryRegion").value);
      fd.append("device", $("genDeviceSelect").value);
      fd.append("generation_checkpoint", $("genCheckpointSelect").value);
      fd.append("seed", String($("genSeed").value || 42));
      fd.append("candidates", String($("genCandidates").value || 1));
      fd.append("allow_large_candidates", $("genUnlockCandidates").checked ? "true" : "false");
      const customFile = $("genCustomFile").files[0];
      if (customFile) fd.append("custom_file", customFile);

      try {
        const res = await api(
          `/api/projects/${encodeURIComponent(state.activeProjectId)}/generation/build`,
          { method: "POST", body: fd }
        );
        if (res.message) {
          $("generationResultStrip").textContent = res.message;
          toast(res.message, "info");
        } else {
          const msg =
            state.lang === "en"
              ? `Queued ${res.job_ids.length} job(s) for ${res.generated_count} glyphs (skipped ${res.skipped_existing_count} existing).`
              : `已提交 ${res.job_ids.length} 个生成任务，共 ${res.generated_count} 字（自动跳过已有 ${res.skipped_existing_count} 字）。`;
          $("generationResultStrip").textContent = msg;
          toast(msg, "ok");
          refreshJobs();
        }
      } catch (err) {
        toast(err.message, "error");
      }
    });

    document.querySelectorAll("#reviewSubTabs .seg-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelectorAll("#reviewSubTabs .seg-btn").forEach((b) => {
          b.classList.toggle("active", b === btn);
        });
        document.querySelectorAll(".subtab-panel").forEach((panel) => {
          panel.classList.toggle("active", panel.id === btn.dataset.subtab);
        });
        if (btn.dataset.subtab === "export-panel") refreshArtifacts();
      });
    });

    $("reviewRefreshBtn").addEventListener("click", () => loadReviewPage(1));
    $("reviewBatchSelect").addEventListener("change", () => loadReviewPage(1));
    $("reviewSearchInput").addEventListener("keydown", (e) => {
      if (e.key === "Enter") loadReviewPage(1);
    });
    $("reviewPrevPage").addEventListener("click", () => {
      if (state.reviewPage > 1) loadReviewPage(state.reviewPage - 1);
    });
    $("reviewNextPage").addEventListener("click", () => {
      if (state.reviewPage < state.reviewTotalPages) loadReviewPage(state.reviewPage + 1);
    });

    $("specimenSizeRange").addEventListener("input", (e) => {
      const sz = `${e.target.value}px`;
      $("specimenSizeVal").textContent = sz;
      $("specimenTextarea").style.fontSize = sz;
    });

    $("buildFontBtn").addEventListener("click", async () => {
      if (!requireProject()) return;
      const profiles = [];
      if ($("profileProportional").checked) profiles.push("proportional");
      if ($("profileMono").checked) profiles.push("monospace-2to1");
      if (!profiles.length) {
        toast(state.lang === "en" ? "Select at least one profile." : "请至少选择一个排版规格。", "error");
        return;
      }
      try {
        const res = await api(
          `/api/projects/${encodeURIComponent(state.activeProjectId)}/export/build`,
          {
            method: "POST",
            body: {
              generation_batch: $("exportBatchSelect").value,
              family: $("exportFamily").value.trim(),
              style: $("exportStyle").value.trim(),
              version: $("exportVersion").value.trim(),
              designer: $("exportDesigner").value.trim(),
              license_text: $("exportLicense").value.trim(),
              profiles,
              threshold: Number($("exportThreshold").value || 180),
              despeckle: Number($("exportDespeckle").value || 4),
            },
          }
        );
        toast(`Font build queued (${res.glyph_count} glyphs)`, "ok");
        refreshJobs();
      } catch (err) {
        toast(err.message, "error");
      }
    });

    $("refreshArtifactsBtn").addEventListener("click", refreshArtifacts);

    $("refreshJobsBtn").addEventListener("click", refreshJobs);
    $("jobsOnlyCurrentProject").addEventListener("change", refreshJobs);
    $("cancelJobBtn").addEventListener("click", async () => {
      if (!state.selectedJobId) return;
      try {
        await api(`/api/jobs/${encodeURIComponent(state.selectedJobId)}/cancel`, {
          method: "POST",
        });
        toast(state.lang === "en" ? "Cancel requested." : "已发送取消请求。", "info");
        refreshJobs();
      } catch (err) {
        toast(err.message, "error");
      }
    });
    $("retryJobBtn").addEventListener("click", async () => {
      if (!state.selectedJobId) return;
      try {
        const res = await api(`/api/jobs/${encodeURIComponent(state.selectedJobId)}/retry`, {
          method: "POST",
        });
        toast(`Retried as ${res.new_job_id.slice(0, 8)}`, "ok");
        state.selectedJobId = res.new_job_id;
        refreshJobs();
      } catch (err) {
        toast(err.message, "error");
      }
    });
  }

  async function init() {
    applyLanguage();
    applyUiMode(state.uiMode, true);
    setupDropzones();
    bindEvents();
    await bootstrap();
    state.pollTimer = setInterval(refreshJobs, 3000);
  }

  document.addEventListener("DOMContentLoaded", init);
})();
