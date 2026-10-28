/* ==========================================================================
   Dữ liệu mẫu — thầy thay bằng nội dung thật khi đưa bài giảng lên
   ========================================================================== */

const KHOA = [
  { id: 'K58', ten: 'Khóa 58', nien: '2023 – 2027', nam: 4, siso: 1480 },
  { id: 'K59', ten: 'Khóa 59', nien: '2024 – 2028', nam: 3, siso: 1515 },
  { id: 'K60', ten: 'Khóa 60', nien: '2025 – 2029', nam: 2, siso: 1496 },
  { id: 'K61', ten: 'Khóa 61', nien: '2026 – 2030', nam: 1, siso: 1532 }
];

/* 10 môn học của Bộ môn Lý luận TDTT */
const MON = [
  {
    id: 'LLPP',  ma: 'LL101', ten: 'Lý luận và Phương pháp thể dục thể thao',
    tc: 3, khoa: ['K61'], ky: 'Học kỳ 1',
    tomtat: 'Những khái niệm nền tảng của ngành: thể dục thể thao, giáo dục thể chất, huấn luyện thể thao và mối quan hệ giữa chúng trong hệ thống TDTT nước ta.'
  },
  {
    id: 'HLTT1', ma: 'LL201', ten: 'Lý luận và Phương pháp huấn luyện thể thao 1',
    tc: 3, khoa: ['K60'], ky: 'Học kỳ 1',
    tomtat: 'Bản chất của huấn luyện thể thao, các nguyên tắc huấn luyện, lượng vận động và quá trình thích nghi của cơ thể vận động viên.'
  },
  {
    id: 'HLTT2', ma: 'LL202', ten: 'Lý luận và Phương pháp huấn luyện thể thao 2',
    tc: 3, khoa: ['K59'], ky: 'Học kỳ 1',
    tomtat: 'Cấu trúc chu kỳ huấn luyện, kế hoạch huấn luyện nhiều năm và điều khiển trạng thái sung sức thể thao.'
  },
  {
    id: 'GDTC',  ma: 'LL203', ten: 'Lý luận và Phương pháp giáo dục thể chất',
    tc: 2, khoa: ['K60', 'K61'], ky: 'Học kỳ 2',
    tomtat: 'Mục tiêu, nội dung và phương pháp giáo dục thể chất trong trường học các cấp.'
  },
  {
    id: 'DOLUONG', ma: 'LL301', ten: 'Đo lường thể thao',
    tc: 2, khoa: ['K59'], ky: 'Học kỳ 2',
    tomtat: 'Lý thuyết test, tính thông báo và độ tin cậy của test; đánh giá trình độ tập luyện bằng thang điểm.'
  },
  {
    id: 'TUYENCHON', ma: 'LL302', ten: 'Tuyển chọn tài năng thể thao',
    tc: 2, khoa: ['K58'], ky: 'Học kỳ 1',
    tomtat: 'Tiêu chí và quy trình tuyển chọn tài năng thể thao qua các giai đoạn huấn luyện ban đầu đến chuyên sâu.'
  },
  {
    id: 'QUANLY', ma: 'LL303', ten: 'Quản lý thể dục thể thao',
    tc: 2, khoa: ['K58'], ky: 'Học kỳ 1',
    tomtat: 'Chức năng quản lý trong lĩnh vực TDTT: lập kế hoạch, tổ chức, điều hành và kiểm tra hoạt động TDTT.'
  },
  {
    id: 'XAHOI', ma: 'LL304', ten: 'Xã hội học thể dục thể thao',
    tc: 2, khoa: ['K59'], ky: 'Học kỳ 2',
    tomtat: 'TDTT như một hiện tượng xã hội: thể thao và văn hóa, thể thao và truyền thông, phong trào TDTT quần chúng.'
  },
  {
    id: 'NCKH',  ma: 'LL401', ten: 'Phương pháp nghiên cứu khoa học thể dục thể thao',
    tc: 3, khoa: ['K58'], ky: 'Học kỳ 1',
    tomtat: 'Chọn đề tài, xây dựng giả thuyết, các phương pháp nghiên cứu thường dùng và cách xử lý số liệu trong nghiên cứu TDTT.'
  },
  {
    id: 'OLYMPIC', ma: 'LL305', ten: 'Olympic và phong trào thể thao quốc tế',
    tc: 2, khoa: ['K60'], ky: 'Học kỳ 2',
    tomtat: 'Lịch sử phong trào Olympic hiện đại, hệ thống tổ chức thể thao quốc tế và vị thế của Việt Nam.'
  }
];

