/* ==========================================================================
   Giảng đường số — logic ứng dụng
   ========================================================================== */

const LUU = 'gds_v1';

const S = {
  user: null,
  view: 'bang-dieu-khien',
  mon: null,
  bai: null,
  tab: 'mon',
  side: false,
  bell: false,
  tim: '',
  quiz: null,
  flash: ''
};

let D = {
  xong: {},        /* id bài -> true */
  diem: {},        /* id môn -> { diem, dung, tong, khi } */
  baiThem: [],     /* bài thầy thêm qua trang quản lý */
  tbThem: [],      /* thông báo thầy gửi */
  daDoc: false
};

/* ---------- Lưu trữ ---------------------------------------------------- */

function doc() {
  try {
    const t = localStorage.getItem(LUU);
    if (t) D = Object.assign(D, JSON.parse(t));
  } catch (e) { /* trình duyệt chặn localStorage: dùng bộ nhớ tạm */ }
}
function ghi() {
  try { localStorage.setItem(LUU, JSON.stringify(D)); } catch (e) {}
}

/* ---------- Tiện ích --------------------------------------------------- */

const $ = (s, n) => (n || document).querySelector(s);
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function ico(d, extra) {
  return `<svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" ${extra || ''}>${d}</svg>`;
}
const I = {
  home:   ico('<path d="M3 10.5 12 3l9 7.5"/><path d="M5.5 9.5V21h13V9.5"/>'),
  book:   ico('<path d="M4 4.5h6a2 2 0 0 1 2 2V21a2 2 0 0 0-2-2H4z"/><path d="M20 4.5h-6a2 2 0 0 0-2 2V21a2 2 0 0 1 2-2h6z"/>'),
  check:  ico('<path d="M4 13l5 5L20 6"/>'),
  chart:  ico('<path d="M4 20V10"/><path d="M10 20V4"/><path d="M16 20v-7"/><path d="M22 20H2"/>'),
  bell:   ico('<path d="M18 8a6 6 0 1 0-12 0c0 7-3 8-3 8h18s-3-1-3-8"/><path d="M10.3 21a1.9 1.9 0 0 0 3.4 0"/>'),
  people: ico('<path d="M16 20v-2a4 4 0 0 0-8 0v2"/><circle cx="12" cy="8" r="3.5"/><path d="M22 20v-2a4 4 0 0 0-3-3.8"/>'),
  plus:   ico('<path d="M12 5v14"/><path d="M5 12h14"/>'),
  gear:   ico('<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-2.7 1.1V21a2 2 0 1 1-4 0v-.1A1.6 1.6 0 0 0 7.5 19l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.6 1.6 0 0 0 3 13.6H3a2 2 0 1 1 0-4h.1A1.6 1.6 0 0 0 4.7 7l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.8.3H9.4A1.6 1.6 0 0 0 10.5 3V3a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 2.7 1.1l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8V9.4A1.6 1.6 0 0 0 21 10.5H21a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1.1z"/>'),
  search: ico('<circle cx="11" cy="11" r="7"/><path d="M20 20l-4.3-4.3"/>'),
  menu:   ico('<path d="M3 6h18"/><path d="M3 12h18"/><path d="M3 18h18"/>'),
  video:  ico('<rect x="2.5" y="6" width="13" height="12" rx="2"/><path d="M15.5 11l6-3.5v9l-6-3.5z"/>'),
  slide:  ico('<rect x="3" y="4" width="18" height="12.5" rx="1.5"/><path d="M12 16.5V21"/><path d="M8.5 21h7"/>'),
  send:   ico('<path d="M21 4L3 10.5l7 2.5 2.5 7z"/><path d="M21 4l-9 9"/>')
};

/* ---------- Dữ liệu dẫn xuất ------------------------------------------ */

const tatCaBai = () => BAI.concat(D.baiThem);
const baiCuaMon = id => tatCaBai().filter(b => b.mon === id).sort((a, b) => a.so - b.so);
const timMon = id => MON.find(m => m.id === id);
const timBai = id => tatCaBai().find(b => b.id === id);

function monCuaToi() {
  if (!S.user || S.user.vai !== 'sv') return MON;
  return MON.filter(m => m.khoa.includes(S.user.khoa));
}

function tienDo(monId) {
  const bs = baiCuaMon(monId);
  if (!bs.length) return 0;
  return Math.round(bs.filter(b => D.xong[b.id]).length / bs.length * 100);
}

function tongTienDo() {
  const ms = monCuaToi();
  const bs = ms.flatMap(m => baiCuaMon(m.id));
  if (!bs.length) return 0;
  return Math.round(bs.filter(b => D.xong[b.id]).length / bs.length * 100);
}

function tatCaTB() {
  return D.tbThem.concat(THONGBAO);
}
const soTBMoi = () => (D.daDoc ? 0 : tatCaTB().filter(t => t.moi).length);

/* ---------- Khung ứng dụng -------------------------------------------- */

function ve() {
  const g = $('#goc');
  if (!S.user) { g.innerHTML = dangNhap(); return; }
  g.innerHTML = `
    <div class="shell">
      ${S.side ? '<div class="scrim" data-act="dong-side"></div>' : ''}
      ${thanhBen()}
      <div class="main">
        ${thanhTren()}
        <div class="view">${noiDung()}</div>
      </div>
    </div>`;
  const inp = $('#o-tim');
  if (inp && S.tim) { inp.value = S.tim; }
}

function thanhBen() {
  const sv = S.user.vai === 'sv';
  const mnu = sv
    ? [['bang-dieu-khien', 'Bảng điều khiển', I.home],
       ['mon-hoc', 'Môn học của tôi', I.book],
       ['bang-diem', 'Bảng điểm', I.chart],
       ['thong-bao', 'Thông báo', I.bell]]
    : [['bang-dieu-khien', 'Tổng quan lớp', I.home],
       ['quan-ly', 'Quản lý nội dung', I.gear],
       ['sinh-vien', 'Sinh viên và điểm', I.people],
       ['thong-bao', 'Thông báo', I.bell]];

  return `
  <aside class="side ${S.side ? 'open' : ''}">
    <div class="mark">
      <div class="mark-glyph">Gđ</div>
      <div class="mark-text">
        <b>Giảng đường số</b>
        <span>Bộ môn Lý luận TDTT</span>
      </div>
    </div>
    <nav class="nav">
      <div class="nav-group">${sv ? 'Học tập' : 'Giảng dạy'}</div>
      ${mnu.map(([v, t, i]) => `
        <a class="${S.view === v ? 'on' : ''}" data-act="di" data-v="${v}">${i}<span>${t}</span></a>`).join('')}
      ${sv ? `
      <div class="nav-group">Khóa học</div>
      ${KHOA.map(k => `<a class="${S.user.khoa === k.id ? 'on' : ''}" data-act="di" data-v="mon-hoc" title="${k.nien}">
          ${I.book}<span>${k.ten}${S.user.khoa === k.id ? ' · của tôi' : ''}</span></a>`).join('')}` : ''}
    </nav>
    <div class="side-foot">
      <b>${esc(S.user.ten)}</b>
      <span>${esc(S.user.vai === 'sv' ? S.user.msv + ' · ' + S.user.khoa : S.user.chucdanh)}</span>
      <button data-act="thoat">Đăng xuất</button>
    </div>
  </aside>`;
}

