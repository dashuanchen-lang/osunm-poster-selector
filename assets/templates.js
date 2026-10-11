window.OSUNM_CASES = [
  { file: '001.jpg', caption: '冷灰产品信息卡' }, { file: '002.jpg', caption: '部件组合公式解释' }, { file: '003.jpg', caption: '暗场展台与四类证据' },
  { file: '004.jpg', caption: '新品双版本发布' }, { file: '005.jpg', caption: '暖金系统组件总览' }, { file: '006.jpg', caption: '暗场系统爆炸陈列' }, { file: '008.jpg', caption: '浅色系统组件平铺' },
  { file: '009.jpg', caption: '工程图框功能说明' }, { file: '010.jpg', caption: '左文右图结构说明' }, { file: '011.jpg', caption: '侧压推拉系统详情长图' }, { file: '144.jpg', caption: '滑轮功能详情长图' }, { file: '148.jpg', caption: '一字锁模块化详情长图' },
  { file: '016.jpg', caption: '浅色双执手英雄图' }, { file: '018.jpg', caption: '暗色双执手英雄图' }, { file: '028.jpg', caption: 'Active 系列组件陈列' }, { file: '035.jpg', caption: 'Standard 系列浅色陈列' }, { file: '084.jpg', caption: 'Standard 系列暗色陈列' }, { file: '102.jpg', caption: 'Ultra 系列组件陈列' }, { file: '108.jpg', caption: 'X 系列组件陈列' },
  { file: '027.jpg', caption: '米白纸纹系列组件目录' }, { file: '042.jpg', caption: '系列技术说明背页' }, { file: '131.jpg', caption: '侧压系统横版展箱' }, { file: '133.jpg', caption: '卷系列横版展箱' }, { file: '137.jpg', caption: '系统技术框架展箱' }, { file: '139.jpg', caption: '多组件阵列展箱' },
  { file: '145.jpg', caption: 'HC035 单型号规格参数' }, { file: '146.jpg', caption: 'HC035 另一规格参数' }, { file: '147.jpg', caption: 'HC035 双规格对比' }, { file: '149.jpg', caption: '长杆勾锁功能卡' }, { file: '150.jpg', caption: '暗色工程尺寸线稿' }, { file: '152.jpg', caption: '暗色大型号产品英雄图' }, { file: '153.jpg', caption: '米橙大型号产品英雄图' }, { file: '154.jpg', caption: '浅色单品尺寸工程图' }, { file: '155.jpg', caption: '浅色极简单品展台' }
];

