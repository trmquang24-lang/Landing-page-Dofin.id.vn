"""Chạy lại khi giao diện Dofin đổi: cd I:Dofinocal_app rồi ...venvScriptspython.exe "I:Dofin Landingng-cuup_giao_dien.py".

Dựng một bản Dofin hộp cát có dữ liệu MẪU rồi chụp các màn chính cho trang giới thiệu.

Không đụng dữ liệu thật: HopCat chạy máy chủ + CSDL + Chrome riêng trong %TEMP%.
"""
import base64
import io
import json
import shutil
import sys
import time
import urllib.request
import uuid

sys.path.insert(0, r"I:\Dofin\local_app")
from kiem_thu_giao_dien_that import HopCat, ev  # noqa: E402
from PIL import Image  # noqa: E402

RA = r"I:Dofin Landingpublicnh"


def goi(h, phuong_thuc, duong, than=None):
    du = json.dumps(than).encode("utf-8") if than is not None else None
    req = urllib.request.Request(h.goc + duong, data=du, method=phuong_thuc,
                                 headers={"Content-Type": "application/json"})
    try:
        tho = urllib.request.urlopen(req).read()
        return json.loads(tho) if tho else None
    except urllib.error.HTTPError as e:
        print("LOI", phuong_thuc, duong, e.code, e.read()[:200])
        return None


def gui_tep(h, duong, ten, du_lieu, truong="file"):
    bien = uuid.uuid4().hex
    than = (("--%s\r\nContent-Disposition: form-data; name=\"%s\"; filename=\"%s\"\r\n"
             "Content-Type: application/octet-stream\r\n\r\n" % (bien, truong, ten)).encode()
            + du_lieu + ("\r\n--%s--\r\n" % bien).encode())
    req = urllib.request.Request(h.goc + duong, data=than, method="POST",
                                 headers={"Content-Type": "multipart/form-data; boundary=" + bien})
    try:
        return json.loads(urllib.request.urlopen(req).read() or b"null")
    except urllib.error.HTTPError as e:
        print("LOI tep", duong, e.code, e.read()[:200])
        return None


def gui_nhieu(h, duong, tep):
    bien = uuid.uuid4().hex
    than = b""
    for ten, du in tep:
        than += (("--%s\r\nContent-Disposition: form-data; name=\"files\"; filename=\"%s\"\r\n"
                  "Content-Type: text/xml\r\n\r\n" % (bien, ten)).encode() + du + b"\r\n")
    than += ("--%s--\r\n" % bien).encode()
    req = urllib.request.Request(h.goc + duong, data=than, method="POST",
                                 headers={"Content-Type": "multipart/form-data; boundary=" + bien})
    try:
        return json.loads(urllib.request.urlopen(req).read())
    except urllib.error.HTTPError as e:
        print("LOI nhieu", duong, e.code, e.read()[:300])
        return None


MST_TOI = "0316500000"


def hoa_don(so, ngay, ban, mst_ban, mua, mst_mua, hang):
    dong = ""
    tien = 0
    for i, (ten, sl, gia) in enumerate(hang, 1):
        tt = sl * gia
        tien += tt
        dong += ("<HHDVu><STT>%d</STT><THHDVu>%s</THHDVu><DVTinh>Cái</DVTinh><SLuong>%d</SLuong>"
                 "<DGia>%d</DGia><ThTien>%d</ThTien><TSuat>8%%</TSuat></HHDVu>" % (i, ten, sl, gia, tt))
    thue = round(tien * 0.08)
    xml = ("<HDon><DLHDon><TTChung><PBan>2.1.0</PBan><THDon>Hóa đơn giá trị gia tăng</THDon><KHMSHDon>1</KHMSHDon>"
           "<KHHDon>C26TAA</KHHDon><SHDon>%s</SHDon><NLap>%s</NLap><DVTTe>VND</DVTTe></TTChung><NDHDon>"
           "<NBan><Ten>%s</Ten><MST>%s</MST><DChi>TP. Hồ Chí Minh</DChi></NBan>"
           "<NMua><Ten>%s</Ten><MST>%s</MST><DChi>TP. Hồ Chí Minh</DChi></NMua>"
           "<DSHHDVu>%s</DSHHDVu><TToan><TgTCThue>%d</TgTCThue><TgTThue>%d</TgTThue><TgTTTBSo>%d</TgTTTBSo>"
           "</TToan></NDHDon></DLHDon></HDon>" % (so, ngay, ban, mst_ban, mua, mst_mua, dong, tien, thue, tien + thue))
    return xml.encode("utf-8")


