# Giảng đường số

Nền tảng học trực tuyến của Bộ môn Lý luận TDTT, Trường Đại học TDTT Bắc Ninh.

Bản hiện tại là **khung trang chạy được**: đầy đủ luồng đăng nhập, học bài, làm bài
kiểm tra, bảng điểm và trang quản lý cho giảng viên. Nội dung bài giảng là dữ liệu
mẫu, sẽ thay dần bằng bài thật.

## Chạy thử

Không cần cài gì. Mở `index.html` bằng trình duyệt là xong.

Muốn chạy qua máy chủ cục bộ (gần với môi trường thật hơn):

```bash
python3 -m http.server 8000
# mở http://localhost:8000
```

Tài khoản thử:

| Vai | Tên đăng nhập | Mật khẩu |
|---|---|---|
| Sinh viên | `sv` | `123` |
| Giảng viên | `gv` | `123` |

## Cấu trúc

```
index.html        trang chính
css/style.css     toàn bộ giao diện
js/data.js        dữ liệu: khóa, môn, bài học, câu hỏi, sinh viên
js/app.js         logic: điều hướng, bài học, kiểm tra, quản lý
build.js          ghép thành một tệp duy nhất trong dist/
dist/index.html   bản một tệp, dùng để đăng nhanh hoặc gửi cho người khác
```

Tạo lại bản một tệp:

```bash
node build.js
```

## Đã có

- Đăng nhập hai vai: sinh viên và giảng viên
- 4 khóa (K58 – K61), 10 môn của bộ môn, phân môn theo khóa
- Bài học có chương, đánh dấu đã học, tiến độ theo môn và theo kỳ
- Bài kiểm tra trắc nghiệm: chấm điểm, chữa bài kèm giải thích từng câu
- Bảng điểm cá nhân, xếp loại
- Trang giảng viên: tổng quan lớp, phổ điểm, thêm bài học, soạn thông báo,
  danh sách sinh viên, xuất CSV
- Tìm kiếm theo tên môn, tên bài, tên chương và nội dung bài
- Chạy được trên điện thoại

## Chưa có, làm ở bước sau

- Máy chủ và cơ sở dữ liệu thật (hiện lưu tạm trong trình duyệt)
- Tài khoản thật cho 1500 sinh viên mỗi khóa, nối với dữ liệu phòng đào tạo
- Tải lên video, slide, tệp bài tập
- Bài tập tự luận và chấm bài
- Diễn đàn hỏi đáp
- Thống kê sâu hơn cho giảng viên

## Đưa lên GitHub

Thầy làm một lần theo các bước sau.

**1. Tạo tài khoản** tại https://github.com nếu chưa có.

**2. Tạo kho chứa mới**: bấm dấu `+` góc trên bên phải → `New repository`.
Đặt tên `giang-duong-so`, để chế độ `Private` nếu chưa muốn công khai,
**không** tích thêm README nào cả, rồi bấm `Create repository`.

**3. Đẩy code lên** — mở Terminal trong thư mục dự án và chạy, thay `TEN-TAI-KHOAN`
bằng tên tài khoản GitHub của thầy:

```bash
git init
git add .
git commit -m "Khung trang e-learning bản đầu"
git branch -M main
git remote add origin https://github.com/TEN-TAI-KHOAN/giang-duong-so.git
git push -u origin main
```

**4. Đăng lên mạng miễn phí** bằng GitHub Pages: vào kho chứa → `Settings` →
`Pages` → mục `Source` chọn `Deploy from a branch` → chọn nhánh `main`, thư mục
`/ (root)` → `Save`. Vài phút sau trang chạy tại
`https://TEN-TAI-KHOAN.github.io/giang-duong-so/`.

GitHub Pages chỉ chạy được trang tĩnh, đủ cho bản hiện tại. Khi thêm máy chủ và cơ
sở dữ liệu thật, sẽ chuyển sang Vercel hoặc máy chủ của trường.
