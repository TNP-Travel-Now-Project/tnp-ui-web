import { Trip, SummaryStat, TripDetailData } from '@/shared/types'

export const MOCK_TRIPS: Trip[] = [
  {
    id: '1',
    title: 'Hè rực rỡ tại Phú Quốc',
    startDate: '15/07',
    endDate: '20/07/2024',
    location: 'Kiên Giang, Việt Nam',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCQp4tOWqw98pvtvukVGyIh9MOAv7M5l3-XhhLpziTG5ZeL1DVA22dXFx1MZaBkHEBngg7dBqk1ZMZpXp5V76qCUbL0D-DxLu_r_HE1jX5sDVtstVmIJYbbFvPp5VwTNHRVuwbi34cWU3nfVy-Xbtm1IozK0ZbSZ5iKe9GXAbrBfHwuhrxtGWsyDrhFJ0tFvlkJ8zU-F6s1NrxCWMiqZOXHpwHSxR_MuXT78xYQsuX0B6GsrYotDCSBFC0JWejdbWQ38l4PNVogNXkv',
    status: 'active',
    budget: 1200,
    participants: [
      {
        id: '1',
        name: 'User 1',
        avatar:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuC3XKs8jlY3Y1K6LerlVcV5sidXdyVZOq-v49w-GmtZB5cAHAYCqw6Ju0ZyTS1avzmIjwv8HOBff3oFXqVvOk1fzkoiHOV5lWlAslEKL-oq9F9yWOkU4_TDt_dt0bCn1MQ2UakAy_Si2rx_1vqQn2uQyEO8MuPGkqP_ESwsHiliWuIMO4TCdWjMRfgswxZom_FWY3Aji5DzlFrM4Xvr2nJtD2Q9d8Ei6yZpKTvBdr0VlnkBgGBhEp-vx2sMAYu65YN66gegihYqAUNl',
      },
      {
        id: '2',
        name: 'User 2',
        avatar:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuB9fezLG-Ge6etGvPfqn1n02eKQaBA25YqZ17dE9ai0QY_dmbJjnyMmICmCXuNnYuZcMiZA_t81GcxcBL6DmV526WrwKgnZc850QWdtVs7gQOp8jPfe-uwJGMexuQr2U9QmFFqMB7ecResnU24uew4ejxL4UFL0olzdRqG7QTXKeIFvGDk7L2V-zMu2hXim4krSURo9A_7xNLwoMsGpsQlr1y-c7wv6sSZTc2awN6HZju--0XgxVAcPX_Mm-btleJGBgXhs4Kh8Bip6',
      },
      {
        id: '3',
        name: 'User 3',
        avatar:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuDjJ8sMnFVbzSjsDyTGHViDmOHhzDjnYVwlpf8yffUhfF3aefQGylIChIHG74zCnGy2YWNi8LpOdM3TVZ_HJ49u-MtEVoFqZ8jiNBvz-784FdAKaPyFGvRZUl45g_Ltw8BS90eYQluFJ1dBPfJldgAonVkUo4EjVG9olBJfWXZ2ZFbRAAv-rX1ynMrKaiZP2Jeg83LRo5a6rGIsFzCbx0rWuAXeZ5dM_BcxPRdxxRD-GsTS4YiVBjAsSXTAg3zAY48L7GtfVCYrT3ly',
      },
      {
        id: '4',
        name: 'User 4',
        avatar:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuDjJ8sMnFVbzSjsDyTGHViDmOHhzDjnYVwlpf8yffUhfF3aefQGylIChIHG74zCnGy2YWNi8LpOdM3TVZ_HJ49u-MtEVoFqZ8jiNBvz-784FdAKaPyFGvRZUl45g_Ltw8BS90eYQluFJ1dBPfJldgAonVkUo4EjVG9olBJfWXZ2ZFbRAAv-rX1ynMrKaiZP2Jeg83LRo5a6rGIsFzCbx0rWuAXeZ5dM_BcxPRdxxRD-GsTS4YiVBjAsSXTAg3zAY48L7GtfVCYrT3ly',
      },
      {
        id: '5',
        name: 'User 5',
        avatar:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuDjJ8sMnFVbzSjsDyTGHViDmOHhzDjnYVwlpf8yffUhfF3aefQGylIChIHG74zCnGy2YWNi8LpOdM3TVZ_HJ49u-MtEVoFqZ8jiNBvz-784FdAKaPyFGvRZUl45g_Ltw8BS90eYQluFJ1dBPfJldgAonVkUo4EjVG9olBJfWXZ2ZFbRAAv-rX1ynMrKaiZP2Jeg83LRo5a6rGIsFzCbx0rWuAXeZ5dM_BcxPRdxxRD-GsTS4YiVBjAsSXTAg3zAY48L7GtfVCYrT3ly',
      },
    ],
  },
  {
    id: '2',
    title: 'Mùa thu Kyoto mộng mơ',
    startDate: '10/11',
    endDate: '18/11/2024',
    location: 'Kyoto, Nhật Bản',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCh2GICk7spKyiNfcMTu7GdvhGbQ-dLIfvyVRyA47-sGBPkXHIdsnV_vRL31d2DhQI0UBWaoiqc5ShP10bMWvQeLHFw8XMo1g1UAevpX3dU1TAM06pEZmLV4Z5cHEunxu23Au_KFwLtWZmzAo5RitzJrG_55due6Cs9ByHfBw7JvyQgxIlVHfbO6xWtfps3cop1HO9R_uH5nOlLaef8fwPVQq7lRnbhmZ0srue0eL53G7wDd8rwLWf486KMNNK3AuLmWnqdzjIRU1Nr',
    status: 'planning',
    budget: 3500,
    participants: [
      {
        id: '6',
        name: 'User 6',
        avatar:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuAV-4JCjbm0sEzMYF3iU5VpSq1coGAxpjAbSUlk-lhjsmRrYAzDL5m7lv_JLk70HdJgNScT7CLMQlMhbQGmrk1QUjXofjXKM3UXogAT5NTUEJ-bW9GHVk4fwszjq145HpuhesjASiQrzNw1wm8Kf0RDMG7lVTeIDRo1mazj9dDpyC60DJhu4HegRH4q8M3s6nwqKchS-n-Nm_bdU02wPTNlPhNkco3RRwUFHOEyeNkOm0jLh1dHgl69vIpS4bLF8S659OcJVD88Syc7',
      },
      {
        id: '7',
        name: 'User 7',
        avatar:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuB3QMl36KWVjUtcRSLJ8MY71PRMEc1H32fq3-vEHp8U-aOpVfv0k_cTK4oAnh0St1IwurM5R5getW7cvqA-3bKwbZ6gkSilegVpbHk1B8KdADm_Ro1glSYDZ5T2XaJ5rCCHs60SXvKDeie1XGD7FkxLgPVAGzUOtGznUVRrkNwnB1kS4ldhldgrzr8VHgY2sr99iwB1eVFdpXlhd_RDBQQx6gMni2hpU_LRHaQz-umAufeuq0SKkSJXB1ix0Yv9es7qJP0e6pPrW37p',
      },
      {
        id: '8',
        name: 'User 8',
        avatar:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuB3QMl36KWVjUtcRSLJ8MY71PRMEc1H32fq3-vEHp8U-aOpVfv0k_cTK4oAnh0St1IwurM5R5getW7cvqA-3bKwbZ6gkSilegVpbHk1B8KdADm_Ro1glSYDZ5T2XaJ5rCCHs60SXvKDeie1XGD7FkxLgPVAGzUOtGznUVRrkNwnB1kS4ldhldgrzr8VHgY2sr99iwB1eVFdpXlhd_RDBQQx6gMni2hpU_LRHaQz-umAufeuq0SKkSJXB1ix0Yv9es7qJP0e6pPrW37p',
      },
    ],
  },
]

