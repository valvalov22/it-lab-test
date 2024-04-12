<script setup lang="ts">
    import { ref, computed, defineProps, defineEmits } from "vue";

    interface Props {
        modelValue: string;
        options: string[];
    }

    const props = defineProps<Props>();

    const emit = defineEmits(["update:modelValue"]);

    const isDropdownOpen = ref(false);

    const selectedLabel = computed(() => {
        return props.modelValue || "Выбрать";
    });

    const toggleDropdown = () => {
        isDropdownOpen.value = !isDropdownOpen.value;
    };

    const toggleOption = (item: string) => {
        emit("update:modelValue", item);
        isDropdownOpen.value = false;
    };
</script>

<template>
    <div class="custom-select">
        <div class="select-label" @click="toggleDropdown">
            {{ selectedLabel }}
            <span class="arrow" :class="{ 'arrow-up': isDropdownOpen }"></span>
        </div>
        <div class="select-container" v-show="isDropdownOpen">
            <div class="dropdown">
                <div
                    v-for="item in options"
                    :key="item"
                    :class="{ selected: modelValue === item }"
                    @click="toggleOption(item)"
                >
                    {{ item }}
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .custom-select {
        width: 100%;
        position: relative;
    }

    .select-container {
        position: relative;
    }

    .select-label {
        cursor: pointer;
        background-color: transparent;
        border: 1px solid #ccc;
        color: #000;
        padding: 10px;
        border-radius: 4px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .arrow {
        margin-left: 5px;
        border: solid #000;
        border-width: 0 2px 2px 0;
        display: inline-block;
        padding: 3px;
        transform: rotate(45deg);
        transition: transform 0.3s ease;
    }

    .arrow-up {
        transform: rotate(-135deg);
    }

    .dropdown {
        z-index: 10000;
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background-color: #fff;
        border: 1px solid #ccc;
        border-top: none;
        border-radius: 0 0 4px 4px;
    }

    .dropdown div {
        padding: 8px;
        cursor: pointer;
    }

    .dropdown div:hover {
        background-color: #e0e0e0;
    }

    .dropdown div.selected {
        background-color: #4caf50;
        color: #fff;
    }

    .isDropdownOpen .arrow {
        transform: rotate(-135deg);
    }
</style>
