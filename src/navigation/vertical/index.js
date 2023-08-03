import {
  mdiViewDashboard, mdiAccount, mdiAccountGroup, mdiAccountCog, mdiCalendarText, mdiHeart, mdiNaturePeople,
  mdiPackage, mdiForum, mdiTagHeart, mdiTicketAccount, mdiFileDocument, mdiApps, mdiClipboardFlow,
} from '@mdi/js'

export default [
  {
    title: 'Dashboard',
    icon: mdiViewDashboard,
    to: 'dashboard',
  },
  {
    subheader: 'Manajemen',
  },
  {
    title: 'Pelanggan',
    icon: mdiHeart,
    to: 'customers',
  },
  {
    title: 'Produk',
    icon: mdiPackage,
    to: 'products',
  },
  {
    title: 'Chat',
    icon: mdiForum,
    to: 'chats',
  },
  {
    title: 'Prospek',
    icon: mdiTagHeart,
    to: 'prospects',
  },
  {
    title: 'Tiket & Keluhan',
    icon: mdiTicketAccount,
    to: 'tickets',
  },
  {
    title: 'Laporan',
    icon: mdiFileDocument,
    to: 'reports',
  },
  {
    subheader: 'Ekstra',
  },
  {
    title: 'Integrasi',
    icon: mdiApps,
    to: 'integrations',
  },
  {
    title: 'Marketing',
    icon: mdiNaturePeople,
    to: 'marketings',
  },
  {
    title: 'Workflow',
    icon: mdiClipboardFlow,
    to: 'workflows',
  },
  {
    subheader: 'Personal',
  },
  {
    title: 'Aktivitas',
    icon: mdiCalendarText,
    to: 'activities',
  },
  {
    subheader: 'Administrator',
  },
  {
    title: 'Pengguna',
    icon: mdiAccount,
    to: 'users',
  },
  {
    title: 'Tim',
    icon: mdiAccountGroup,
    to: 'teams',
  },
  {
    title: 'Pengaturan',
    icon: mdiAccountCog,
    to: 'corporationsetting',
  },
]
