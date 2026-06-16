export interface Amenity {
  id: string;
  name: string;
  product_type: 'all' | 'apartment' | 'villa' | 'townhouse' | 'shophouse';
  icon?: string;
  is_active: boolean;
}

export interface Project {
  id: string;
  name: string;
  slug: string;
  location: string;
  developer: string;
  description: string;
  shortDescription: string;
  image: string;
  banner: string;
  status: 'Đang mở bán' | 'Sắp mở bán' | 'Đã bàn giao';
  scale: string;
  priceRange: string;
  tags: string[];
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  price: number; // Tỷ VNĐ
  pricePerSqm?: number; // Triệu/m2
  area: number; // m2
  bedrooms: number;
  bathrooms: number;
  location: string;
  description: string;
  projectSlug: string; // "ocean-park-1", "ocean-park-2", "ha-long-xanh", "ngoai-du-an"
  productType: 'villa' | 'townhouse' | 'apartment' | 'residential' | 'shophouse'; // Nhà ở ngay, Nhà sắp nhận, biệt thự, liền kề, căn hộ, nhà thổ cư
  productTypeName: string;
  isPremium: boolean; // Masterise, MIK Group...
  developer?: string; // "Masterise Homes", "MIK Group", "Vinhomes", v.v.
  images: string[];
  status: 'Còn hàng' | 'Đã cọc' | 'Đã bán' | 'Đang bán' | 'Sắp mở bán';
  direction: string;
  legal: string;
  amenities?: { id: string; name: string; icon?: string; }[];
}

export interface NewsPost {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  image: string;
  publishedAt: string;
  category: 'Thị trường' | 'Quy hoạch' | 'Cẩm nang' | 'Dự án';
}

export interface Developer {
  id: string;
  name: string;
  logo: string;
  title: string;
  description: string;
  slug: string;
  linkText: string;
}

export const mockNews: NewsPost[] = [
  {
    id: 'news-1',
    title: 'Bất Động Sản Ven Biển Quảng Ninh Bứt Phá Nhờ Đòn Bẩy Hạ Tầng',
    slug: 'bat-dong-san-ven-bien-quang-ninh-but-pha-ha-tang',
    summary: 'Với việc hoàn thiện các tuyến cao tốc kết nối cùng dự án Hạ Long Xanh được đẩy mạnh triển khai, thị trường địa ốc Quảng Ninh đang trở thành thỏi nam châm thu hút dòng vốn đầu tư.',
    content: '<p>Thị trường bất động sản Quảng Ninh liên tục ghi nhận những tín hiệu tích cực trong thời gian qua. Động lực chính đến từ việc hoàn thiện đồng bộ hạ tầng giao thông kết nối liên vùng như cao tốc Hà Nội - Hải Phòng - Hạ Long - Vân Đồn - Móng Cái, sân bay quốc tế Vân Đồn và cảng tàu khách quốc tế Hạ Long.</p><p>Đặc biệt, siêu dự án Vinhomes Hạ Long Xanh quy mô lớn tại trục kinh tế ven biển Quảng Yên - Hạ Long khởi công xây dựng đã thổi một luồng sinh khí mới vào toàn khu vực. Giới chuyên gia nhận định, phân khúc biệt thự nghỉ dưỡng, shophouse thương mại ven biển sẽ là điểm sáng đầu tư trung và dài hạn nhờ khai thác tối đa tiềm năng du lịch 4 mùa của địa phương.</p>',
    image: '/images/ha-long-xanh-hero.png',
    publishedAt: '2026-05-25',
    category: 'Thị trường'
  },
  {
    id: 'news-2',
    title: 'Bí Quyết Mua Căn Hộ Chung Cư Cao Cấp Tránh Rủi Ro Pháp Lý',
    slug: 'bi-quyet-mua-can-ho-chung-cu-cao-cap-tranh-rui-ro-phap-ly',
    summary: 'Để không rơi vào cảnh "tiền mất tật mang", người mua nhà cần xem xét kỹ lưỡng hồ sơ pháp lý dự án, uy tín chủ đầu tư và các điều khoản trong hợp đồng mua bán.',
    content: '<p>Mua chung cư cao cấp là giao dịch có giá trị lớn, đòi hỏi khách hàng phải cực kỳ tỉnh táo trước khi đặt bút ký hợp đồng. Dưới đây là những lưu ý quan trọng để đảm bảo an toàn tài chính:</p><ul><li>Kiểm tra giấy phép xây dựng, quyết định giao đất và quy hoạch chi tiết 1/500 của dự án.</li><li>Kiểm tra văn bản chấp thuận đủ điều kiện bán nhà ở hình thành trong tương lai của Sở Xây dựng sở tại.</li><li>Tìm hiểu năng lực tài chính và uy tín của chủ đầu tư thông qua các dự án đã bàn giao trước đó (ví dụ như Vinhomes, Masterise Homes với tiến độ ra sổ nhanh chóng).</li><li>Đọc kỹ chính sách bảo lãnh ngân hàng cho dự án.</li></ul>',
    image: '/images/project-masteri.png',
    publishedAt: '2026-05-18',
    category: 'Cẩm nang'
  },
  {
    id: 'news-3',
    title: 'Bản Đồ Quy Hoạch Đô Thị Vệ Tinh Phía Đông Hà Nội Có Gì Mới?',
    slug: 'ban-do-quy-hoach-do-thi-ve-tinh-phia-dong-ha-noi',
    summary: 'Quy hoạch xây dựng thủ đô Hà Nội định hướng Gia Lâm và Văn Giang (Hưng Yên) trở thành những trung tâm đô thị sinh thái, tri thức hiện đại bậc nhất vùng thủ đô.',
    content: '<p>Khu vực phía Đông Hà Nội đang thay đổi diện mạo nhanh chóng từng ngày. Với chiến lược "đa cực" trong phát triển không gian thủ đô, trục phía Đông với tâm điểm Gia Lâm và khu vực giáp ranh Văn Giang (Hưng Yên) được quy hoạch là cực tăng trưởng kinh tế mới.</p><p>Sự xuất hiện của các đại đô thị tỷ đô như Vinhomes Ocean Park 1, 2 và sắp tới là các dự án hạ tầng cầu vượt sông Hồng (cầu Trần Hưng Đạo, cầu Giang Biên) sẽ thu hút hàng chục vạn cư dân dịch chuyển từ nội đô cũ ra ngoài, biến nơi đây thành khu vực sầm uất bậc nhất phía Bắc.</p>',
    image: '/images/project-op1-banner.png',
    publishedAt: '2026-05-12',
    category: 'Quy hoạch'
  }
];
