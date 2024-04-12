<script setup lang="ts">
    import { useClientStore } from "../store/index";
    import { ClientFilterType } from "./types";

    const clientStore = useClientStore();

    const setFilterType = (type: ClientFilterType) => {
        clientStore.setFilterType(type);
    };
</script>

<template>
    <div class="filters">
        Фильтровать по:
        <button
            :class="{ active: clientStore.filterType === 'all' }"
            @click="setFilterType('all')"
        >
            Без фильтра
        </button>
        <button
            :class="{ active: clientStore.filterType === 'present' }"
            @click="setFilterType('present')"
        >
            Присутствующим
        </button>
        <button
            :class="{ active: clientStore.filterType === 'absent' }"
            @click="setFilterType('absent')"
        >
            Отсутствующим
        </button>
    </div>
</template>

<style scoped>
    .filters {
        margin-bottom: 20px;
        margin-top: 40px;
    }

    .filters button {
        margin-right: 10px;
        padding: 5px 10px;
        border-radius: 4px;
        border: 1px solid #ccc;
        background-color: #f5f5f5;
        cursor: pointer;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .filters button.active {
        background-color: #007bff;
        color: #fff;
    }

    .filters button:hover {
        background-color: #e0e0e0;
    }
</style>
