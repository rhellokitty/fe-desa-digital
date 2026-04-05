<script setup>
// import CardList from '@/components/social-assistance-recipient/CardList.vue';
import { storeToRefs } from 'pinia';
import { ref, onMounted, watch } from 'vue';
import { debounce } from 'lodash';
import Pagination from '@/components/ui/Pagination.vue';
import { useSocialAssistanceRecipientStores } from '@/stores/socialAssistanceRecipient';

const socialAssistanceRecipientStore = useSocialAssistanceRecipientStores();
const { socialAssistanceRecipients, meta, loading, error, success } = storeToRefs(socialAssistanceRecipientStore);
const { fetchSocialAssistanceRecipientPaginated } = socialAssistanceRecipientStore;

const serverOptions = ref({
    page: 1,
    row_per_page: 10
});

const filters = ref({
    search: null
});

const fetchData = async () => {
    await fetchSocialAssistanceRecipientPaginated({ ...serverOptions.value, ...filters.value });
};

const debounceFetchData = debounce(fetchData, 500);

onMounted(() => {
    socialAssistanceRecipientStore.$patch({ error: null });
    fetchData();
});

watch(serverOptions, () => {
    fetchData();
}, { deep: true });

watch(filters, () => {
    debounceFetchData();
}, { deep: true });

</script>