window.OSUNM_TEMPLATES = [
  { id: 'OSM-01', name: '冷灰产品信息卡型', categories: ['门窗系统五金', '门锁/碰锁/勾锁', '铰链/合页', '滑轮/推拉部件'], format: 'single', ratio: '3:4', use: '单品结构清楚、需要同时说明安装关系与三项以内卖点。', composition: '左中产品配右侧安装证据，底部三张卖点卡；冷灰工业底色，自上而下阅读。', tags: ['冷灰', '信息卡', '安装证据'], cases: ['001.jpg'] },
  { id: 'OSM-02', name: '部件公式解释型', categories: ['门窗系统五金', '门锁/碰锁/勾锁'], format: 'single', ratio: '3:4', use: '解释两个或多个组件如何组合、协同。', composition: '中轴大留白，2–3 个部件悬浮，下方以组合公式收束结果。', tags: ['中轴对称', '组合关系', '大留白'], cases: ['002.jpg'] },
  { id: 'OSM-03', name: '暗场展台证据型', categories: ['门锁/碰锁/勾锁', '执手/把手', '门窗系统五金'], format: 'single', ratio: '原图360:779；选最近支持档位（支持时1:2）', use: '需要同时展示核心产品与结构、安装或操作证据。', composition: '中央圆台突出单品，下方 2×2 证据卡；暗场聚焦，先标题再产品再证据。', tags: ['暗场', '展台', '证据卡'], cases: ['003.jpg'] },
  { id: 'OSM-04', name: '极简新品双版本型', categories: ['执手/把手', '门锁/碰锁/勾锁', '门窗系统五金'], format: 'single', ratio: '3:4', use: '新品发布、双颜色或两个真实版本并列。', composition: '中轴对称、上方发布信息、下方双品同尺度展示，并保留大留白。', tags: ['新品', '双版本', '极简'], cases: ['004.jpg'] },
  { id: 'OSM-05', name: '系统组件爆炸总览型', categories: ['门窗系统五金', '执手/把手', '铰链/合页', '滑轮/推拉部件'], format: 'single', ratio: '3:4', use: '完整说明多组件门窗五金系统及其组成关系。', composition: '核心组件作锚点，长件形成主对角线，小件围绕分布；系统关系优先。', tags: ['系统总览', '组件关系', '爆炸陈列'], cases: ['005.jpg', '006.jpg', '008.jpg'] },
  { id: 'OSM-06', name: '工程图框功能说明型', categories: ['门窗系统五金', '门锁/碰锁/勾锁', '铰链/合页', '滑轮/推拉部件', '工程与详情页'], format: 'single', ratio: '3:4', use: '解释组件边界、安装关系或功能分区。', composition: '工程线框围合中心说明区，或采用左文右产品；沿框线/分区阅读。', tags: ['工程线框', '结构说明', '安装关系'], cases: ['009.jpg', '010.jpg'] },
  { id: 'OSM-07', name: '模块化详情长图型', categories: ['门窗系统五金', '门锁/碰锁/勾锁', '执手/把手', '铰链/合页', '滑轮/推拉部件', '工程与详情页'], format: 'long', ratio: '3:4 模块', use: '信息较丰富的详情页；拆成 5–7 张独立模块生成后再拼接。', composition: '认知、卖点、规格、结构、细节、总结分模块叙事；预留衔接区并控制产品重复。', tags: ['模块长图', '详情页', '分段叙事'], cases: ['011.jpg', '144.jpg', '148.jpg'] },
  { id: 'OSM-08', name: '执手双产品英雄型', categories: ['执手/把手', '门窗系统五金'], format: 'single', ratio: '3:4', use: '执手双品、双配色或强调造型差异。', composition: '双产品以对称或主对角成为视觉核心，上方/侧边标题引导。', tags: ['执手', '双产品', '英雄展示'], cases: ['016.jpg', '018.jpg'] },
  { id: 'OSM-09', name: '系列组件陈列型', categories: ['门窗系统五金', '执手/把手', '铰链/合页', '滑轮/推拉部件'], format: 'single', ratio: '3:4', use: '系列系统组件目录与品牌识别，适合多组件陈列。', composition: '顶部品牌与系列名，中下多组件沿对角线展开，核心执手作锚点。', tags: ['系列目录', '组件陈列', '对角线'], cases: ['028.jpg', '035.jpg', '084.jpg', '102.jpg', '108.jpg'] },
  { id: 'OSM-10', name: '米白系列组件目录型', categories: ['门窗系统五金', '执手/把手', '铰链/合页', '滑轮/推拉部件'], format: 'single', ratio: '3:4', use: '中等数量系统五金目录，需要温和家居氛围。', composition: '米白纸感底色，上部系列名、中部组件目录、下部辅助参数。', tags: ['米白', '系列目录', '家居感'], cases: ['027.jpg'] },
  { id: 'OSM-11', name: '系列技术说明背页型', categories: ['门窗系统五金', '工程与详情页'], format: 'single', ratio: '3:4', use: '作为系列海报背页，承载组件说明与较密集技术信息。', composition: '上图下文，组件组建立识别，下方分栏放说明与参数。', tags: ['技术背页', '分栏', '高信息密度'], cases: ['042.jpg'] },
  { id: 'OSM-12', name: '横版展箱系统型', categories: ['门窗系统五金', '执手/把手', '铰链/合页', '滑轮/推拉部件', '工程与详情页'], format: 'horizontal', ratio: '横版', use: '线下展箱、横屏展示与横向系统说明，不可直接裁成竖版。', composition: '左右分区，文字/参数与产品阵列并置；横向阅读并保留宽留白。', tags: ['横版', '展箱', '系统说明'], cases: ['131.jpg', '133.jpg', '137.jpg', '139.jpg'] },
  { id: 'OSM-13', name: '暗色参数对比型', categories: ['铰链/合页', '门窗系统五金', '工程与详情页'], format: 'single', ratio: '3:4', use: '有可核验的同维度参数，需单型号说明或双规格对比。', composition: '炭黑暗底配银色产品与橙色重点；单品参数侧栏或上下双规格布局。', tags: ['暗色', '参数对比', '规格'], cases: ['145.jpg', '146.jpg', '147.jpg'] },
  { id: 'OSM-14', name: '暗色长杆件功能卡型', categories: ['门锁/碰锁/勾锁', '门窗系统五金'], format: 'single', ratio: '3:4', use: '勾锁、长传动杆、天地锁等纵向长比例五金。', composition: '右侧长杆贯穿画面，左侧卖点与局部功能卡，炭黑底承托银色产品。', tags: ['长杆件', '功能卡', '暗色'], cases: ['149.jpg'] },
  { id: 'OSM-15', name: '暗色工程线稿型', categories: ['门锁/碰锁/勾锁', '工程与详情页'], format: 'single', ratio: '3:4', use: '工程规格补充和 B2B 技术沟通，不作为独立营销首图。', composition: '暗底中央排列正投影/侧视线稿，底部型号，四周大留白。', tags: ['工程线稿', 'B2B', '规格补充'], cases: ['150.jpg'] },
  { id: 'OSM-16', name: '暗色大字产品英雄型', categories: ['门锁/碰锁/勾锁', '门窗系统五金'], format: 'single', ratio: '3:4', use: '长杆单品新品、型号记忆、展会预热。', composition: '左侧大型号、右侧纵向长主体，中下放品类与少量卖点。', tags: ['暗色', '大字', '单品英雄'], cases: ['152.jpg'] },
  { id: 'OSM-17', name: '米橙大字产品英雄型', categories: ['门锁/碰锁/勾锁', '门窗系统五金'], format: 'single', ratio: '3:4', use: '浅色品牌传播、门店新品和长杆单品海报。', composition: '米白信息面板、深灰产品承托区、橙色窄边；型号与产品纵向并置。', tags: ['米橙', '大字', '品牌传播'], cases: ['153.jpg'] },
  { id: 'OSM-18', name: '浅色尺寸工程单品型', categories: ['门锁/碰锁/勾锁', '铰链/合页', '工程与详情页'], format: 'single', ratio: '3:4', use: '有可靠尺寸依据的单品参数补充图或 B2B 介绍。', composition: '上部标题，中部左尺寸线稿、右侧完整产品，下方浅色圆台。', tags: ['浅色', '尺寸标注', '工程单品'], cases: ['154.jpg'] },
  { id: 'OSM-19', name: '浅色极简单品展台型', categories: ['门锁/碰锁/勾锁', '执手/把手', '铰链/合页', '滑轮/推拉部件'], format: 'single', ratio: '3:4', use: '新品首屏、详情开场或极简单品品牌海报。', composition: '顶部居中标题，中央偏下单品置于白色双层圆台，上方大留白。', tags: ['极简', '单品展台', '大留白'], cases: ['155.jpg'] }
];

const OSUNM_PRIMARY_CATEGORY = {
  'OSM-01': '门锁/碰锁', 'OSM-02': '门锁/碰锁', 'OSM-03': '门锁/碰锁', 'OSM-04': '门锁/碰锁',
  'OSM-05': '门窗系统套件', 'OSM-06': '门窗系统套件', 'OSM-07': '滑轮/推拉部件', 'OSM-08': '执手/把手',
  'OSM-09': '门窗系统套件', 'OSM-10': '门窗系统套件', 'OSM-11': '门窗系统套件', 'OSM-12': '门窗系统套件',
  'OSM-13': '铰链/合页', 'OSM-14': '勾锁/长传动件', 'OSM-15': '勾锁/长传动件', 'OSM-16': '勾锁/长传动件',
  'OSM-17': '勾锁/长传动件', 'OSM-18': '勾锁/长传动件', 'OSM-19': '通用单品'
};

for (const template of window.OSUNM_TEMPLATES) {
  template.category = OSUNM_PRIMARY_CATEGORY[template.id];
  delete template.categories;
}
