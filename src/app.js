(() => {
  'use strict';

  const storageKey = 'bianjing-personality-review-v1';
  const byId = id => document.getElementById(id);
  const sections = { home: byId('home'), quiz: byId('quiz'), result: byId('result') };
  const headings = { home: byId('home-title'), quiz: byId('question-title'), result: byId('result-title') };
  const start = byId('start');
  const next = byId('next');
  const previous = byId('previous');
  const options = byId('options');
  const questionNotice = byId('question-notice');
  const method = byId('method-details');
  const download = byId('save-card');
  const downloadNotice = byId('download-notice');
  const blank = () => Array(questions.length).fill(null);

  let state = readProgress();
  let report;
  let cardUrl;

  function readProgress() {
    const empty = { view: 'home', index: 0, answers: blank() };
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey));
      if (!saved || !Array.isArray(saved.answers) || saved.answers.length !== questions.length) return empty;
      const answers = saved.answers.map((answer, index) => (
        Number.isInteger(answer) && questions[index].answers[answer] ? answer : null
      ));
      const firstUnanswered = answers.indexOf(null);
      const lastAvailable = firstUnanswered === -1 ? questions.length - 1 : firstUnanswered;
      const index = Number.isInteger(saved.index) ? Math.max(0, Math.min(lastAvailable, saved.index)) : 0;
      const view = saved.view === 'result' && firstUnanswered === -1
        ? 'result'
        : saved.view === 'quiz' || saved.view === 'result' ? 'quiz' : 'home';
      return { view, index, answers };
    } catch {
      return empty;
    }
  }

  function remember() {
    try {
      localStorage.setItem(storageKey, JSON.stringify(state));
    } catch {
      // The current run remains usable when storage is unavailable.
    }
  }

  function setButtonLabel(button, label) {
    button.firstChild.nodeValue = label + ' ';
  }

  function changeView(view, focus = true) {
    if (state.view === 'result' && view !== 'result') clearCard();
    state.view = view;
    Object.entries(sections).forEach(([name, section]) => {
      section.hidden = name !== view;
    });
    document.body.dataset.view = view;

    if (view === 'home') {
      const label = state.answers.every(answer => answer !== null)
        ? '查看结果'
        : state.answers.some(answer => answer !== null) ? '继续测评' : '开始测评';
      setButtonLabel(start, label);
    } else if (view === 'quiz') {
      renderQuestion();
    } else {
      renderResult();
    }
    remember();
    if (focus) {
      window.scrollTo(0, 0);
      headings[view].focus({ preventScroll: true });
    }
  }

  function renderQuestion() {
    const question = questions[state.index];
    const number = state.index + 1;
    byId('progress-label').textContent = `第 ${number} 题 / 共 ${questions.length} 题`;
    byId('progress').value = number;
    headings.quiz.textContent = question.title;
    previous.hidden = state.index === 0;
    setButtonLabel(next, number === questions.length ? '查看结果' : '下一题');
    questionNotice.textContent = '';
    options.replaceChildren(...question.answers.map(([, text], index) => {
      const label = document.createElement('label');
      label.className = 'option';
      const input = document.createElement('input');
      input.type = 'radio';
      input.name = 'answer';
      input.value = index;
      input.checked = state.answers[state.index] === index;
      const key = document.createElement('span');
      key.className = 'option-key';
      key.setAttribute('aria-hidden', 'true');
      key.textContent = 'ABCD'[index];
      const caption = document.createElement('span');
      caption.textContent = text;
      label.append(input, key, caption);
      return label;
    }));
  }

  function renderResult() {
    report = inspectAnswers(state.answers);
    const { profile, evidence } = report;
    byId('result-tier').textContent = profile.tier;
    headings.result.textContent = profile.role;
    byId('result-line').textContent = profile.line;
    byId('opportunity').textContent = profile.opportunity;
    byId('cost').textContent = profile.cost;
    byId('resources').replaceChildren(...[
      ['生计来源', profile.livelihood],
      ['手上资源', profile.assets],
      ['必要条件', profile.condition],
    ].map(([term, definition]) => {
      const row = document.createElement('div');
      const dt = document.createElement('dt');
      const dd = document.createElement('dd');
      dt.textContent = term;
      dd.textContent = definition;
      row.append(dt, dd);
      return row;
    }));
    byId('evidence').replaceChildren(...evidence.map(item => {
      const entry = document.createElement('li');
      const title = document.createElement('strong');
      const quote = document.createElement('p');
      title.textContent = `第 ${item.index + 1} 题 · ${item.trait}`;
      quote.textContent = `「${item.text}」`;
      entry.append(title, quote);
      return entry;
    }));

    const identity = byId('identity-page');
    identity.classList.remove('result-reveal');
    requestAnimationFrame(() => requestAnimationFrame(() => {
      if (state.view === 'result') identity.classList.add('result-reveal');
    }));
  }

  function updateAnswer() {
    const selected = options.querySelector('input:checked');
    if (!selected) return false;
    state.answers[state.index] = Number(selected.value);
    questionNotice.textContent = '';
    remember();
    return true;
  }

  function clearCard() {
    if (cardUrl) URL.revokeObjectURL(cardUrl);
    cardUrl = undefined;
    download.removeAttribute('aria-disabled');
    downloadNotice.textContent = '';
  }

  function cardText(ctx, content, x, y, width, step) {
    const closingPunctuation = '。，、；：！？）】》';
    let line = '';
    for (const character of content) {
      if (line && ctx.measureText(line + character).width > width && !closingPunctuation.includes(character)) {
        ctx.fillText(line, x, y);
        y += step;
        line = '';
      }
      line += character;
    }
    if (line) ctx.fillText(line, x, y);
  }

  function renderCard(image, profile) {
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1440;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('当前浏览器无法生成图片。');

    const serif = '"Bianjing Song", "Songti SC", "Noto Serif CJK SC", SimSun, serif';
    const sans = '"PingFang SC", "Microsoft YaHei", "Noto Sans CJK SC", sans-serif';
    ctx.fillStyle = '#f7f2e6';
    ctx.fillRect(0, 0, 1080, 1440);
    ctx.drawImage(image, 0, 0, 1080, 540);
    ctx.fillStyle = '#173b34';
    ctx.fillRect(0, 540, 1080, 470);
    ctx.fillStyle = '#a13d2d';
    ctx.fillRect(72, 571, 64, 68);
    ctx.fillStyle = '#fff9e9';
    ctx.font = `600 40px ${serif}`;
    ctx.fillText('汴', 84, 620);
    ctx.font = `500 27px ${sans}`;
    ctx.fillText('北宋汴京性格测评', 154, 615);

    ctx.fillStyle = '#edce98';
    ctx.font = `600 30px ${sans}`;
    ctx.fillText('生计阶层 · ' + profile.tier, 72, 712);
    ctx.font = `600 100px ${serif}`;
    ctx.fillText(profile.role, 66, 835, 948);

    ctx.fillStyle = '#fff9e9';
    ctx.font = `400 37px ${sans}`;
    cardText(ctx, profile.line, 72, 920, 928, 53);

    ctx.fillStyle = '#173b34';
    ctx.font = `600 29px ${sans}`;
    ctx.fillText('生计来源', 72, 1081);
    ctx.fillText('手上资源', 72, 1202);
    ctx.font = `400 35px ${sans}`;
    ctx.fillText(profile.livelihood, 72, 1132, 936);
    ctx.fillText(profile.assets, 72, 1253, 936);
    ctx.strokeStyle = '#c9c5b5';
    ctx.beginPath();
    ctx.moveTo(72, 1310);
    ctx.lineTo(1008, 1310);
    ctx.stroke();

    ctx.fillStyle = '#516057';
    ctx.font = `400 25px ${sans}`;
    ctx.fillText('娱乐测评 · 张择端《清明上河图》局部', 72, 1371);

    return new Promise((resolve, reject) => canvas.toBlob(
      blob => blob ? resolve(blob) : reject(new Error('无法写入 PNG。')), 'image/png',
    ));
  }

  async function saveResult() {
    if (!report || download.getAttribute('aria-disabled') === 'true') return;
    const snapshot = report;
    clearCard();
    download.setAttribute('aria-disabled', 'true');
    downloadNotice.textContent = '正在生成结果图…';
    try {
      const image = byId('cover-art');
      await Promise.all([image.decode(), document.fonts.ready]);
      const png = await renderCard(image, snapshot.profile);
      if (state.view !== 'result' || report !== snapshot) return;
      cardUrl = URL.createObjectURL(png);
      const link = document.createElement('a');
      link.href = cardUrl;
      link.download = `汴京性格测评-${snapshot.profile.role}.png`;
      link.textContent = '下载 PNG';
      downloadNotice.replaceChildren('结果图已生成。', link);
      link.click();
    } catch {
      if (state.view === 'result' && report === snapshot) {
        downloadNotice.textContent = '结果图生成失败，请再点一次保存。';
      }
    } finally {
      if (report === snapshot) download.removeAttribute('aria-disabled');
    }
  }

  start.addEventListener('click', () => {
    changeView(state.answers.every(answer => answer !== null) ? 'result' : 'quiz');
  });
  byId('home-button').addEventListener('click', () => changeView('home'));
  byId('method-link').addEventListener('click', () => { method.open = true; });
  options.addEventListener('change', updateAnswer);
  byId('quiz-form').addEventListener('submit', event => {
    event.preventDefault();
    if (!updateAnswer()) {
      questionNotice.textContent = '请先选一项。';
      options.querySelector('input').focus();
      return;
    }

    if (state.index === questions.length - 1) {
      changeView('result');
      return;
    }

    state.index += 1;
    changeView('quiz');
  });
  previous.addEventListener('click', () => {
    state.index = Math.max(0, state.index - 1);
    changeView('quiz');
  });
  byId('review-answers').addEventListener('click', () => {
    state.index = questions.length - 1;
    changeView('quiz');
  });
  byId('reset').addEventListener('click', () => {
    state.index = 0;
    state.answers = blank();
    changeView('quiz');
  });
  download.addEventListener('click', saveResult);

  if (location.hash === '#method') method.open = true;
  changeView(state.view, false);
})();