function thanhTren() {
  const kq = S.tim.trim() ? ketQuaTim(S.tim) : null;
  return `
  <header class="topbar">
    <button class="burger" data-act="mo-side" aria-label="Mở thực đơn">${I.menu}</button>
    <div class="search">
      ${I.search}
      <input id="o-tim" type="search" placeholder="Tìm môn học, bài học…" data-act="tim" autocomplete="off">
      ${kq ? `<div class="search-out">${
        kq.length
          ? kq.map(r => `<button data-act="${r.loai === 'mon' ? 'mo-mon' : 'mo-bai'}" data-id="${r.id}">
              <b>${esc(r.ten)}</b><span>${esc(r.phu)}</span></button>`).join('')
          : '<button disabled style="cursor:default"><b>Không tìm thấy</b><span>Thử từ khóa khác</span></button>'
      }</div>` : ''}
    </div>
    <div style="flex:1"></div>
    <div class="bell">
      <button data-act="bell" aria-label="Thông báo">${I.bell}
        ${soTBMoi() ? `<span class="bell-dot">${soTBMoi()}</span>` : ''}</button>
      ${S.bell ? `<div class="bell-list">
        <header>Thông báo</header>
        ${tatCaTB().map(t => `<div class="bell-item ${t.moi && !D.daDoc ? 'new' : ''}">
          <b>${esc(t.ten)}</b><p>${esc(t.noi)}</p><span class="meta">${esc(t.khi)}</span></div>`).join('')}
      </div>` : ''}
    </div>
  </header>`;
}

function ketQuaTim(q) {
  const k = q.trim().toLowerCase();
  const r = [];
  monCuaToi().forEach(m => {
    if ((m.ten + ' ' + m.ma).toLowerCase().includes(k))
      r.push({ loai: 'mon', id: m.id, ten: m.ten, phu: `${m.ma} · ${m.tc} tín chỉ` });
  });
  const bo = h => h.replace(/<[^>]*>/g, ' ');
  tatCaBai().forEach(b => {
    const trongTen = b.ten.toLowerCase().includes(k);
    const trongChuong = b.chuong.toLowerCase().includes(k);
    const trongNoi = bo(b.noidung).toLowerCase().includes(k);
    if (trongTen || trongChuong || trongNoi) {
      const m = timMon(b.mon);
      r.push({
        loai: 'bai', id: b.id, ten: b.ten,
        phu: (m ? m.ten : '') + (!trongTen ? (trongChuong ? ' · ' + b.chuong : ' · có trong nội dung bài') : '')
      });
    }
  });
  return r.slice(0, 8);
}

function noiDung() {
  if (S.user.vai === 'gv') {
    switch (S.view) {
      case 'quan-ly':   return gvQuanLy();
      case 'sinh-vien': return gvSinhVien();
      case 'thong-bao': return trangThongBao();
      case 'bai':       return trangBai();
      default:          return gvTongQuan();
    }
  }
  switch (S.view) {
    case 'mon-hoc':   return svDanhSachMon();
    case 'mon':       return svChiTietMon();
    case 'bai':       return trangBai();
    case 'quiz':      return trangQuiz();
    case 'bang-diem': return svBangDiem();
    case 'thong-bao': return trangThongBao();
    default:          return svBangDieuKhien();
  }
}

/* ---------- Đăng nhập -------------------------------------------------- */

let loiDangNhap = '';

function dangNhap() {
  const tuan = 9, tongTuan = 15;
  return `
  <div class="auth">
    <div class="auth-brand">
      <div class="mark">
        <div class="mark-glyph">Gđ</div>
        <div class="mark-text"><b>Giảng đường số</b><span>Trường Đại học TDTT Bắc Ninh</span></div>
      </div>
      <div>
        <h1>Lý luận thể dục thể thao, học theo chu kỳ</h1>
        <p>Nơi sinh viên bốn khóa theo học mười môn của Bộ môn Lý luận TDTT: đọc bài, làm bài kiểm tra và theo dõi tiến độ của chính mình qua từng tuần.</p>
        <div class="cycle">${bieuDoChuKy()}
          <div class="cycle-key">
            <span><i style="background:#e0a516"></i>Lượng vận động kế hoạch</span>
            <span><i style="background:rgba(255,255,255,.45)"></i>Khối lượng</span>
          </div>
        </div>
      </div>
      <p class="meta" style="color:rgba(255,255,255,.4);font-size:13px;margin:0">
        Tuần ${tuan} / ${tongTuan} · Học kỳ 1 năm học 2026 – 2027</p>
    </div>

    <div class="auth-form">
      <div class="auth-box">
        <h2>Đăng nhập</h2>
        <p class="meta">Dùng tài khoản nhà trường cấp. Nếu chưa có, liên hệ giảng viên bộ môn.</p>
        ${loiDangNhap ? `<div class="auth-err">${esc(loiDangNhap)}</div>` : ''}
        <form data-act="vao">
          <div class="field">
            <label for="tk">Tên đăng nhập</label>
            <input id="tk" name="tk" autocomplete="username" required>
          </div>
          <div class="field">
            <label for="mk">Mật khẩu</label>
            <input id="mk" name="mk" type="password" autocomplete="current-password" required>
          </div>
          <button class="btn" type="submit" style="width:100%;justify-content:center">Đăng nhập</button>
        </form>
        <div class="demo-keys">
          <p class="meta">Bản thử nghiệm — bấm để vào nhanh:</p>
          <button class="key-row" data-act="nhanh" data-tk="sv">
            <span><b>Vai sinh viên</b><br><span>Nguyễn Văn An · K60</span></span>
            <span class="tag">sv / 123</span>
          </button>
          <button class="key-row" data-act="nhanh" data-tk="gv">
            <span><b>Vai giảng viên</b><br><span>Quản lý nội dung và điểm</span></span>
            <span class="tag">gv / 123</span>
          </button>
        </div>
      </div>
    </div>
  </div>`;
}

/* Biểu đồ chu kỳ lượng vận động — hình ảnh chủ đạo của trang mở đầu */
function bieuDoChuKy() {
  const kl = [38, 52, 64, 44, 58, 72, 84, 54, 68, 80, 92, 60, 74, 86, 50];
  const cd = [30, 36, 42, 34, 44, 50, 58, 46, 54, 62, 70, 56, 66, 76, 58];
  const W = 420, H = 100, n = kl.length, step = W / (n - 1);
  const pt = a => a.map((v, i) => `${(i * step).toFixed(1)},${(H - v * .92).toFixed(1)}`).join(' ');
  return `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" aria-hidden="true">
    <g stroke="rgba(255,255,255,.1)" stroke-width="1">
      ${[0, 25, 50, 75, 100].map(y => `<line x1="0" y1="${y}" x2="${W}" y2="${y}"/>`).join('')}
    </g>
    <polygon points="0,${H} ${pt(cd)} ${W},${H}" fill="rgba(224,165,22,.14)"/>
    <polyline points="${pt(kl)}" fill="none" stroke="rgba(255,255,255,.45)" stroke-width="1.8"/>
    <polyline points="${pt(cd)}" fill="none" stroke="#e0a516" stroke-width="2.4"/>
    ${cd.map((v, i) => i % 3 === 0
      ? `<circle cx="${(i * step).toFixed(1)}" cy="${(H - v * .92).toFixed(1)}" r="2.6" fill="#e0a516"/>` : '').join('')}
  </svg>`;
}

