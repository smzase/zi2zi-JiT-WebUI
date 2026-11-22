(function () {
  "use strict";

  const I18N = {
    zh: {
      "mode.simple": "简易模式",
      "mode.advanced": "高级模式",
      "sidebar.project": "当前项目",
      "sidebar.newProject": "+ 新建",
      "sidebar.device": "设备",
      "sidebar.disk": "磁盘",
      "sidebar.tensorboard": "TensorBoard",
      "stage.model": "模型",
      "stage.assets": "素材",
      "stage.train": "微调",
      "stage.gen": "出字",
      "nav.groupSimple": "快速向导",
      "nav.groupPrepare": "准备",
      "nav.groupTrain": "训练",
      "nav.groupProduce": "生产",
      "nav.groupSystem": "系统",
      "nav.simpleWizard": "快速出字工作台",
      "nav.projects": "项目概览",
      "nav.assets": "素材与模型",
      "nav.training": "数据与微调",
      "nav.monitor": "训练监控",
      "nav.generate": "字形生成",
      "nav.review": "审阅与导出",
      "nav.jobs": "任务队列",
      "theme.dark": "深色",
      "theme.light": "浅色",
      "common.refresh": "刷新",
      "simple.nav1": "项目与模型",
      "simple.nav2": "字体素材",
      "simple.nav3": "生字 / 微调",
      "simple.nav4": "导出与试写",
      "simple.step1Title": "创建字体项目并准备基础模型",
      "simple.step1Sub": "先确定工作项目，然后一键挂载共享模型或下载官方 JiT-B/16",
      "simple.projectBlock": "第一步：字体项目",
      "simple.modelBlock": "第二步：基础模型",
      "simple.createProject": "新建项目",
      "simple.attach": "挂载选中",
      "simple.downloadOfficial": "一键下载官方 JiT-B/16",
      "simple.importLocal": "导入本地权重",
      "simple.step1Foot": "项目与模型就绪后即可进入素材上传",
      "simple.next": "下一步：上传字体",
      "simple.prev": "上一步",
      "simple.next3": "下一步：开始生字",
      "simple.next4": "下一步：导出字库",
      "simple.step2Title": "上传参考源字体与目标风格字体",
      "simple.step2Sub": "源字体提供标准字形结构（如思源黑体），目标字体提供你想模仿的笔触风格",
      "simple.sourceFont": "参考源字体（.ttf / .otf / .ttc）",
      "simple.targetFont": "目标风格字体（.ttf / .otf / .ttc）",
      "simple.dropSource": "点击或拖拽上传源字体文件",
      "simple.dropTarget": "点击或拖拽上传目标风格字体",
      "simple.saveAssets": "保存字体并提取风格参考",
      "simple.step3Title": "直接生字或先做快速微调",
      "simple.step3Sub": "新手建议先直接试生几个字看效果；追求高度还原笔触可选择先微调再生成",
      "simple.tabGenerate": "直接生字（快速体验）",
      "simple.tabTrain": "先微调模型（还原更佳）",
      "simple.inputChars": "输入想要生成的文字",
      "simple.fillSample": "填入示例文本",
      "simple.quickCharsets": "或快捷勾选字符集（主推 GBK）",
      "simple.clearPresets": "清空勾选",
      "simple.startGen": "立即开始生成字形",
      "simple.trainTier": "选择微调字数与强度档位",
      "simple.tierFastName": "快速体验",
      "simple.tierFastMeta": "10 轮 · 经济档 · 快速验证笔触方向",
      "simple.tierStdName": "均衡推荐",
      "simple.tierStdMeta": "20 轮 · 均衡档 · 日常字体还原度佳",
      "simple.tierCovName": "完整覆盖",
      "simple.tierCovMeta": "30 轮 · 高质量 · 面向 GBK 大字库微调",
      "simple.buildData": "1. 构建训练数据",
      "simple.startTrain": "2. 开始 LoRA 微调",
      "simple.step4Title": "导出可安装字库 (.ttf) 与实时试写",
      "simple.step4Sub": "自动采用最新生成批次与推荐矢量化参数，导出后可直接下载并在线试写效果",
      "simple.exportBtn": "一键导出 TTF 字库",
      "simple.openAdvanced": "进入高级模式精细调参",
      "simple.railTitle": "当前项目快照",
      "simple.railJobTitle": "实时任务状态",
      "simple.viewLog": "任务日志",
      "projects.galleryTitle": "工作区项目",
      "projects.gallerySub": "点击卡片即可切换当前项目，或直接输入名称快速新建",
      "projects.createBtn": "创建项目",
      "projects.currentTitle": "当前项目概览",
      "projects.dangerTitle": "删除当前项目",
      "projects.dangerSub": "不可逆操作，会移除训练产出、字形与导出文件",
      "projects.deleteBtn": "永久删除",
      "projects.packageTitle": "可移植项目包",
      "projects.packageSub": "跨机器迁移完整项目状态、权重与素材",
      "projects.exportTitle": "打包当前项目",
      "projects.incBase": "包含基础权重",
      "projects.incDataset": "包含训练集",
      "projects.incGen": "包含生成批次",
      "projects.exportBtn": "导出项目包 (.zip)",
      "projects.importTitle": "导入项目包",
      "projects.uploadZip": "上传 .zip 项目包",
      "projects.dropZip": "点击或拖拽项目包文件到此处",
      "projects.orExisting": "或选择已有包",
      "projects.importName": "导入后名称（可选）",
      "projects.inspectBtn": "检查清单",
      "projects.importBtn": "导入为新项目",
      "assets.fontTitle": "参考源字体与目标风格素材",
      "assets.fontSub": "源字体决定标准骨架结构，目标素材提供笔触与风格参考",
      "assets.modeFont": "字体文件",
      "assets.modeImages": "已渲染字形图",
      "assets.sourceFonts": "默认源字体（可多选，按顺序回退）",
      "assets.dropSource": "拖拽或选择源字体 (.ttf / .otf / .ttc)",
      "assets.targetFont": "目标风格字体",
      "assets.dropTarget": "拖拽或选择目标字体文件",
      "assets.targetImages": "目标字形图片 / 压缩包",
      "assets.dropImages": "上传多张字形图或 .zip 压缩包",
      "assets.styleRefCount": "风格参考图抽取数量",
      "assets.targetDir": "已渲染图目录（仅字形图模式可选）",
      "assets.regionOverrides": "按地区指定源字体覆盖（SC / TC / JP / KR，可选）",
      "assets.saveAssets": "保存素材并准备风格参考",
      "assets.modelTitle": "基础模型库",
      "assets.sharedModels": "挂载共享模型",
      "assets.attachShared": "挂载",
      "assets.downloadTitle": "下载官方预训练模型",
      "assets.downloadBtn": "下载并自动挂载",
      "assets.importTitle": "导入本地权重 (.pth / .pt)",
      "assets.importFile": "选择本地文件",
      "assets.importPath": "或服务器路径",
      "assets.importBase": "设为基模",
      "assets.importResume": "存为续训权重",
      "train.datasetTitle": "构建训练数据集",
      "train.datasetSub": "选择预设规模或自定义字数，构建供 LoRA 微调使用的训练与验证集",
      "train.presetQuick": "快速 500",
      "train.presetBalanced": "均衡 3000",
      "train.presetCoverage": "覆盖 6000",
      "train.charset": "基础字集",
      "train.trainCount": "训练字数",
      "train.testCount": "验证字数",
      "train.imgSize": "图像尺寸",
      "train.seed": "随机种子",
      "train.checkCapacity": "检测字体可用字数",
      "train.buildDataset": "构建训练数据",
      "train.startTitle": "启动 LoRA 微调",
      "train.startSub": "根据设备显存自动适配安全批大小，也可在下方展开细节覆写",
      "train.device": "训练设备",
      "train.quality": "显存与质量档位",
      "train.epochs": "训练轮数 (Epochs)",
      "train.datasetPath": "数据集路径（留空则使用当前项目最新数据集）",
      "train.advancedParams": "展开高级超参数（Model / Batch / LR / LoRA Rank / Save Freq）",
      "train.startBtn": "开始微调训练",
      "train.runsTitle": "历史训练轮次",
      "train.selectRun": "选择训练轮次",
      "train.extraEpochs": "续训轮数",
      "train.resumeCkpt": "自定义权重",
      "train.resumeBtn": "续训所选",
      "train.deleteRunBtn": "删除",
      "monitor.compareRuns": "对比运行",
      "monitor.snapshotsTitle": "验证字形演化快照",
      "monitor.hyperTitle": "超参数对比",
      "monitor.ckptTitle": "检查点摘要",
      "gen.charsTitle": "目标字集与字符输入",
      "gen.charsSub": "默认主推 GBK 字符集，可与自定义文本或文本文件自由组合去重",
      "gen.textInput": "自定义文本（可选）",
      "gen.primaryPresets": "常用字符集（主用 GBK）",
      "gen.morePresets": "更多地区与扩展字符集（繁体 / 日文 / 韩文 / 欧洲拉丁）",
      "gen.charsetFile": "或上传自定义字符文本 (.txt)",
      "gen.paramsTitle": "推理参数",
      "gen.checkpoint": "推理权重",
      "gen.device": "推理设备",
      "gen.region": "源字体地区",
      "gen.batchSize": "批大小",
      "gen.candidates": "每字候选数",
      "gen.seed": "随机种子",
      "gen.startBtn": "开始生成字形",
      "review.tabReview": "字形审阅与挑图",
      "review.tabExport": "字库导出与试写",
      "review.candidatesTitle": "候选字形对比",
      "review.pickHint": "在左侧点击任意字符查看全部候选",
      "export.buildTitle": "字库导出设置",
      "export.batch": "来源生成批次",
      "export.fontName": "字体名称",
      "export.format": "输出格式",
      "export.backend": "矢量化引擎",
      "export.threshold": "二值化阈值",
      "export.turdsize": "去噪面积",
      "export.opttol": "曲线平滑容差",
      "export.startBtn": "开始构建并导出",
      "export.livePreview": "实时字库试写台",
      "export.livePreviewSub": "导出 TTF 后自动加载为浏览器字体，自由输入测试排版效果",
      "export.downloads": "导出产物下载",
      "export.svgSamples": "矢量 SVG 抽样",
      "jobs.listTitle": "任务历史",
      "jobs.logTitle": "实时日志",
      "jobs.cancel": "取消",
      "jobs.retry": "重试",
    },
    en: {
      "mode.simple": "Simple",
      "mode.advanced": "Advanced",
      "sidebar.project": "Project",
      "sidebar.newProject": "+ New",
      "sidebar.device": "Device",
      "sidebar.disk": "Disk",
      "sidebar.tensorboard": "TensorBoard",
      "stage.model": "Model",
      "stage.assets": "Fonts",
      "stage.train": "Train",
      "stage.gen": "Glyphs",
      "nav.groupSimple": "Quick Start",
      "nav.groupPrepare": "Prepare",
      "nav.groupTrain": "Train",
      "nav.groupProduce": "Produce",
      "nav.groupSystem": "System",
      "nav.simpleWizard": "Quick Font Workbench",
      "nav.projects": "Projects",
      "nav.assets": "Assets & Models",
      "nav.training": "Dataset & LoRA",
      "nav.monitor": "Monitor",
      "nav.generate": "Generate",
      "nav.review": "Review & Export",
      "nav.jobs": "Job Queue",
      "theme.dark": "Dark",
      "theme.light": "Light",
      "common.refresh": "Refresh",
      "simple.nav1": "Project & Model",
      "simple.nav2": "Font Assets",
      "simple.nav3": "Generate / Tune",
      "simple.nav4": "Export & Test",
      "simple.step1Title": "Create a Project and Base Model",
      "simple.step1Sub": "Pick or create a project, then attach a shared checkpoint or download official JiT-B/16",
      "simple.projectBlock": "Part 1: Font Project",
      "simple.modelBlock": "Part 2: Base Model",
      "simple.createProject": "Create Project",
      "simple.attach": "Attach",
      "simple.downloadOfficial": "Download Official JiT-B/16",
      "simple.importLocal": "Import Local Weight",
      "simple.step1Foot": "Continue once project and base model are ready",
      "simple.next": "Next: Upload Fonts",
      "simple.prev": "Back",
      "simple.next3": "Next: Generate",
      "simple.next4": "Next: Export Font",
      "simple.step2Title": "Upload Reference Source and Target Style Fonts",
      "simple.step2Sub": "Source font defines glyph structure; target font provides stroke style",
      "simple.sourceFont": "Source Reference Font (.ttf / .otf / .ttc)",
      "simple.targetFont": "Target Style Font (.ttf / .otf / .ttc)",
      "simple.dropSource": "Click or drag source font file",
      "simple.dropTarget": "Click or drag target style font file",
      "simple.saveAssets": "Save Fonts & Extract Style Refs",
      "simple.step3Title": "Generate Directly or Fine-Tune First",
      "simple.step3Sub": "Try direct generation first, or run LoRA fine-tuning for higher stroke fidelity",
      "simple.tabGenerate": "Direct Generate",
      "simple.tabTrain": "Fine-Tune First",
      "simple.inputChars": "Characters to generate",
      "simple.fillSample": "Fill sample",
      "simple.quickCharsets": "Or pick presets (GBK recommended)",
      "simple.clearPresets": "Clear",
      "simple.startGen": "Start Generating Glyphs",
      "simple.trainTier": "Fine-Tuning Coverage & Strength",
      "simple.tierFastName": "Quick Test",
      "simple.tierFastMeta": "10 epochs · Economy · Fast style check",
      "simple.tierStdName": "Balanced",
      "simple.tierStdMeta": "20 epochs · Balanced · Recommended fidelity",
      "simple.tierCovName": "Full Coverage",
      "simple.tierCovMeta": "30 epochs · Quality · Built for GBK fonts",
      "simple.buildData": "1. Build Dataset",
      "simple.startTrain": "2. Start LoRA Fine-Tune",
      "simple.step4Title": "Export Installable Font (.ttf) & Live Specimen",
      "simple.step4Sub": "Automatically uses your latest batch and recommended vectorization settings",
      "simple.exportBtn": "Export TTF Font",
      "simple.openAdvanced": "Open Advanced Mode",
      "simple.railTitle": "Project Snapshot",
      "simple.railJobTitle": "Live Job Status",
      "simple.viewLog": "Job Logs",
      "projects.galleryTitle": "Workspace Projects",
      "projects.gallerySub": "Click a card to switch active project or create a new one",
      "projects.createBtn": "Create",
      "projects.currentTitle": "Active Project Summary",
      "projects.dangerTitle": "Delete Project",
      "projects.dangerSub": "Irreversible. Removes runs, glyphs, and exports.",
      "projects.deleteBtn": "Delete Permanently",
      "projects.packageTitle": "Portable Project Packages",
      "projects.packageSub": "Export or import full project snapshots across machines",
      "projects.exportTitle": "Export Active Project",
      "projects.incBase": "Include base model",
      "projects.incDataset": "Include dataset",
      "projects.incGen": "Include generations",
      "projects.exportBtn": "Export Package (.zip)",
      "projects.importTitle": "Import Project Package",
      "projects.uploadZip": "Upload .zip package",
      "projects.dropZip": "Click or drag package file here",
      "projects.orExisting": "Or choose existing package",
      "projects.importName": "New project name (optional)",
      "projects.inspectBtn": "Inspect",
      "projects.importBtn": "Import Project",
      "assets.fontTitle": "Reference Source & Target Style Assets",
      "assets.fontSub": "Source fonts define glyph structure; target assets supply stroke style",
      "assets.modeFont": "Font File",
      "assets.modeImages": "Glyph Images",
      "assets.sourceFonts": "Default Source Fonts (ordered fallback)",
      "assets.dropSource": "Drag or select source fonts (.ttf / .otf / .ttc)",
      "assets.targetFont": "Target Style Font",
      "assets.dropTarget": "Drag or select target font",
      "assets.targetImages": "Target Glyph Images / Zip",
      "assets.dropImages": "Upload glyph images or a .zip archive",
      "assets.styleRefCount": "Style reference sample count",
      "assets.targetDir": "Local glyph image directory (optional)",
      "assets.regionOverrides": "Regional source font overrides (SC / TC / JP / KR)",
      "assets.saveAssets": "Save Assets & Prepare Style Refs",
      "assets.modelTitle": "Base Model Library",
      "assets.sharedModels": "Attach Shared Model",
      "assets.attachShared": "Attach",
      "assets.downloadTitle": "Download Official Pretrained Model",
      "assets.downloadBtn": "Download & Attach",
      "assets.importTitle": "Import Local Weight (.pth / .pt)",
      "assets.importFile": "Select local file",
      "assets.importPath": "Or server path",
      "assets.importBase": "Set as Base",
      "assets.importResume": "Save for Resume",
      "train.datasetTitle": "Build Training Dataset",
      "train.datasetSub": "Choose a preset scale or custom character counts for LoRA training",
      "train.presetQuick": "Quick 500",
      "train.presetBalanced": "Balanced 3000",
      "train.presetCoverage": "Coverage 6000",
      "train.charset": "Base Charset",
      "train.trainCount": "Train Chars",
      "train.testCount": "Eval Chars",
      "train.imgSize": "Image Size",
      "train.seed": "Seed",
      "train.checkCapacity": "Check Font Capacity",
      "train.buildDataset": "Build Dataset",
      "train.startTitle": "Start LoRA Fine-Tuning",
      "train.startSub": "Safe batch sizes adapt automatically to GPU VRAM",
      "train.device": "Device",
      "train.quality": "VRAM / Quality Profile",
      "train.epochs": "Epochs",
      "train.datasetPath": "Dataset path (blank uses latest project dataset)",
      "train.advancedParams": "Advanced hyperparameters (Model / Batch / LR / LoRA Rank / Save Freq)",
      "train.startBtn": "Start Training",
      "train.runsTitle": "Training Runs",
      "train.selectRun": "Select run",
      "train.extraEpochs": "Extra epochs",
      "train.resumeCkpt": "Custom checkpoint",
      "train.resumeBtn": "Resume Run",
      "train.deleteRunBtn": "Delete",
      "monitor.compareRuns": "Compare Runs",
      "monitor.snapshotsTitle": "Validation Glyph Snapshots",
      "monitor.hyperTitle": "Hyperparameters",
      "monitor.ckptTitle": "Checkpoints",
      "gen.charsTitle": "Target Charset & Input",
      "gen.charsSub": "GBK is primary by default; combine with custom text or files seamlessly",
      "gen.textInput": "Custom text (optional)",
      "gen.primaryPresets": "Core Presets (GBK Primary)",
      "gen.morePresets": "More Regional & Extended Presets (TC / JP / KR / European)",
      "gen.charsetFile": "Or upload custom charset file (.txt)",
      "gen.paramsTitle": "Inference Settings",
      "gen.checkpoint": "Checkpoint",
      "gen.device": "Device",
      "gen.region": "Source Region",
      "gen.batchSize": "Batch Size",
      "gen.candidates": "Candidates / Char",
      "gen.seed": "Seed",
      "gen.startBtn": "Start Generation",
      "review.tabReview": "Glyph Review",
      "review.tabExport": "Export & Specimen",
      "review.candidatesTitle": "Candidate Comparison",
      "review.pickHint": "Select a glyph on the left to inspect candidates",
      "export.buildTitle": "Export Settings",
      "export.batch": "Generation Batch",
      "export.fontName": "Font Name",
      "export.format": "Format",
      "export.backend": "Vectorizer",
      "export.threshold": "Threshold",
      "export.turdsize": "Denoise Area",
      "export.opttol": "Smooth Tolerance",
      "export.startBtn": "Build & Export",
      "export.livePreview": "Live Font Specimen",
      "export.livePreviewSub": "Exported TTF loads automatically into the browser for live typing",
      "export.downloads": "Downloads",
      "export.svgSamples": "Vector SVG Samples",
      "jobs.listTitle": "Job History",
      "jobs.logTitle": "Live Logs",
      "jobs.cancel": "Cancel",
      "jobs.retry": "Retry",
    },
  };

  const VIEW_META = {
    simple: {
      zh: ["快速出字工作台", "按 4 个聚焦步骤完成模型、字体、生字与字库导出，右侧实时同步项目状态"],
      en: ["Quick Font Workbench", "Complete model, font upload, generation, and TTF export in 4 focused steps"],
    },
    projects: {
      zh: ["项目概览", "切换或新建字体项目，管理可移植项目包与清理"],
      en: ["Projects", "Switch or create font projects and manage portable packages"],
    },
    assets: {
      zh: ["素材与模型", "配置参考源字体、目标风格素材与基础预训练权重"],
      en: ["Assets & Models", "Configure source fonts, target style assets, and pretrained models"],
    },
    training: {
      zh: ["数据与微调", "构建配对训练数据集并启动或续训 LoRA 模型"],
      en: ["Dataset & LoRA", "Build paired datasets and launch or resume LoRA fine-tuning"],
    },
    monitor: {
      zh: ["训练监控", "实时观察 Loss、SSIM/LPIPS、显存与验证字形演化"],
      en: ["Training Monitor", "Track Loss, SSIM/LPIPS, GPU memory, and glyph evolution"],
    },
    generate: {
      zh: ["字形生成", "主推 GBK 字集或任意自定义文本批量推理目标风格字形"],
      en: ["Glyph Generation", "Batch-generate glyphs using GBK primary charset or custom text"],
    },
    review: {
      zh: ["审阅与导出", "筛选最佳候选字形、矢量化封装 TTF 并在线试写"],
      en: ["Review & Export", "Pick best candidates, vectorize into TTF, and live-test"],
    },
    jobs: {
      zh: ["任务队列", "追踪后台任务状态、查看实时日志并支持取消或重试"],
      en: ["Job Queue", "Track background job status, stream logs, cancel or retry"],
    },
  };

  const SIMPLE_PRESET_IDS = [
    "zh-Hans-GBK",
    "zh-Hans-3500",
    "zh-Hans-6500",
    "latin-ascii",
    "cjk-punctuation",
  ];

  const PRIMARY_PRESET_IDS = [
    "zh-Hans-GBK",
    "zh-Hans-3500",
    "zh-Hans-6500",
    "zh-Hans-8105",
    "latin-ascii",
    "cjk-punctuation",
    "symbols-common",
  ];

  const SIMPLE_TIERS = {
    fast: { size_preset: "quick", train_count: 500, test_count: 8, epochs: 10, quality: "economy" },
    standard: { size_preset: "balanced", train_count: 3000, test_count: 64, epochs: 20, quality: "balanced" },
    coverage: { size_preset: "coverage", train_count: 6000, test_count: 128, epochs: 30, quality: "quality" },
  };

  const CHART_COLORS = ["#2563eb", "#16a34a", "#d97706", "#dc2626", "#7c3aed", "#0891b2"];

  const state = {
    lang: localStorage.getItem("zi2zi_lang") || "zh",
    theme: localStorage.getItem("zi2zi_theme") || "light",
    uiMode: localStorage.getItem("zi2zi_ui_mode") || "advanced",
    view: "projects",
    simpleStep: 1,
    simpleTab: "generate",
    simpleTrainTier: "standard",
    reviewSubtab: "review",
    inputMode: "font",
    projects: [],
    activeProjectId: localStorage.getItem("zi2zi_project_id") || "",
    activeProject: null,
    devices: [],
    presets: [],
    sharedModels: [],
    packages: [],
    jobs: [],
    selectedJobId: "",
    selectedRunIds: [],
    reviewPage: 1,
    reviewTotalPages: 1,
    selectedReviewChar: "",
    activeReviewBatch: "",
    loadedSpecimenFont: "",
    loadedSpecimenKey: "",
    loadedSpecimenFace: null,
    reviewPageAbort: null,
    reviewPageSeq: 0,
    reviewCandAbort: null,
    reviewCandSeq: 0,
    reviewSearchTimer: null,
    reviewSearchComposing: false,
    exportArtifactsAbort: null,
    exportArtifactsSeq: 0,
    activeJobsHadRunning: false,
    tensorboardUrl: "http://127.0.0.1:6006",
  };

  const $ = (id) => document.getElementById(id);

  function t(key) {
    return (I18N[state.lang] && I18N[state.lang][key]) || I18N.zh[key] || key;
  }

  function isZh() {
    return state.lang === "zh";
  }

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function basename(path) {
    if (!path) return "";
    return String(path).split(/[\\/]/).pop() || String(path);
  }

  function formatTime(iso) {
    if (!iso) return "-";
    try {
      const d = new Date(iso);
      if (Number.isNaN(d.getTime())) return String(iso);
      const pad = (n) => String(n).padStart(2, "0");
      return `${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
    } catch (_) {
      return String(iso);
    }
  }

  function formatNum(value, digits = 4) {
    if (value == null || Number.isNaN(Number(value))) return "-";
    const num = Number(value);
    if (Math.abs(num) > 0 && Math.abs(num) < 0.001) return num.toExponential(2);
    return num.toFixed(digits).replace(/\.?0+$/, "");
  }

  function statusPillClass(status) {
    const s = String(status || "").toLowerCase();
    if (s === "succeeded" || s === "completed" || s === "ready") return "ok";
    if (s === "running" || s === "queued") return "accent";
    if (s === "failed" || s === "error") return "danger";
    if (s === "cancelled" || s === "interrupted") return "muted";
    return "warn";
  }

  function statusLabel(status) {
    const s = String(status || "").toLowerCase();
    const mapZh = {
      succeeded: "已完成",
      completed: "已完成",
      running: "运行中",
      queued: "排队中",
      failed: "失败",
      cancelled: "已取消",
      interrupted: "已中断",
    };
    const mapEn = {
      succeeded: "succeeded",
      completed: "completed",
      running: "running",
      queued: "queued",
      failed: "failed",
      cancelled: "cancelled",
      interrupted: "interrupted",
    };
    return (isZh() ? mapZh[s] : mapEn[s]) || status || "-";
  }

  function jobTypeLabel(kind) {
    const mapZh = {
      model_download: "下载基础模型",
      checkpoint_validate: "校验模型权重",
      dataset: "构建训练数据",
      dataset_build: "构建训练数据",
      train: "LoRA 微调训练",
      resume_train: "续训微调",
      train_lora: "LoRA 微调训练",
      generation: "字形批量生成",
      generate_glyphs: "字形批量生成",
      font_build: "导出字库",
      export_font: "导出字库",
      project_export: "导出项目包",
      project_import: "导入项目包",
    };
    const mapEn = {
      model_download: "Download Model",
      checkpoint_validate: "Validate Checkpoint",
      dataset: "Build Dataset",
      dataset_build: "Build Dataset",
      train: "LoRA Training",
      resume_train: "Resume Training",
      train_lora: "LoRA Training",
      generation: "Generate Glyphs",
      generate_glyphs: "Generate Glyphs",
      font_build: "Export Font",
      export_font: "Export Font",
      project_export: "Export Package",
      project_import: "Import Package",
    };
    return (isZh() ? mapZh[kind] : mapEn[kind]) || kind || (isZh() ? "后台任务" : "Job");
  }

  function presetCountLabel(p) {
    if (!p) return "";
    if (p.expected_count != null) {
      return `${p.expected_count} ${isZh() ? "字" : "chars"}`;
    }
    if (p.id === "zh-Hans-GBK") {
      return isZh() ? "约 21,000 字 · 编码全集" : "~21,000 chars · GBK full";
    }
    return p.region ? `${p.region} · ${isZh() ? "编码字符集" : "Codec set"}` : "";
  }

  function presetEstimatedCount(p) {
    if (!p) return 0;
    if (p.expected_count != null) return Number(p.expected_count) || 0;
    if (p.id === "zh-Hans-GBK") return 21003;
    if (p.id === "cjk-punctuation") return 120;
    return 0;
  }

  function toast(message, kind = "") {
    const stack = $("toastStack");
    if (!stack) return;
    const el = document.createElement("div");
    el.className = `toast ${kind}`.trim();
    el.textContent = message;
    stack.appendChild(el);
    setTimeout(() => {
      el.remove();
    }, 3600);
  }

  async function api(url, options = {}) {
    const resp = await fetch(url, options);
    const contentType = resp.headers.get("content-type") || "";
    let payload = null;
    if (contentType.includes("application/json")) {
      payload = await resp.json();
    } else {
      payload = await resp.text();
    }
    if (!resp.ok) {
      const detail =
        (payload && typeof payload === "object" && (payload.detail || payload.message)) ||
        (typeof payload === "string" && payload) ||
        `HTTP ${resp.status}`;
      throw new Error(detail);
    }
    return payload;
  }

  function applyTheme(theme) {
    state.theme = theme === "dark" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", state.theme);
    localStorage.setItem("zi2zi_theme", state.theme);
    const btn = $("btnToggleTheme");
    if (btn) {
      btn.textContent = state.theme === "dark" ? t("theme.light") : t("theme.dark");
    }
    updateTbLinks();
  }

  function updateTbLinks() {
    const url = `${state.tensorboardUrl}/?darkMode=${state.theme === "dark" ? "true" : "false"}`;
    const side = $("tbExternalLink");
    const mon = $("monitorTbLink");
    if (side) side.href = url;
    if (mon) mon.href = url;
  }

  function applyI18n() {
    document.documentElement.lang = isZh() ? "zh-CN" : "en";
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (key) el.textContent = t(key);
    });
    const langBtn = $("btnToggleLang");
    if (langBtn) langBtn.textContent = isZh() ? "EN" : "中文";
    const themeBtn = $("btnToggleTheme");
    if (themeBtn) themeBtn.textContent = state.theme === "dark" ? t("theme.light") : t("theme.dark");
    updatePageHeader();
  }

  function updatePageHeader() {
    const meta = VIEW_META[state.view] || VIEW_META.projects;
    const pair = isZh() ? meta.zh : meta.en;
    const titleEl = $("pageTitle");
    const descEl = $("pageDesc");
    if (titleEl) titleEl.textContent = pair[0];
    if (descEl) descEl.textContent = pair[1];
  }

  function setUiMode(mode, switchView = true) {
    state.uiMode = mode === "simple" ? "simple" : "advanced";
    localStorage.setItem("zi2zi_ui_mode", state.uiMode);
    document.body.setAttribute("data-ui-mode", state.uiMode);
    document.querySelectorAll("#uiModeSwitcher [data-ui-mode]").forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-ui-mode") === state.uiMode);
    });
    if (switchView) {
      if (state.uiMode === "simple" && state.view !== "simple" && state.view !== "jobs") {
        setView("simple");
      } else if (state.uiMode === "advanced" && state.view === "simple") {
        setView("projects");
      }
    }
    renderSimpleWorkbench();
  }

  function setView(viewName) {
    state.view = viewName;
    document.querySelectorAll(".view").forEach((sec) => {
      sec.classList.toggle("active", sec.id === `view-${viewName}`);
    });
    document.querySelectorAll(".nav-item").forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-view") === viewName);
    });
    updatePageHeader();
    if (viewName === "monitor") loadMonitorDashboard();
    if (viewName === "review") {
      if (state.reviewSubtab === "export") loadExportArtifacts();
      else loadReviewPage();
    }
    if (viewName === "jobs") refreshJobs(true);
    if (viewName === "simple") {
      renderSimpleWorkbench();
      if (state.simpleStep === 4) loadExportArtifacts();
    }
  }

  function setSimpleStep(step) {
    const num = Math.max(1, Math.min(4, Number(step) || 1));
    state.simpleStep = num;
    document.querySelectorAll("#simpleStepper .stepper-item").forEach((btn) => {
      btn.classList.toggle("active", Number(btn.getAttribute("data-step")) === num);
    });
    for (let i = 1; i <= 4; i++) {
      const pane = $(`simplePane${i}`);
      if (pane) pane.classList.toggle("active", i === num);
    }
    if (num === 4) {
      loadExportArtifacts();
    }
  }

  function setSimpleTab(tabName) {
    state.simpleTab = tabName === "train" ? "train" : "generate";
    document.querySelectorAll("#simpleActionTabs .seg-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-simple-tab") === state.simpleTab);
    });
    const g = $("simplePaneGenerate");
    const tr = $("simplePaneTrain");
    if (g) g.classList.toggle("active", state.simpleTab === "generate");
    if (tr) tr.classList.toggle("active", state.simpleTab === "train");
  }

  function setSimpleTrainTier(tier) {
    state.simpleTrainTier = SIMPLE_TIERS[tier] ? tier : "standard";
    document.querySelectorAll("#simpleTrainTierGrid .tier-card").forEach((card) => {
      card.classList.toggle("active", card.getAttribute("data-tier") === state.simpleTrainTier);
    });
  }

  function setReviewSubtab(subtab) {
    state.reviewSubtab = subtab === "export" ? "export" : "review";
    document.querySelectorAll("#reviewExportTabs .seg-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-subtab") === state.reviewSubtab);
    });
    const r = $("subtab-review");
    const e = $("subtab-export");
    if (r) r.classList.toggle("active", state.reviewSubtab === "review");
    if (e) e.classList.toggle("active", state.reviewSubtab === "export");
    if (state.reviewSubtab === "export") loadExportArtifacts();
    else loadReviewPage();
  }

  function setInputMode(mode) {
    state.inputMode = mode === "glyphs" || mode === "glyph_images" ? "glyph_images" : "font";
    document.querySelectorAll("#inputModeGroup .seg-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-mode") === state.inputMode);
    });
    const fontBlock = $("targetFontBlock");
    const imgBlock = $("targetImagesBlock");
    if (fontBlock) fontBlock.classList.toggle("hidden", state.inputMode !== "font");
    if (imgBlock) imgBlock.classList.toggle("hidden", state.inputMode !== "glyph_images");
  }

  // =========================================================
  // BOOTSTRAP & PROJECT STATE
  // =========================================================
  async function bootstrap() {
    try {
      const data = await api(`/api/bootstrap?lang=${encodeURIComponent(state.lang)}`);
      state.projects = data.projects || [];
      state.devices = data.devices || [];
      state.presets = data.presets || [];
      state.sharedModels = data.shared_models || [];
      state.packages = data.export_packages || data.packages || [];
      state.jobs = data.jobs || [];
      if (data.tensorboard_url) {
        state.tensorboardUrl = data.tensorboard_url;
        updateTbLinks();
      }

      renderSidebarHardware(data);
      renderDeviceSelects();
      renderSharedModelSelects();
      renderPresetSelectors();
      renderPackageSelect();
      renderProjectSelect();
      renderProjectCards();

      const exists = state.projects.some((p) => p.id === state.activeProjectId);
      if (!exists) {
        state.activeProjectId = state.projects.length ? state.projects[0].id : "";
      }
      if (state.activeProjectId) {
        await loadProjectDetail(state.activeProjectId);
      } else {
        state.activeProject = null;
        renderActiveProjectViews();
      }
      renderJobs();
    } catch (err) {
      toast(err.message, "danger");
    }
  }

  function renderSidebarHardware(data) {
    const devEl = $("sidebarDevice");
    const diskEl = $("sidebarDisk");
    const devices = data.devices || [];
    const gpu = devices.find((d) => d.training_supported) || devices[0];
    if (devEl) devEl.textContent = gpu ? gpu.name : "CPU";
    const freeGb = data.disk_free_gb != null ? data.disk_free_gb : data.disk && data.disk.free_gb;
    if (diskEl && freeGb != null) {
      diskEl.textContent = `${Number(freeGb).toFixed(1)} GB`;
    }
  }

  function renderDeviceSelects() {
    const trainSel = $("trainDeviceSelect");
    const genSel = $("genDeviceSelect");
    const opts = state.devices
      .map((d) => {
        const mem = d.memory_total_gb ? ` (${d.memory_total_gb} GB)` : "";
        return `<option value="${escapeHtml(d.id)}">${escapeHtml(d.name + mem)}</option>`;
      })
      .join("");
    if (trainSel) {
      const prev = trainSel.value;
      trainSel.innerHTML = opts || `<option value="cpu">CPU</option>`;
      if (prev && [...trainSel.options].some((o) => o.value === prev)) trainSel.value = prev;
    }
    if (genSel) {
      const prev = genSel.value;
      genSel.innerHTML = opts || `<option value="cpu">CPU</option>`;
      if (prev && [...genSel.options].some((o) => o.value === prev)) genSel.value = prev;
    }
  }

  function renderSharedModelSelects() {
    const list = state.sharedModels || [];
    const html = list.length
      ? list
          .map((m) => {
            const tag = m.architecture ? ` [${m.architecture}]` : "";
            const sz = m.size_mb ? ` (${m.size_mb} MB)` : "";
            return `<option value="${escapeHtml(m.path)}">${escapeHtml(m.name + tag + sz)}</option>`;
          })
          .join("")
      : `<option value="">${isZh() ? "共享目录暂无模型" : "No shared models"}</option>`;
    ["sharedModelSelect", "simpleSharedModelSelect"].forEach((id) => {
      const sel = $(id);
      if (sel) sel.innerHTML = html;
    });
  }

  function renderPresetSelectors() {
    const all = state.presets || [];
    const byId = new Map(all.map((p) => [p.id, p]));

    // 1. Simple mode presets (GBK first!)
    const simpleHost = $("simpleQuickPresets");
    if (simpleHost) {
      const checked = new Set(getCheckedPresetIds("simpleQuickPresets"));
      const simpleList = SIMPLE_PRESET_IDS.map((id) => byId.get(id)).filter(Boolean);
      simpleHost.innerHTML = simpleList
        .map((p) => {
          const isGbk = p.id === "zh-Hans-GBK";
          const isChecked = checked.has(p.id);
          const badge = isGbk
            ? `<span class="pill accent">${isZh() ? "主推" : "Primary"}</span>`
            : "";
          return `<label class="preset-card ${isGbk ? "featured" : ""} ${isChecked ? "checked" : ""}">
            <input type="checkbox" value="${escapeHtml(p.id)}" ${isChecked ? "checked" : ""} />
            <span class="preset-card-body">
              <span class="preset-card-head">
                <span class="preset-card-name">${escapeHtml(p.label)}</span>
                ${badge}
              </span>
              <span class="preset-card-count">${escapeHtml(presetCountLabel(p))}</span>
            </span>
          </label>`;
        })
        .join("");
      simpleHost.querySelectorAll('input[type="checkbox"]').forEach((cb) => {
        cb.addEventListener("change", () => {
          cb.closest(".preset-card")?.classList.toggle("checked", cb.checked);
          updateSimpleCharCount();
        });
      });
    }

    // 2. Advanced Generation primary presets (GBK first & highlighted!)
    const primaryHost = $("genPrimaryPresets");
    const extraHost = $("genExtraPresets");
    if (primaryHost && extraHost) {
      const checkedPrimary = new Set(getCheckedPresetIds("genPrimaryPresets"));
      const checkedExtra = new Set(getCheckedPresetIds("genExtraPresets"));
      const primarySet = new Set(PRIMARY_PRESET_IDS);
      const primaryList = PRIMARY_PRESET_IDS.map((id) => byId.get(id)).filter(Boolean);
      const extraList = all.filter((p) => !primarySet.has(p.id));

      primaryHost.innerHTML = primaryList
        .map((p) => {
          const isGbk = p.id === "zh-Hans-GBK";
          const isChecked = checkedPrimary.has(p.id);
          const badge = isGbk
            ? `<span class="pill accent">${isZh() ? "主用推荐" : "Primary"}</span>`
            : "";
          return `<label class="preset-card ${isGbk ? "featured" : ""} ${isChecked ? "checked" : ""}">
            <input type="checkbox" value="${escapeHtml(p.id)}" ${isChecked ? "checked" : ""} />
            <span class="preset-card-body">
              <span class="preset-card-head">
                <span class="preset-card-name">${escapeHtml(p.label)}</span>
                ${badge}
              </span>
              <span class="preset-card-count">${escapeHtml(presetCountLabel(p))}</span>
            </span>
          </label>`;
        })
        .join("");

      extraHost.innerHTML = extraList
        .map((p) => {
          const isChecked = checkedExtra.has(p.id);
          const suffix = p.expected_count != null ? ` (${p.expected_count})` : "";
          return `<label class="preset-chip">
            <input type="checkbox" value="${escapeHtml(p.id)}" ${isChecked ? "checked" : ""} />
            <span>${escapeHtml(p.label + suffix)}</span>
          </label>`;
        })
        .join("");

      primaryHost.querySelectorAll('input[type="checkbox"]').forEach((cb) => {
        cb.addEventListener("change", () => {
          cb.closest(".preset-card")?.classList.toggle("checked", cb.checked);
          updateGenCharCount();
        });
      });
      extraHost.querySelectorAll('input[type="checkbox"]').forEach((cb) => {
        cb.addEventListener("change", updateGenCharCount);
      });
    }
    updateGenCharCount();
    updateSimpleCharCount();
  }

  function getCheckedPresetIds(containerId) {
    const host = $(containerId);
    if (!host) return [];
    return [...host.querySelectorAll('input[type="checkbox"]:checked')].map((el) => el.value);
  }

  function presetCountSum(ids) {
    const byId = new Map((state.presets || []).map((p) => [p.id, presetEstimatedCount(p)]));
    return ids.reduce((acc, id) => acc + (byId.get(id) || 0), 0);
  }

  function uniqueCharsCount(text) {
    const cleaned = String(text || "").replace(/[\s\r\n]/g, "");
    return new Set([...cleaned]).size;
  }

  function updateGenCharCount() {
    const badge = $("genCharCount");
    if (!badge) return;
    const textCount = uniqueCharsCount($("genText")?.value || "");
    const presets = [...getCheckedPresetIds("genPrimaryPresets"), ...getCheckedPresetIds("genExtraPresets")];
    const presetSum = presetCountSum(presets);
    if (presets.length) {
      badge.textContent = isZh()
        ? `文本 ${textCount} + 预设约 ${presetSum} 字`
        : `Text ${textCount} + ~${presetSum} preset chars`;
    } else {
      badge.textContent = isZh() ? `${textCount} 个唯一字符` : `${textCount} unique chars`;
    }
  }

  function updateSimpleCharCount() {
    const el = $("simpleGenCharCount");
    if (!el) return;
    const textCount = uniqueCharsCount($("simpleGenText")?.value || "");
    const presets = getCheckedPresetIds("simpleQuickPresets");
    const presetSum = presetCountSum(presets);
    if (presets.length) {
      el.textContent = isZh()
        ? `已输入 ${textCount} 字 + 已勾选 ${presets.length} 个字符集（约 ${presetSum} 字）`
        : `${textCount} custom chars + ${presets.length} presets (~${presetSum} chars)`;
    } else {
      el.textContent = isZh() ? `${textCount} 个去重字符` : `${textCount} unique chars`;
    }
  }

  function renderProjectSelect() {
    const sel = $("projectSelect");
    if (!sel) return;
    if (!state.projects.length) {
      sel.innerHTML = `<option value="">${isZh() ? "暂无项目" : "No projects"}</option>`;
      return;
    }
    sel.innerHTML = state.projects
      .map((p) => `<option value="${escapeHtml(p.id)}">${escapeHtml(p.name)}</option>`)
      .join("");
    if (state.activeProjectId && state.projects.some((p) => p.id === state.activeProjectId)) {
      sel.value = state.activeProjectId;
    }
  }

  function renderProjectCards() {
    const host = $("projectCardsGrid");
    if (!host) return;
    if (!state.projects.length) {
      host.innerHTML = `<div class="empty-state">${isZh() ? "暂无项目，请在右上角输入名称创建一个字体项目。" : "No projects yet. Enter a name above to create one."}</div>`;
      return;
    }
    host.innerHTML = state.projects
      .map((p) => {
        const active = p.id === state.activeProjectId;
        const hasModel = Boolean(p.base_model);
        const modelLabel = hasModel ? basename(p.base_model) : isZh() ? "未挂模型" : "No model";
        return `<button class="project-card ${active ? "active" : ""}" type="button" data-pick-project="${escapeHtml(p.id)}">
          <div class="project-card-top">
            <span class="project-card-name">${escapeHtml(p.name)}</span>
            <span class="pill ${hasModel ? "ok" : ""}">${escapeHtml(modelLabel)}</span>
          </div>
          <div class="project-card-meta">
            <span>${escapeHtml(p.id)}</span>
            <span>${p.input_mode === "glyphs" ? (isZh() ? "字形图" : "Images") : isZh() ? "字体文件" : "Font"}</span>
            <span>${formatTime(p.updated_at || p.created_at)}</span>
          </div>
        </button>`;
      })
      .join("");
    host.querySelectorAll("[data-pick-project]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const pid = btn.getAttribute("data-pick-project");
        if (pid) selectProject(pid);
      });
    });
  }

  function renderPackageSelect() {
    const sel = $("existingPackageSelect");
    if (!sel) return;
    const list = state.packages || [];
    sel.innerHTML =
      `<option value="">${isZh() ? "-- 选择已存在的项目包 --" : "-- Select existing package --"}</option>` +
      list
        .map((p) => `<option value="${escapeHtml(p.path)}">${escapeHtml(p.name)} (${p.size_mb || 0} MB)</option>`)
        .join("");
  }

  async function selectProject(projectId) {
    state.activeProjectId = projectId || "";
    if (state.activeProjectId) {
      localStorage.setItem("zi2zi_project_id", state.activeProjectId);
    }
    const sel = $("projectSelect");
    if (sel) sel.value = state.activeProjectId;
    renderProjectCards();
    if (state.activeProjectId) {
      await loadProjectDetail(state.activeProjectId);
    } else {
      state.activeProject = null;
      renderActiveProjectViews();
    }
  }

  async function loadProjectDetail(projectId) {
    if (!projectId) return;
    try {
      const detail = await api(`/api/projects/${encodeURIComponent(projectId)}`);
      state.activeProject = detail;
      renderActiveProjectViews();
      if (state.view === "monitor") loadMonitorDashboard();
      if (state.view === "review") {
        if (state.reviewSubtab === "export") loadExportArtifacts();
        else loadReviewPage();
      }
      if (state.view === "simple" && state.simpleStep === 4) {
        loadExportArtifacts();
      }
    } catch (err) {
      toast(err.message, "danger");
    }
  }

  function renderActiveProjectViews() {
    const p = state.activeProject;
    renderSidebarReadiness(p);
    renderProjectSummary(p);
    renderAssetsAndModels(p);
    renderTrainingRuns(p);
    renderGenerationControls(p);
    renderReviewBatchSelects(p);
    renderSimpleWorkbench();
  }

  function getManifest(detail) {
    return detail ? detail.manifest || detail : null;
  }

  function renderSidebarReadiness(detail) {
    const strip = $("sidebarReadinessStrip");
    if (!strip) return;
    const p = getManifest(detail);
    const hasModel = Boolean(p && (p.base_model || p.active_checkpoint));
    const hasAssets = Boolean(p && (p.global_source_fonts || []).length && (p.target_assets || []).length);
    const hasTrain = Boolean(detail && (detail.runs || []).length);
    const hasGen = Boolean(detail && (detail.generation_batches || []).length);
    const flags = { model: hasModel, assets: hasAssets, train: hasTrain, gen: hasGen };
    strip.querySelectorAll("[data-stage]").forEach((el) => {
      const key = el.getAttribute("data-stage");
      el.classList.toggle("done", Boolean(flags[key]));
    });
  }

  function renderKv(containerId, rows) {
    const el = $(containerId);
    if (!el) return;
    el.innerHTML = rows
      .map(
        ([k, v]) => `<div class="kv-item">
          <div class="kv-key">${escapeHtml(k)}</div>
          <div class="kv-val">${escapeHtml(v || "-")}</div>
        </div>`
      )
      .join("");
  }

  function renderProjectSummary(detail) {
    const p = getManifest(detail);
    const pill = $("currentProjectIdPill");
    if (pill) pill.textContent = p ? p.id : "-";
    if (!p) {
      renderKv("projectSummaryKv", [[isZh() ? "状态" : "Status", isZh() ? "未选择项目" : "No active project"]]);
      return;
    }
    renderKv("projectSummaryKv", [
      [isZh() ? "项目名称" : "Name", p.name],
      [isZh() ? "输入模式" : "Mode", p.input_mode === "glyphs" ? (isZh() ? "已渲染字形图" : "Glyph Images") : isZh() ? "字体文件" : "Font File"],
      [isZh() ? "基础模型" : "Base Model", p.base_model ? basename(p.base_model) : isZh() ? "未配置" : "Not configured"],
      [isZh() ? "源 / 目标字体" : "Source / Target", `${(p.global_source_fonts || []).length} / ${(p.target_assets || []).length}`],
      [isZh() ? "风格参考图" : "Style Refs", `${(p.style_reference_pool || []).length}`],
      [isZh() ? "训练 / 生成批次" : "Runs / Batches", `${(detail.runs || []).length} / ${(detail.generation_batches || []).length}`],
    ]);
  }

  function renderAssetsAndModels(detail) {
    const p = getManifest(detail);
    if (!p) {
      renderKv("modelStatusKv", [[isZh() ? "基础模型" : "Base Model", "-"]]);
      renderKv("assetStatusKv", [[isZh() ? "素材状态" : "Assets", "-"]]);
      return;
    }
    setInputMode(p.input_mode || "font");
    renderKv("modelStatusKv", [
      [isZh() ? "当前基模" : "Current Base", p.base_model ? basename(p.base_model) : isZh() ? "尚未挂载" : "None"],
      [isZh() ? "活跃权重" : "Active Ckpt", p.active_checkpoint ? basename(p.active_checkpoint) : "-"],
      [isZh() ? "校验状态" : "Status", p.base_model ? (isZh() ? "已就绪" : "Ready") : isZh() ? "待配置" : "Pending"],
    ]);
    const srcNames = (p.global_source_fonts || []).map(basename).join(", ") || "-";
    const tgtNames = (p.target_assets || []).map(basename).join(", ") || "-";
    const dsPath = (detail && detail.dataset_path) || (p.training && p.training.dataset_path) || "";
    if ($("trainDatasetPath") && dsPath && !$("trainDatasetPath").value) {
      $("trainDatasetPath").value = dsPath;
    }
    renderKv("assetStatusKv", [
      [isZh() ? "源字体" : "Source Fonts", srcNames],
      [isZh() ? "目标素材" : "Target Assets", tgtNames],
      [isZh() ? "风格参考池" : "Style Pool", `${(p.style_reference_pool || []).length} ${isZh() ? "张" : "imgs"}`],
      [isZh() ? "已构建数据集" : "Dataset", dsPath ? basename(dsPath) : "-"],
    ]);
  }

  function renderTrainingRuns(detail) {
    const runs = (detail && detail.runs) || [];
    const countPill = $("trainRunsCountPill");
    if (countPill) countPill.textContent = String(runs.length);

    const sel = $("resumeRunSelect");
    if (sel) {
      sel.innerHTML = runs.length
        ? runs
            .slice()
            .reverse()
            .map((r) => `<option value="${escapeHtml(r.id)}">${escapeHtml(r.id)} (${escapeHtml(statusLabel(r.status))})</option>`)
            .join("")
        : `<option value="">${isZh() ? "暂无训练记录" : "No training runs"}</option>`;
    }

    const host = $("trainRunsTable");
    if (host) {
      if (!runs.length) {
        host.innerHTML = `<div class="empty-state">${isZh() ? "暂无训练记录。构建数据集后即可启动微调。" : "No training runs yet."}</div>`;
      } else {
        host.innerHTML = runs
          .slice()
          .reverse()
          .map((r) => {
            const params = r.parameters || {};
            const cls = statusPillClass(r.status);
            return `<div class="run-card">
              <div class="run-card-top">
                <span class="run-card-id">${escapeHtml(r.id)}</span>
                <span class="pill ${cls}">${escapeHtml(statusLabel(r.status))}</span>
              </div>
              <div class="run-card-meta">${escapeHtml(params.model || "JiT")} · epochs=${escapeHtml(params.epochs ?? "-")} · rank=${escapeHtml(params.lora_rank ?? "-")}</div>
              <div class="run-card-meta">${formatTime(r.created_at)}</div>
            </div>`;
          })
          .join("");
      }
    }

    // Monitor run chips
    const chipHost = $("monitorRunChips");
    if (chipHost) {
      const valid = new Set(runs.map((r) => r.id));
      state.selectedRunIds = state.selectedRunIds.filter((id) => valid.has(id));
      if (!state.selectedRunIds.length && runs.length) {
        state.selectedRunIds = [runs[runs.length - 1].id];
      }
      if (!runs.length) {
        chipHost.innerHTML = `<span class="muted">${isZh() ? "暂无可监控运行" : "No runs"}</span>`;
      } else {
        chipHost.innerHTML = runs
          .slice()
          .reverse()
          .map((r) => {
            const active = state.selectedRunIds.includes(r.id);
            return `<button class="chip ${active ? "active" : ""}" type="button" data-run-id="${escapeHtml(r.id)}">${escapeHtml(r.id)}</button>`;
          })
          .join("");
        chipHost.querySelectorAll("[data-run-id]").forEach((btn) => {
          btn.addEventListener("click", () => {
            const rid = btn.getAttribute("data-run-id");
            if (!rid) return;
            if (state.selectedRunIds.includes(rid)) {
              if (state.selectedRunIds.length > 1) {
                state.selectedRunIds = state.selectedRunIds.filter((x) => x !== rid);
              }
            } else {
              state.selectedRunIds.push(rid);
            }
            renderTrainingRuns(state.activeProject);
            loadMonitorDashboard();
          });
        });
      }
    }
  }

  function renderGenerationControls(p) {
    const sel = $("genCheckpointSelect");
    if (!sel) return;
    const choices = (p && p.generation_checkpoints) || [];
    if (!choices.length) {
      sel.innerHTML = `<option value="">${isZh() ? "暂无可用权重（请先准备基础模型）" : "No available checkpoints"}</option>`;
      return;
    }
    const prev = sel.value;
    sel.innerHTML = choices
      .map((c) => `<option value="${escapeHtml(c.path)}">${escapeHtml(c.label)}</option>`)
      .join("");
    if (prev && choices.some((c) => c.path === prev)) {
      sel.value = prev;
    }
  }

  function renderReviewBatchSelects(detail) {
    const batches = (detail && detail.generation_batches) || [];
    const html = batches.length
      ? batches
          .map((b) => `<option value="${escapeHtml(b.path)}">${escapeHtml(b.label)}</option>`)
          .join("")
      : `<option value="">${isZh() ? "暂无生成批次" : "No batches"}</option>`;
    ["reviewBatchSelect", "exportBatchSelect"].forEach((id) => {
      const sel = $(id);
      if (!sel) return;
      const prev = sel.value;
      sel.innerHTML = html;
      if (prev && batches.some((b) => b.path === prev)) sel.value = prev;
      else if (detail && detail.preferred_batch) sel.value = detail.preferred_batch;
    });
  }

  // =========================================================
  // SIMPLE MODE WORKBENCH
  // =========================================================
  function renderSimpleWorkbench() {
    const detail = state.activeProject;
    const p = getManifest(detail);
    const hasProject = Boolean(p);
    const hasModel = Boolean(p && (p.base_model || p.active_checkpoint));
    const hasAssets = Boolean(p && (p.global_source_fonts || []).length && (p.target_assets || []).length);
    const dsPath = (detail && detail.dataset_path) || (p && p.training && p.training.dataset_path) || "";
    const hasDataset = Boolean(dsPath);
    const batches = (detail && detail.generation_batches) || [];
    const runs = (detail && detail.runs) || [];
    const hasGen = batches.length > 0;
    const hasExport = Boolean(state.loadedSpecimenFont);

    const stepStates = [
      { step: 1, done: hasProject && hasModel, label: hasProject && hasModel ? (isZh() ? "已就绪" : "Ready") : (isZh() ? "待配置" : "Setup") },
      { step: 2, done: hasAssets, label: hasAssets ? (isZh() ? "已上传" : "Uploaded") : (isZh() ? "待上传" : "Pending") },
      { step: 3, done: hasGen, label: hasGen ? `${batches.length} ${isZh() ? "批次" : "batches"}` : (hasAssets && hasModel ? (isZh() ? "可执行" : "Ready") : (isZh() ? "待前序" : "Waiting")) },
      { step: 4, done: hasExport, label: hasExport ? (isZh() ? "已导出" : "Exported") : (hasGen ? (isZh() ? "可导出" : "Ready") : (isZh() ? "待生成" : "Pending")) },
    ];

    stepStates.forEach((st) => {
      const item = document.querySelector(`#simpleStepper .stepper-item[data-step="${st.step}"]`);
      if (item) item.classList.toggle("done", st.done);
      const stateEl = $(`simpleStep${st.step}State`);
      if (stateEl) stateEl.textContent = st.label;
      const badgeEl = $(`simpleStep${st.step}Badge`);
      if (badgeEl) {
        badgeEl.textContent = st.label;
        badgeEl.className = `pill ${st.done ? "ok" : ""}`.trim();
      }
    });

    const projInfo = $("simpleProjectInfo");
    if (projInfo) {
      projInfo.textContent = p
        ? isZh()
          ? `当前项目：${p.name}（ID: ${p.id}）`
          : `Active project: ${p.name} (${p.id})`
        : isZh()
        ? "尚未创建项目，请在上方输入名称并新建。"
        : "No project yet. Enter a name above to create one.";
    }

    const modelInfo = $("simpleModelInfo");
    if (modelInfo) {
      modelInfo.textContent = hasModel
        ? isZh()
          ? `已挂载模型：${basename(p.base_model || p.active_checkpoint)}`
          : `Attached model: ${basename(p.base_model || p.active_checkpoint)}`
        : isZh()
        ? "尚未挂载基础模型。可选已有共享模型或一键下载官方 JiT-B/16。"
        : "No base model yet. Attach a shared checkpoint or download official JiT-B/16.";
    }

    const assetsInfo = $("simpleAssetsInfo");
    if (assetsInfo) {
      if (hasAssets) {
        const src = (p.global_source_fonts || []).map(basename).join(", ");
        const tgt = (p.target_assets || []).map(basename).join(", ");
        assetsInfo.textContent = isZh()
          ? `已配置源字体：${src}  |  目标字体：${tgt}（风格参考 ${(p.style_reference_pool || []).length} 张）`
          : `Source: ${src} | Target: ${tgt} (${(p.style_reference_pool || []).length} style refs)`;
      } else {
        assetsInfo.textContent = isZh()
          ? "请同时上传参考源字体与目标风格字体，然后点击「保存字体并提取风格参考」。"
          : "Upload both source and target fonts, then save to extract style references.";
      }
    }

    const genNote = $("simpleGenNote");
    if (genNote) {
      if (!hasModel || !hasAssets) {
        genNote.textContent = isZh()
          ? "请先在第 1、2 步完成基础模型与字体上传。"
          : "Complete Step 1 (model) and Step 2 (fonts) before generating.";
      } else {
        const ckpt = (detail.generation_checkpoints || [])[0];
        genNote.textContent = isZh()
          ? `将自动使用权重「${ckpt ? ckpt.label : "基础模型"}」直接生成，支持 GBK 与任意文字组合。`
          : `Will use "${ckpt ? ckpt.label : "base model"}" with GBK presets or custom text.`;
      }
    }

    const trainNote = $("simpleTrainNote");
    if (trainNote) {
      trainNote.textContent = hasDataset
        ? isZh()
          ? `已检测到训练数据集（${basename(dsPath)}），可直接点击「2. 开始 LoRA 微调」或重新构建。`
          : `Dataset ready (${basename(dsPath)}). Start LoRA fine-tuning or rebuild.`
        : isZh()
        ? "先选择字数档位并点击「1. 构建训练数据」，任务完成后再点击「2. 开始 LoRA 微调」。"
        : "Choose a tier, run Step 1 (Build Dataset), then run Step 2 (Start LoRA Fine-Tune).";
    }

    // Right Snapshot Rail
    const railPill = $("simpleRailProjectPill");
    if (railPill) railPill.textContent = p ? p.name : isZh() ? "未创建" : "None";

    const checklist = $("simpleChecklist");
    if (checklist) {
      const items = [
        {
          step: 1,
          done: hasProject && hasModel,
          title: isZh() ? "01 项目与基础模型" : "01 Project & Model",
          val: hasModel ? basename(p.base_model || p.active_checkpoint) : isZh() ? "点击配置" : "Click to configure",
        },
        {
          step: 2,
          done: hasAssets,
          title: isZh() ? "02 源字体与目标字体" : "02 Font Assets",
          val: hasAssets ? `${basename(p.global_source_fonts[0])} -> ${basename(p.target_assets[0])}` : isZh() ? "待上传字体" : "Upload fonts",
        },
        {
          step: 3,
          done: hasGen,
          title: isZh() ? "03 生字 / 微调" : "03 Generate / Tune",
          val: hasGen
            ? isZh()
              ? `已有 ${batches.length} 个生成批次 / ${runs.length} 次微调`
              : `${batches.length} batches / ${runs.length} runs`
            : isZh()
            ? "尚未生成字形"
            : "No batches yet",
        },
        {
          step: 4,
          done: hasExport,
          title: isZh() ? "04 导出 TTF 字库" : "04 Export TTF",
          val: hasExport ? isZh() ? `已有 ${(p.exports || []).length} 个导出产物` : `${(p.exports || []).length} export(s)` : isZh() ? "待导出" : "Not exported",
        },
      ];
      checklist.innerHTML = items
        .map(
          (it) => `<div class="check-item ${it.done ? "done" : ""}" data-jump-step="${it.step}">
            <span class="check-indicator"></span>
            <div class="check-copy">
              <div class="check-title">${escapeHtml(it.title)}</div>
              <div class="check-val">${escapeHtml(it.val)}</div>
            </div>
          </div>`
        )
        .join("");
      checklist.querySelectorAll("[data-jump-step]").forEach((el) => {
        el.addEventListener("click", () => setSimpleStep(el.getAttribute("data-jump-step")));
      });
    }
  }

  // =========================================================
  // JOBS QUEUE & LIVE STATUS (SEMANTIC COLORS FIXED)
  // =========================================================
  async function refreshJobs(loadSelectedLog = false) {
    try {
      const data = await api("/api/jobs?limit=60");
      state.jobs = data.jobs || [];
      renderJobs();
      if (loadSelectedLog && state.selectedJobId) {
        await loadJobLog(state.selectedJobId);
      }
    } catch (_) {
      // ignore transient polling errors
    }
  }

  function renderJobs() {
    const jobs = state.jobs || [];
    const activeJobs = jobs.filter((j) => j.status === "running" || j.status === "queued");
    const activeCount = activeJobs.length;

    // Refresh project when a running job finishes
    if (state.activeJobsHadRunning && activeCount === 0 && state.activeProjectId) {
      loadProjectDetail(state.activeProjectId);
    }
    state.activeJobsHadRunning = activeCount > 0;

    // Nav badges
    ["navJobsBadge", "navJobsBadgeSimple"].forEach((id) => {
      const badge = $(id);
      if (!badge) return;
      badge.textContent = String(activeCount);
      badge.classList.toggle("hidden", activeCount === 0);
    });

    // Topbar job status chip
    const topDot = $("topbarJobDot");
    const topText = $("topbarJobText");
    if (topDot && topText) {
      if (activeCount > 0) {
        const current = activeJobs[0];
        topDot.className = "status-dot running";
        topText.textContent = `${jobTypeLabel(current.job_type)} (${activeCount})`;
      } else if (jobs[0] && jobs[0].status === "failed") {
        topDot.className = "status-dot failed";
        topText.textContent = isZh() ? "最近任务失败" : "Last job failed";
      } else {
        topDot.className = "status-dot idle";
        topText.textContent = isZh() ? "空闲" : "Idle";
      }
    }

    // Simple Mode Right-Rail Job Banner
    const sBadge = $("simpleJobBadge");
    const sName = $("simpleJobName");
    const sMsg = $("simpleJobMsg");
    if (sBadge && sName && sMsg) {
      const latest = activeJobs[0] || jobs[0];
      if (latest) {
        sBadge.textContent = statusLabel(latest.status);
        sBadge.className = `pill ${statusPillClass(latest.status)}`;
        sName.textContent = jobTypeLabel(latest.job_type);
        sMsg.textContent = latest.progress_text || latest.error || formatTime(latest.finished_at || latest.started_at || latest.created_at);
      } else {
        sBadge.textContent = isZh() ? "空闲" : "Idle";
        sBadge.className = "pill";
        sName.textContent = isZh() ? "当前无任务" : "No jobs yet";
        sMsg.textContent = isZh()
          ? "提交下载、建库、微调、生字或导出后，进度会实时显示在这里。"
          : "Progress for downloads, training, generation, and export appears here.";
      }
    }

    // Jobs List View
    const listEl = $("jobsList");
    if (!listEl) return;
    if (!jobs.length) {
      listEl.innerHTML = `<div class="empty-state">${isZh() ? "暂无后台任务记录" : "No background jobs yet"}</div>`;
      return;
    }
    if (!state.selectedJobId || !jobs.some((j) => j.id === state.selectedJobId)) {
      state.selectedJobId = jobs[0].id;
    }
    listEl.innerHTML = jobs
      .map((j) => {
        const active = j.id === state.selectedJobId;
        const cls = statusPillClass(j.status);
        return `<button class="job-row ${active ? "active" : ""}" type="button" data-job-id="${escapeHtml(j.id)}">
          <div class="job-row-top">
            <span class="job-row-type">${escapeHtml(jobTypeLabel(j.job_type))}</span>
            <span class="pill ${cls}">${escapeHtml(statusLabel(j.status))}</span>
          </div>
          <div class="job-row-msg">${escapeHtml(j.progress_text || j.error || "-")}</div>
          <div class="job-row-meta">
            <span>${escapeHtml(j.id.slice(0, 8))}</span>
            <span>${formatTime(j.finished_at || j.started_at || j.created_at)}</span>
          </div>
        </button>`;
      })
      .join("");
    listEl.querySelectorAll("[data-job-id]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.selectedJobId = btn.getAttribute("data-job-id") || "";
        renderJobs();
        loadJobLog(state.selectedJobId);
      });
    });

    updateJobActionButtons();
  }

  function updateJobActionButtons() {
    const job = (state.jobs || []).find((j) => j.id === state.selectedJobId);
    const title = $("jobLogTitle");
    const pill = $("jobLogStatusPill");
    const cancelBtn = $("btnCancelJob");
    const retryBtn = $("btnRetryJob");
    if (!job) {
      if (title) title.textContent = t("jobs.logTitle");
      if (pill) {
        pill.textContent = "-";
        pill.className = "pill";
      }
      if (cancelBtn) cancelBtn.disabled = true;
      if (retryBtn) retryBtn.disabled = true;
      return;
    }
    if (title) title.textContent = `${jobTypeLabel(job.job_type)} · ${job.id.slice(0, 8)}`;
    if (pill) {
      pill.textContent = statusLabel(job.status);
      pill.className = `pill ${statusPillClass(job.status)}`;
    }
    if (cancelBtn) cancelBtn.disabled = !["queued", "running"].includes(job.status);
    if (retryBtn) retryBtn.disabled = !["failed", "cancelled", "interrupted"].includes(job.status);
  }

  async function loadJobLog(jobId) {
    if (!jobId) return;
    try {
      const data = await api(`/api/jobs/${encodeURIComponent(jobId)}/log`);
      const viewer = $("jobLogViewer");
      if (viewer) {
        viewer.textContent = data.log || (isZh() ? "暂无日志输出。" : "No log output yet.");
        viewer.scrollTop = viewer.scrollHeight;
      }
    } catch (err) {
      toast(err.message, "danger");
    }
  }

  // =========================================================
  // MONITOR DASHBOARD & PURE SVG CHARTS
  // =========================================================
  async function loadMonitorDashboard() {
    if (!state.activeProjectId) return;
    try {
      const data = await api(`/api/projects/${encodeURIComponent(state.activeProjectId)}/training/dashboard`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ run_ids: state.selectedRunIds, language: state.lang }),
      });
      const series = data.series || {};
      renderMonitorKpis(data);
      renderMonitorAlerts(data.alerts || []);
      renderSvgChart("chartLoss", series.loss || [], "chartLossMeta");
      renderSvgChart("chartEval", series.evaluation || [], "chartEvalMeta");
      renderSvgChart("chartLr", series.lr || [], "chartLrMeta");
      renderSvgChart("chartSys", series.resources || [], "chartSysMeta");
      renderMonitorSnapshots(data.snapshots || []);
      const paramHeaders = data.parameter_headers || [];
      const paramRows = (data.parameter_rows || []).map((row) => {
        const obj = {};
        paramHeaders.forEach((h, i) => {
          obj[h] = row[i] != null ? row[i] : "";
        });
        return obj;
      });
      renderSimpleTable("monitorHyperTable", paramRows);
      renderSimpleTable("monitorCkptTable", data.checkpoints || []);
    } catch (err) {
      toast(err.message, "danger");
    }
  }

  function renderMonitorKpis(data) {
    const strip = $("monitorKpiStrip");
    if (!strip) return;
    const series = data.series || {};
    const lastOf = (seriesList, match) => {
      for (const s of seriesList || []) {
        if (!match || String(s.label || s.metric || "").toLowerCase().includes(match)) {
          const pts = s.points || [];
          if (pts.length) return pts[pts.length - 1];
        }
      }
      return null;
    };
    const lossPt = lastOf(series.loss);
    const lrPt = lastOf(series.lr);
    const ssimPt = lastOf(series.evaluation, "ssim");
    const memPt = lastOf(series.resources, "mem") || lastOf(series.resources);

    const cards = [
      { label: isZh() ? "最新步数 (Step)" : "Latest Step", val: lossPt ? String(lossPt.x) : "-", sub: isZh() ? "最近一次记录" : "Last logged" },
      { label: isZh() ? "最新 Loss" : "Latest Loss", val: lossPt ? formatNum(lossPt.y, 4) : "-", sub: isZh() ? "训练损失" : "Train loss" },
      { label: "Eval SSIM", val: ssimPt ? formatNum(ssimPt.y, 4) : "-", sub: isZh() ? "验证结构相似度" : "Validation SSIM" },
      { label: isZh() ? "学习率 / 系统" : "LR / System", val: lrPt ? formatNum(lrPt.y, 6) : (memPt ? formatNum(memPt.y, 2) : "-"), sub: memPt ? `Sys: ${formatNum(memPt.y, 2)}` : "Learning rate" },
    ];
    strip.innerHTML = cards
      .map(
        (c) => `<div class="kpi-card">
          <div class="kpi-label">${escapeHtml(c.label)}</div>
          <div class="kpi-val">${escapeHtml(c.val)}</div>
          <div class="kpi-sub">${escapeHtml(c.sub)}</div>
        </div>`
      )
      .join("");
  }

  function renderMonitorAlerts(alerts) {
    const host = $("monitorAlerts");
    if (!host) return;
    if (!alerts.length) {
      host.innerHTML = "";
      return;
    }
    host.innerHTML = alerts
      .map((a) => `<div class="alert-item danger">${escapeHtml(typeof a === "string" ? a : `[${a.run || ""}] ${a.alert || ""}`)}</div>`)
      .join("");
  }

  function renderSvgChart(hostId, seriesList, metaId) {
    const host = $(hostId);
    const meta = $(metaId);
    if (!host) return;
    const valid = (seriesList || []).filter((s) => (s.points || []).length > 0);
    if (!valid.length) {
      host.innerHTML = `<div class="empty-state">${isZh() ? "暂无曲线数据" : "No metric points yet"}</div>`;
      if (meta) meta.textContent = "";
      return;
    }

    const allPts = valid.flatMap((s) => s.points);
    let minX = Math.min(...allPts.map((p) => p.x));
    let maxX = Math.max(...allPts.map((p) => p.x));
    let minY = Math.min(...allPts.map((p) => p.y));
    let maxY = Math.max(...allPts.map((p) => p.y));
    if (minX === maxX) maxX = minX + 1;
    if (minY === maxY) {
      minY -= 0.1;
      maxY += 0.1;
    }

    const W = 540;
    const H = 200;
    const padL = 48;
    const padR = 14;
    const padT = 12;
    const padB = 24;
    const plotW = W - padL - padR;
    const plotH = H - padT - padB;
    const sx = (x) => padL + ((x - minX) / (maxX - minX)) * plotW;
    const sy = (y) => padT + (1 - (y - minY) / (maxY - minY)) * plotH;

    const gridLines = [0, 0.25, 0.5, 0.75, 1]
      .map((tNorm) => {
        const y = padT + tNorm * plotH;
        const v = maxY - tNorm * (maxY - minY);
        return `<line x1="${padL}" y1="${y.toFixed(1)}" x2="${W - padR}" y2="${y.toFixed(1)}" stroke="var(--chart-grid)" stroke-width="1" />
          <text x="${padL - 6}" y="${(y + 3).toFixed(1)}" text-anchor="end" fill="var(--text-3)" font-size="10">${escapeHtml(formatNum(v, 3))}</text>`;
      })
      .join("");

    const paths = valid
      .map((s, idx) => {
        const color = CHART_COLORS[idx % CHART_COLORS.length];
        const d = s.points
          .map((p, i) => `${i === 0 ? "M" : "L"}${sx(p.x).toFixed(1)},${sy(p.y).toFixed(1)}`)
          .join(" ");
        return `<path d="${d}" fill="none" stroke="${color}" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round" />`;
      })
      .join("");

    const legend = valid
      .map((s, idx) => {
        const color = CHART_COLORS[idx % CHART_COLORS.length];
        const last = s.points[s.points.length - 1];
        return `<span class="legend-item"><i class="legend-swatch" style="background:${color}"></i>${escapeHtml(s.label || s.metric || "")}: ${formatNum(last.y, 4)}</span>`;
      })
      .join("");

    host.innerHTML = `<svg class="chart-svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none">
        ${gridLines}
        ${paths}
        <text x="${padL}" y="${H - 5}" fill="var(--text-3)" font-size="10">${minX}</text>
        <text x="${W - padR}" y="${H - 5}" text-anchor="end" fill="var(--text-3)" font-size="10">${maxX}</text>
      </svg>
      <div class="chart-legend">${legend}</div>`;

    if (meta) meta.textContent = `${valid.length} ${isZh() ? "条曲线" : "series"}`;
  }

  function renderMonitorSnapshots(items) {
    const host = $("monitorSnapshots");
    const meta = $("monitorSnapshotMeta");
    if (meta) meta.textContent = items.length ? `${items.length} ${isZh() ? "张" : "items"}` : "";
    if (!host) return;
    if (!items.length) {
      host.innerHTML = `<div class="empty-state">${isZh() ? "暂无验证字形快照" : "No validation snapshots yet"}</div>`;
      return;
    }
    host.innerHTML = items
      .map(
        (it) => `<div class="snapshot-card">
          <img src="${escapeHtml(it.url)}" alt="${escapeHtml(it.caption || "")}" loading="lazy" />
          <div class="snapshot-cap">${escapeHtml(it.caption || "")}</div>
        </div>`
      )
      .join("");
  }

  function renderSimpleTable(hostId, rows) {
    const host = $(hostId);
    if (!host) return;
    if (!rows || !rows.length) {
      host.innerHTML = `<div class="empty-state">${isZh() ? "暂无记录" : "No records"}</div>`;
      return;
    }
    const cols = Object.keys(rows[0]);
    const head = cols.map((c) => `<th>${escapeHtml(c)}</th>`).join("");
    const body = rows
      .map((r) => `<tr>${cols.map((c) => `<td>${escapeHtml(r[c])}</td>`).join("")}</tr>`)
      .join("");
    host.innerHTML = `<table class="data-table"><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table>`;
  }

  // =========================================================
  // REVIEW & EXPORT
  // =========================================================
  async function loadReviewPage() {
    const grid = $("reviewGlyphGrid");
    if (!state.activeProjectId || !grid) return;
    const batchPath = $("reviewBatchSelect")?.value || "";
    state.activeReviewBatch = batchPath;
    if (!batchPath) {
      if (state.reviewPageAbort) state.reviewPageAbort.abort();
      grid.classList.remove("is-loading");
      grid.innerHTML = `<div class="empty-state">${isZh() ? "暂无生成批次，请先前往「字形生成」生成一批字形。" : "No generation batches yet."}</div>`;
      return;
    }
    const q = $("reviewQueryInput")?.value.trim() || "";
    if (state.reviewPageAbort) state.reviewPageAbort.abort();
    const controller = new AbortController();
    state.reviewPageAbort = controller;
    const seq = ++state.reviewPageSeq;
    grid.classList.add("is-loading");
    try {
      const data = await api(
        `/api/projects/${encodeURIComponent(state.activeProjectId)}/review/page?batch_path=${encodeURIComponent(batchPath)}&page=${state.reviewPage}&page_size=48&search=${encodeURIComponent(q)}`,
        { signal: controller.signal }
      );
      if (seq !== state.reviewPageSeq) return;
      state.reviewTotalPages = Math.max(1, data.total_pages || 1);
      state.reviewPage = Math.min(state.reviewPage, state.reviewTotalPages);
      const lbl = $("reviewPageLabel");
      if (lbl) lbl.textContent = `${state.reviewPage} / ${state.reviewTotalPages}`;
      const items = data.items || [];
      const sum = $("reviewSummaryText");
      if (sum) {
        const total = data.total_items;
        sum.textContent =
          total != null
            ? isZh()
              ? `当前页 ${items.length} / 共 ${total} 字`
              : `${items.length} on page / ${total} total`
            : isZh()
              ? `当前页 ${items.length} 字`
              : `${items.length} glyphs on page`;
      }

      if (!items.length) {
        grid.innerHTML = `<div class="empty-state">${isZh() ? "当前筛选条件下没有字形" : "No glyphs match filter"}</div>`;
        return;
      }
      grid.innerHTML = items
        .map((it) => {
          const active = it.codepoint === state.selectedReviewChar;
          const img = it.url
            ? `<img src="${escapeHtml(it.url)}" alt="${escapeHtml(it.char)}" loading="lazy" decoding="async" width="64" height="64" />`
            : `<div class="empty-state">-</div>`;
          return `<button class="glyph-cell ${active ? "active" : ""} ${it.manual ? "warn" : ""}" type="button" data-review-cp="${escapeHtml(it.codepoint)}">
            ${img}
            <span class="glyph-char">${escapeHtml(it.char)}</span>
            <span class="glyph-meta">${escapeHtml(it.codepoint || "")}</span>
          </button>`;
        })
        .join("");
    } catch (err) {
      if (err && err.name === "AbortError") return;
      toast(err.message, "danger");
    } finally {
      if (seq === state.reviewPageSeq) {
        grid.classList.remove("is-loading");
      }
    }
  }

  async function loadReviewCandidates(batchPath, codepoint) {
    if (!state.activeProjectId || !batchPath || !codepoint) return;
    const list = $("candidateList");
    const codeEl = $("candidateCharCode");
    if (state.reviewCandAbort) state.reviewCandAbort.abort();
    const controller = new AbortController();
    state.reviewCandAbort = controller;
    const seq = ++state.reviewCandSeq;
    if (list) list.classList.add("is-loading");
    try {
      const data = await api(
        `/api/projects/${encodeURIComponent(state.activeProjectId)}/review/candidates?batch_path=${encodeURIComponent(batchPath)}&codepoint=${encodeURIComponent(codepoint)}`,
        { signal: controller.signal }
      );
      if (seq !== state.reviewCandSeq) return;
      if (codeEl) codeEl.textContent = `${data.char || ""} (${codepoint})`;
      const cands = data.candidates || [];
      if (!cands.length) {
        if (list) list.innerHTML = `<div class="empty-state">${isZh() ? "无候选图像" : "No candidates"}</div>`;
        return;
      }
      if (list) {
        list.dataset.batchPath = batchPath;
        list.dataset.codepoint = codepoint;
        list.innerHTML = cands
          .map(
            (c, idx) => `<button class="candidate-card ${c.selected ? "selected" : ""}" type="button" data-cand-path="${escapeHtml(c.path)}">
              <img src="${escapeHtml(c.url)}" alt="${escapeHtml(c.name)}" decoding="async" />
              <span class="pill ${c.selected ? "ok" : ""}">#${idx + 1}${c.selected ? (isZh() ? " · 已选" : " · Selected") : ""}</span>
            </button>`
          )
          .join("");
      }
    } catch (err) {
      if (err && err.name === "AbortError") return;
      toast(err.message, "danger");
    } finally {
      if (seq === state.reviewCandSeq && list) {
        list.classList.remove("is-loading");
      }
    }
  }

  async function loadExportArtifacts() {
    if (!state.activeProjectId) return;
    if (state.exportArtifactsAbort) state.exportArtifactsAbort.abort();
    const controller = new AbortController();
    state.exportArtifactsAbort = controller;
    const seq = ++state.exportArtifactsSeq;
    try {
      const data = await api(
        `/api/projects/${encodeURIComponent(state.activeProjectId)}/export/artifacts?svg_limit=48`,
        { signal: controller.signal }
      );
      if (seq !== state.exportArtifactsSeq) return;
      const downloads = data.artifacts || data.downloads || [];
      const svgs = data.svgs || data.svg_samples || [];
      const html = downloads.length
        ? downloads
            .map(
              (d) => `<div class="file-row">
                <span class="file-name">${escapeHtml(d.name)}</span>
                <a class="btn ghost compact" href="${escapeHtml(d.url)}" download="${escapeHtml(d.name)}">${isZh() ? "下载" : "Download"}</a>
              </div>`
            )
            .join("")
        : `<div class="empty-state">${isZh() ? "尚未导出字库文件" : "No exported files yet"}</div>`;

      ["exportDownloadList", "simpleExportDownloads"].forEach((id) => {
        const el = $(id);
        if (el) el.innerHTML = html;
      });

      const svgHost = $("exportSvgGrid");
      if (svgHost) {
        svgHost.innerHTML = svgs.length
          ? svgs
              .map(
                (s) =>
                  `<div class="svg-card"><img src="${escapeHtml(s.url)}" alt="${escapeHtml(s.name)}" loading="lazy" decoding="async" width="56" height="56" /></div>`
              )
              .join("")
          : `<div class="empty-state">${isZh() ? "导出后展示矢量抽样" : "Vector samples appear after export"}</div>`;
      }

      const previewUrl = data.preview_font_url || (downloads.find((d) => String(d.name || "").toLowerCase().endsWith(".ttf")) || {}).url;
      const previewName = data.preview_font_name || (downloads.find((d) => String(d.name || "").toLowerCase().endsWith(".ttf")) || {}).name;
      const previewVersion = data.preview_font_version || "";
      if (previewUrl) {
        await loadSpecimenFont(previewUrl, previewName || "preview.ttf", previewVersion);
        renderSimpleWorkbench();
      }
    } catch (err) {
      if (err && err.name === "AbortError") return;
      // ignore if no exports yet
    }
  }

  async function loadSpecimenFont(url, name, version = "") {
    const key = `${url}|${version}`;
    if (state.loadedSpecimenKey === key && state.loadedSpecimenFont) {
      ["specimenInput", "simpleSpecimenInput"].forEach((id) => {
        const el = $(id);
        if (el) el.style.fontFamily = `"${state.loadedSpecimenFont}", sans-serif`;
      });
      ["specimenFontBadge", "simpleSpecimenBadge"].forEach((id) => {
        const el = $(id);
        if (el) {
          el.textContent = name;
          el.className = "pill ok";
        }
      });
      return;
    }
    const fontFamily = `Zi2ziPreview_${Date.now()}`;
    const sep = url.includes("?") ? "&" : "?";
    const fontUrl = version ? `${url}${sep}v=${encodeURIComponent(version)}` : url;
    try {
      const face = new FontFace(fontFamily, `url("${fontUrl}")`);
      const loaded = await face.load();
      if (state.loadedSpecimenFace) {
        try {
          document.fonts.delete(state.loadedSpecimenFace);
        } catch (_) {
          // ignore
        }
      }
      document.fonts.add(loaded);
      state.loadedSpecimenFace = loaded;
      state.loadedSpecimenKey = key;
      state.loadedSpecimenFont = fontFamily;
      ["specimenInput", "simpleSpecimenInput"].forEach((id) => {
        const el = $(id);
        if (el) el.style.fontFamily = `"${fontFamily}", sans-serif`;
      });
      ["specimenFontBadge", "simpleSpecimenBadge"].forEach((id) => {
        const el = $(id);
        if (el) {
          el.textContent = name;
          el.className = "pill ok";
        }
      });
    } catch (_) {
      // font load fallback
    }
  }

  // =========================================================
  // ACTIONS (SHARED ACROSS SIMPLE & ADVANCED MODES)
  // =========================================================
  async function createProjectByName(name) {
    const trimmed = String(name || "").trim();
    if (!trimmed) {
      toast(isZh() ? "请输入项目名称" : "Please enter a project name", "danger");
      return;
    }
    try {
      const res = await api("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: trimmed }),
      });
      const proj = res.project || res;
      toast(isZh() ? `已创建项目：${proj.name}` : `Created project: ${proj.name}`, "ok");
      state.activeProjectId = proj.id;
      localStorage.setItem("zi2zi_project_id", proj.id);
      await bootstrap();
    } catch (err) {
      toast(err.message, "danger");
    }
  }

  async function attachSharedModel(path) {
    if (!state.activeProjectId) {
      toast(isZh() ? "请先创建或选择项目" : "Select a project first", "danger");
      return;
    }
    if (!path) {
      toast(isZh() ? "请选择共享模型" : "Select a shared model", "danger");
      return;
    }
    try {
      await api(`/api/projects/${encodeURIComponent(state.activeProjectId)}/models/attach-shared`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model_path: path }),
      });
      toast(isZh() ? "已挂载基础模型" : "Base model attached", "ok");
      await loadProjectDetail(state.activeProjectId);
      renderProjectCards();
    } catch (err) {
      toast(err.message, "danger");
    }
  }

  async function downloadOfficialModel(source, variant) {
    try {
      const res = await api("/api/models/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model_name: variant || "JiT-B/16",
        }),
      });
      toast(isZh() ? `已提交模型下载任务 (${res.job_id})` : `Download queued (${res.job_id})`, "ok");
      state.selectedJobId = res.job_id;
      await refreshJobs(false);
    } catch (err) {
      toast(err.message, "danger");
    }
  }

  async function importModel(purpose, fileEl, pathEl) {
    if (!state.activeProjectId) {
      toast(isZh() ? "请先创建或选择项目" : "Select a project first", "danger");
      return;
    }
    const fd = new FormData();
    if (fileEl && fileEl.files && fileEl.files[0]) {
      fd.append("file", fileEl.files[0]);
      fd.append("trusted", "true");
    } else {
      toast(isZh() ? "请选择本地权重文件 (.pth / .pt)" : "Choose a local weight file (.pth / .pt)", "danger");
      return;
    }
    try {
      await api(`/api/projects/${encodeURIComponent(state.activeProjectId)}/models/import`, {
        method: "POST",
        body: fd,
      });
      toast(isZh() ? "模型权重导入成功" : "Model weight imported", "ok");
      await loadProjectDetail(state.activeProjectId);
      await bootstrap();
    } catch (err) {
      toast(err.message, "danger");
    }
  }

  function bindDropzones() {
    document.querySelectorAll(".dropzone").forEach((zone) => {
      const inputId = zone.getAttribute("data-file-input");
      const input = inputId ? $(inputId) : zone.querySelector('input[type="file"]');
      if (!input) return;
      const filesEl = zone.querySelector(".dropzone-files");
      const showFiles = () => {
        if (!filesEl) return;
        const names = [...(input.files || [])].map((f) => f.name);
        filesEl.textContent = names.join(", ");
      };
      input.addEventListener("change", showFiles);
      zone.addEventListener("dragover", (e) => {
        e.preventDefault();
        zone.classList.add("dragover");
      });
      zone.addEventListener("dragleave", () => zone.classList.remove("dragover"));
      zone.addEventListener("drop", (e) => {
        e.preventDefault();
        zone.classList.remove("dragover");
        if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length) {
          input.files = e.dataTransfer.files;
          showFiles();
        }
      });
    });
  }

  function bindEvents() {
    // Mode Switcher
    document.querySelectorAll("#uiModeSwitcher [data-ui-mode]").forEach((btn) => {
      btn.addEventListener("click", () => setUiMode(btn.getAttribute("data-ui-mode"), true));
    });

    // Sidebar Nav
    document.querySelectorAll(".nav-item[data-view]").forEach((btn) => {
      btn.addEventListener("click", () => setView(btn.getAttribute("data-view")));
    });

    // Project Switcher & Quick New
    $("projectSelect")?.addEventListener("change", (e) => selectProject(e.target.value));
    $("btnQuickNewProject")?.addEventListener("click", () => {
      if (state.uiMode === "simple") {
        setView("simple");
        setSimpleStep(1);
        $("simpleProjectName")?.focus();
      } else {
        setView("projects");
        $("newProjectName")?.focus();
      }
    });

    // Topbar
    $("topbarJobChip")?.addEventListener("click", () => setView("jobs"));
    $("btnToggleTheme")?.addEventListener("click", () => applyTheme(state.theme === "dark" ? "light" : "dark"));
    $("btnToggleLang")?.addEventListener("click", () => {
      state.lang = isZh() ? "en" : "zh";
      localStorage.setItem("zi2zi_lang", state.lang);
      applyI18n();
      bootstrap();
    });

    // Simple Mode Stepper & Sub-tabs
    document.querySelectorAll("#simpleStepper .stepper-item").forEach((btn) => {
      btn.addEventListener("click", () => setSimpleStep(btn.getAttribute("data-step")));
    });
    document.querySelectorAll("[data-goto-step]").forEach((btn) => {
      btn.addEventListener("click", () => setSimpleStep(btn.getAttribute("data-goto-step")));
    });
    document.querySelectorAll("#simpleActionTabs .seg-btn").forEach((btn) => {
      btn.addEventListener("click", () => setSimpleTab(btn.getAttribute("data-simple-tab")));
    });
    document.querySelectorAll("#simpleTrainTierGrid .tier-card").forEach((card) => {
      card.addEventListener("click", () => setSimpleTrainTier(card.getAttribute("data-tier")));
    });
    $("btnSimpleViewJobLog")?.addEventListener("click", () => setView("jobs"));
    $("btnSimpleSwitchAdvanced")?.addEventListener("click", () => setUiMode("advanced", true));

    // Simple Mode Step 1
    $("btnSimpleCreateProject")?.addEventListener("click", () => {
      const inp = $("simpleProjectName");
      createProjectByName(inp?.value || "").then(() => {
        if (inp) inp.value = "";
      });
    });
    $("btnSimpleAttachModel")?.addEventListener("click", () => attachSharedModel($("simpleSharedModelSelect")?.value));
    $("btnSimpleDownloadModel")?.addEventListener("click", () => downloadOfficialModel("hf-mirror", "JiT-B/16"));
    $("btnSimpleToggleLocalModel")?.addEventListener("click", () => $("simpleLocalModelBox")?.classList.toggle("hidden"));
    $("btnSimpleImportLocalModel")?.addEventListener("click", () => importModel("base", $("simpleLocalModelFile"), null));

    // Simple Mode Step 2
    $("btnSimpleSaveAssets")?.addEventListener("click", async () => {
      if (!state.activeProjectId) {
        toast(isZh() ? "请先在第 1 步创建项目" : "Create a project in Step 1 first", "danger");
        return;
      }
      const src = $("simpleSourceFont")?.files?.[0];
      const tgt = $("simpleTargetFont")?.files?.[0];
      if (!src && !tgt) {
        toast(isZh() ? "请先选择源字体与目标字体文件" : "Please select source and target fonts", "danger");
        return;
      }
      const fd = new FormData();
      fd.append("input_mode", "font");
      if (src) fd.append("source_fonts", src);
      if (tgt) fd.append("target_files", tgt);
      try {
        await api(`/api/projects/${encodeURIComponent(state.activeProjectId)}/assets`, { method: "POST", body: fd });
        toast(isZh() ? "字体已保存并提取风格参考" : "Fonts saved and style refs extracted", "ok");
        await loadProjectDetail(state.activeProjectId);
      } catch (err) {
        toast(err.message, "danger");
      }
    });

    // Simple Mode Step 3: Direct Gen & Quick Train
    $("simpleGenText")?.addEventListener("input", updateSimpleCharCount);
    $("btnSimpleFillSample")?.addEventListener("click", () => {
      const ta = $("simpleGenText");
      if (ta) {
        ta.value = "永和九年岁在癸丑暮春之初会于会稽山阴之兰亭";
        updateSimpleCharCount();
      }
    });
    $("btnSimpleClearPresets")?.addEventListener("click", () => {
      document.querySelectorAll('#simpleQuickPresets input[type="checkbox"]').forEach((cb) => {
        cb.checked = false;
        cb.closest(".preset-card")?.classList.remove("checked");
      });
      updateSimpleCharCount();
    });
    $("btnSimpleStartGen")?.addEventListener("click", async () => {
      if (!state.activeProjectId || !state.activeProject) {
        toast(isZh() ? "请先完成前序步骤" : "Complete earlier steps first", "danger");
        return;
      }
      const ckpt = (state.activeProject.generation_checkpoints || [])[0];
      if (!ckpt) {
        toast(isZh() ? "请先在第 1 步配置基础模型" : "Configure a base model in Step 1 first", "danger");
        return;
      }
      const text = $("simpleGenText")?.value || "";
      const presets = getCheckedPresetIds("simpleQuickPresets");
      if (!uniqueCharsCount(text) && !presets.length) {
        toast(isZh() ? "请输入文字或勾选至少一个字符集" : "Enter text or select a preset", "danger");
        return;
      }
      const dev = state.devices.find((d) => d.training_supported) || state.devices[0];
      const fd = new FormData();
      fd.append("generation_checkpoint", ckpt.path);
      fd.append("device", dev ? dev.id : "cpu");
      fd.append("text", text);
      fd.append("preset_ids", JSON.stringify(presets));
      fd.append("split_regions", "true");
      fd.append("primary_region", "SC");
      fd.append("candidates", "1");
      fd.append("seed", "42");
      try {
        const res = await api(`/api/projects/${encodeURIComponent(state.activeProjectId)}/generation/build`, {
          method: "POST",
          body: fd,
        });
        toast(isZh() ? `已开始生成字形（任务 ${res.job_id}）` : `Generation queued (${res.job_id})`, "ok");
        state.selectedJobId = res.job_id;
        await refreshJobs(false);
      } catch (err) {
        toast(err.message, "danger");
      }
    });

    $("btnSimpleBuildDataset")?.addEventListener("click", async () => {
      if (!state.activeProjectId) {
        toast(isZh() ? "请先创建项目" : "Create a project first", "danger");
        return;
      }
      const cfg = SIMPLE_TIERS[state.simpleTrainTier] || SIMPLE_TIERS.standard;
      try {
        const res = await api(`/api/projects/${encodeURIComponent(state.activeProjectId)}/dataset/build`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            charset: "auto",
            train_count: cfg.train_count,
            test_count: cfg.test_count,
            workers: 4,
          }),
        });
        toast(isZh() ? `已提交数据集构建（${cfg.train_count} 字，任务 ${res.job_id}）` : `Dataset build queued (${res.job_id})`, "ok");
        state.selectedJobId = res.job_id;
        await refreshJobs(false);
      } catch (err) {
        toast(err.message, "danger");
      }
    });

    $("btnSimpleStartTrain")?.addEventListener("click", async () => {
      if (!state.activeProjectId) {
        toast(isZh() ? "请先创建项目" : "Create a project first", "danger");
        return;
      }
      const cfg = SIMPLE_TIERS[state.simpleTrainTier] || SIMPLE_TIERS.standard;
      const gpu = state.devices.find((d) => d.training_supported);
      if (!gpu) {
        toast(isZh() ? "未检测到支持训练的 CUDA GPU" : "No CUDA GPU available for training", "danger");
        return;
      }
      try {
        const res = await api(`/api/projects/${encodeURIComponent(state.activeProjectId)}/training/start`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            device: gpu.id,
            quality: cfg.quality,
            epochs: cfg.epochs,
          }),
        });
        toast(isZh() ? `已开始 LoRA 微调（${cfg.epochs} 轮，任务 ${res.job_id}）` : `Training started (${res.job_id})`, "ok");
        state.selectedJobId = res.job_id;
        await refreshJobs(false);
      } catch (err) {
        toast(err.message, "danger");
      }
    });

    // Simple Mode Step 4
    $("btnSimpleExportFont")?.addEventListener("click", async () => {
      if (!state.activeProjectId || !state.activeProject) return;
      const batches = state.activeProject.generation_batches || [];
      if (!batches.length) {
        toast(isZh() ? "请先在第 3 步生成字形" : "Generate glyphs in Step 3 first", "danger");
        return;
      }
      const latestPath = state.activeProject.preferred_batch || batches[0].path;
      const fontName = ($("simpleFontName")?.value || "MyCustomFont").trim();
      try {
        const res = await api(`/api/projects/${encodeURIComponent(state.activeProjectId)}/export/build`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            generation_batch: latestPath,
            family: fontName,
            style: "Regular",
            version: "1.000",
            profiles: ["proportional"],
            threshold: 180,
            despeckle: 4,
          }),
        });
        const jid = (res.job_ids && res.job_ids[0]) || res.job_id || "";
        toast(isZh() ? `已提交 TTF 导出任务 (${jid})` : `TTF export queued (${jid})`, "ok");
        if (jid) state.selectedJobId = jid;
        await refreshJobs(false);
      } catch (err) {
        toast(err.message, "danger");
      }
    });
    $("btnSimpleRefreshExport")?.addEventListener("click", loadExportArtifacts);

    // Advanced 01: Projects & Packages
    $("btnCreateProject")?.addEventListener("click", () => {
      const inp = $("newProjectName");
      createProjectByName(inp?.value || "").then(() => {
        if (inp) inp.value = "";
      });
    });
    $("btnDeleteProject")?.addEventListener("click", async () => {
      if (!state.activeProjectId) return;
      const confirmVal = $("deleteConfirmInput")?.value.trim() || "";
      const cur = getManifest(state.activeProject);
      if (!confirmVal || (cur && confirmVal !== cur.name && confirmVal !== cur.id)) {
        toast(isZh() ? "请输入当前项目名称或 ID 以确认删除" : "Enter active project name or ID to confirm", "danger");
        return;
      }
      try {
        await api(`/api/projects/${encodeURIComponent(state.activeProjectId)}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ confirmed: true }),
        });
        toast(isZh() ? "项目已删除" : "Project deleted", "ok");
        if ($("deleteConfirmInput")) $("deleteConfirmInput").value = "";
        state.activeProjectId = "";
        await bootstrap();
      } catch (err) {
        toast(err.message, "danger");
      }
    });
    $("btnRefreshPackages")?.addEventListener("click", bootstrap);
    $("btnExportPackage")?.addEventListener("click", async () => {
      if (!state.activeProjectId) return;
      try {
        const res = await api(`/api/projects/${encodeURIComponent(state.activeProjectId)}/export`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            mode: $("pkgIncDataset")?.checked || $("pkgIncGen")?.checked ? "full" : "lightweight",
            include_shared_models: Boolean($("pkgIncBase")?.checked),
          }),
        });
        const out = $("exportPackageResult");
        if (out) {
          out.textContent = isZh() ? `已排队导出任务 ${res.job_id}` : `Export job queued: ${res.job_id}`;
        }
        toast(isZh() ? `项目包导出已排队 (${res.job_id})` : `Package export queued (${res.job_id})`, "ok");
        state.selectedJobId = res.job_id;
        await refreshJobs(false);
      } catch (err) {
        toast(err.message, "danger");
      }
    });
    $("btnInspectPackage")?.addEventListener("click", async () => {
      const file = $("packageUploadInput")?.files?.[0];
      if (!file) {
        toast(isZh() ? "请先选择一个 .zip 项目包文件" : "Please choose a .zip package file", "danger");
        return;
      }
      const fd = new FormData();
      fd.append("file", file);
      try {
        const res = await api("/api/project-packages/inspect", { method: "POST", body: fd });
        state.stagedPackagePath = res.staged_path || "";
        const box = $("packageInspectResult");
        if (box) {
          box.textContent = JSON.stringify(res.inspection || res, null, 2);
          box.classList.remove("hidden");
        }
      } catch (err) {
        toast(err.message, "danger");
      }
    });
    $("btnImportPackage")?.addEventListener("click", async () => {
      const stagedPath = state.stagedPackagePath || $("existingPackageSelect")?.value || "";
      if (!stagedPath) {
        toast(isZh() ? "请先校验上传的项目包或选择已有项目包" : "Inspect an uploaded package or select an existing one", "danger");
        return;
      }
      try {
        const res = await api("/api/project-packages/import", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ staged_path: stagedPath, confirmed: true }),
        });
        toast(isZh() ? `项目导入任务已提交 (${res.job_id})` : `Import queued (${res.job_id})`, "ok");
        state.selectedJobId = res.job_id;
        await refreshJobs(false);
      } catch (err) {
        toast(err.message, "danger");
      }
    });

    // Advanced 02: Assets & Models
    document.querySelectorAll("#inputModeGroup .seg-btn").forEach((btn) => {
      btn.addEventListener("click", () => setInputMode(btn.getAttribute("data-mode")));
    });
    $("btnRefreshModels")?.addEventListener("click", bootstrap);
    $("btnAttachSharedModel")?.addEventListener("click", () => attachSharedModel($("sharedModelSelect")?.value));
    $("btnDownloadModel")?.addEventListener("click", () =>
      downloadOfficialModel($("downloadSourceSelect")?.value, $("downloadVariantSelect")?.value)
    );
    $("btnImportBaseModel")?.addEventListener("click", () => importModel("base", $("importModelFile"), $("importModelPath")));
    $("btnImportResumeModel")?.addEventListener("click", () => importModel("resume", $("importModelFile"), $("importModelPath")));
    $("btnSaveAssets")?.addEventListener("click", async () => {
      if (!state.activeProjectId) {
        toast(isZh() ? "请先创建或选择项目" : "Select a project first", "danger");
        return;
      }
      const fd = new FormData();
      fd.append("input_mode", state.inputMode === "glyph_images" ? "glyphs" : "font");
      const appendFiles = (id, field) => {
        const files = $(id)?.files || [];
        for (const f of files) fd.append(field, f);
      };
      appendFiles("sourceFontsInput", "source_fonts");
      appendFiles("targetFontInput", "target_files");
      appendFiles("targetImagesInput", "target_files");
      appendFiles("sourceScInput", "sc_fonts");
      appendFiles("sourceTcInput", "tc_fonts");
      appendFiles("sourceJpInput", "jp_fonts");
      appendFiles("sourceKrInput", "kr_fonts");
      try {
        await api(`/api/projects/${encodeURIComponent(state.activeProjectId)}/assets`, { method: "POST", body: fd });
        toast(isZh() ? "素材已保存" : "Assets saved", "ok");
        await loadProjectDetail(state.activeProjectId);
      } catch (err) {
        toast(err.message, "danger");
      }
    });

    // Advanced 03: Dataset & Training
    document.querySelectorAll("[data-ds-preset]").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const name = btn.getAttribute("data-ds-preset");
        try {
          const data = await api(`/api/dataset/preset/${encodeURIComponent(name)}`);
          if ($("dsTrainCount")) $("dsTrainCount").value = data.train_count;
          if ($("dsTestCount")) $("dsTestCount").value = data.test_count;
        } catch (err) {
          toast(err.message, "danger");
        }
      });
    });
    $("btnCheckCapacity")?.addEventListener("click", async () => {
      if (!state.activeProjectId) return;
      const charset = $("dsCharset")?.value || "auto";
      try {
        const data = await api(`/api/projects/${encodeURIComponent(state.activeProjectId)}/dataset/capacity`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ charset, test_count: Number($("dsTestCount")?.value || 64) }),
        });
        const el = $("capacityResult");
        if (el) el.textContent = isZh()
          ? `当前字集 (${charset}) 可用配对字数：${data.capacity}（最大训练 ${data.max_train}）`
          : `Available (${charset}): ${data.capacity} (max train ${data.max_train})`;
      } catch (err) {
        toast(err.message, "danger");
      }
    });
    $("btnBuildDataset")?.addEventListener("click", async () => {
      if (!state.activeProjectId) return;
      try {
        const res = await api(`/api/projects/${encodeURIComponent(state.activeProjectId)}/dataset/build`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            charset: $("dsCharset")?.value || "auto",
            train_count: Number($("dsTrainCount")?.value || 3000),
            test_count: Number($("dsTestCount")?.value || 64),
            workers: 4,
          }),
        });
        toast(isZh() ? `数据集构建任务已提交 (${res.job_id})` : `Dataset job queued (${res.job_id})`, "ok");
        state.selectedJobId = res.job_id;
        await refreshJobs(false);
      } catch (err) {
        toast(err.message, "danger");
      }
    });
    $("btnStartTraining")?.addEventListener("click", async () => {
      if (!state.activeProjectId) return;
      const payload = {
        dataset_path: $("trainDatasetPath")?.value.trim() || "",
        device: $("trainDeviceSelect")?.value || "0",
        quality: $("trainQualitySelect")?.value || "balanced",
        epochs: Number($("trainEpochs")?.value || 20),
        horizontal_flip_prob: 0.0,
      };
      try {
        const res = await api(`/api/projects/${encodeURIComponent(state.activeProjectId)}/training/start`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        toast(isZh() ? `训练已启动 (${res.job_id})` : `Training started (${res.job_id})`, "ok");
        state.selectedJobId = res.job_id;
        await refreshJobs(false);
      } catch (err) {
        toast(err.message, "danger");
      }
    });
    $("btnResumeTraining")?.addEventListener("click", async () => {
      if (!state.activeProjectId) return;
      const runId = $("resumeRunSelect")?.value || "";
      if (!runId) {
        toast(isZh() ? "请选择要续训的轮次" : "Select a run to resume", "danger");
        return;
      }
      try {
        const res = await api(`/api/projects/${encodeURIComponent(state.activeProjectId)}/training/resume`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            run_id: runId,
            dataset_path: $("trainDatasetPath")?.value.trim() || "",
            device: $("trainDeviceSelect")?.value || "0",
            epochs: Number($("resumeExtraEpochs")?.value || 200),
            horizontal_flip_prob: 0.0,
          }),
        });
        toast(isZh() ? `续训已启动 (${res.job_id})` : `Resume queued (${res.job_id})`, "ok");
        state.selectedJobId = res.job_id;
        await refreshJobs(false);
      } catch (err) {
        toast(err.message, "danger");
      }
    });
    $("btnDeleteRun")?.addEventListener("click", async () => {
      if (!state.activeProjectId) return;
      const runId = $("resumeRunSelect")?.value || "";
      if (!runId) return;
      try {
        await api(`/api/projects/${encodeURIComponent(state.activeProjectId)}/training/runs/${encodeURIComponent(runId)}`, {
          method: "DELETE",
        });
        toast(isZh() ? `已删除训练记录 ${runId}` : `Deleted run ${runId}`, "ok");
        await loadProjectDetail(state.activeProjectId);
      } catch (err) {
        toast(err.message, "danger");
      }
    });

    // Advanced 04: Monitor
    $("btnRefreshMonitor")?.addEventListener("click", loadMonitorDashboard);
    const exportMetrics = async (fmt) => {
      if (!state.activeProjectId) return;
      const runId = state.selectedRunIds[0];
      if (!runId) {
        toast(isZh() ? "请先选择一个训练运行" : "Select a training run first", "danger");
        return;
      }
      try {
        const data = await api(`/api/projects/${encodeURIComponent(state.activeProjectId)}/training/export-metrics`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ run_id: runId }),
        });
        const target = (data.files || []).find((f) => String(f.name || "").endsWith(`.${fmt}`)) || (data.files || [])[0];
        if (target && target.url) window.open(target.url, "_blank");
        else toast(isZh() ? "已导出指标文件" : "Metrics exported", "ok");
      } catch (err) {
        toast(err.message, "danger");
      }
    };
    $("btnExportMetricsCsv")?.addEventListener("click", () => exportMetrics("csv"));
    $("btnExportMetricsJson")?.addEventListener("click", () => exportMetrics("json"));

    // Advanced 05: Generation
    $("genText")?.addEventListener("input", updateGenCharCount);
    $("btnGenFillSample")?.addEventListener("click", () => {
      const ta = $("genText");
      if (ta) {
        ta.value = "永和九年岁在癸丑暮春之初会于会稽山阴之兰亭";
        updateGenCharCount();
      }
    });
    $("btnGenClearPresets")?.addEventListener("click", () => {
      document.querySelectorAll('#genPrimaryPresets input[type="checkbox"], #genExtraPresets input[type="checkbox"]').forEach((cb) => {
        cb.checked = false;
        cb.closest(".preset-card")?.classList.remove("checked");
      });
      updateGenCharCount();
    });
    $("btnStartGeneration")?.addEventListener("click", async () => {
      if (!state.activeProjectId) {
        toast(isZh() ? "请先选择项目" : "Select a project first", "danger");
        return;
      }
      const ckpt = $("genCheckpointSelect")?.value || "";
      if (!ckpt) {
        toast(isZh() ? "请先选择推理权重" : "Select a checkpoint", "danger");
        return;
      }
      const fd = new FormData();
      fd.append("generation_checkpoint", ckpt);
      fd.append("device", $("genDeviceSelect")?.value || "0");
      fd.append("text", $("genText")?.value || "");
      const presets = [...getCheckedPresetIds("genPrimaryPresets"), ...getCheckedPresetIds("genExtraPresets")];
      fd.append("preset_ids", JSON.stringify(presets));
      const regionVal = $("genRegionSelect")?.value || "SC";
      fd.append("split_regions", "true");
      fd.append("primary_region", ["SC", "TC", "JP", "KR"].includes(regionVal) ? regionVal : "SC");
      fd.append("candidates", $("genCandidates")?.value || "1");
      fd.append("seed", $("genSeed")?.value || "42");
      const file = $("genCharsetFile")?.files?.[0];
      if (file) fd.append("custom_file", file);
      try {
        const res = await api(`/api/projects/${encodeURIComponent(state.activeProjectId)}/generation/build`, {
          method: "POST",
          body: fd,
        });
        toast(isZh() ? `生成任务已提交 (${res.job_id})` : `Generation queued (${res.job_id})`, "ok");
        state.selectedJobId = res.job_id;
        await refreshJobs(false);
      } catch (err) {
        toast(err.message, "danger");
      }
    });

    // Advanced 06: Review & Export
    document.querySelectorAll("#reviewExportTabs .seg-btn").forEach((btn) => {
      btn.addEventListener("click", () => setReviewSubtab(btn.getAttribute("data-subtab")));
    });
    $("btnRefreshReview")?.addEventListener("click", () => {
      if (state.reviewSubtab === "export") loadExportArtifacts();
      else loadReviewPage();
    });
    $("reviewBatchSelect")?.addEventListener("change", () => {
      state.reviewPage = 1;
      loadReviewPage();
    });
    const scheduleReviewSearch = (immediate = false) => {
      clearTimeout(state.reviewSearchTimer);
      state.reviewPage = 1;
      if (immediate) {
        loadReviewPage();
      } else {
        state.reviewSearchTimer = setTimeout(() => loadReviewPage(), 250);
      }
    };
    $("reviewQueryInput")?.addEventListener("compositionstart", () => {
      state.reviewSearchComposing = true;
    });
    $("reviewQueryInput")?.addEventListener("compositionend", () => {
      state.reviewSearchComposing = false;
      scheduleReviewSearch(false);
    });
    $("reviewQueryInput")?.addEventListener("input", (e) => {
      if (state.reviewSearchComposing || e.isComposing) return;
      scheduleReviewSearch(false);
    });
    $("reviewQueryInput")?.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !state.reviewSearchComposing) {
        scheduleReviewSearch(true);
      }
    });
    $("reviewGlyphGrid")?.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-review-cp]");
      if (!btn) return;
      const grid = $("reviewGlyphGrid");
      const cp = btn.getAttribute("data-review-cp") || "";
      const batchPath = state.activeReviewBatch || $("reviewBatchSelect")?.value || "";
      if (!cp || !batchPath) return;
      state.selectedReviewChar = cp;
      grid?.querySelectorAll(".glyph-cell.active").forEach((c) => c.classList.remove("active"));
      btn.classList.add("active");
      loadReviewCandidates(batchPath, cp);
    });
    $("candidateList")?.addEventListener("click", async (e) => {
      const btn = e.target.closest("[data-cand-path]");
      if (!btn) return;
      const list = $("candidateList");
      const batchPath = list?.dataset.batchPath || state.activeReviewBatch || "";
      const codepoint = list?.dataset.codepoint || state.selectedReviewChar || "";
      const imagePath = btn.getAttribute("data-cand-path") || "";
      if (!state.activeProjectId || !batchPath || !codepoint || !imagePath) return;
      try {
        await api(`/api/projects/${encodeURIComponent(state.activeProjectId)}/review/select`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ batch_path: batchPath, codepoint, image_path: imagePath }),
        });
        toast(isZh() ? `已选定 ${codepoint} 的候选字形` : `Selected candidate for ${codepoint}`, "ok");
        const cell = $("reviewGlyphGrid")?.querySelector(`[data-review-cp="${CSS.escape(codepoint)}"]`);
        if (cell) cell.classList.add("warn");
        loadReviewCandidates(batchPath, codepoint);
      } catch (err) {
        toast(err.message, "danger");
      }
    });
    $("reviewFilterSelect")?.addEventListener("change", () => {
      state.reviewPage = 1;
      loadReviewPage();
    });
    $("btnReviewPrev")?.addEventListener("click", () => {
      if (state.reviewPage > 1) {
        state.reviewPage -= 1;
        loadReviewPage();
      }
    });
    $("btnReviewNext")?.addEventListener("click", () => {
      if (state.reviewPage < state.reviewTotalPages) {
        state.reviewPage += 1;
        loadReviewPage();
      }
    });
    $("specimenSizeRange")?.addEventListener("input", (e) => {
      const sz = `${e.target.value}px`;
      if ($("specimenSizeLabel")) $("specimenSizeLabel").textContent = sz;
      if ($("specimenInput")) $("specimenInput").style.fontSize = sz;
    });
    $("btnRefreshArtifacts")?.addEventListener("click", loadExportArtifacts);
    $("btnStartExport")?.addEventListener("click", async () => {
      if (!state.activeProjectId) return;
      const batchPath = $("exportBatchSelect")?.value || "";
      if (!batchPath) {
        toast(isZh() ? "请选择生成批次" : "Select a generation batch", "danger");
        return;
      }
      try {
        const res = await api(`/api/projects/${encodeURIComponent(state.activeProjectId)}/export/build`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            generation_batch: batchPath,
            family: ($("exportFontName")?.value || "MyCustomFont").trim(),
            style: "Regular",
            version: "1.000",
            profiles: ["proportional"],
            threshold: Number($("exportThreshold")?.value || 180),
            despeckle: Number($("exportTurdsize")?.value || 4),
          }),
        });
        const jid = (res.job_ids && res.job_ids[0]) || res.job_id || "";
        toast(isZh() ? `导出任务已提交 (${jid})` : `Export queued (${jid})`, "ok");
        if (jid) state.selectedJobId = jid;
        await refreshJobs(false);
      } catch (err) {
        toast(err.message, "danger");
      }
    });

    // Jobs Queue
    $("btnRefreshJobs")?.addEventListener("click", () => refreshJobs(true));
    $("btnCancelJob")?.addEventListener("click", async () => {
      if (!state.selectedJobId) return;
      try {
        await api(`/api/jobs/${encodeURIComponent(state.selectedJobId)}/cancel`, { method: "POST" });
        toast(isZh() ? "已请求取消任务" : "Cancel requested", "ok");
        await refreshJobs(true);
      } catch (err) {
        toast(err.message, "danger");
      }
    });
    $("btnRetryJob")?.addEventListener("click", async () => {
      if (!state.selectedJobId) return;
      try {
        const res = await api(`/api/jobs/${encodeURIComponent(state.selectedJobId)}/retry`, { method: "POST" });
        toast(isZh() ? `已重新排队 (${res.job_id || state.selectedJobId})` : "Job retried", "ok");
        if (res.job_id) state.selectedJobId = res.job_id;
        await refreshJobs(true);
      } catch (err) {
        toast(err.message, "danger");
      }
    });
  }

  function init() {
    applyTheme(state.theme);
    applyI18n();
    bindDropzones();
    bindEvents();
    setUiMode(state.uiMode, true);
    setSimpleStep(1);
    setSimpleTab("generate");
    setSimpleTrainTier("standard");
    bootstrap();
    setInterval(() => {
      refreshJobs(state.view === "jobs");
      if (state.view === "monitor") {
        const hasRunning = (state.jobs || []).some((j) => j.status === "running" && j.kind === "train_lora");
        if (hasRunning) loadMonitorDashboard();
      }
    }, 4000);
  }

  document.addEventListener("DOMContentLoaded", init);
})();
