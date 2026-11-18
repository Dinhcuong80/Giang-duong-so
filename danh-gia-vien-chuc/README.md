# Đánh giá, xếp loại chất lượng viên chức theo quý

Ứng dụng web cho viên chức **Trường Đại học TDTT Bắc Ninh** tự đánh giá, xếp loại chất lượng theo quý — thay cho việc nhập tay vào bộ file Excel nhiều sheet.

Xây dựng theo Thông báo đánh giá, xếp loại chất lượng viên chức Quý IV và năm 2026, gồm các biểu mẫu:

- **Mẫu 2** — Phiếu đánh giá, xếp loại chất lượng viên chức
- **Mẫu 3a-GV** — Bảng theo dõi kết quả thực hiện nhiệm vụ (khối giảng dạy)
- **Mẫu 3b-HC** — Bảng theo dõi kết quả thực hiện nhiệm vụ (khối hành chính)
- **Phụ lục 1–4** — Thang đánh giá mức độ chuyên môn và mức độ khối lượng

## Tính năng

- Nhập thông tin cá nhân **một lần**, dùng cho cả 4 quý.
- Nhập 5 cột số liệu cho mỗi nhiệm vụ: Được giao, Hoàn thành, Mức CM, Mức khối lượng, Đúng tiến độ — phần mềm tự tính toàn bộ điểm còn lại.
- **Gợi ý thang điểm ngay tại ô nhập**: chọn mức 1–5 là hiện mô tả tương ứng trong Phụ lục, không phải tra file riêng.
- Tự tính điểm mục A (× 0,3), mục B (÷ 3 hoặc ÷ 6 × 0,7), tổng điểm và **mức xếp loại**.
- Phân biệt hai diện: viên chức **không giữ chức vụ** (thang B 300 điểm) và **giữ chức vụ lãnh đạo, quản lý** (thang B 600 điểm, có thêm 3 tiêu chí chỉ đạo điều hành).
- Bảng B — Ưu tiên để xét danh hiệu, tự đếm tổng sao ➁ và ➀.
- Tổng hợp 4 quý, trung bình cả năm kèm biểu đồ diễn biến điểm.
- **In / Lưu PDF** đúng khuôn A4 của Mẫu 2 và Mẫu 3, đủ ô ký của viên chức, Trưởng đơn vị, Trưởng phòng TC,PC,TV.
- Sao lưu và phục hồi dữ liệu bằng tệp `.json`.
- Cài được làm **ứng dụng trên điện thoại/máy tính** và **dùng được khi mất mạng**.

## Cách tính điểm

| Chỉ tiêu | Công thức |
|---|---|
| Điểm số lượng | Hoàn thành ÷ Được giao × 100 |
| Điểm chất lượng | (Mức CM + Mức khối lượng) ÷ 10 × 100 |
| Điểm tiến độ | Đúng tiến độ ÷ Được giao × 100 |
| Điểm trung bình mỗi cột | Tổng điểm ÷ n |
| a) Tiêu chí chung | Tổng điểm A × 0,3 — tối đa 30 |
| b) Kết quả nhiệm vụ, không giữ chức vụ | Tổng điểm B ÷ 3 × 0,7 — tối đa 70 |
| b) Kết quả nhiệm vụ, giữ chức vụ | Tổng điểm B ÷ 6 × 0,7 — tối đa 70 |
| **Tổng điểm** | **a + b — tối đa 100** |

Mức xếp loại: **≥ 90** Hoàn thành xuất sắc nhiệm vụ · **90 > TĐ ≥ 70** Hoàn thành tốt nhiệm vụ · **70 > TĐ ≥ 50** Hoàn thành nhiệm vụ · **< 50** Không hoàn thành nhiệm vụ.

### Về chỉ số n

Hướng dẫn mục C.1.a của Mẫu 3 quy định: *“Mỗi một nhiệm vụ/nhiệm vụ thứ cấp được tính vào Tổng số nhiệm vụ được giao (n) khi cột Được giao có đơn vị tính (ví dụ: Dạy 30 tiết; Bắt buộc 1 bài báo khoa học…)”*.

Vì vậy phần mềm **đếm số nhiệm vụ** có giá trị ở cột “Được giao”, không cộng dồn các con số đó. Khi mỗi nhiệm vụ ghi “1” thì kết quả trùng với công thức trong file Excel của trường; cách này còn đúng cả khi ghi “30 tiết” hay “2 bài báo”.

## Về dữ liệu

Số liệu nhập vào được lưu **ngay trong trình duyệt của thiết bị đang dùng** (`localStorage`), **không gửi lên mạng**, không có máy chủ nào nhận dữ liệu. Vì vậy:

- Mỗi người dùng trên máy của mình, dữ liệu không lẫn nhau.
- Xóa dữ liệu trình duyệt hoặc đổi thiết bị thì dữ liệu không còn — hãy bấm **Sao lưu dữ liệu** để tải tệp `.json` giữ làm bản dự phòng.

## Chạy tại máy

Chỉ cần mở `index.html` bằng trình duyệt. Để dùng được tính năng cài ứng dụng và chạy offline thì cần phục vụ qua HTTP:

```bash
python3 -m http.server 8000
# rồi mở http://localhost:8000
```

## Cấu trúc

```
index.html              toàn bộ ứng dụng (HTML + CSS + JavaScript)
manifest.webmanifest    khai báo để cài làm ứng dụng
sw.js                   service worker, cho phép dùng offline
icon.svg, icon-*.png    biểu tượng ứng dụng
```

Không dùng thư viện ngoài, không cần cài đặt, không cần máy chủ.
