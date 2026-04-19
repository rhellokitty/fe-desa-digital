<script setup>
import SidebarItem from "./SidebarItem.vue";

import iconChartInactive from "@/assets/images/icons/chart-square-secondary-green.svg";
import iconChartActive from "@/assets/images/icons/chart-square-dark-green.svg";

import iconCrownActive from "@/assets/images/icons/crown-dark-green.svg";
import iconCrownInactive from "@/assets/images/icons/crown-secondary-green.svg";

import iconBagInactive from "@/assets/images/icons/bag-2-secondary-green.svg";
import iconBagActive from "@/assets/images/icons/bag-2-dark-green.svg";

import iconCalendarActive from "@/assets/images/icons/calendar-2-dark-green.svg";
import iconCalendarInactive from "@/assets/images/icons/calendar-2-secondary-green.svg";
import iconBuildingActive from "@/assets/images/icons/building-4-secondary-green.svg";
import iconBuildingInactive from "@/assets/images/icons/building-4-dark-green.svg";

const SidebarItems = [
  {
    label: "Dashboard",
    path: "/",
    iconActive: iconChartActive,
    iconInactive: iconChartInactive,
  },
  {
    label: "Kepala Rumah",
    path: "/head-of-family",
    iconActive: iconCrownActive,
    iconInactive: iconCrownInactive,
  },
  {
    label: "Bantuan Sosial",
    path: "",
    iconActive: iconBagActive,
    iconInactive: iconBagInactive,
    children: [
      {
        label: "List Bansos",
        path: "/social-assistance",
      }, {
        label: "Pengajuan Bansos",
        path: "/social-assistance-recipient"
      }
    ],
  }, {
    label: "Jadwal Desa",
    path: "",
    iconActive: iconCalendarActive,
    iconInactive: iconCalendarInactive,
    children: [
      {
        label: "Pembangunan",
        path: "/development",
      }, {
        label: "Events Desa",
        path: "/event"
      }
    ],
  }, {
    label: "Profile Desa",
    path: "/profile",
    iconActive: iconBuildingActive,
    iconInactive: iconBuildingInactive,
  }
];
</script>

<template>
  <aside id="Sidebar"
    class="relative flex w-[280px] shrink-0 min-h-screen bg-white border-r border-desa-foreshadow overflow-hidden">
    <div class="fixed top-0 h-full w-[280px] flex shrink-0 flex-1 z-20 bg-white">
      <div class="flex flex-col h-full w-full gap-6 pt-[30px] px-6">
        <div class="flex items-center justify-between">
          <img src="@/assets/images/logos/logo-text.svg" class="flex h-[30px] shrink-0" alt="logo" />
          <button
            class="flex size-11 items-center justify-center rounded-2xl border border-desa-background hover:border-desa-secondary transition-setup">
            <img src="@/assets/images/icons/menu-secondary-green.svg" class="size-6" alt="icon" />
          </button>
        </div>
        <div class="flex flex-col flex-1 gap-6 overflow-y-scroll hide-scrollbar">
          <nav class="flex flex-col gap-2 pb-12">
            <p class="font-medium text-sm text-desa-secondary">Main Menu</p>
            <ul class="flex flex-col gap-2">
              <SidebarItem v-for="(item, index) in SidebarItems" :key="index" :item="item" />
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </aside>
</template>