/* ---------- Sinh viên: bảng điều khiển -------------------------------- */

function svBangDieuKhien() {
  const ms = monCuaToi();
  const bs = ms.flatMap(m => baiCuaMon(m.id));
  const xong = bs.filter(b => D.xong[b.id]).length;
  const dsDiem = Object.values(D.diem);
  const tb = dsDiem.length
    ? (dsDiem.reduce((s, d) => s + d.diem, 0) / dsDiem.length).toFixed(1) : '—';
  const tuan = 9, tongTuan = 15;

  return `
  <div class="page-head">
    <h1>Chào ${esc(S.user.ten.split(' ').slice(-1)[0])}</h1>
    <p class="meta">${esc(S.user.lop)} · ${esc(S.user.khoa)} · Học kỳ 1 năm học 2026 – 2027</p>
  </div>

  <div class="term" style="margin-bottom:18px">
    <h2>Tuần ${tuan} của học kỳ</h2>
    <p class="meta">Còn ${tongTuan - tuan} tuần trước kỳ thi. Tiến độ học của em đang ở mức ${tongTienDo()}%.</p>
    <div class="term-weeks">
      ${Array.from({ length: tongTuan }, (_, i) =>
        `<div class="${i + 1 < tuan ? 'done' : i + 1 === tuan ? 'now' : ''}" title="Tuần ${i + 1}"></div>`).join('')}
    </div>
    <div class="term-scale"><span>Tuần 1</span><span>Giữa kỳ</span><span>Tuần ${tongTuan}</span></div>
  </div>

  <div class="stats" style="margin-bottom:18px">
    <div class="stat"><b>${ms.length}</b><span>Môn đang học</span></div>
    <div class="stat"><b>${xong}<span style="font-size:15px;color:var(--ink-mute)"> / ${bs.length}</span></b><span>Bài đã học</span></div>
    <div class="stat"><b>${dsDiem.length}</b><span>Bài kiểm tra đã làm</span></div>
    <div class="stat"><b>${tb}</b><span>Điểm trung bình</span></div>
  </div>

  <div class="grid g-side">
    <section class="panel">
      <div class="panel-head">
        <h2>Môn học kỳ này</h2>
        <button class="btn btn-ghost btn-sm" data-act="di" data-v="mon-hoc">Xem tất cả</button>
      </div>
      <div class="rows" style="border-top:0">
        ${ms.map((m, i) => hangMon(m, i)).join('')}
      </div>
    </section>

    <div>
      <section class="panel aside-card">
        <div class="panel-head"><h3>Việc cần làm</h3></div>
        <div class="rows" style="border-top:0">
          ${viecCanLam(ms)}
        </div>
      </section>
      <section class="panel aside-card">
        <div class="panel-head"><h3>Thông báo mới</h3></div>
        ${tatCaTB().slice(0, 3).map(t => `
          <div class="bell-item"><b>${esc(t.ten)}</b><p>${esc(t.noi)}</p>
            <span class="meta">${esc(t.khi)}</span></div>`).join('')}
      </section>
    </div>
  </div>`;
}

function viecCanLam(ms) {
  const v = [];
  ms.forEach(m => {
    const bs = baiCuaMon(m.id);
    const chua = bs.find(b => !D.xong[b.id]);
    if (chua) v.push({ ten: chua.ten, phu: m.ten, act: 'mo-bai', id: chua.id, tag: 'Bài học' });
    if (QUIZ[m.id] && !D.diem[m.id])
      v.push({ ten: QUIZ[m.id].ten, phu: m.ten, act: 'mo-quiz', id: m.id, tag: 'Kiểm tra' });
  });
  if (!v.length) return '<div class="empty"><b>Xong hết rồi</b>Em đã học hết bài và làm hết bài kiểm tra hiện có.</div>';
  return v.slice(0, 4).map(x => `
    <button class="row" style="grid-template-columns:minmax(0,1fr) auto" data-act="${x.act}" data-id="${x.id}">
      <span><b>${esc(x.ten)}</b><span class="meta">${esc(x.phu)}</span></span>
      <span class="tag ${x.tag === 'Kiểm tra' ? 'tag-wait' : ''}">${x.tag}</span>
    </button>`).join('');
}

function hangMon(m, i) {
  const td = tienDo(m.id);
  const bs = baiCuaMon(m.id);
  return `
  <button class="row row-subject" data-act="mo-mon" data-id="${m.id}">
    <span class="row-num">${String(i + 1).padStart(2, '0')}</span>
    <span><b>${esc(m.ten)}</b><span class="meta">${esc(m.ma)} · ${m.tc} tín chỉ · ${bs.length} bài</span></span>
    <span class="hide-sm"><span class="load-bar ${td === 100 ? 'go' : td ? 'accent' : ''}"><i style="width:${td}%"></i></span></span>
    <span class="hide-sm meta">${td}%</span>
    <span>${D.diem[m.id]
      ? `<span class="tag tag-go">${D.diem[m.id].diem.toFixed(1)} điểm</span>`
      : QUIZ[m.id] ? '<span class="tag tag-wait">Chưa kiểm tra</span>' : '<span class="tag">Chưa có đề</span>'}</span>
  </button>`;
}

/* ---------- Sinh viên: danh sách môn ---------------------------------- */

function svDanhSachMon() {
  const ms = monCuaToi();
  const khac = MON.filter(m => !ms.includes(m));
  return `
  <div class="page-head">
    <h1>Môn học của tôi</h1>
    <p class="meta">Mười môn của Bộ môn Lý luận TDTT được phân cho bốn khóa. Dưới đây là các môn thuộc ${esc(S.user.khoa)}.</p>
  </div>

  <section class="panel" style="margin-bottom:24px">
    <div class="panel-head"><h2>${esc(S.user.khoa)} · ${ms.length} môn</h2>
      <span class="meta">Tiến độ chung ${tongTienDo()}%</span></div>
    <div class="rows" style="border-top:0">${ms.map((m, i) => hangMon(m, i)).join('')}</div>
  </section>

  <section class="panel">
    <div class="panel-head"><h2>Môn của các khóa khác</h2>
      <span class="meta">Xem trước, chưa mở quyền học</span></div>
    <div class="rows" style="border-top:0">
      ${khac.map((m, i) => `
        <div class="row row-subject" style="opacity:.62">
          <span class="row-num">${String(i + 1).padStart(2, '0')}</span>
          <span><b>${esc(m.ten)}</b><span class="meta">${esc(m.ma)} · ${m.tc} tín chỉ</span></span>
          <span class="hide-sm meta">${m.khoa.join(', ')}</span>
          <span class="hide-sm"></span>
          <span><span class="tag">${esc(m.ky)}</span></span>
        </div>`).join('')}
    </div>
  </section>`;
}

/* ---------- Sinh viên: chi tiết môn ----------------------------------- */