/* Bài học — mỗi môn một chương mẫu; thầy thêm chương và bài qua trang quản lý */
const BAI = [
  /* --- Lý luận và PP huấn luyện thể thao 1 --- */
  { id: 'b1', mon: 'HLTT1', chuong: 'Chương 1. Khái quát về huấn luyện thể thao', so: 1,
    ten: 'Huấn luyện thể thao là gì', phut: 45, co_video: false, co_slide: true,
    noidung: `<p>Huấn luyện thể thao là quá trình sư phạm chuyên biệt, được tổ chức có kế hoạch nhằm phát triển năng lực thể thao của người tập đến mức cao nhất mà họ có thể đạt được.</p>
<h3>Ba dấu hiệu bản chất</h3>
<ul>
<li><b>Tính sư phạm.</b> Quan hệ giữa huấn luyện viên và vận động viên là quan hệ dạy – học, có mục tiêu và nội dung xác định.</li>
<li><b>Tính kế hoạch.</b> Lượng vận động được sắp xếp theo chu kỳ, không phải tập ngẫu nhiên theo cảm tính.</li>
<li><b>Tính chuyên biệt.</b> Nội dung huấn luyện bám sát đặc điểm của môn thể thao và đặc điểm cá nhân người tập.</li>
</ul>
<blockquote>Thành tích thể thao không phải kết quả của một buổi tập nặng, mà là kết quả của hàng nghìn buổi tập được sắp xếp đúng chỗ.</blockquote>
<h3>Phân biệt với giáo dục thể chất</h3>
<p>Giáo dục thể chất hướng tới sức khỏe và kỹ năng vận động cơ bản cho mọi người. Huấn luyện thể thao hướng tới thành tích tối đa của một nhóm người có năng khiếu. Cùng dùng bài tập thể chất làm phương tiện, nhưng mục tiêu, khối lượng và cường độ khác nhau rất xa.</p>` },

  { id: 'b2', mon: 'HLTT1', chuong: 'Chương 1. Khái quát về huấn luyện thể thao', so: 2,
    ten: 'Các thành phần của trình độ tập luyện', phut: 50, co_video: false, co_slide: true,
    noidung: `<p>Trình độ tập luyện của vận động viên là một tổng thể gồm nhiều mặt, thường được chia thành năm thành phần.</p>
<ol>
<li><b>Trình độ thể lực.</b> Sức nhanh, sức mạnh, sức bền, mềm dẻo, phối hợp vận động.</li>
<li><b>Trình độ kỹ thuật.</b> Mức độ hợp lý và ổn định của động tác.</li>
<li><b>Trình độ chiến thuật.</b> Khả năng vận dụng phương án hợp lý trong thi đấu.</li>
<li><b>Trình độ tâm lý.</b> Động cơ, ý chí, khả năng chịu áp lực thi đấu.</li>
<li><b>Trình độ lý luận.</b> Hiểu biết về môn thể thao và về chính quá trình tập luyện của mình.</li>
</ol>
<h3>Quan hệ giữa các thành phần</h3>
<p>Năm thành phần không tách rời. Một vận động viên có thể lực tốt nhưng kỹ thuật kém sẽ không chuyển hóa được thể lực thành thành tích. Ngược lại, kỹ thuật tinh xảo cũng sụp đổ khi thể lực cạn trong những phút cuối.</p>` },

  { id: 'b3', mon: 'HLTT1', chuong: 'Chương 2. Lượng vận động', so: 3,
    ten: 'Khối lượng và cường độ', phut: 45, co_video: false, co_slide: false,
    noidung: `<p>Lượng vận động là mức độ tác động của bài tập lên cơ thể người tập, gồm hai mặt không thể tách rời: khối lượng và cường độ.</p>
<h3>Khối lượng</h3>
<p>Mặt số lượng của tác động: tổng thời gian tập, tổng số lần lặp lại, tổng quãng đường, tổng trọng lượng nâng. Khối lượng trả lời câu hỏi <i>tập bao nhiêu</i>.</p>
<h3>Cường độ</h3>
<p>Mặt chất lượng của tác động: tốc độ di chuyển, trọng lượng tạ so với mức tối đa, tần số tim trong khi tập. Cường độ trả lời câu hỏi <i>tập nặng đến đâu</i>.</p>
<h3>Quan hệ nghịch</h3>
<p>Trong một buổi tập, khối lượng và cường độ không thể cùng cao. Khi cường độ tăng gần tới mức tối đa, khối lượng buộc phải giảm. Hiểu quan hệ này là điều kiện để sắp xếp buổi tập không gây quá tải.</p>` },

  /* --- Lý luận và PP huấn luyện thể thao 2 --- */
  { id: 'b4', mon: 'HLTT2', chuong: 'Chương 1. Chu kỳ huấn luyện', so: 1,
    ten: 'Chu kỳ lớn, chu kỳ trung bình, chu kỳ nhỏ', phut: 50, co_video: false, co_slide: true,
    noidung: `<p>Quá trình huấn luyện được chia thành các chu kỳ lồng nhau, nhờ đó lượng vận động được tăng giảm có quy luật thay vì tăng liên tục đến khi vận động viên kiệt sức.</p>
<h3>Ba cấp chu kỳ</h3>
<ul>
<li><b>Chu kỳ lớn</b> kéo dài từ vài tháng đến một năm, tương ứng một lần đạt trạng thái sung sức thể thao.</li>
<li><b>Chu kỳ trung bình</b> kéo dài ba đến sáu tuần, giải quyết một nhiệm vụ huấn luyện cụ thể.</li>
<li><b>Chu kỳ nhỏ</b> thường là một tuần, là đơn vị sắp xếp buổi tập trực tiếp.</li>
</ul>
<h3>Ba thời kỳ trong chu kỳ lớn</h3>
<p>Thời kỳ chuẩn bị xây nền thể lực chung rồi chuyển sang chuyên môn. Thời kỳ thi đấu duy trì sung sức và dồn vào các giải chính. Thời kỳ chuyển tiếp giảm tải để cơ thể hồi phục, chuẩn bị cho chu kỳ sau.</p>` },

  /* --- Đo lường thể thao --- */
  { id: 'b5', mon: 'DOLUONG', chuong: 'Chương 1. Lý thuyết test', so: 1,
    ten: 'Test và các yêu cầu của một test tốt', phut: 45, co_video: false, co_slide: true,
    noidung: `<p>Test trong thể thao là phép đo được chuẩn hóa, dùng để đánh giá một mặt nào đó của trình độ tập luyện.</p>
<h3>Bốn yêu cầu</h3>
<ol>
<li><b>Tính thông báo.</b> Test phải đo đúng cái cần đo. Test bật xa tại chỗ thông báo về sức mạnh bột phát của chân, không thông báo về sức bền.</li>
<li><b>Độ tin cậy.</b> Đo lại trong điều kiện như nhau thì kết quả phải gần như nhau.</li>
<li><b>Tính khách quan.</b> Hai người đo khác nhau phải cho kết quả tương đương.</li>
<li><b>Tính chuẩn hóa.</b> Quy trình đo, dụng cụ, điều kiện và cách tính kết quả phải được quy định rõ và giữ nguyên.</li>
</ol>
<h3>Vì sao phải kiểm tra bốn yêu cầu này</h3>
<p>Một test thiếu tin cậy sẽ cho kết quả nhảy múa theo từng lần đo, khiến ta không phân biệt được sự tiến bộ thật của vận động viên với sai số của phép đo.</p>` },

  /* --- Lý luận và PP TDTT --- */
  { id: 'b6', mon: 'LLPP', chuong: 'Chương 1. Hệ thống các khái niệm', so: 1,
    ten: 'Thể dục thể thao, giáo dục thể chất, phát triển thể chất', phut: 45, co_video: false, co_slide: true,
    noidung: `<p>Ba thuật ngữ này thường bị dùng lẫn nhau trong đời sống, nhưng trong khoa học chúng chỉ những hiện tượng khác nhau.</p>
<h3>Phát triển thể chất</h3>
<p>Quá trình biến đổi hình thái và chức năng cơ thể con người theo thời gian, chịu tác động của di truyền, điều kiện sống và hoạt động vận động.</p>
<h3>Giáo dục thể chất</h3>
<p>Quá trình sư phạm nhằm truyền thụ kỹ năng vận động và phát triển các tố chất thể lực, là một mặt của giáo dục toàn diện.</p>
<h3>Thể dục thể thao</h3>
<p>Khái niệm rộng nhất, bao gồm toàn bộ hoạt động vận động có tổ chức của xã hội: giáo dục thể chất, thể thao thành tích cao, thể thao quần chúng, thể dục hồi phục.</p>` },

  /* --- NCKH --- */
  { id: 'b7', mon: 'NCKH', chuong: 'Chương 1. Chọn đề tài', so: 1,
    ten: 'Vấn đề nghiên cứu và câu hỏi nghiên cứu', phut: 50, co_video: false, co_slide: true,
    noidung: `<p>Một đề tài nghiên cứu bắt đầu từ chỗ nhận ra khoảng trống giữa điều ta đã biết và điều thực tiễn đang cần biết.</p>
<h3>Dấu hiệu của một vấn đề nghiên cứu được</h3>
<ul>
<li>Có người quan tâm tới câu trả lời, nghĩa là giải quyết được thì có ích.</li>
<li>Chưa có câu trả lời đủ thuyết phục trong tài liệu hiện có.</li>
<li>Có thể thu được số liệu để trả lời trong điều kiện của người nghiên cứu.</li>
</ul>
<h3>Từ vấn đề tới câu hỏi</h3>
<p>Vấn đề thường phát biểu rộng, ví dụ thể lực sinh viên giảm sút. Câu hỏi nghiên cứu phải hẹp và đo được, ví dụ: sau một học kỳ áp dụng bài tập bổ trợ, sức bền chung của sinh viên năm thứ nhất thay đổi như thế nào.</p>` }
];

