/* 四条双向轴，顺序为专技—渠道、流程—临场、保底—试水、独立—组织。 */
const dimensions = [
  { low: '专注一门手艺', high: '善于找人和渠道' },
  { low: '重视流程和细节', high: '擅长临场变通' },
  { low: '习惯给自己留余地', high: '愿意先试再加码' },
  { low: '偏好独立完成', high: '善于组织协作' },
];

const questions = [
  {
    axis: 0, title: '第一次做一件不熟悉的事，你会从哪儿开始？',
    answers: [
      [2, '先找做过的人，问问谁能帮忙、哪里能找到资源。'],
      [-2, '先自己学到能独立完成关键步骤。'],
      [1, '找一位熟悉这件事的人一起做，边做边学。'],
      [-1, '找几个好例子，照着做一个能用的版本。'],
    ],
  },
  {
    axis: 2, title: '有人找你做个新项目，回报不错，但可能白忙一场。你怎么决定？',
    answers: [
      [-2, '先确认能拿到的回报，再决定值不值得投入。'],
      [2, '有一点胜算就先接，边做边验证。'],
      [-1, '只答应一小块，确保手上原有的事不受影响。'],
      [1, '留好退出的办法，愿意先投些时间试一轮。'],
    ],
  },
  {
    axis: 1, title: '离交付只剩一天，原定方案行不通了。你会先做什么？',
    answers: [
      [-2, '对照原要求找出问题，尽可能把缺的部分补齐。'],
      [2, '改用手边能拿到的东西，先把最关键的效果做出来。'],
      [1, '联系对方改个能交付的版本，保住最急的部分。'],
      [-1, '保留原方案能用的部分，按清单逐项缩减。'],
    ],
  },
  {
    axis: 3, title: '一群人要合办一场活动，眼下谁都没说自己负责什么。你更自然的做法是？',
    answers: [
      [2, '先把活分下去，之后盯住谁需要谁配合。'],
      [-1, '跟大家认领一块，细节我自己拿主意。'],
      [-2, '主动包下一件完整的事，做好了直接交。'],
      [1, '找出最缺人的地方，拉一两个人把它接起来。'],
    ],
  },
  {
    axis: 0, title: '大家会因为什么事反复来找你？',
    answers: [
      [-2, '有个活很挑手艺，做得对的人不多。'],
      [1, '他们想知道该找谁，我通常知道怎么牵线。'],
      [-1, '有个小麻烦需要处理，我经手过很多次。'],
      [2, '事情需要几方搭上线，我能把人和东西凑起来。'],
    ],
  },
  {
    axis: 1, title: '你接手的工作开始反复出同一种错。你较可能怎么改？',
    answers: [
      [1, '常见的两三种情况分开处理，先让手上的活跑起来。'],
      [-1, '在最容易出错的地方加一道确认。'],
      [2, '换一种做法试试，绕开这个总卡住的地方。'],
      [-2, '逐步复查，找出根因并定下一套能重复的办法。'],
    ],
  },
  {
    axis: 2, title: '你手上有一笔能自由支配的预算。哪种用法最像你？',
    answers: [
      [2, '投到一个还没被验证、但我有把握判断的机会。'],
      [-2, '先留一笔应急钱，剩下的再按需花。'],
      [1, '拿一部分多试几个方向，看哪一个值得往下做。'],
      [-1, '先买眼下用得上的东西，额外开销等有明确需求再说。'],
    ],
  },
  {
    axis: 3, title: '你的副业开始忙不过来了。接下来你更愿意怎么做？',
    answers: [
      [-2, '少接几单，留下自己最想做、也最能做好的。'],
      [2, '把能教会别人的部分交出去，自己负责协调和把关。'],
      [-1, '先改自己的工作次序，尽量在手上消化。'],
      [1, '请人帮最耗时的一段，这一段交给对方决定。'],
    ],
  },
  {
    axis: 0, title: '如果只给你半年，你更愿意积累什么？',
    answers: [
      [1, '在一个领域多认识几位能互相帮忙的人。'],
      [-2, '练出一种拿得出手、有人愿意为它付钱的本领。'],
      [2, '摸清哪里有货、谁有需求，以及怎么把两边接起来。'],
      [-1, '把自己已经会的东西做得更稳定、更省力。'],
    ],
  },
  {
    axis: 1, title: '每周总有几件事临时变化。你偏好哪种安排？',
    answers: [
      [-2, '把固定事项排好，给临时变化专门空一段时间。'],
      [1, '只先定最要紧的事，其他按当天情况往前推。'],
      [-1, '做个计划，提前写下最常见的替换方案。'],
      [2, '手上常备几个选项，有变化就直接换一条路。'],
    ],
  },
  {
    axis: 2, title: '两种选择都能养活自己，你更容易选哪种？',
    answers: [
      [-1, '每个月大致有底，偶尔再接一件不确定的活。'],
      [2, '收入波动大一些，但我能自己决定押哪个机会。'],
      [-2, '回报上限低一点，但每笔进账什么时候到很清楚。'],
      [1, '给自己定个期限，试试回报更高的方向。'],
    ],
  },
  {
    axis: 3, title: '一件做成了的事，哪个瞬间最让你有成就感？',
    answers: [
      [2, '不同的人各自负责一块，最后刚好接在一起。'],
      [-2, '整件事从头到尾都由我亲手做到了想要的样子。'],
      [-1, '别人负责大局，我交出的那部分经得起细看。'],
      [1, '原本卡在沟通上的两个人，在我的帮助下开始配合。'],
    ],
  },
];

