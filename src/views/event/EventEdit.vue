<script setup>

import { formatRupiah, parseRupiah } from '@/helpers/format';
import { useEventStore } from '@/stores/events';
import { storeToRefs } from 'pinia';
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Input from '@/components/ui/Input.vue';

import iconEditSecondaryGreen from '@/assets/images/icons/edit-secondary-green.svg';
import iconEditBlack from '@/assets/images/icons/edit-black.svg';
import iconDolarSquareSecondaryGreen from '@/assets/images/icons/dollar-square-secondary-green.svg';
import iconDolarSquareBlack from '@/assets/images/icons/dollar-square-black.svg';
import iconCalendar2SecondaryGreen from '@/assets/images/icons/calendar-2-secondary-green.svg';
import iconCalendar2Black from '@/assets/images/icons/calendar-2-black.svg';


const route = useRoute()
const router = useRouter()

const event = ref({
    'thumbnail': null,
    'thumbnail_url': null,
    'name': null,
    'description': null,
    'price': null,
    'date': 0,
    'time': null,
    'is_active': null,
});

const eventStore = useEventStore();
const { loading, error, success } = storeToRefs(eventStore)
const { fetchEvent, updateEvent } = eventStore

const fetchData = async () => {
    const response = await fetchEvent(route.params.id)

    event.value = response
    event.value.thumbnail_url = response.thumbnail
    event.value.thumbnail = null
}

const handleSubmit = async () => {
    await updateEvent({
        ...event.value,
        price: parseRupiah(event.value.price)
    })
}

const handleImageChange = (e) => {
    const file = e.target.files[0];
    event.value.thumbnail = file;
    event.value.thumbnail_url = URL.createObjectURL(file);
}

watch(() => event.value.price, (newAmount) => {
    event.value.price = formatRupiah(newAmount);
})

onMounted(fetchData);</script>

