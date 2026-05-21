import { Wallet, Calendar, MessageCircle } from 'lucide-react'

export const features = [
  {
    icon: Calendar,
    title: 'Lên lịch trình thông minh',
    description:
      'Thêm điểm đến, tự động tính toán thời gian di chuyển và tối ưu hóa tuyến đường một cách khoa học.',
    color: 'bg-blue-100',
    textColor: 'text-blue-700',
  },
  {
    icon: Wallet,
    title: 'Quản lý chi phí rõ ràng',
    description:
      'Ghi chép mọi khoản chi, tự động chia đều hoặc theo tỷ lệ. Không còn những rắc rối về tiền bạc khi đi chung.',
    color: 'bg-emerald-100',
    textColor: 'text-emerald-700',
  },
  {
    icon: MessageCircle,
    title: 'Trò chuyện & Quyết định nhóm',
    description:
      'Tạo bình chọn, thảo luận địa điểm và đưa ra quyết định nhanh chóng ngay trong ứng dụng.',
    color: 'bg-violet-100',
    textColor: 'text-violet-700',
  },
  {
    icon: Map,
    title: 'Bản đồ tương tác',
    description:
      'Theo dõi trực tiếp vị trí các thành viên trong nhóm, đảm bảo không ai bị lạc trong suốt hành trình.',
    color: 'bg-amber-100',
    textColor: 'text-amber-700',
  },
]

export const steps = [
  {
    num: '01',
    title: 'Tạo nhóm & Mời bạn bè',
    desc: 'Chỉ một cú click để tạo chuyến đi và gửi link mời những người bạn đồng hành.',
  },
  {
    num: '02',
    title: 'Lên ý tưởng & Chốt lịch',
    desc: 'Cùng nhau thêm địa điểm, bình chọn nhà hàng và chốt lịch trình chung.',
  },
  {
    num: '03',
    title: 'Xách ba lô lên và đi',
    desc: 'Mọi thứ đã sẵn sàng. Chỉ việc theo dõi lịch trình trên app và tận hưởng chuyến đi.',
  },
]

export const faqs = [
  {
    value: 'item-1',
    question: 'GoTrip có miễn phí không?',
    answer:
      'Có, GoTrip hoàn toàn miễn phí cho các nhóm du lịch nhỏ dưới 10 người kèm các tính năng cơ bản.',
  },
  {
    value: 'item-2',
    question: 'Tôi có thể sử dụng ngoại tuyến không?',
    answer:
      'Bạn có thể xem lịch trình đã tải xuống khi không có mạng, nhưng để đồng bộ chi phí và chat nhóm cần có kết nối internet.',
  },
  {
    value: 'item-3',
    question: 'Làm sao để chia sẻ hóa đơn với người không có app?',
    answer:
      'GoTrip tạo ra môt đường link web rút gọn chi tiết các khoản nợ của từng người để bạn có thể gửi qua Zalo hoặc Messenger một cách dễ dàng.',
  },
]

export const planedUps = [
  {
    title: 'Kỳ nghỉ trong mơ tại Đảo Koh Phi Phi',
    subtitle: 'LÊN KẾ HOẠCH NGAY',
    img: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Trải nghiệm không khí Havana cổ kính',
    subtitle: 'LÊN KẾ HOẠCH NGAY',
    img: 'https://images.unsplash.com/photo-1503152394-c571994fd383?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Thiên đường Santorini vẫy gọi',
    subtitle: 'LÊN KẾ HOẠCH NGAY',
    img: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Hành trình khám phá văn hóa Hy Lạp',
    subtitle: 'LÊN KẾ HOẠCH NGAY',
    img: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=800',
  },
]

export const timelineTrips = [
  {
    num: '1',
    title: 'Khám phá & Lên ý tưởng',
    desc: "Bắt đầu bằng cách mời nhóm của bạn vào một 'Bảng Ý Tưởng' chung. Mọi người có thể gợi ý điểm đến, nhà hàng và các hoạt động yêu thích. Không còn cảnh 'quên mất mình đã xem cái đó ở đâu'.",
    img: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070&auto=format&fit=crop',
    align: 'left',
  },
  {
    num: '2',
    title: 'Bình chọn & Chốt lịch trình',
    desc: 'Phân vân giữa các lựa chọn? Hệ thống bình chọn tích hợp giúp quyết định của nhóm trở nên nhanh chóng và dân chủ. Chọn ra những gì xuất sắc nhất và xây dựng lịch trình hoàn hảo cùng nhau.',
    img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop',
    align: 'right',
  },
  {
    num: '3',
    title: 'Lên đường & Chia sẻ',
    desc: 'Truy cập lịch trình ngoại tuyến, chia chi phí thời gian thực và lưu trữ mọi thứ ở một nơi duy nhất. Hãy tập trung vào những khoảnh khắc đáng nhớ thay vì lo lắng về hậu cần.',
    img: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop',
    align: 'left',
  },
]
