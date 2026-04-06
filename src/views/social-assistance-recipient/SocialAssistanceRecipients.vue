<script setup>
import { formatRupiah } from '@/helpers/format';
import { useSocialAssistanceRecipientStores } from '@/stores/socialAssistanceRecipient';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { formatToClientTimeZone } from '@/helpers/format';

const route = useRoute()
const router = useRouter()

const socialAssistance = ref({});

const socialAssistanceRecipientStore = useSocialAssistanceRecipientStores();
const { loading, error, success } = storeToRefs(socialAssistanceRecipientStore)
const { fetchSocialAssistanceRecipient } = socialAssistanceRecipientStore

const fetchData = async () => {
    const response = await fetchSocialAssistanceRecipient(route.params.id)
    socialAssistance.value = response
}

onMounted(fetchData);
</script>

<template>
    <div id="Header" class="flex items-center justify-between">
        <div class="flex flex-col gap-2">
            <div class="flex gap-1 items-center leading-5 text-desa-secondary">
                <p class="last-of-type:text-desa-dark-green last-of-type:font-semibold capitalize ">Pengajuan Bantuan
                    sosial</p>
                <span>/</span>
                <p class="last-of-type:text-desa-dark-green last-of-type:font-semibold capitalize ">penyetujuan bansos
                </p>
            </div>
            <h1 class="font-semibold text-2xl">Penyetujuan Bansos </h1>
        </div>
    </div>
    <div class="flex gap-[14px]">
        <section id="Detail"
            class="flex flex-col shrink-0 w-[calc(545/1000*100%)] h-fit rounded-3xl p-6 gap-6 bg-white">
            <p class="font-medium leading-5 text-desa-secondary">Detail Bantuan Sosial</p>
            <div class="flex items-center justify-between gap-4">
                <div class="flex w-[120px] h-[100px] shrink-0 rounded-2xl overflow-hidden bg-desa-foreshadow">
                    <img src="@/assets/images/thumbnails/kk-bansos-1.png" class="w-full h-full object-cover"
                        alt="photo">
                </div>
                <div class="badge rounded-full p-3 gap-2 flex w-[100px] justify-center shrink-0 bg-desa-yellow">
                    <span class="font-semibold text-xs text-white uppercase">Menunggu</span>
                </div>
            </div>
            <div class="flex flex-col gap-[6px] w-full">
                <p class="font-semibold text-xl line-clamp-1">Bantuan Untuk Rakyat Kurang Mampu</p>
                <p class="flex items-center gap-1">
                    <img src="@/assets/images/icons/profile-secondary-green.svg" class="flex size-[18px] shrink-0"
                        alt="icon">
                    <span class="font-medium text-sm text-desa-secondary">PT Shaynakit Meningkatkan Bangsa</span>
                </p>
            </div>
            <hr class="border-desa-foreshadow">
            <div class="flex items-center w-full gap-3">
                <div class="flex size-[52px] shrink-0 rounded-2xl bg-desa-foreshadow items-center justify-center">
                    <img src="@/assets/images/icons/money-dark-green.svg" class="flex size-6 shrink-0" alt="icon">
                </div>
                <div class="flex flex-col gap-1 w-full">
                    <p class="font-semibold text-lg leading-[22.5px] text-desa-dark-green">Rp120.000.000</p>
                    <span class="font-medium text-desa-secondary">
                        Uang Tunai
                    </span>
                </div>
            </div>
            <hr class="border-desa-foreshadow">
            <div class="flex items-center w-full gap-3">
                <div class="flex size-[52px] shrink-0 rounded-2xl bg-desa-red/10 items-center justify-center">
                    <img src="@/assets/images/icons/minus-square-red.svg" class="flex size-6 shrink-0" alt="icon">
                </div>
                <div class="flex flex-col gap-1 w-full">
                    <p class="font-semibold text-lg leading-[22.5px] text-desa-red">Rp92.000.000</p>
                    <span class="font-medium text-desa-secondary">
                        Sisa Bansos
                    </span>
                </div>
            </div>
            <hr class="border-desa-foreshadow">
            <div class="flex items-center w-full gap-3">
                <div class="flex size-[52px] shrink-0 rounded-2xl bg-desa-blue/10 items-center justify-center">
                    <img src="@/assets/images/icons/profile-2user-blue.svg" class="flex size-6 shrink-0" alt="icon">
                </div>
                <div class="flex flex-col gap-1 w-full">
                    <p class="font-semibold text-lg leading-[22.5px] text-desa-blue">15.600 Warga</p>
                    <span class="font-medium text-desa-secondary">
                        Total Pengajuan
                    </span>
                </div>
            </div>
            <hr class="border-desa-foreshadow">
            <div class="flex flex-col gap-3">
                <p class="font-medium text-sm text-desa-secondary">Tentang Bantuan</p>
                <p class="font-medium leading-8">Program Bantuan Sosial ini hadir untuk memberikan dukungan nyata bagi
                    masyarakat yang membutuhkan. Kami berkomitmen membantu memenuhi kebutuhan dasar seperti pangan,
                    kesehatan, dan pendidikan, demi meningkatkan kualitas hidup. Dengan semangat gotong royong, kami
                    mengajak semua pihak untuk bersama-sama menciptakan perubahan positif.</p>
            </div>
        </section>
        <section class="flex flex-col flex-1 h-fit shrink-0 rounded-3xl p-6 gap-6 bg-white">
            <p class="font-medium leading-5 text-desa-secondary">Detail Pengajuan</p>
            <div class="flex items-center gap-3 w-[302px] shrink-0">
                <div class="flex size-[54px] rounded-full bg-desa-foreshadow overflow-hidden">
                    <img src="@/assets/images/photos/kk-photo-1.png" class="w-full h-full object-cover" alt="icon">
                </div>
                <div class="flex flex-col gap-1">
                    <p class="font-semibold text-lg leading-5 text-desa-black">Feri Prio Utomo</p>
                    <p class="flex items-center gap-1">
                        <img src="@/assets/images/icons/briefcase-secondary-green.svg" class="flex size-[18px] shrink-0"
                            alt="icon">
                        <span class="font-medium text-sm text-desa-secondary">Tukang Bangunan</span>
                    </p>
                </div>
            </div>
            <hr class="border-desa-background">
            <div class="flex items-center gap-3 w-[302px] shrink-0">
                <div
                    class="flex size-[52px] rounded-2xl items-center justify-center bg-desa-foreshadow overflow-hidden">
                    <img src="@/assets/images/icons/profile-2user-dark-green.svg" class="flex size-6 shrink-0"
                        alt="icon">
                </div>
                <div class="flex flex-col gap-1">
                    <p class="font-semibold text-lg leading-5">6 Anggota</p>
                    <p class="font-medium text-sm text-desa-secondary">Total Keluarga</p>
                </div>
            </div>
            <hr class="border-desa-background">
            <div class="flex items-center gap-3 w-[302px] shrink-0">
                <div
                    class="flex size-[52px] rounded-2xl items-center justify-center bg-desa-foreshadow overflow-hidden">
                    <img src="@/assets/images/icons/keyboard-dark-green.svg" class="flex size-6 shrink-0" alt="icon">
                </div>
                <div class="flex flex-col gap-1">
                    <p class="font-semibold text-lg leading-5">30183910948390193</p>
                    <p class="font-medium text-sm text-desa-secondary">30183910948390193</p>
                </div>
            </div>
            <hr class="border-desa-background">
            <div class="flex items-center gap-3 w-[302px] shrink-0">
                <div
                    class="flex size-[52px] rounded-2xl items-center justify-center bg-desa-foreshadow overflow-hidden">
                    <img src="@/assets/images/icons/calendar-2-dark-green.svg" class="flex size-6 shrink-0" alt="icon">
                </div>
                <div class="flex flex-col gap-1">
                    <p class="font-semibold text-lg leading-5">Tue, 09 Jan 2025</p>
                    <p class="font-medium text-sm text-desa-secondary">Tanggal Pengajuan</p>
                </div>
            </div>
            <hr class="border-desa-background">
            <div class="flex items-center gap-3 w-[302px] shrink-0">
                <div
                    class="flex size-[52px] rounded-2xl items-center justify-center bg-desa-foreshadow overflow-hidden">
                    <img src="@/assets/images/icons/receive-square-2-dark-green.svg" class="flex size-6 shrink-0"
                        alt="icon">
                </div>
                <div class="flex flex-col gap-1">
                    <p class="font-semibold text-lg leading-5">Rp5.120.000</p>
                    <p class="font-medium text-sm text-desa-secondary">Nominal Pengajuan</p>
                </div>
            </div>
            <hr class="border-desa-background">
            <div class="flex flex-col gap-1">
                <p class="font-medium text-sm text-desa-secondary">Pesan Pengajuan:</p>
                <p class="font-medium leading-8">“Saya akan menggunakan dana tersebut untuk kebutuhan membeli beras dan
                    bahan pokok lainnya yang akan dikonsumsi oleh saya dan keluarga saya.”</p>
            </div>
            <hr class="border-desa-background">
            <div class="flex flex-col gap-6">
                <p class="font-medium text-sm text-desa-secondary">Rekening Kepala Rumah</p>
                <div class="flex items-center gap-3">
                    <div
                        class="flex w-[120px] h-[60px] rounded-2xl border border-desa-background py-3 px-0.5 items-center justify-center bg-desa-blue/10 overflow-hidden">
                        <img src="@/assets/images/logos/bca.svg" class="w-full h-full object-contain" alt="icon">
                    </div>
                    <div>
                        <p class="font-medium text-sm text-desa-secondary">Saputra Dwi Putra</p>
                        <div class="flex items-center gap-1">
                            <img src="@/assets/images/icons/document-copy-dark-green.svg"
                                class="flex size-[18px] shrink-0" alt="icon">
                            <p class="font-semibold text-lg text-desa-dark-green">999 2222 0590</p>
                        </div>
                    </div>
                </div>
            </div>
            <hr class="border-desa-background">
            <form action="kd-pengajuan-bansos.html" class="flex flex-col gap-6">
                <p class="font-medium text-sm text-desa-secondary">Bukti Pemberian Bansos</p>
                <div class="flex items-center justify-between">
                    <div id="Photo-Preview"
                        class="flex itce justify-center w-[120px] h-[100px] rounded-2xl overflow-hidden bg-desa-foreshadow">
                        <img id="Photo" src="@/assets/images/thumbnails/thumbnail-bansos-preview.svg" alt="image"
                            class="size-full object-cover" />
                    </div>
                    <div class="relative">
                        <input id="File" type="file" name="file"
                            class="absolute opacity-0 left-0 w-full top-0 h-full" />
                        <button id="Upload" type="button"
                            class="relative flex items-center py-4 px-6 rounded-2xl bg-desa-black gap-[10px]">
                            <img src="@/assets/images/icons/send-square-white.svg" alt="icon" class="size-6 shrink-0" />
                            <p class="font-medium leading-5 text-white">Upload</p>
                        </button>
                    </div>
                </div>
                <hr class="border-desa-background">
                <div class="flex items-center gap-3 w-full">
                    <button type="submit"
                        class="flex items-center w-full justify-center gap-[10px] rounded-2xl py-4 px-6 bg-desa-red/10">
                        <span class="font-medium text-desa-red">Tolak</span>
                    </button>
                    <button type="submit"
                        class="flex items-center w-full justify-center gap-[10px] rounded-2xl py-4 px-6 bg-desa-dark-green">
                        <span class="font-medium text-white">Setuju</span>
                    </button>
                </div>
            </form>
        </section>
    </div>
</template>