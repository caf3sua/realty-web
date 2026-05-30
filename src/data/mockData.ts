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
  productType: 'villa' | 'townhouse' | 'apartment' | 'residential'; // biệt thự, liền kề, căn hộ, nhà thổ cư
  productTypeName: string;
  isPremium: boolean; // Masterise, MIK Group...
  developer?: string; // "Masterise Homes", "MIK Group", "Vinhomes", v.v.
  images: string[];
  status: 'Còn hàng' | 'Đã cọc' | 'Đã bán';
  direction: string;
  legal: string;
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

export const mockProjects: Project[] = [
  {
    id: 'proj-1',
    name: 'Vinhomes Ocean Park 1',
    slug: 'ocean-park-1',
    location: 'Gia Lâm, Hà Nội',
    developer: 'Vinhomes',
    shortDescription: 'Thành phố Biển hồ - Nơi mang biển xanh cát trắng vào lòng Hà Nội với hồ nước mặn nhân tạo rộng lớn.',
    description: 'Vinhomes Ocean Park 1 sở hữu đại tiện ích độc đáo gồm Biển hồ nước mặn 6,1ha và Hồ Ngọc Trai cát trắng 24,5ha. Dự án được quy hoạch đồng bộ mang tầm cỡ quốc tế, cung cấp đa dạng dòng sản phẩm từ căn hộ chung cư cao cấp đến các căn biệt thự, liền kề, shophouse đẳng cấp.',
    image: '/images/project-op1.png',
    banner: '/images/project-op1-banner.png',
    status: 'Đã bàn giao',
    scale: '420 ha',
    priceRange: '2.5 tỷ - 120 tỷ',
    tags: ['Biển hồ nhân tạo', 'Hồ nước ngọt lớn', 'Gia Lâm', 'Vinhomes']
  },
  {
    id: 'proj-2',
    name: 'Vinhomes Ocean Park 2',
    slug: 'ocean-park-2',
    location: 'Văn Giang, Hưng Yên',
    developer: 'Vinhomes',
    shortDescription: 'Kinh đô Ánh sáng - Siêu quần thể đô thị biển quy mô 1.000 ha với công viên sóng Royal Wave Park quy mô nhất.',
    description: 'Vinhomes Ocean Park 2 (The Empire) là giai đoạn 2 của siêu quần thể đô thị biển Vinhomes, nổi bật với Tổ hợp công viên Biển tạo sóng nhân tạo Royal Wave Park lớn nhất thế giới (18ha). Dự án bao gồm các phân khu mang phong cách kiến trúc đa dạng từ Pháp, Ý, Địa Trung Hải đến Đông Dương.',
    image: '/images/project-op2.png',
    banner: '/images/project-op2-banner.png',
    status: 'Đang mở bán',
    scale: '458 ha',
    priceRange: '6 tỷ - 150 tỷ',
    tags: ['Công viên sóng', 'Kinh đô ánh sáng', 'Biệt thự tân cổ điển', 'Vinhomes']
  },
  {
    id: 'proj-3',
    name: 'Vinhomes Hạ Long Xanh',
    slug: 'ha-long-xanh',
    location: 'Quảng Yên & Hạ Long, Quảng Ninh',
    developer: 'Vinhomes',
    shortDescription: 'Đại đô thị sinh thái thông minh, vịnh biển kỳ quan của tương lai với quy mô hơn 4.100 ha.',
    description: 'Vinhomes Hạ Long Xanh là siêu dự án phức hợp mang tính biểu tượng tại Quảng Ninh. Tọa lạc tại vị trí vàng kết nối trực tiếp cao tốc Hải Phòng - Hạ Long, dự án tích hợp hệ sinh thái nghỉ dưỡng, sân golf 18 lỗ, công viên chủ đề Safari, bến du thuyền quốc tế và các khu đô thị sinh thái hiện đại bậc nhất châu Á.',
    image: '/images/project-hlx.png',
    banner: '/images/project-hlx-banner.png',
    status: 'Sắp mở bán',
    scale: '4.109 ha',
    priceRange: 'Liên hệ',
    tags: ['Siêu dự án 4100ha', 'Sân Golf', 'Bến du thuyền', 'Kỳ quan tương lai']
  },
  {
    id: 'proj-4',
    name: 'Masteri West Heights',
    slug: 'masteri-west-heights',
    location: 'Tây Mỗ, Nam Từ Liêm, Hà Nội',
    developer: 'Masterise Homes',
    shortDescription: 'Căn hộ wellness cao cấp chuẩn quốc tế tọa lạc tại trung tâm đại đô thị thông minh Smart City.',
    description: 'Masteri West Heights kiến tạo một không gian sống chuẩn wellness đẳng cấp quốc tế tại trung tâm Smart City Hà Nội. Với 4 tòa căn hộ cao cấp sở hữu tầm nhìn trực diện ra hồ trung tâm 4.8ha, dự án mang lại chuỗi 22 tiện ích đặc quyền trong nhà và ngoài trời cực kỳ xa hoa.',
    image: '/images/project-masteri.png',
    banner: '/images/project-masteri-banner.png',
    status: 'Đang mở bán',
    scale: '2.1 ha',
    priceRange: '3.2 tỷ - 9.5 tỷ',
    tags: ['Luxury Apartment', 'Smart City', 'Masterise Homes', 'Căn hộ Wellness']
  },
  {
    id: 'proj-5',
    name: 'The Matrix One',
    slug: 'the-matrix-one',
    location: 'Mễ Trì, Nam Từ Liêm, Hà Nội',
    developer: 'MIK Group',
    shortDescription: 'Tổ hợp căn hộ hạng sang, biểu tượng sống mới tại trung tâm kinh tế - hành chính Mỹ Đình.',
    description: 'The Matrix One là tổ hợp căn hộ siêu sang do MIK Group phát triển. Dự án nằm tại ngã tư Lê Quang Đạo - Mễ Trì, sở hữu tầm nhìn panorama triệu đô hướng ra công viên hồ điều hòa 14ha và đường đua F1 cũ. Dự án mang tiêu chuẩn bàn giao khắt khe nhất thế giới.',
    image: '/images/project-mik.png',
    banner: '/images/project-mik-banner.png',
    status: 'Đã bàn giao',
    scale: '39.8 ha (toàn khu)',
    priceRange: '5.5 tỷ - 25 tỷ',
    tags: ['Căn hộ siêu sang', 'Mỹ Đình', 'MIK Group', 'View công viên 14ha']
  }
];