function svChiTietMon() {
  const m = timMon(S.mon);
  if (!m) return '<div class="empty"><b>Không tìm thấy môn học</b></div>';
  const bs = baiCuaMon(m.id);
  const chuong = [...new Set(bs.map(b => b.chuong))];
  const q = QUIZ[m.id];
  const dq = D.diem[m.id];
  const td = tienDo(m.id);

  return `
  <div class="crumb">
    <button data-act="di" data-v="mon-hoc">Môn học của tôi</button><span>/</span><span>${esc(m.ma)}</span>
  </div>
  <div class="page-head">
    <h1>${esc(m.ten)}</h1>
    <p class="meta">${esc(m.tomtat)}</p>
  </div>

  <div class="stats" style="margin-bottom:18px">
    <div class="stat"><b>${m.tc}</b><span>Tín chỉ</span></div>
    <div class="stat"><b>${bs.length}</b><span>Bài học</span></div>
    <div class="stat"><b>${td}%</b><span>Đã hoàn thành</span></div>
    <div class="stat"><b>${dq ? dq.diem.toFixed(1) : '—'}</b><span>Điểm kiểm tra</span></div>
  </div>

  <div class="grid g-side">
    <section class="panel">
      <div class="panel-head"><h2>Nội dung môn học</h2><span class="meta">${chuong.length} chương</span></div>
      ${chuong.length ? chuong.map(c => `
        <div class="panel-head" style="background:var(--paper);padding:11px 20px;border-top:1px solid var(--line-soft)">
          <h3 style="font-size:15px">${esc(c)}</h3></div>
        <div class="rows" style="border-top:0">
          ${bs.filter(b => b.chuong === c).map(b => `
            <button class="row row-lesson" data-act="mo-bai" data-id="${b.id}">
              <span class="row-num">${b.so}</span>
              <span><b>${esc(b.ten)}</b><span class="meta">${b.phut} phút${b.co_slide ? ' · có slide' : ''}${b.co_video ? ' · có video' : ''}</span></span>
              <span class="hide-sm meta">${b.phut} phút</span>
              <span>${D.xong[b.id] ? '<span class="tag tag-go">Đã học</span>' : '<span class="tag">Chưa học</span>'}</span>
            </button>`).join('')}
        </div>`).join('')
      : '<div class="empty"><b>Chưa có bài học</b>Thầy sẽ đưa bài giảng lên trong thời gian tới.</div>'}
    </section>

    <div>
      ${q ? `
      <section class="panel aside-card">
        <div class="panel-head"><h3>Bài kiểm tra</h3></div>
        <div class="panel-body">
          <b style="font-family:var(--ff-head);font-size:16px">${esc(q.ten)}</b>
          <p class="meta" style="margin:6px 0 14px">${q.cauhoi.length} câu trắc nghiệm · ${q.phut} phút</p>
          ${dq ? `
            <div class="flash" style="margin-bottom:13px">Em đã làm, được ${dq.diem.toFixed(1)} điểm (${dq.dung}/${dq.tong} câu đúng).</div>
            <button class="btn btn-ghost" data-act="mo-quiz" data-id="${m.id}">Làm lại</button>`
          : `<button class="btn btn-accent" data-act="mo-quiz" data-id="${m.id}">Bắt đầu làm bài</button>`}
        </div>
      </section>` : ''}
      <section class="panel aside-card">
        <div class="panel-head"><h3>Thông tin môn</h3></div>
        <div class="panel-body">
          <p class="meta" style="margin:0 0 8px"><b style="color:var(--ink)">Mã môn</b> · ${esc(m.ma)}</p>
          <p class="meta" style="margin:0 0 8px"><b style="color:var(--ink)">Dành cho</b> · ${m.khoa.join(', ')}</p>
          <p class="meta" style="margin:0 0 8px"><b style="color:var(--ink)">Thời điểm</b> · ${esc(m.ky)}</p>
          <p class="meta" style="margin:0"><b style="color:var(--ink)">Giảng viên</b> · Bộ môn Lý luận TDTT</p>
        </div>
      </section>
    </div>
  </div>`;
}

/* ---------- Trang bài học --------------------------------------------- */

function trangBai() {
  const b = timBai(S.bai);
  if (!b) return '<div class="empty"><b>Không tìm thấy bài học</b></div>';
  const m = timMon(b.mon);
  const bs = baiCuaMon(b.mon);
  const i = bs.findIndex(x => x.id === b.id);
  const truoc = bs[i - 1], sau = bs[i + 1];
  const xong = !!D.xong[b.id];
  const sv = S.user.vai === 'sv';

  return `
  <div class="crumb">
    ${sv ? `<button data-act="di" data-v="mon-hoc">Môn học của tôi</button><span>/</span>` : ''}
    <button data-act="mo-mon" data-id="${b.mon}">${esc(m ? m.ma : '')}</button><span>/</span>
    <span>${esc(b.chuong)}</span>
  </div>

  <div class="lesson-wrap">
    <div>
      <div class="page-head">
        <h1>${esc(b.ten)}</h1>
        <p class="meta">${esc(m ? m.ten : '')} · Bài ${b.so} · ${b.phut} phút</p>
      </div>

      ${b.co_video ? '' : `
      <div class="slot">
        ${I.video}
        <b>Video bài giảng chưa có</b>
        <p class="meta">Khi thầy quay xong, video sẽ hiện ở đây cùng phụ đề và mốc thời gian theo từng phần.</p>
      </div>`}

      <div class="lesson-body">${b.noidung}</div>

      ${b.co_slide ? `
      <div class="slot" style="margin-top:26px">
        ${I.slide}
        <b>Slide bài giảng</b>
        <p class="meta">Chỗ dành cho tệp trình chiếu. Sinh viên tải về hoặc xem ngay trên trang.</p>
      </div>` : ''}

      <div class="panel" style="margin-top:26px">
        <div class="panel-body" style="display:flex;gap:12px;align-items:center;flex-wrap:wrap">
          ${sv ? `
          <button class="btn ${xong ? 'btn-ghost' : ''}" data-act="xong" data-id="${b.id}">
            ${xong ? 'Bỏ đánh dấu đã học' : 'Đánh dấu đã học'}</button>` : ''}
          ${truoc ? `<button class="btn btn-ghost" data-act="mo-bai" data-id="${truoc.id}">Bài trước</button>` : ''}
          ${sau ? `<button class="btn btn-ghost" data-act="mo-bai" data-id="${sau.id}">Bài sau</button>` : ''}
          ${!sau && QUIZ[b.mon] && sv ? `<button class="btn btn-accent" data-act="mo-quiz" data-id="${b.mon}">Làm bài kiểm tra</button>` : ''}
        </div>
      </div>
    </div>

    <div class="lesson-side">
      <section class="panel aside-card">
        <div class="panel-head"><h3>Các bài trong môn</h3></div>
        <ul class="outline">
          ${bs.map(x => `
            <li><button class="${x.id === b.id ? 'on' : ''}" data-act="mo-bai" data-id="${x.id}">
              <span class="dot ${D.xong[x.id] ? 'done' : ''}"></span>
              <span><b>${esc(x.ten)}</b><span>Bài ${x.so} · ${x.phut} phút</span></span>
            </button></li>`).join('')}
        </ul>
      </section>
      ${sv ? `
      <section class="panel aside-card">
        <div class="panel-head"><h3>Tiến độ môn</h3></div>
        <div class="panel-body">
          <p style="font-family:var(--ff-head);font-size:27px;font-weight:600;margin:0 0 4px">${tienDo(b.mon)}%</p>
          <p class="meta" style="margin:0 0 12px">${bs.filter(x => D.xong[x.id]).length} trong ${bs.length} bài</p>
          <span class="load-bar go"><i style="width:${tienDo(b.mon)}%"></i></span>
        </div>
      </section>` : ''}
    </div>
  </div>`;
}