const profiles = [
  {
    id: 'artisan', target: [-6, -3, -2, -5], role: '巷口修造匠', tier: '自营谋生',
    line: '你会把一件事做熟，直到别人想到它就想到你。',
    livelihood: '修整器物，按件收钱', assets: '一套工具和一批熟客', condition: '入行学艺，能取得工具',
    opportunity: '《东京梦华录》记过城市里的修整杂货生意。你愿意把重复的小活越做越细，别人坏了东西能想到找你。熟客多起来，便有机会从受人差遣变成自己接单。',
    cost: '这份生计随你的工时走。要是病了，或是附近多了同样的匠人，熟客和工具也不能立刻补上少收的工钱。',
  },
  {
    id: 'porter', target: [-3, 6, 2, -5], role: '河埠短工', tier: '受雇谋生',
    line: '事情越临时，你越知道先动哪一只手。',
    livelihood: '随船货和市面接杂活', assets: '能上手的本事和几条用工消息', condition: '能出工，能接触到雇主',
    opportunity: '汴河沿岸的船车往来不断，城里也有介绍人力的行老。你善于应付临时变化，能用手边能找到的工具先把事做完。雇主有急活时，这种反应比一套预先写好的法子管用。',
    cost: '空档得自己扛。能马上上工会让你接住更多机会，要把它变成稳定收入，还得有长期雇主或反复来找你的主顾。',
  },
  {
    id: 'clerk', target: [-2, -6, -5, 2], role: '老店账房', tier: '受雇谋生',
    line: '旁人觉得差不多的时候，你会把余下那一点追到底。',
    livelihood: '替店家记账、核对进出', assets: '识字算账的本事和掌柜的信任', condition: '有机会学习算账，有人愿意用你',
    opportunity: '汴京店铺的货与钱来去频繁，账面也得有人看。你能从小差错里追出是哪一步出了问题，店家才敢把一段账交给你持续管。经验和信用让你有机会做上较稳定的差事。',
    cost: '铺子的本钱和最后的决定握在东家手里。信用积累得慢，换一家店时，过去做得好也需要有人替你说话。',
  },
  {
    id: 'vendor', target: [4, 5, -5, -3], role: '市口摊主', tier: '自营谋生',
    line: '你看得出今天什么能卖，也知道进多少才收得住。',
    livelihood: '趁集市和夜市做小买卖', assets: '少量周转本钱和一两个货源', condition: '有少量起本，可进入市集',
    opportunity: '从州桥夜市到相国寺的交易，人聚起来就有小买卖。你能根据当天的人流改货和说法，又会给自己留下一批货卖不掉的余地。靠这种节奏，一摊生意有机会做成日常收入。',
    cost: '手里本钱薄，很难同时占住位置和囤货。连着几个坏天气，或货没按时到，你得拿已经攒下的钱先顶过去。',
  },
  {
    id: 'workshop', target: [-6, -2, 1, 6], role: '小作坊主', tier: '有铺有本',
    line: '你对成品挑剔，也愿意花功夫让别人做得跟你一样好。',
    livelihood: '接单制货，由作坊交活', assets: '工具、作业场地和帮手', condition: '攒到工具和场地，接得到成批订单',
    opportunity: '城里有聚在一起的买卖和手艺，也有人专做雇觅作匠的中介。你能把一门活拆成几个可交接的步骤，自己看关键处。有了足够来单，两三个人就能把一个人忙不过来的活接下来。',
    cost: '人一多，即便那个月来单少，料钱、场地和用工也得算。你的收入有了往上走的余地，也多了每月必须填的窟窿。',
  },
  {
    id: 'innkeeper', target: [3, 1, -2, 6], role: '食店东家', tier: '有铺有本',
    line: '你知道谁接客、谁备料，也记得熟客要的那一口。',
    livelihood: '守一间食店，靠流水过日子', assets: '铺面、灶具和稳定的供货关系', condition: '能取得铺面、备料本钱和帮手',
    opportunity: '《东京梦华录》的食店和夜市里，有人备菜、有人招呼，也有熟客带来下一顿生意。你长于把人手和物料凑到刚够用，把临时的忙乱处理成每天都能开张的买卖。',
    cost: '食材有损耗，人情也要长久维护。生意旺时多赚一些，淡的时候还要按时付铺面和伙计的开销。',
  },
  {
    id: 'trader', target: [6, 5, 6, 3], role: '汴河客商', tier: '富足经营户',
    line: '你比别人早问一步，货从哪里来，又能往哪里去。',
    livelihood: '联络船货，在不同市场间贩运', assets: '周转本钱、来路和去路', condition: '已有货运渠道和能垫付的资金',
    opportunity: '汴河让水陆货物流进都城，桥市旁既有船，也有买卖。你愿意在消息还不算明朗时先试一点，货价一变就能另找去处。渠道和本钱都够时，赚钱便不只靠手上一天的工夫。',
    cost: '水路耽搁、行情变了、货款一时收不回来，哪件都能把本钱扣住。识得人和敢出手给了你机会，周转得起才让下一笔生意发生。',
  },
  {
    id: 'supplier', target: [4, -6, 5, 4], role: '供货行商', tier: '富足经营户',
    line: '你愿意押一单大的，前提是每段交接都已算清。',
    livelihood: '多批进货，固定给城里店家供货', assets: '可垫付的本钱和稳定买主', condition: '积得起库存和赊欠成本',
    opportunity: '汴京的酒楼、食店和行铺都有持续的采买需求。你擅长把事情做稳，也愿意在证据充分时多做一步。连续几次按约交货，能换来更固定的买主，也让你敢一次多进一点。',
    cost: '货在手上就占着钱，给熟客赊账又要扛回款。你越守着长期约定，越需要分清谁的信用值得这样等。',
  },
];