export const MOCK_DETAIL: TripDetailData = {
  id: '1',
  title: 'Hè rực rỡ tại Phú Quốc',
  startDate: '15/07',
  endDate: '20/07/2024',
  location: 'Kiên Giang, Việt Nam',
  image:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCQp4tOWqw98pvtvukVGyIh9MOAv7M5l3-XhhLpziTG5ZeL1DVA22dXFx1MZaBkHEBngg7dBqk1ZMZpXp5V76qCUbL0D-DxLu_r_HE1jX5sDVtstVmIJYbbFvPp5VwTNHRVuwbi34cWU3nfVy-Xbtm1IozK0ZbSZ5iKe9GXAbrBfHwuhrxtGWsyDrhFJ0tFvlkJ8zU-F6s1NrxCWMiqZOXHpwHSxR_MuXT78xYQsuX0B6GsrYotDCSBFC0JWejdbWQ38l4PNVogNXkv',
  status: 'active',
  budget: 12000000,
  totalSpent: '15.400.000đ',
  budgetLimit: '25.000.000đ',
  personalBalance: '-1.250.000đ',
  nextActivity: 'Ăn tối hải sản',
  participants: [
    {
      id: '1',
      name: 'Linh Nguyễn',
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuC3XKs8jlY3Y1K6LerlVcV5sidXdyVZOq-v49w-GmtZB5cAHAYCqw6Ju0ZyTS1avzmIjwv8HOBff3oFXqVvOk1fzkoiHOV5lWlAslEKL-oq9F9yWOkU4_TDt_dt0bCn1MQ2UakAy_Si2rx_1vqQn2uQyEO8MuPGkqP_ESwsHiliWuIMO4TCdWjMRfgswxZom_FWY3Aji5DzlFrM4Xvr2nJtD2Q9d8Ei6yZpKTvBdr0VlnkBgGBhEp-vx2sMAYu65YN66gegihYqAUNl',
    },
    {
      id: '2',
      name: 'Hoàng Nam',
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuB9fezLG-Ge6etGvPfqn1n02eKQaBA25YqZ17dE9ai0QY_dmbJjnyMmICmCXuNnYuZcMiZA_t81GcxcBL6DmV526WrwKgnZc850QWdtVs7gQOp8jPfe-uwJGMexuQr2U9QmFFqMB7ecResnU24uew4ejxL4UFL0olzdRqG7QTXKeIFvGDk7L2V-zMu2hXim4krSURo9A_7xNLwoMsGpsQlr1y-c7wv6sSZTc2awN6HZju--0XgxVAcPX_Mm-btleJGBgXhs4Kh8Bip6',
    },
    {
      id: '3',
      name: 'Minh Đức',
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDjJ8sMnFVbzSjsDyTGHViDmOHhzDjnYVwlpf8yffUhfF3aefQGylIChIHG74zCnGy2YWNi8LpOdM3TVZ_HJ49u-MtEVoFqZ8jiNBvz-784FdAKaPyFGvRZUl45g_Ltw8BS90eYQluFJ1dBPfJldgAonVkUo4EjVG9olBJfWXZ2ZFbRAAv-rX1ynMrKaiZP2Jeg83LRo5a6rGIsFzCbx0rWuAXeZ5dM_BcxPRdxxRD-GsTS4YiVBjAsSXTAg3zAY48L7GtfVCYrT3ly',
    },
  ],
  activities: [
    {
      id: 'a1',
      user: {
        id: '1',
        name: 'Linh Nguyễn',
        avatar:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuC3XKs8jlY3Y1K6LerlVcV5sidXdyVZOq-v49w-GmtZB5cAHAYCqw6Ju0ZyTS1avzmIjwv8HOBff3oFXqVvOk1fzkoiHOV5lWlAslEKL-oq9F9yWOkU4_TDt_dt0bCn1MQ2UakAy_Si2rx_1vqQn2uQyEO8MuPGkqP_ESwsHiliWuIMO4TCdWjMRfgswxZom_FWY3Aji5DzlFrM4Xvr2nJtD2Q9d8Ei6yZpKTvBdr0VlnkBgGBhEp-vx2sMAYu65YN66gegihYqAUNl',
      },
      type: 'expense',
      description: 'đã thêm chi phí',
      target: 'Vé cáp treo Hòn Thơm',
      timestamp: '10 phút trước',
      amount: '3.200.000đ',
      attachment: 'Hoa-don-cap-treo.jpg',
    },
    {
      id: 'a2',
      user: {
        id: '2',
        name: 'Hoàng Nam',
        avatar:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuB9fezLG-Ge6etGvPfqn1n02eKQaBA25YqZ17dE9ai0QY_dmbJjnyMmICmCXuNnYuZcMiZA_t81GcxcBL6DmV526WrwKgnZc850QWdtVs7gQOp8jPfe-uwJGMexuQr2U9QmFFqMB7ecResnU24uew4ejxL4UFL0olzdRqG7QTXKeIFvGDk7L2V-zMu2hXim4krSURo9A_7xNLwoMsGpsQlr1y-c7wv6sSZTc2awN6HZju--0XgxVAcPX_Mm-btleJGBgXhs4Kh8Bip6',
      },
      type: 'schedule',
      description: 'đã cập nhật lịch trình',
      target: 'Ngày 3',
      timestamp: '2 giờ trước',
      attachment: 'Thay đổi nhà hàng ăn tối sang On The Rocks để ngắm hoàng hôn đẹp hơn.',
    },
    {
      id: 'a3',
      user: {
        id: '3',
        name: 'Minh Đức',
        avatar:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuDjJ8sMnFVbzSjsDyTGHViDmOHhzDjnYVwlpf8yffUhfF3aefQGylIChIHG74zCnGy2YWNi8LpOdM3TVZ_HJ49u-MtEVoFqZ8jiNBvz-784FdAKaPyFGvRZUl45g_Ltw8BS90eYQluFJ1dBPfJldgAonVkUo4EjVG9olBJfWXZ2ZFbRAAv-rX1ynMrKaiZP2Jeg83LRo5a6rGIsFzCbx0rWuAXeZ5dM_BcxPRdxxRD-GsTS4YiVBjAsSXTAg3zAY48L7GtfVCYrT3ly',
      },
      type: 'member',
      description: 'đã mời Thu Hà tham gia nhóm',
      timestamp: '5 giờ trước',
    },
  ],
}

export const SUMMARY_STATS: SummaryStat[] = [
  {
    label: 'Tổng ngân sách năm',
    value: '$5,400',
    change: '12% so với 2023',
    changeType: 'negative',
    icon: 'trending',
  },
  {
    label: 'Chuyến đi hoàn thành',
    value: '12',
    change: 'Mục tiêu đạt 80%',
    changeType: 'positive',
    icon: 'check',
  },
  {
    label: 'Bạn đồng hành',
    value: '24',
    change: 'Tăng 4 tháng này',
    changeType: 'neutral',
    icon: 'users',
  },
  {
    label: 'Điểm tích lũy',
    value: '1,250',
    change: 'Thành viên Vàng',
    changeType: 'positive',
    icon: 'star',
  },
]