/* ---------- Bài kiểm tra ---------------------------------------------- */

function trangQuiz() {
  const m = timMon(S.mon);
  const q = QUIZ[S.mon];
  if (!m || !q) return '<div class="empty"><b>Môn này chưa có đề kiểm tra</b></div>';
  const st = S.quiz || { chon: {}, nop: false };

  if (st.nop) return ketQuaQuiz(m, q, st);

  const daChon = Object.keys(st.chon).length;
  return `
  <div class="crumb">
    <button data-act="mo-mon" data-id="${m.id}">${esc(m.ma)}</button><span>/</span><span>Bài kiểm tra</span>
  </div>
  <div class="page-head">
    <h1>${esc(q.ten)}</h1>
    <p class="meta">${esc(m.ten)} · ${q.cauhoi.length} câu · thời gian khuyến nghị ${q.phut} phút</p>
  </div>

  <section class="panel quiz">
    <div class="quiz-bar">
      <span class="meta">Đã chọn ${daChon} / ${q.cauhoi.length} câu</span>
      <span style="width:150px"><span class="load-bar accent"><i style="width:${daChon / q.cauhoi.length * 100}%"></i></span></span>
    </div>
    ${q.cauhoi.map((c, i) => `
      <div class="q-block">
        <div class="q-head">
          <span class="q-no">${i + 1}</span>
          <p>${esc(c.hoi)}</p>
        </div>
        ${c.dapan.map((d, j) => `
          <label class="opt ${st.chon[i] === j ? 'pick' : ''}">
            <input type="radio" name="c${i}" value="${j}" ${st.chon[i] === j ? 'checked' : ''}
              data-act="chon" data-c="${i}" data-d="${j}">
            <span>${esc(d)}</span>
          </label>`).join('')}
      </div>`).join('')}
    <div class="panel-body" style="border-top:1.5px solid var(--line);display:flex;gap:12px;align-items:center;flex-wrap:wrap">
      <button class="btn btn-accent" data-act="nop">Nộp bài</button>
      <button class="btn btn-ghost" data-act="mo-mon" data-id="${m.id}">Để sau</button>
      ${daChon < q.cauhoi.length ? `<span class="meta">Còn ${q.cauhoi.length - daChon} câu chưa chọn</span>` : ''}
    </div>
  </section>`;
}

function ketQuaQuiz(m, q, st) {
  let dung = 0;
  q.cauhoi.forEach((c, i) => { if (st.chon[i] === c.dung) dung++; });
  const diem = dung / q.cauhoi.length * 10;
  const pct = dung / q.cauhoi.length;
  const C = 2 * Math.PI * 44;
  const mau = pct >= .8 ? 'var(--go)' : pct >= .5 ? 'var(--accent)' : 'var(--stop)';
  const loi = pct >= .8 ? 'Kết quả tốt. Em đã nắm chắc nội dung chương này.'
            : pct >= .5 ? 'Đạt yêu cầu. Em nên xem lại các câu sai bên dưới.'
            : 'Chưa đạt. Em đọc lại bài rồi làm lại bài kiểm tra.';

  return `
  <div class="crumb">
    <button data-act="mo-mon" data-id="${m.id}">${esc(m.ma)}</button><span>/</span><span>Kết quả</span>
  </div>
  <div class="page-head"><h1>Kết quả bài kiểm tra</h1>
    <p class="meta">${esc(q.ten)} · ${esc(m.ten)}</p></div>

  <section class="panel quiz" style="margin-bottom:22px">
    <div class="score">
      <div class="score-ring">
        <svg viewBox="0 0 104 104">
          <circle cx="52" cy="52" r="44" stroke="var(--line-soft)"/>
          <circle cx="52" cy="52" r="44" stroke="${mau}" stroke-linecap="round"
            stroke-dasharray="${C}" stroke-dashoffset="${C * (1 - pct)}"/>
        </svg>
      </div>
      <div>
        <p class="score-val">${diem.toFixed(1)} / 10</p>
        <p class="meta" style="margin:0 0 9px">Đúng ${dung} trong ${q.cauhoi.length} câu</p>
        <p style="margin:0;max-width:44ch">${loi}</p>
      </div>
    </div>
  </section>

  <section class="panel quiz">
    <div class="panel-head"><h2>Chữa bài</h2><span class="meta">Xem lại từng câu</span></div>
    ${q.cauhoi.map((c, i) => {
      const ch = st.chon[i];
      const ok = ch === c.dung;
      return `
      <div class="q-block">
        <div class="q-head">
          <span class="q-no" style="border-color:${ok ? 'var(--go)' : 'var(--stop)'};color:${ok ? 'var(--go)' : 'var(--stop)'}">${i + 1}</span>
          <p>${esc(c.hoi)}</p>
        </div>
        ${c.dapan.map((d, j) => {
          let cls = '', note = '';
          if (j === c.dung) { cls = 'right'; note = j === ch ? 'Em chọn đúng' : 'Đáp án đúng'; }
          if (j === ch && j !== c.dung) { cls = 'wrong'; note = 'Em đã chọn'; }
          return `<div class="opt ${cls}"><span>${esc(d)}</span>${note ? `<span class="opt-note">${note}</span>` : ''}</div>`;
        }).join('')}
        <div class="explain"><b>Vì sao</b> · ${esc(c.giaithich)}</div>
      </div>`;
    }).join('')}
    <div class="panel-body" style="border-top:1.5px solid var(--line);display:flex;gap:12px;flex-wrap:wrap">
      <button class="btn" data-act="mo-mon" data-id="${m.id}">Về trang môn học</button>
      <button class="btn btn-ghost" data-act="mo-quiz" data-id="${m.id}">Làm lại</button>
      <button class="btn btn-ghost" data-act="di" data-v="bang-diem">Xem bảng điểm</button>
    </div>
  </section>`;
}

/* ---------- Sinh viên: bảng điểm -------------------------------------- */