def to_khai(ky):
    return ('<HSoThueDTu xmlns="http://kekhaithue.gdt.gov.vn/TKhaiThue"><HSoKhaiThue><TTinChung><TTinTKhaiThue>'
            '<TKhaiThue><maTKhai>842</maTKhai><tenTKhai>Tờ khai thuế giá trị gia tăng (01/GTGT)</tenTKhai>'
            '<loaiTKhai>C</loaiTKhai><KyKKhaiThue><kieuKy>Q</kieuKy><kyKKhai>%s/2026</kyKKhai></KyKKhaiThue>'
            '<ngayLapTKhai>2026-%s</ngayLapTKhai></TKhaiThue><NNT><mst>%s</mst><tenNNT>Công ty TNHH Minh Phát</tenNNT></NNT>'
            '</TTinTKhaiThue></TTinChung><CTieuTKhaiChinh></CTieuTKhaiChinh></HSoKhaiThue></HSoThueDTu>'
            % (ky, {'1': '04-20', '2': '07-20', '3': '10-05'}[ky], MST_TOI)).encode("utf-8")


def chup(cdp, ten):
    for _ in range(3):
        ev(cdp, "document.querySelectorAll('.toast,.toast-container > *').forEach(t=>t.remove())")
        time.sleep(0.3)
    png = base64.b64decode(cdp.call("Page.captureScreenshot", {"format": "png"})["data"])
    anh = Image.open(io.BytesIO(png)).convert("RGB")
    anh.save(RA + "\\" + ten + ".webp", "WEBP", quality=82, method=6)
    print("da chup", ten, anh.size)


