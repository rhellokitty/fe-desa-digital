<script setup>
import { computed, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const props = defineProps({
    item: {
        type: Object,
        required: true
    }
})

const route = useRoute()

const isActive = computed(() => {
    if (props.item.path === '/') return route.path === '/'
    if (props.item.path === '') return false

    const nextChar = route.path[props.item.path.length]
    return route.path.startsWith(props.item.path) && (nextChar === '/' || nextChar === undefined)
})

const isChildActive = computed(() => {
    if (props.item.children) {
        return props.item.children.some((child) => route.path.startsWith(child.path))
    }
    return false
})

const isOpen = ref(isChildActive.value)

watch(isChildActive, () => {
    isOpen.value = isChildActive.value
});

</script>

<template>

    <li class="group" :class="{ active: isActive }" v-if="!item.children">
        <RouterLink :to='item.path'
            class=" flex items-center h-14 gap-2 rounded-2xl p-4 group-hover:bg-desa-foreshadow group-[.active]:bg-desa-foreshadow transition-setup">
            <div class="relative flex size-6 shrink-0" v-if="item.iconActive && item.iconInactive">
                <img :src="item.iconActive"
                    class="absolute flex size-6 shrink-0 opacity-0 group-hover:opacity-100 group-[.active]:opacity-100 transition-setup"
                    alt="icon">
                <img :src="item.iconInactive"
                    class="absolute flex size-6 shrink-0 opacity-100 group-hover:opacity-0 group-[.active]:opacity-0 transition-setup"
                    alt="icon">
            </div>
            <span
                class="text-left leading-5 text-desa-secondary flex flex-1 group-hover:text-desa-dark-green group-[.active]:text-desa-dark-green group-[.active]:font-medium transition-setup">
                {{ item.label }}
            </span>
        </RouterLink>
    </li>

    <template v-if="item.children">
        <div class="accordion group/accordion flex flex-col gap-1 w-full">
            <button :data-expand="`accordion-${item.label}`"
                class="group flex w-full shrink-0 items-center h-14 gap-2 rounded-2xl p-4"
                :class="{ active: isOpen || isChildActive }" @click="isOpen = !isOpen">
                <div class="relative flex size-6 shrink-0">
                    <img :src="item.iconActive"
                        class="absolute flex size-6 shrink-0 opacity-0 group-[.active]:opacity-100 transition-setup"
                        alt="icon">
                    <img :src="item.iconInactive"
                        class="absolute flex size-6 shrink-0 opacity-100 group-[.active]:opacity-0 transition-setup"
                        alt="icon">
                </div>
                <span
                    class="text-left leading-5 text-desa-secondary flex flex-1 group-[.active]:text-desa-dark-green transition-setup">
                    {{ item.label }}
                </span>
                <div class="relative flex size-6 shrink-0">
                    <img src="@/assets/images/icons/arrow-circle-dark-green-up.svg"
                        class="absolute flex size-6 shrink-0 transition-setup"
                        :class="isOpen ? 'opacity-100' : 'opacity-0'" alt="icon">
                    <img src="@/assets/images/icons/arrow-circle-secondary-green-down.svg"
                        class="absolute flex size-6 shrink-0 transition-setup"
                        :class="isOpen ? 'opacity-0' : 'opacity-100'" alt="icon">
                </div>
            </button>

            <Transition enter-active-class="transition-all duration-300 overflow-hidden"
                enter-from-class="max-h-0 opacity-0" enter-to-class="max-h-96 opacity-100"
                leave-active-class="transition-all duration-300 overflow-hidden" leave-from-class="max-h-96 opacity-100"
                leave-to-class="max-h-0 opacity-0">
                <ul v-if="isOpen" :id="`accordion-${item.label}`" class="flex flex-col flex-1r pl-[28px]">
                    <SidebarItem v-for="child in item.children" :key="child.label" :item="child" />
                </ul>
            </Transition>
        </div>
    </template>
</template>