function svBangDiem() {
  const ms = monCuaToi();
  const co = ms.filter(m => D.diem[m.id]);
  const tb = co.length ? (co.reduce((s, m) => s + D.diem[m.id].diem, 0) / co.length) : null;

  return `
  <div class="page-head">
    <h1>Bảng điểm</h1>
    <p class="meta">Điểm các bài kiểm tra trên hệ thống. Điểm tổng kết môn do giảng viên nhập sau khi có điểm thi.</p>
  </div>

  <div class="stats" style="margin-bottom:18px">
    <div class="stat"><b>${co.length}</b><span>Môn đã có điểm</span></div>
    <div class="stat"><b>${tb ? tb.toFixed(1) : '—'}</b><span>Trung bình chung</span></div>
    <div class="stat"><b>${tongTienDo()}%</b><span>Tiến độ học</span></div>
    <div class="stat"><b>${ms.reduce((s, m) => s + m.tc, 0)}</b><span>Tổng tín chỉ</span></div>
  </div>

  <section class="panel">
    <div class="panel-head"><h2>Chi tiết theo môn</h2></div>
    <div class="row row-grade" style="background:var(--paper);font-size:13px;color:var(--ink-mute);border-bottom:1.5px solid var(--line)">
      <span>Môn học</span><span class="hide-sm">Tiến độ</span><span>Kiểm tra</span><span>Xếp loại</span>
    </div>
    <div class="rows" style="border-top:0">
      ${ms.map(m => {
        const d = D.diem[m.id];
        const xl = !d ? '—' : d.diem >= 8.5 ? 'Giỏi' : d.diem >= 7 ? 'Khá' : d.diem >= 5 ? 'Trung bình' : 'Chưa đạt';
        const cls = !d ? '' : d.diem >= 7 ? 'tag-go' : d.diem >= 5 ? 'tag-wait' : 'tag-stop';
        return `
        <div class="row row-grade">
          <span><b>${esc(m.ten)}</b><span class="meta">${esc(m.ma)} · ${m.tc} tín chỉ</span></span>
          <span class="hide-sm meta">${tienDo(m.id)}%</span>
          <span style="font-family:var(--ff-head);font-size:17px;font-weight:600">${d ? d.diem.toFixed(1) : '—'}</span>
          <span>${d ? `<span class="tag ${cls}">${xl}</span>` : '<span class="meta">Chưa làm</span>'}</span>
        </div>`;
      }).join('')}
    </div>
  </section>`;
}

/* ---------- Thông báo ------------------------------------------------- */

function trangThongBao() {
  const ds = tatCaTB();
  return `
  <div class="page-head">
    <h1>Thông báo</h1>
    <p class="meta">${S.user.vai === 'gv'
      ? 'Thông báo đã gửi tới sinh viên. Soạn thông báo mới ở trang Quản lý nội dung.'
      : 'Thông báo từ giảng viên bộ môn.'}</p>
  </div>
  <section class="panel">
    ${ds.length ? ds.map(t => `
      <div class="bell-item ${t.moi && !D.daDoc ? 'new' : ''}" style="padding:16px 20px">
        <b style="font-size:15px">${esc(t.ten)}</b>
        <p style="font-size:14.5px">${esc(t.noi)}</p>
        <span class="meta">${esc(t.khi)}</span>
      </div>`).join('')
    : '<div class="empty"><b>Chưa có thông báo</b></div>'}
  </section>`;
}

/* ---------- Giảng viên: tổng quan ------------------------------------- */

function gvTongQuan() {
  const sv = SINHVIEN;
  const hoanThanh = sv.filter(s => s.tiendo === 100).length;
  const coDiem = sv.filter(s => s.diem != null);
  const tb = coDiem.length ? (coDiem.reduce((a, s) => a + s.diem, 0) / coDiem.length) : 0;
  const chuaBatDau = sv.filter(s => s.tiendo === 0).length;
  const tongBai = tatCaBai().length;

  const phoDiem = [
    ['Giỏi (8,5 – 10)', coDiem.filter(s => s.diem >= 8.5).length],
    ['Khá (7 – 8,4)',   coDiem.filter(s => s.diem >= 7 && s.diem < 8.5).length],
    ['Trung bình (5 – 6,9)', coDiem.filter(s => s.diem >= 5 && s.diem < 7).length],
    ['Chưa đạt (< 5)',  coDiem.filter(s => s.diem < 5).length]
  ];
  const maxPho = Math.max(...phoDiem.map(p => p[1]), 1);

  return `
  <div class="page-head">
    <h1>Tổng quan lớp</h1>
    <p class="meta">Lý luận và Phương pháp huấn luyện thể thao 1 · K60 Huấn luyện thể thao · nhóm ${sv.length} sinh viên đang theo dõi thử nghiệm</p>
  </div>

  <div class="stats" style="margin-bottom:18px">
    <div class="stat"><b>${sv.length}</b><span>Sinh viên trong nhóm</span></div>
    <div class="stat"><b>${hoanThanh}</b><span>Đã học hết bài</span><i>${Math.round(hoanThanh / sv.length * 100)}% của nhóm</i></div>
    <div class="stat"><b>${tb.toFixed(1)}</b><span>Điểm trung bình</span></div>
    <div class="stat"><b>${chuaBatDau}</b><span>Chưa vào học</span></div>
  </div>

  <div class="grid g-side">
    <section class="panel">
      <div class="panel-head"><h2>Sinh viên cần nhắc</h2>
        <button class="btn btn-ghost btn-sm" data-act="di" data-v="sinh-vien">Xem tất cả</button></div>
      <div class="rows" style="border-top:0">
        ${sv.filter(s => s.tiendo < 100).sort((a, b) => a.tiendo - b.tiendo).slice(0, 5).map((s, i) => `
          <div class="row row-student">
            <span class="row-num">${i + 1}</span>
            <span><b>${esc(s.ten)}</b><span class="meta">${esc(s.msv)}</span></span>
            <span class="hide-sm"><span class="load-bar ${s.tiendo ? 'accent' : ''}"><i style="width:${s.tiendo}%"></i></span></span>
            <span class="hide-sm meta">${s.tiendo}% bài học</span>
            <span>${s.diem == null ? '<span class="tag tag-stop">Chưa làm</span>' : `<span class="tag">${s.diem.toFixed(1)} điểm</span>`}</span>
          </div>`).join('')}
      </div>
    </section>

    <div>
      <section class="panel aside-card">
        <div class="panel-head"><h3>Phổ điểm kiểm tra</h3></div>
        <div class="panel-body">
          <div class="bars">
            ${phoDiem.map(([t, n]) => `
              <div class="bar-row">
                <span>${esc(t)}</span>
                <span class="bar-track"><i style="width:${n / maxPho * 100}%"></i></span>
                <b>${n}</b>
              </div>`).join('')}
          </div>
        </div>
      </section>
      <section class="panel aside-card">
        <div class="panel-head"><h3>Nội dung trên hệ thống</h3></div>
        <div class="panel-body">
          <p class="meta" style="margin:0 0 7px"><b style="color:var(--ink)">${MON.length}</b> môn học · <b style="color:var(--ink)">${KHOA.length}</b> khóa</p>
          <p class="meta" style="margin:0 0 7px"><b style="color:var(--ink)">${tongBai}</b> bài học đã đưa lên</p>
          <p class="meta" style="margin:0 0 14px"><b style="color:var(--ink)">${Object.keys(QUIZ).length}</b> đề kiểm tra</p>
          <button class="btn btn-sm" data-act="di" data-v="quan-ly">${I.plus}Thêm bài học</button>
        </div>
      </section>
    </div>
  </div>`;
}

/* ---------- Giảng viên: quản lý nội dung ------------------------------ */