<template>
    <div id="Header" class="flex items-center justify-between">
        <div class="flex flex-col gap-2">
            <div class="flex gap-1 items-center leading-5 text-desa-secondary">
                <p class="last-of-type:text-desa-dark-green last-of-type:font-semibold capitalize ">Events Desa</p>
                <span>/</span>
                <p class="last-of-type:text-desa-dark-green last-of-type:font-semibold capitalize ">Tambah Event Desa
                </p>
            </div>
            <h1 class="font-semibold text-2xl">Tambah Event Desa</h1>
        </div>
    </div>
    <form @submit.prevent="handleSubmit" id="myForm" class="capitalize">
        <div class="shrink-0 rounded-3xl p-6 bg-white flex flex-col gap-6 h-fit">
            <section id="Thumbnail" class="flex items-center justify-between">
                <h2 class="font-medium leading-5 text-desa-secondary w-[calc(424/904*100%)]">Thumbnail Event Terkait
                </h2>
                <div class="flex-1 flex items-center justify-between">
                    <div id="Photo-Preview"
                        class="flex itce justify-center w-[120px] h-[100px] rounded-2xl overflow-hidden bg-desa-foreshadow">
                        <img id="Photo" :src="event.thumbnail_url" alt="image" class="size-full object-cover" />
                    </div>
                    <div class="relative">
                        <input id="File" type="file" name="file"
                            class="absolute opacity-0 left-0 w-full top-0 h-full" @change="handleImageChange"
                            ref="thumbnail" />
                        <button id="Upload" type="button"
                            class="relative flex items-center py-4 px-6 rounded-2xl bg-desa-black gap-[10px]"
                            @click="$refs.thumbnail.click()">
                            <img src="@/assets/images/icons/send-square-white.svg" alt="icon" class="size-6 shrink-0" />
                            <p class="font-medium leading-5 text-white">Upload</p>
                        </button>
                    </div>
                </div>
            </section>
            <hr class="border-desa-background" />
            <section id="Nama-Event" class="flex items-center justify-between">
                <p class="font-medium leading-5 text-desa-secondary w-[calc(424/904*100%)]">Nama Event</p>
                <div class="flex flex-col gap-3 flex-1 shrink-0">
                    <label class="relative group peer w-full">
                        <input v-model="event.name" type="text" placeholder="Ketik nama event terkait"
                            class="appearance-none outline-none w-full h-14 rounded-2xl ring-[1.5px] ring-desa-background focus:ring-desa-black py-4 px-12 gap-2 font-medium placeholder:text-desa-secondary transition-all duration-300">
                            <div class="absolute transform -translate-y-1/2 top-1/2 left-4 flex size-6 shrink-0">
                                <img src="@/assets/images/icons/edit-secondary-green.svg"
                                    class="size-6 hidden group-has-[:placeholder-shown]:flex" alt="icon">
                                <img src="@/assets/images/icons/edit-black.svg"
                                    class="size-6 flex group-has-[:placeholder-shown]:hidden" alt="icon">
                            </div>
                    </label>
                </div>
            </section>
            <hr class="border-desa-background" />
            <section id="Status" class="flex items-center justify-between">
                <p class="font-medium leading-5 text-desa-secondary w-[calc(424/904*100%)]">Pilih status event</p>
                <div class="flex flex-1 gap-6 shrink-0">
                    <label
                        class="group flex w-full items-center h-14 rounded-2xl p-4 ring-[1.5px] ring-desa-background gap-2 has-[:checked]:ring-none has-[:checked]:bg-desa-foreshadow transition-setup">
                        <input type="radio" v-model="event.is_active" value="1" name="status" id=""
                            class="flex size-[18px] shrink-0 accent-desa-secondary checked:accent-desa-dark-green transition-setup">
                            <span
                                class="font-medium leading-5 text-desa-secondary w-full group-has-[:checked]:text-desa-dark-green transition-setup">
                                Open
                            </span>
                            <div class="flex size-6 shrink-0">
                                <img src="@/assets/images/icons/tick-circle-secondary-green.svg"
                                    class="size-6 flex group-has-[:checked]:hidden" alt="icon">
                                <img src="@/assets/images/icons/tick-circle-dark-green.svg"
                                    class="size-6 hidden group-has-[:checked]:flex" alt="icon">
                            </div>
                    </label>
                    <label
                        class="group flex w-full items-center h-14 rounded-2xl p-4 ring-[1.5px] ring-desa-background gap-2 has-[:checked]:ring-none has-[:checked]:bg-desa-foreshadow transition-setup">
                        <input type="radio" v-model="event.is_active" value="0" name="status" id=""
                            class="flex size-[18px] shrink-0 accent-desa-secondary checked:accent-desa-dark-green transition-setup">
                            <span
                                class="font-medium leading-5 text-desa-secondary w-full group-has-[:checked]:text-desa-dark-green transition-setup">
                                Closed
                            </span>
                            <div class="flex size-6 shrink-0">
                                <img src="@/assets/images/icons/close-circle-secondary-green.svg"
                                    class="size-6 flex group-has-[:checked]:hidden" alt="icon">
                                <img src="@/assets/images/icons/close-circle-secondary-green.svg"
                                    class="size-6 hidden group-has-[:checked]:flex" alt="icon">
                            </div>
                    </label>
                </div>
            </section>
            <hr class="border-desa-background" />
            <section id="Harga-Event" class="flex items-center justify-between">
                <p class="font-medium leading-5 text-desa-secondary w-[calc(424/904*100%)]">Harga Event</p>
                <div class="flex flex-col gap-3 flex-1 shrink-0">
                    <Input v-model="event.price" type="text" placeholder="Ketik harga event"
                        :error-message="error?.price" :icon="iconDolarSquareSecondaryGreen"
                        :filled-icon="iconDolarSquareBlack" />
                </div>
            </section>
            <hr class="border-desa-background" />
            <section id="Tanggal" class="flex items-center justify-between">
                <p class="font-medium leading-5 text-desa-secondary w-[calc(424/904*100%)]">Tanggal event dilakukan</p>
                <div class="flex items-center gap-6 flex-1 shrink-0">
                    <label class="relative group peer w-full">
                        <Input v-model="event.date" type="date" placeholder="Ketik tanggal event"
                            :error-message="error?.date" :icon="iconCalendar2SecondaryGreen"
                            :filled-icon="iconCalendar2Black" />
                    </label>
                </div>
            </section>
            <hr class="border-desa-background" />
            <section id="Waktu" class="flex items-center justify-between">
                <p class="font-medium leading-5 text-desa-secondary w-[calc(424/904*100%)]">Waktu event dilakukan</p>
                <div class="flex flex-col gap-3 flex-1 shrink-0">
                    <label class="relative group peer w-full">
                        <Input v-model="event.time" type="time" placeholder="Ketik waktu event"
                            :error-message="error?.time" :icon="iconCalendar2SecondaryGreen"
                            :filled-icon="iconCalendar2Black" />
                    </label>
                </div>
            </section>
            <hr class="border-desa-background" />
            <section id="Deskripsi" class="flex items-center justify-between">
                <p class="font-medium leading-5 text-desa-secondary w-[calc(424/904*100%)]">Deskripsi event terkait</p>
                <div class="flex flex-col gap-3 flex-1 shrink-0">
                    <textarea v-model="event.description" name="" id=""
                        placeholder="Jelaskan lebih detail tentang event" rows="6"
                        class="appearance-none outline-none w-full rounded-2xl ring-[1.5px] ring-desa-background focus:ring-desa-black py-4 px-4 gap-2 font-medium placeholder:text-desa-secondary transition-all duration-300">
                                    </textarea>
                </div>
            </section>
            <hr class="border-desa-background w-[calc(100%+48px)] -mx-6" />
            <section id="Buttons" class="flex items-center justify-end gap-4">
                <a href="kd-event-desa.html">
                    <div
                        class="py-[18px] rounded-2xl bg-desa-red w-[180px] text-center flex justify-center font-medium text-white">
                        Batal, Tidak jadi</div>
                </a>
                <button id="submitButton" type="submit"
                    class="py-[18px] rounded-2xl disabled:bg-desa-grey w-[180px] text-center flex justify-center font-medium text-white bg-desa-dark-green transition-all duration-300">Save
                    Changes</button>
            </section>
        </div>
    </form>
</template>