export const mockProducts: Product[] = [
  {
    id: 'prod-1',
    title: 'Biệt Thự Đơn Lập Ngọc Trai Siêu VIP - View Trực Diện Biển Hồ Ngọc Trai',
    slug: 'biet-thu-don-lap-ngoc-trai-view-bien-ho',
    price: 95.0,
    pricePerSqm: 316.6,
    area: 300,
    bedrooms: 5,
    bathrooms: 6,
    location: 'Phân khu Ngọc Trai, Vinhomes Ocean Park 1',
    description: 'Siêu phẩm biệt thự đơn lập phân khu Ngọc Trai - phân khu khép kín (compound) vip nhất Vinhomes Ocean Park 1. Căn biệt thự sở hữu vị trí góc đắc địa, tầm nhìn trực diện hồ điều hòa cát trắng 24.5ha. Thiết kế kiến trúc Địa Trung Hải phóng khoáng, sang trọng với khoảng sân vườn rộng lớn bao quanh, hầm rượu và bể bơi trong nhà.',
    projectSlug: 'ocean-park-1',
    productType: 'villa',
    productTypeName: 'Biệt thự',
    isPremium: true,
    developer: 'Vinhomes',
    images: ['/images/prop-villa-1.png', '/images/prop-villa-1-int.png'],
    status: 'Còn hàng',
    direction: 'Đông Nam',
    legal: 'Sổ đỏ lâu dài'
  },
  {
    id: 'prod-2',
    title: 'Biệt Thự Song Lập San Hô Kế Cận Công Viên Sóng Royal Wave Park',
    slug: 'biet-thu-song-lap-san-ho-gan-cong-vien-song',
    price: 18.5,
    pricePerSqm: 123.3,
    area: 150,
    bedrooms: 4,
    bathrooms: 5,
    location: 'Phân khu San Hô, Vinhomes Ocean Park 2',
    description: 'Biệt thự song lập hoàn thiện thô phân khu San Hô tại Ocean Park 2. Vị trí vô cùng đắc địa, chỉ vài bước chân là ra tới đại công viên tạo sóng Royal Wave Park 18ha. Thiết kế phong cách Đông Dương (Indochine) độc đáo, tối ưu hóa công năng sử dụng với ban công kính rộng và cửa sổ lớn đón ánh sáng tự nhiên.',
    projectSlug: 'ocean-park-2',
    productType: 'villa',
    productTypeName: 'Biệt thự',
    isPremium: false,
    developer: 'Vinhomes',
    images: ['/images/prop-villa-2.png', '/images/prop-villa-2-int.png'],
    status: 'Còn hàng',
    direction: 'Nam',
    legal: 'Hợp đồng mua bán'
  },
  {
    id: 'prod-3',
    title: 'Căn Hộ Panorama Masteri West Heights - Tòa A View Trọn Hồ Trung Tâm',
    slug: 'can-ho-panorama-masteri-west-heights-toa-a',
    price: 4.8,
    pricePerSqm: 68.5,
    area: 70,
    bedrooms: 2,
    bathrooms: 2,
    location: 'Tòa A Masteri West Heights, Smart City, Hà Nội',
    description: 'Căn hộ 2 phòng ngủ 2 WC đẳng cấp tại dự án Masteri West Heights. Căn hộ ở tầng cao trung bình, sở hữu tầm nhìn trực diện và không góc chết ra hồ điều hòa trung tâm 4.8ha. Bàn giao đầy đủ thiết bị nội thất liền tường cao cấp từ các thương hiệu Kohler, Hafele, Daikin. Chủ sở hữu được tận hưởng bể bơi vô cực trên tầng thượng tòa nhà.',
    projectSlug: 'masteri-west-heights',
    productType: 'apartment',
    productTypeName: 'Căn hộ',
    isPremium: true,
    developer: 'Masterise Homes',
    images: ['/images/prop-apartment-1.png', '/images/prop-apartment-1-int.png'],
    status: 'Còn hàng',
    direction: 'Đông Bắc',
    legal: 'Sổ đỏ lâu dài'
  },
  {
    id: 'prod-4',
    title: 'Căn Hộ Dual-Key Cao Cấp The Matrix One Mỹ Đình - Ban Công Panorama',
    slug: 'can-ho-dual-key-the-matrix-one-my-dinh',
    price: 9.2,
    pricePerSqm: 82.1,
    area: 112,
    bedrooms: 3,
    bathrooms: 3,
    location: 'Tòa B The Matrix One, Mỹ Đình, Hà Nội',
    description: 'Căn hộ Dual-Key độc đáo tại The Matrix One, vừa thích hợp để ở vừa có thể cho thuê tạo dòng tiền ổn định. Thiết kế chia làm 2 lối đi riêng biệt dẫn vào căn studio và căn hộ 2 phòng ngủ. Toàn bộ căn hộ sử dụng kính hộp Triple Low-E chạm sàn cao cấp nhất, ngắm trọn vẹn hồ điều hòa 14ha và công viên Mỹ Đình.',
    projectSlug: 'the-matrix-one',
    productType: 'apartment',
    productTypeName: 'Căn hộ',
    isPremium: true,
    developer: 'MIK Group',
    images: ['/images/prop-apartment-2.png', '/images/prop-apartment-2-int.png'],
    status: 'Đã cọc',
    direction: 'Tây Nam',
    legal: 'Sổ đỏ lâu dài'
  },
  {
    id: 'prod-5',
    title: 'Nhà Phố Liền Kề Sao Biển - Vừa Ở Vừa Kinh Doanh Đắc Địa',
    slug: 'nha-pho-lien-ke-sao-bien-vinhomes-ocean-park-2',
    price: 12.5,
    pricePerSqm: 138.8,
    area: 90,
    bedrooms: 4,
    bathrooms: 5,
    location: 'Phân khu Sao Biển, Vinhomes Ocean Park 2',
    description: 'Nhà phố liền kề / Shophouse phân khu Sao Biển tại Vinhomes Ocean Park 2. Trục đường giao thông chính thông thoáng, thuận tiện kinh doanh dịch vụ ăn uống, thời trang hoặc làm văn phòng đại diện. Thiết kế phong cách Pháp cổ sang trọng 5 tầng, mặt tiền 5m cực thoáng.',
    projectSlug: 'ocean-park-2',
    productType: 'townhouse',
    productTypeName: 'Liền kề',
    isPremium: false,
    developer: 'Vinhomes',
    images: ['/images/prop-townhouse-1.png', '/images/prop-townhouse-1-int.png'],
    status: 'Còn hàng',
    direction: 'Đông Nam',
    legal: 'Sổ đỏ lâu dài'
  },
  {
    id: 'prod-6',
    title: 'Nhà Thổ Cư 5 Tầng Phố Cổ Hà Nội - Gần Hồ Gươm, Tiện Kinh Doanh',
    slug: 'nha-tho-cu-5-tang-pho-co-ha-noi-gan-ho-guom',
    price: 35.0,
    pricePerSqm: 583.3,
    area: 60,
    bedrooms: 4,
    bathrooms: 4,
    location: 'Phố Hàng Bè, Hoàn Kiếm, Hà Nội',
    description: 'Cơ hội sở hữu nhà đất thổ cư sổ đỏ chính chủ ngay trung tâm Phố Cổ Hà Nội, cách Hồ Hoàn Kiếm chỉ 3 phút đi bộ. Căn nhà thiết kế hiện đại 5 tầng chắc chắn, mặt tiền rộng 4.5m nằm tại ngõ nông ô tô đỗ cửa. Phù hợp làm homestay cao cấp cho khách nước ngoài thuê hoặc kinh doanh spa, cà phê boutique.',
    projectSlug: 'ngoai-du-an',
    productType: 'residential',
    productTypeName: 'Nhà thổ cư',
    isPremium: false,
    images: ['/images/prop-townhouse-2.png', '/images/prop-townhouse-2-int.png'],
    status: 'Còn hàng',
    direction: 'Tây',
    legal: 'Sổ đỏ lâu dài'
  },
  {
    id: 'prod-7',
    title: 'Shophouse Địa Trung Hải Phân Khu Cát Tường - Trục Đại Lộ Hạ Long Xanh',
    slug: 'shophouse-cat-tuong-vinhomes-ha-long-xanh',
    price: 15.0, // Dự kiến
    pricePerSqm: 125,
    area: 120,
    bedrooms: 4,
    bathrooms: 5,
    location: 'Phân khu Cát Tường, Vinhomes Hạ Long Xanh, Quảng Ninh',
    description: 'Suất ngoại giao shophouse thương mại phân khu Cát Tường thuộc siêu dự án Vinhomes Hạ Long Xanh. Tọa lạc ngay trên mặt đại lộ kinh tế rộng 60m kết nối toàn khu. Thiết kế phong cách Địa Trung Hải rực rỡ sắc màu, lý tưởng để mở nhà hàng, cửa hàng lưu niệm hoặc văn phòng dịch vụ du lịch.',
    projectSlug: 'ha-long-xanh',
    productType: 'townhouse',
    productTypeName: 'Liền kề',
    isPremium: false,
    developer: 'Vinhomes',
    images: ['/images/prop-townhouse-1.png'],
    status: 'Còn hàng',
    direction: 'Nam',
    legal: 'Hợp đồng mua bán'
  },
  {
    id: 'prod-8',
    title: 'Dinh Thự Hoàng Gia Siêu Sang Mặt Biển Hạ Long Xanh - Kỳ Quan Giữa Lòng Kỳ Quan',
    slug: 'dinh-thu-hoang-gia-mat-bien-ha-long-xanh',
    price: 180.0,
    pricePerSqm: 360,
    area: 500,
    bedrooms: 6,
    bathrooms: 8,
    location: 'Phân khu Vịnh Hoàng Gia, Vinhomes Hạ Long Xanh, Quảng Ninh',
    description: 'Siêu phẩm dinh thự đơn lập trực diện vịnh biển và bến du thuyền quốc tế tại Vinhomes Hạ Long Xanh. Diện tích đất 500m2 với thiết kế tân cổ điển uy nghi hoàng tráng. Sở hữu 3 mặt sân vườn giáp kênh sinh thái lớn và bãi biển riêng nhân tạo. Tiện ích bao gồm rạp chiếu phim gia đình, phòng gym, hầm rượu và bể bơi tràn bờ nước mặn.',
    projectSlug: 'ha-long-xanh',
    productType: 'villa',
    productTypeName: 'Biệt thự',
    isPremium: true,
    developer: 'Vinhomes',
    images: ['/images/ha-long-xanh-hero.png', '/images/prop-villa-1-int.png'],
    status: 'Còn hàng',
    direction: 'Đông Nam',
    legal: 'Sổ đỏ lâu dài'
  }
];

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