/* Câu hỏi trắc nghiệm theo môn */
const QUIZ = {
  HLTT1: {
    ten: 'Kiểm tra Chương 1 – 2',
    phut: 15,
    cauhoi: [
      { hoi: 'Dấu hiệu nào sau đây KHÔNG thuộc bản chất của huấn luyện thể thao?',
        dapan: ['Tính sư phạm', 'Tính kế hoạch', 'Tính tự phát', 'Tính chuyên biệt'],
        dung: 2,
        giaithich: 'Huấn luyện thể thao là quá trình có kế hoạch. Tập luyện tự phát theo cảm tính là điều huấn luyện thể thao cần loại bỏ.' },
      { hoi: 'Khối lượng của lượng vận động được hiểu là mặt nào?',
        dapan: ['Mặt số lượng của tác động', 'Mặt chất lượng của tác động', 'Mức độ hồi phục sau tập', 'Thời gian nghỉ giữa các lần lặp'],
        dung: 0,
        giaithich: 'Khối lượng trả lời câu hỏi tập bao nhiêu: tổng thời gian, tổng số lần lặp, tổng quãng đường. Cường độ mới là mặt chất lượng.' },
      { hoi: 'Trong một buổi tập, khi cường độ tăng gần mức tối đa thì khối lượng phải:',
        dapan: ['Tăng theo', 'Giảm xuống', 'Giữ nguyên', 'Tăng gấp đôi'],
        dung: 1,
        giaithich: 'Khối lượng và cường độ có quan hệ nghịch. Cường độ rất cao chỉ duy trì được trong khối lượng nhỏ, nếu không sẽ gây quá tải.' },
      { hoi: 'Thành phần nào sau đây thuộc trình độ tập luyện của vận động viên?',
        dapan: ['Chỉ trình độ thể lực và kỹ thuật', 'Chỉ trình độ thể lực', 'Thể lực, kỹ thuật, chiến thuật, tâm lý, lý luận', 'Chỉ thành tích thi đấu'],
        dung: 2,
        giaithich: 'Trình độ tập luyện là tổng thể năm thành phần, trong đó trình độ lý luận là mặt thường bị xem nhẹ nhất.' },
      { hoi: 'Điểm khác nhau cơ bản giữa huấn luyện thể thao và giáo dục thể chất là:',
        dapan: ['Phương tiện sử dụng', 'Mục tiêu hướng tới', 'Người tổ chức', 'Địa điểm tiến hành'],
        dung: 1,
        giaithich: 'Cả hai đều dùng bài tập thể chất làm phương tiện. Khác nhau ở mục tiêu: một bên là sức khỏe cho mọi người, một bên là thành tích tối đa.' }
    ]
  },
  DOLUONG: {
    ten: 'Kiểm tra Chương 1',
    phut: 10,
    cauhoi: [
      { hoi: 'Tính thông báo của một test nghĩa là:',
        dapan: ['Test đo đúng cái cần đo', 'Test cho kết quả ổn định khi đo lại', 'Test dễ thực hiện', 'Test không phụ thuộc người đo'],
        dung: 0,
        giaithich: 'Đo lại ổn định là độ tin cậy; không phụ thuộc người đo là tính khách quan. Tính thông báo nói về việc test có đo đúng mặt cần đánh giá hay không.' },
      { hoi: 'Test bật xa tại chỗ thông báo rõ nhất về tố chất nào?',
        dapan: ['Sức bền chung', 'Sức mạnh bột phát của chân', 'Mềm dẻo', 'Khả năng phối hợp'],
        dung: 1,
        giaithich: 'Bật xa tại chỗ là động tác dùng lực tối đa trong thời gian rất ngắn, phản ánh sức mạnh bột phát của chi dưới.' },
      { hoi: 'Hai giáo viên dùng cùng một test nhưng cho kết quả lệch nhau nhiều. Test này thiếu:',
        dapan: ['Tính thông báo', 'Tính chuẩn hóa và khách quan', 'Độ tin cậy', 'Tất cả đều đúng'],
        dung: 1,
        giaithich: 'Kết quả phụ thuộc người đo là biểu hiện của việc quy trình chưa được chuẩn hóa, dẫn tới thiếu tính khách quan.' },
      { hoi: 'Vì sao một test thiếu độ tin cậy lại gây khó khi đánh giá sự tiến bộ?',
        dapan: ['Vì test quá dễ', 'Vì không phân biệt được tiến bộ thật với sai số đo', 'Vì mất nhiều thời gian', 'Vì cần dụng cụ đắt'],
        dung: 1,
        giaithich: 'Khi sai số của phép đo lớn hơn mức tiến bộ thật, con số thu được không cho biết vận động viên có khá lên hay không.' }
    ]
  },
  HLTT2: {
    ten: 'Kiểm tra Chương 1',
    phut: 10,
    cauhoi: [
      { hoi: 'Chu kỳ nhỏ trong huấn luyện thường có độ dài:',
        dapan: ['Một buổi tập', 'Một tuần', 'Ba đến sáu tuần', 'Một năm'],
        dung: 1,
        giaithich: 'Chu kỳ nhỏ thường trùng một tuần, là đơn vị để sắp xếp trực tiếp các buổi tập nặng, nhẹ và nghỉ.' },
      { hoi: 'Thời kỳ chuyển tiếp trong chu kỳ lớn có nhiệm vụ chính là:',
        dapan: ['Đạt thành tích cao nhất', 'Giảm tải để hồi phục', 'Xây nền thể lực chung', 'Kiểm tra trình độ'],
        dung: 1,
        giaithich: 'Thời kỳ chuyển tiếp hạ lượng vận động để cơ thể và tâm lý hồi phục, tạo điều kiện bước vào chu kỳ lớn tiếp theo.' },
      { hoi: 'Chu kỳ lớn tương ứng với:',
        dapan: ['Một tuần tập luyện', 'Một lần đạt trạng thái sung sức thể thao', 'Một buổi kiểm tra', 'Một giải đấu nhỏ'],
        dung: 1,
        giaithich: 'Mỗi chu kỳ lớn được xây dựng quanh một lần đưa vận động viên tới trạng thái sung sức thể thao, thường nhằm vào giải đấu chính.' }
    ]
  }
};