<template>
    <div id="Content" class="relative flex flex-col flex-1 gap-6 p-6 pb-[30px] w-full shrink-0">
        <div id="Header" class="flex items-center justify-between">
            <h1 class="font-semibold text-2xl">Pengajuan Bantuan Sosial</h1>
        </div>
        <section id="List-pengajuan-Bansos" class="flex flex-col gap-[14px]">
            <form id="Page-Search" class="flex items-center justify-between">
                <div class="flex flex-col gap-3 w-[370px] shrink-0">
                    <label class="relative group peer w-full valid">
                        <input type="text" placeholder="Cari nama Pengajuan bantuan social"
                            class="appearance-none outline-none w-full h-14 rounded-2xl ring-[1.5px] ring-desa-background focus:ring-desa-black py-4 pl-12 pr-6 gap-2 font-medium placeholder:text-desa-secondary transition-all duration-300">
                        <div class="absolute transform -translate-y-1/2 top-1/2 left-4 flex size-6 shrink-0">
                            <img src="@/assets/images/icons/user-search-secondary-green.svg"
                                class="size-6 hidden group-has-[:placeholder-shown]:flex" alt="icon">
                            <img src="@/assets/images/icons/user-search-black.svg"
                                class="size-6 flex group-has-[:placeholder-shown]:hidden" alt="icon">
                        </div>
                    </label>
                </div>
                <div class="options flex items-center gap-4">
                    <div class="flex items-center gap-[10px]">
                        <span class="font-medium leading-5">Show</span>
                        <div class="relative">
                            <select name="" id=""
                                class="appearance-none outline-none w-full h-14 rounded-2xl ring-[1.5px] ring-desa-background focus:ring-desa-black py-4 px-6 pr-[52px] gap-2 font-medium placeholder:text-desa-secondary transition-all duration-300">
                                <option value="5" selected>5 Entries</option>
                                <option value="10">10 Entries</option>
                                <option value="20">20 Entries</option>
                                <option value="30">30 Entries</option>
                                <option value="40">40 Entries</option>
                                <option value="50">50 Entries</option>
                            </select>
                            <img src="@/assets/images/icons/arrow-down-black.svg"
                                class="flex size-6 shrink-0 absolute transform -translate-y-1/2 top-1/2 right-6"
                                alt="icon">
                        </div>
                    </div>
                    <button type="button"
                        class="flex items-center gap-1 h-14 w-fit rounded-2xl border border-desa-background bg-white py-4 px-6">
                        <img src="@/assets/images/icons/filter-black.svg" class="flex size-6 shrink-0" alt="icon">
                        <span class="font-medium leading-5">Filter</span>
                    </button>
                </div>
            </form>
            <div class="card flex flex-col gap-4 rounded-3xl p-6 bg-white">
                <div class="flex items-center justify-between">
                    <p class="flex items-center gap-1">
                        <img src="@/assets/images/icons/calendar-2-secondary-green.svg"
                            class="flex size-[18px] shrink-0" alt="icon">
                        <span class="font-medium text-sm text-desa-secondary">Tue, 09 Jan 2025</span>
                    </p>
                    <div class="badge rounded-full p-3 gap-2 flex w-[100px] justify-center shrink-0 bg-desa-red">
                        <span class="font-semibold text-xs text-white uppercase">Ditolak</span>
                    </div>
                </div>
                <hr class="border-desa-background">
                <div class="flex items-center w-full">
                    <div class="flex w-[100px] h-20 shrink-0 rounded-2xl overflow-hidden bg-desa-foreshadow">
                        <img src="@/assets/images/thumbnails/kk-bansos-1.png" class="w-full h-full object-cover"
                            alt="photo">
                    </div>
                    <div class="flex flex-col gap-[6px] w-full ml-4 mr-9">
                        <p class="font-semibold text-lg leading-[22.5px] line-clamp-1">Bantuan Untuk Rakyat Kurang Mampu
                        </p>
                        <p class="flex items-center gap-1">
                            <img src="@/assets/images/icons/profile-secondary-green.svg"
                                class="flex size-[18px] shrink-0" alt="icon">
                            <span class="font-medium text-sm text-desa-secondary">PT Shaynakit Meningkatkan
                                Bangsa</span>
                        </p>
                    </div>
                    <div class="flex items-center gap-3">
                        <div class="flex flex-col gap-1 text-right">
                            <p class="font-semibold text-lg leading-5 text-desa-dark-green text-nowrap">Rp120.000.000
                            </p>
                            <p class="font-medium text-sm text-desa-secondary">Uang Tunai</p>
                        </div>
                        <div
                            class="flex size-[52px] rounded-2xl items-center justify-center bg-desa-foreshadow overflow-hidden">
                            <img src="@/assets/images/icons/money-dark-green.svg" class="flex size-6 shrink-0"
                                alt="icon">
                        </div>
                    </div>
                </div>
                <hr class="border-desa-background">
                <div class="flex items-center gap-6 justify-between">
                    <div class="flex items-center gap-3 w-[302px] shrink-0">
                        <div class="flex size-[54px] rounded-full bg-desa-foreshadow overflow-hidden">
                            <img src="@/assets/images/photos/kk-photo-1.png" class="w-full h-full object-cover"
                                alt="icon">
                        </div>
                        <div class="flex flex-col gap-1">
                            <p class="font-semibold text-lg leading-5 text-desa-black">Feri Prio Utomo</p>
                            <p class="flex items-center gap-1">
                                <img src="@/assets/images/icons/briefcase-secondary-green.svg"
                                    class="flex size-[18px] shrink-0" alt="icon">
                                <span class="font-medium text-sm text-desa-secondary">Tukang Bangunan</span>
                            </p>
                        </div>
                    </div>
                    <div class="flex items-center gap-3 w-[302px] shrink-0">
                        <div
                            class="flex size-[52px] rounded-2xl items-center justify-center bg-desa-foreshadow overflow-hidden">
                            <img src="@/assets/images/icons/receive-square-2-dark-green.svg"
                                class="flex size-6 shrink-0" alt="icon">
                        </div>
                        <div class="flex flex-col gap-1">
                            <p class="font-semibold text-lg leading-5 text-desa-dark-green text-nowrap">Rp110.000.000
                            </p>
                            <p class="font-medium text-sm text-desa-secondary">Nominal Pengajuan</p>
                        </div>
                    </div>
                    <div class="flex items-center gap-3 justify-end w-[252px] shrink-0">
                        <a href="kd-pengajuan-bansos-manage.html"
                            class="flex items-center shrink-0 gap-[10px] rounded-2xl py-4 px-6 bg-desa-black">
                            <span class="font-medium text-white">Manage</span>
                        </a>
                    </div>
                </div>
            </div>
            <Pagination :meta="meta" :server-options="serverOptions" />
        </section>
    </div>
</template>