h = HopCat()
try:
    import sqlite3
    cn = sqlite3.connect(h.tam / "dofin.db")
    cn.execute("DELETE FROM invoices WHERE fingerprint = 'vt-kt-1'")   # hoá đơn thử do HopCat tự gieo
    cn.commit()
    cn.close()
    goi(h, "PUT", "/api/don-vi", {"ten": "Công ty TNHH Minh Phát", "mst": MST_TOI, "dia_chi": "TP. Hồ Chí Minh"}) \
        or goi(h, "POST", "/api/don-vi", {"ten": "Công ty TNHH Minh Phát", "mst": MST_TOI, "dia_chi": "TP. Hồ Chí Minh"})
    mau = goi(h, "GET", "/api/dossier-templates") or []
    print("mau ho so:", [(m.get("id"), m.get("name") or m.get("ten")) for m in (mau if isinstance(mau, list) else mau.get("items", []))][:8])
    ds_mau = mau if isinstance(mau, list) else mau.get("items", [])
    id_mau = [m["id"] for m in ds_mau]

    doi_tac = {}
    for ten in ["Công ty TNHH Minh An", "Công ty CP Sao Việt", "Vận tải Hòa Bình", "Văn phòng Ngọc Lan",
                "Thiết bị Phúc Thịnh", "Công ty TNHH Lam Sơn"]:
        r = goi(h, "POST", "/api/counterparties", {"name": ten, "party_type": "Doanh nghiệp"})
        doi_tac[ten] = (r or {}).get("id")
    HO_SO = [
        ("Hợp đồng cung cấp vật tư Quý 4", "Công ty TNHH Minh An", 186_400_000, "receivable", "2026-10-15", "Cao"),
        ("Thanh toán đợt 2 thiết bị văn phòng", "Công ty CP Sao Việt", 64_800_000, "payable", "2026-10-09", "Bình thường"),
        ("Dịch vụ vận chuyển tháng 9", "Vận tải Hòa Bình", 12_960_000, "payable", "2026-10-05", "Bình thường"),
        ("Thuê văn phòng năm 2026", "Văn phòng Ngọc Lan", 216_000_000, "payable", "2026-10-20", "Bình thường"),
        ("Mua máy in và mực", "Thiết bị Phúc Thịnh", 18_360_000, "payable", "2026-09-28", "Thấp"),
        ("Hợp đồng bảo trì hệ thống", "Công ty TNHH Lam Sơn", 48_600_000, "receivable", "2026-11-02", "Bình thường"),
    ]
    ho_so = []
    for i, (tieu_de, dt, gia, chieu, han, uu_tien) in enumerate(HO_SO):
        than = {"title": tieu_de, "counterparty_id": doi_tac[dt], "transaction_value": gia, "debt_direction": chieu,
                "due_date": han, "payment_method": "Công nợ", "priority": uu_tien, "start_date": "2026-09-%02d" % (10 + i)}
        than["template_id"] = 1 if chieu == "receivable" else 2
        r = goi(h, "POST", "/api/dossiers", than)
        ho_so.append(r)
    # Gắn tệp vào phần lớn chứng từ để màn hình có tiến độ thật, chừa lại vài chỗ "còn thiếu".
    for k, r in enumerate(ho_so):
        if not r:
            continue
        yc_tra = goi(h, "GET", "/api/dossiers/%d/requirements" % r["id"]) or []
        yeu_cau = yc_tra if isinstance(yc_tra, list) else (yc_tra.get("items") or yc_tra.get("requirements") or [])
        print("ho so", r["id"], "so yeu cau", len(yeu_cau))
        bo = 1 if k in (0, 1) else (0 if k in (4,) else 2)
        for j, yc in enumerate(yeu_cau[:max(0, len(yeu_cau) - bo)]):
            gui_tep(h, "/api/dossiers/%d/requirements/%d/upload" % (r["id"], yc["id"]),
                    "chung-tu-%d-%d.pdf" % (k, j), b"%PDF-1.4\n% mau\n")
    # Hoá đơn mẫu: phần lớn là đầu vào (người bán là đối tác), vài tờ đầu ra.
    hd = [
        hoa_don("00001284", "2026-09-22", "Vận tải Hòa Bình", "0312000001", "Công ty TNHH Minh Phát", MST_TOI,
                [("Cước vận chuyển tháng 9", 1, 12_000_000)]),
        hoa_don("00000917", "2026-09-25", "Thiết bị Phúc Thịnh", "0312000002", "Công ty TNHH Minh Phát", MST_TOI,
                [("Máy in laser", 2, 6_500_000), ("Hộp mực in", 10, 400_000)]),
        hoa_don("00002210", "2026-09-30", "Văn phòng Ngọc Lan", "0312000003", "Công ty TNHH Minh Phát", MST_TOI,
                [("Thuê văn phòng tháng 9", 1, 18_000_000)]),
        hoa_don("00000356", "2026-10-01", "Công ty CP Sao Việt", "0312000004", "Công ty TNHH Minh Phát", MST_TOI,
                [("Bàn làm việc", 6, 4_200_000), ("Ghế xoay", 6, 1_800_000), ("Tủ hồ sơ", 2, 3_000_000)]),
        hoa_don("00000088", "2026-10-02", "Công ty TNHH Minh Phát", MST_TOI, "Công ty TNHH Minh An", "0312000005",
                [("Vật tư điện công nghiệp", 40, 2_150_000), ("Phụ kiện lắp đặt", 1, 6_600_000)]),
        hoa_don("00000089", "2026-10-03", "Công ty TNHH Minh Phát", MST_TOI, "Công ty TNHH Lam Sơn", "0312000006",
                [("Bảo trì hệ thống tháng 10", 1, 15_000_000)]),
        hoa_don("00003391", "2026-10-04", "Điện lực Thành phố", "0312000007", "Công ty TNHH Minh Phát", MST_TOI,
                [("Tiền điện tháng 9", 1, 3_850_000)]),
        hoa_don("00007712", "2026-10-05", "Viễn thông Sài Gòn", "0312000008", "Công ty TNHH Minh Phát", MST_TOI,
                [("Cước internet tháng 10", 1, 990_000)]),
    ]
    print("nhap hoa don:", (gui_nhieu(h, "/api/hoa-don/nhap", [("hd-%d.xml" % i, x) for i, x in enumerate(hd)]) or {}).get("them"))
    print("nhap to khai:", len((gui_nhieu(h, "/api/to-khai/nhap", [("tk-q%d.xml" % q, to_khai(str(q))) for q in (1, 2, 3)]) or {}).get("da_nhap", [])))

    t = h.tab(ghi=False)
    t.call("Emulation.setDeviceMetricsOverride", {"width": 1440, "height": 900, "deviceScaleFactor": 2, "mobile": False})
    t.call("Page.addScriptToEvaluateOnNewDocument",
           {"source": "try{localStorage.setItem('dofin.tour.da-xem','1')}catch(e){}"})
    t.call("Page.navigate", {"url": h.goc + "/"})
    time.sleep(5)
    for man, ten in (("tong-quan", "tong-quan"), ("ho-so", "ho-so"), ("tai-hoa-don", "hoa-don"), ("to-khai", "to-khai")):
        ev(t, "DofinApp.showView('%s')" % man)
        time.sleep(2.5)
        if man == "tai-hoa-don":
            ev(t, "var d=[...document.querySelectorAll('#view-tai-hoa-don a, #view-tai-hoa-don button')].find(x=>x.textContent.includes('Xem lại danh sách')); d && d.click()")
            time.sleep(2.5)
        if man == "ho-so":
            ev(t, "var d=[...document.querySelectorAll('#view-ho-so .table-row, #view-ho-so [data-id]')].find(x=>x.textContent.includes('vật tư Quý 4')); d && d.click()")
            time.sleep(2)
        chup(t, ten)
        ev(t, "document.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape'}))")
        time.sleep(0.5)
finally:
    h.dong()
    time.sleep(1)
    shutil.rmtree(h.tam, ignore_errors=True)