/* Người dùng demo */
const NGUOIDUNG = [
  { tk: 'sv', mk: '123', vai: 'sv', ten: 'Nguyễn Văn An', msv: '60A0123', khoa: 'K60', lop: 'Huấn luyện thể thao 1' },
  { tk: 'gv', mk: '123', vai: 'gv', ten: 'Vik', chucdanh: 'Giảng viên Bộ môn Lý luận TDTT' }
];

/* Sinh viên mẫu cho trang quản lý điểm */
const SINHVIEN = [
  { msv: '60A0118', ten: 'Trần Thị Bình',   khoa: 'K60', tiendo: 100, diem: 8.5 },
  { msv: '60A0123', ten: 'Nguyễn Văn An',   khoa: 'K60', tiendo: 67,  diem: 7.5 },
  { msv: '60A0131', ten: 'Lê Hoàng Cường',  khoa: 'K60', tiendo: 100, diem: 9.0 },
  { msv: '60A0142', ten: 'Phạm Thu Dung',   khoa: 'K60', tiendo: 33,  diem: 6.0 },
  { msv: '60A0155', ten: 'Hoàng Minh Đức',  khoa: 'K60', tiendo: 100, diem: 7.0 },
  { msv: '60A0167', ten: 'Vũ Thị Giang',    khoa: 'K60', tiendo: 67,  diem: 8.0 },
  { msv: '60A0174', ten: 'Đỗ Quang Huy',    khoa: 'K60', tiendo: 0,   diem: null },
  { msv: '60A0188', ten: 'Bùi Thị Lan',     khoa: 'K60', tiendo: 100, diem: 9.5 },
  { msv: '60A0192', ten: 'Ngô Văn Mạnh',    khoa: 'K60', tiendo: 33,  diem: 5.5 },
  { msv: '60A0205', ten: 'Dương Thị Nhung', khoa: 'K60', tiendo: 67,  diem: 7.5 }
];

/* Thông báo */
const THONGBAO = [
  { id: 't1', ten: 'Mở quyền làm bài kiểm tra Chương 1 – 2',
    noi: 'Bài kiểm tra môn Lý luận và Phương pháp huấn luyện thể thao 1 đã mở, hạn làm đến hết Chủ nhật tuần này.',
    khi: '2 giờ trước', moi: true },
  { id: 't2', ten: 'Bổ sung tài liệu Chương 2',
    noi: 'Slide bài Khối lượng và cường độ đã được cập nhật thêm ví dụ về tính lượng vận động trong một tuần.',
    khi: 'Hôm qua', moi: true },
  { id: 't3', ten: 'Lịch học bù tuần tới',
    noi: 'Buổi học thứ Năm chuyển sang giảng đường H, phòng H201, giữ nguyên giờ.',
    khi: '3 ngày trước', moi: false }
];