function gvQuanLy() {
  return `
  <div class="page-head">
    <h1>Quản lý nội dung</h1>
    <p class="meta">Thêm bài học vào môn, soạn thông báo gửi sinh viên. Bản thử nghiệm lưu tạm trên máy này; bản chính thức sẽ lưu vào cơ sở dữ liệu của trường.</p>
  </div>
  ${S.flash ? `<div class="flash">${esc(S.flash)}</div>` : ''}

  <div class="tabs">
    <button class="${S.tab === 'mon' ? 'on' : ''}" data-act="tab" data-t="mon">Môn học</button>
    <button class="${S.tab === 'them' ? 'on' : ''}" data-act="tab" data-t="them">Thêm bài học</button>
    <button class="${S.tab === 'tb' ? 'on' : ''}" data-act="tab" data-t="tb">Soạn thông báo</button>
  </div>

  ${S.tab === 'mon' ? gvBangMon() : S.tab === 'them' ? gvFormBai() : gvFormTB()}`;
}

function gvBangMon() {
  return `
  <section class="panel">
    <div class="panel-head"><h2>Mười môn của bộ môn</h2><span class="meta">Bấm vào môn để xem nội dung</span></div>
    <div class="row row-subject" style="background:var(--paper);font-size:13px;color:var(--ink-mute);border-bottom:1.5px solid var(--line)">
      <span></span><span>Môn học</span><span class="hide-sm">Khóa</span><span class="hide-sm">Bài</span><span>Đề kiểm tra</span>
    </div>
    <div class="rows" style="border-top:0">
      ${MON.map((m, i) => `
        <button class="row row-subject" data-act="mo-mon" data-id="${m.id}">
          <span class="row-num">${String(i + 1).padStart(2, '0')}</span>
          <span><b>${esc(m.ten)}</b><span class="meta">${esc(m.ma)} · ${m.tc} tín chỉ · ${esc(m.ky)}</span></span>
          <span class="hide-sm meta">${m.khoa.join(', ')}</span>
          <span class="hide-sm meta">${baiCuaMon(m.id).length} bài</span>
          <span>${QUIZ[m.id]
            ? `<span class="tag tag-go">${QUIZ[m.id].cauhoi.length} câu</span>`
            : '<span class="tag">Chưa có</span>'}</span>
        </button>`).join('')}
    </div>
  </section>`;
}

function gvFormBai() {
  return `
  <section class="panel" style="max-width:860px">
    <div class="panel-head"><h2>Thêm bài học</h2><span class="meta">Bài mới hiện ngay cho sinh viên</span></div>
    <div class="panel-body">
      <form data-act="luu-bai">
        <div class="form-grid">
          <div class="field">
            <label for="f-mon">Môn học</label>
            <select id="f-mon" name="mon" required>
              ${MON.map(m => `<option value="${m.id}">${esc(m.ten)}</option>`).join('')}
            </select>
          </div>
          <div class="field">
            <label for="f-chuong">Chương</label>
            <input id="f-chuong" name="chuong" placeholder="Chương 3. Phương pháp huấn luyện" required>
          </div>
          <div class="field wide">
            <label for="f-ten">Tên bài</label>
            <input id="f-ten" name="ten" placeholder="Phương pháp giãn cách" required>
          </div>
          <div class="field">
            <label for="f-phut">Thời lượng (phút)</label>
            <input id="f-phut" name="phut" type="number" min="5" max="180" value="45" required>
          </div>
          <div class="field">
            <label for="f-tailieu">Tài liệu kèm theo</label>
            <select id="f-tailieu" name="tailieu">
              <option value="">Chưa có</option>
              <option value="slide">Có slide</option>
              <option value="video">Có video</option>
              <option value="ca">Có cả slide và video</option>
            </select>
          </div>
          <div class="field wide">
            <label for="f-noidung">Nội dung bài</label>
            <textarea id="f-noidung" name="noidung" style="min-height:150px"
              placeholder="Nhập nội dung bài học. Mỗi dòng trống tạo một đoạn mới."required></textarea>
          </div>
        </div>
        <div class="form-foot">
          <button class="btn" type="submit">Lưu bài học</button>
          <span class="meta">Bài sẽ xuất hiện trong môn đã chọn</span>
        </div>
      </form>
    </div>
  </section>

  ${D.baiThem.length ? `
  <section class="panel" style="margin-top:22px;max-width:860px">
    <div class="panel-head"><h3>Bài thầy đã thêm</h3><span class="meta">${D.baiThem.length} bài</span></div>
    <div class="rows" style="border-top:0">
      ${D.baiThem.map(b => {
        const m = timMon(b.mon);
        return `<div class="row row-lesson">
          <span class="row-num">${b.so}</span>
          <span><b>${esc(b.ten)}</b><span class="meta">${esc(m ? m.ten : '')} · ${esc(b.chuong)}</span></span>
          <span class="hide-sm meta">${b.phut} phút</span>
          <span style="display:flex;gap:7px">
            <button class="btn btn-ghost btn-sm" data-act="mo-bai" data-id="${b.id}">Xem</button>
            <button class="btn btn-ghost btn-sm" data-act="xoa-bai" data-id="${b.id}">Xóa</button>
          </span>
        </div>`;
      }).join('')}
    </div>
  </section>` : ''}`;
}

function gvFormTB() {
  return `
  <section class="panel" style="max-width:720px">
    <div class="panel-head"><h2>Soạn thông báo</h2><span class="meta">Gửi tới sinh viên đang theo học</span></div>
    <div class="panel-body">
      <form data-act="luu-tb">
        <div class="field">
          <label for="t-ten">Tiêu đề</label>
          <input id="t-ten" name="ten" placeholder="Lịch kiểm tra giữa kỳ" required>
        </div>
        <div class="field">
          <label for="t-noi">Nội dung</label>
          <textarea id="t-noi" name="noi" placeholder="Nội dung thông báo gửi sinh viên." required></textarea>
        </div>
        <div class="form-foot">
          <button class="btn" type="submit">${I.send}Gửi thông báo</button>
          <span class="meta">Hiện ngay trên bảng điều khiển của sinh viên</span>
        </div>
      </form>
    </div>
  </section>`;
}

/* ---------- Giảng viên: sinh viên và điểm ----------------------------- */

function gvSinhVien() {
  const sv = SINHVIEN.slice().sort((a, b) => (b.diem || 0) - (a.diem || 0));
  return `
  <div class="page-head">
    <h1>Sinh viên và điểm</h1>
    <p class="meta">Danh sách thử nghiệm với ${sv.length} sinh viên K60. Bản chính thức sẽ nối với dữ liệu của phòng đào tạo và file điểm danh của bộ môn.</p>
  </div>

  <section class="panel">
    <div class="panel-head">
      <h2>Lý luận và Phương pháp huấn luyện thể thao 1</h2>
      <button class="btn btn-ghost btn-sm" data-act="xuat">Xuất danh sách</button>
    </div>
    <div class="row row-student" style="background:var(--paper);font-size:13px;color:var(--ink-mute);border-bottom:1.5px solid var(--line)">
      <span></span><span>Sinh viên</span><span class="hide-sm">Tiến độ</span><span class="hide-sm"></span><span>Điểm</span>
    </div>
    <div class="rows" style="border-top:0">
      ${sv.map((s, i) => `
        <div class="row row-student">
          <span class="row-num">${i + 1}</span>
          <span><b>${esc(s.ten)}</b><span class="meta">${esc(s.msv)} · ${esc(s.khoa)}</span></span>
          <span class="hide-sm"><span class="load-bar ${s.tiendo === 100 ? 'go' : s.tiendo ? 'accent' : ''}"><i style="width:${s.tiendo}%"></i></span></span>
          <span class="hide-sm meta">${s.tiendo}%</span>
          <span style="font-family:var(--ff-head);font-size:17px;font-weight:600">${s.diem == null ? '—' : s.diem.toFixed(1)}</span>
        </div>`).join('')}
    </div>
  </section>`;
}