function inspectAnswers(answers) {
  if (answers.length !== questions.length || questions.some((question, index) => (
    !Number.isInteger(answers[index]) || !question.answers[answers[index]]
  ))) {
    throw new Error('请先完成所有题目。');
  }

  const scores = dimensions.map(() => 0);
  const choices = questions.map((question, index) => {
    const [weight, text] = question.answers[answers[index]];
    scores[question.axis] += weight;
    return { axis: question.axis, weight, question: question.title, text, index };
  });

  const ranked = profiles.map(profile => ({
    profile,
    distance: profile.target.reduce((total, target, index) => total + (target - scores[index]) ** 2, 0),
    affinity: choices.reduce((total, choice) => total + (Math.sign(choice.weight) === Math.sign(profile.target[choice.axis]) ? Math.abs(choice.weight) : 0), 0),
  })).sort((left, right) => left.distance - right.distance || right.affinity - left.affinity);

  const profile = ranked[0].profile;
  const alignments = scores.map((score, index) => ({
    index,
    strength: score * profile.target[index],
  })).sort((left, right) => right.strength - left.strength);

  const evidence = alignments.map(({ index, strength }) => {
    const direction = strength > 0 ? Math.sign(scores[index]) : Math.sign(profile.target[index]);
    const matchingChoices = choices.filter(choice => choice.axis === index && Math.sign(choice.weight) === direction)
      .sort((left, right) => Math.abs(right.weight) - Math.abs(left.weight));
    if (!matchingChoices.length) return null;
    return { ...matchingChoices[0], trait: dimensions[index][direction < 0 ? 'low' : 'high'] };
  }).filter(Boolean).slice(0, 2);

  return { profile, evidence, scores };
}