/* ---------- Xử lý tương tác ------------------------------------------- */

function diTrangDau() { window.scrollTo(0, 0); }

/* Tải tệp về máy: chạy được cả trong khung xem thử lẫn trên hosting thật */
async function taiVe(ten, noi) {
  try {
    const dl = window.claude && window.claude.use ? await window.claude.use('downloads') : null;
    if (dl) { await dl.save({ filename: ten, data: noi }); return; }
  } catch (e) { /* người dùng từ chối hoặc không dùng được: thử cách thường */ }
  try {
    const url = URL.createObjectURL(new Blob([noi], { type: 'text/csv;charset=utf-8' }));
    const a = document.createElement('a');
    a.href = url; a.download = ten;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  } catch (e) {}
}

document.addEventListener('click', e => {
  const n = e.target.closest('[data-act]');
  const trongBell = e.target.closest('.bell');
  const trongTim = e.target.closest('.search');

  if (!trongBell && S.bell) { S.bell = false; ve(); return; }
  if (!trongTim && S.tim) { S.tim = ''; ve(); return; }
  if (!n) return;

  const a = n.dataset.act;

  if (a === 'nhanh') {
    const u = NGUOIDUNG.find(x => x.tk === n.dataset.tk);
    S.user = u; S.view = 'bang-dieu-khien'; loiDangNhap = ''; ve(); return;
  }
  if (a === 'thoat') { S.user = null; S.view = 'bang-dieu-khien'; ve(); return; }
  if (a === 'di')      { S.view = n.dataset.v; S.side = false; S.tim = ''; ve(); diTrangDau(); return; }
  if (a === 'mo-mon')  { S.mon = n.dataset.id; S.view = 'mon'; S.tim = ''; ve(); diTrangDau(); return; }
  if (a === 'mo-bai')  { S.bai = n.dataset.id; S.view = 'bai'; S.tim = ''; ve(); diTrangDau(); return; }
  if (a === 'mo-quiz') { S.mon = n.dataset.id; S.view = 'quiz'; S.quiz = { chon: {}, nop: false }; ve(); diTrangDau(); return; }
  if (a === 'mo-side') { S.side = true; ve(); return; }
  if (a === 'dong-side') { S.side = false; ve(); return; }
  if (a === 'bell') {
    S.bell = !S.bell;
    if (S.bell) { D.daDoc = true; ghi(); }
    ve(); return;
  }
  if (a === 'tab') { S.tab = n.dataset.t; S.flash = ''; ve(); return; }

  if (a === 'xong') {
    const id = n.dataset.id;
    if (D.xong[id]) delete D.xong[id]; else D.xong[id] = true;
    ghi(); ve(); return;
  }

  if (a === 'nop') {
    const q = QUIZ[S.mon];
    if (!S.quiz) S.quiz = { chon: {}, nop: false };
    if (Object.keys(S.quiz.chon).length < q.cauhoi.length) {
      if (!confirm('Em còn câu chưa chọn. Nộp bài luôn?')) return;
    }
    let dung = 0;
    q.cauhoi.forEach((c, i) => { if (S.quiz.chon[i] === c.dung) dung++; });
    D.diem[S.mon] = {
      diem: dung / q.cauhoi.length * 10, dung, tong: q.cauhoi.length,
      khi: new Date().toISOString()
    };
    ghi();
    S.quiz.nop = true; ve(); diTrangDau(); return;
  }

  if (a === 'xoa-bai') {
    D.baiThem = D.baiThem.filter(b => b.id !== n.dataset.id);
    ghi(); S.flash = 'Đã xóa bài học.'; ve(); return;
  }

  if (a === 'xuat') {
    const dong = [['STT', 'Mã SV', 'Họ tên', 'Khóa', 'Tiến độ (%)', 'Điểm']]
      .concat(SINHVIEN.map((s, i) => [i + 1, s.msv, s.ten, s.khoa, s.tiendo, s.diem == null ? '' : s.diem]));
    const csv = '﻿' + dong.map(r => r.join(',')).join('\n');
    taiVe('danh-sach-diem.csv', csv);
    return;
  }
});

document.addEventListener('change', e => {
  const n = e.target.closest('[data-act="chon"]');
  if (!n) return;
  if (!S.quiz) S.quiz = { chon: {}, nop: false };
  S.quiz.chon[+n.dataset.c] = +n.dataset.d;
  ve();
});

document.addEventListener('input', e => {
  const n = e.target.closest('[data-act="tim"]');
  if (!n) return;
  S.tim = n.value;
  ve();
  const inp = $('#o-tim');
  if (inp) { inp.focus(); inp.setSelectionRange(inp.value.length, inp.value.length); }
});

document.addEventListener('submit', e => {
  const f = e.target.closest('[data-act]');
  if (!f) return;
  e.preventDefault();
  const a = f.dataset.act;
  const fd = new FormData(f);

  if (a === 'vao') {
    const u = NGUOIDUNG.find(x => x.tk === fd.get('tk').trim() && x.mk === fd.get('mk'));
    if (!u) { loiDangNhap = 'Tên đăng nhập hoặc mật khẩu không đúng. Thử sv / 123 hoặc gv / 123.'; ve(); return; }
    S.user = u; S.view = 'bang-dieu-khien'; loiDangNhap = ''; ve(); return;
  }

  if (a === 'luu-bai') {
    const mon = fd.get('mon');
    const tl = fd.get('tailieu');
    const txt = fd.get('noidung').trim();
    const html = txt.split(/\n\s*\n/).map(p => `<p>${esc(p.trim()).replace(/\n/g, '<br>')}</p>`).join('');
    D.baiThem.push({
      id: 'tx' + Date.now(), mon, chuong: fd.get('chuong').trim(),
      so: baiCuaMon(mon).length + 1, ten: fd.get('ten').trim(),
      phut: +fd.get('phut'), co_slide: tl === 'slide' || tl === 'ca',
      co_video: tl === 'video' || tl === 'ca', noidung: html
    });
    ghi();
    S.flash = 'Đã lưu bài học. Sinh viên thấy bài này ngay trong môn đã chọn.';
    ve(); diTrangDau(); return;
  }

  if (a === 'luu-tb') {
    D.tbThem.unshift({
      id: 'tb' + Date.now(), ten: fd.get('ten').trim(),
      noi: fd.get('noi').trim(), khi: 'Vừa xong', moi: true
    });
    D.daDoc = false; ghi();
    S.flash = 'Đã gửi thông báo tới sinh viên.';
    ve(); diTrangDau(); return;
  }
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    if (S.bell || S.side || S.tim) { S.bell = false; S.side = false; S.tim = ''; ve(); }
  }
});

/* ---------- Khởi động ------------------------------------------------- */

doc();
ve();
