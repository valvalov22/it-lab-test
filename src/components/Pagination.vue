<script setup lang="ts">
    import { computed, defineProps, defineEmits } from "vue";

    const props = defineProps<{
        totalItems: number;
        itemsPerPage: number;
        currentPage: number;
    }>();

    const emit = defineEmits(["update:currentPage"]);

    const totalPages = computed(() => {
        return Math.ceil(props.totalItems / props.itemsPerPage);
    });

    const showPagination = computed(() => {
        return totalPages.value > 1;
    });

    const nextPage = () => {
        if (props.currentPage < totalPages.value) {
            emit("update:currentPage", props.currentPage + 1);
        }
    };

    const prevPage = () => {
        if (props.currentPage > 1) {
            emit("update:currentPage", props.currentPage - 1);
        }
    };
</script>

<template>
    <div v-if="showPagination" class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1">&lt;</button>
        <span>{{ currentPage }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages">
            &gt;
        </button>
    </div>
</template>

<style scoped>
    .pagination {
        text-align: center;
        margin-top: 20px;
    }

    .pagination button {
        margin: 0 5px;
        padding: 5px 10px;
        cursor: pointer;
        border: 1px solid #ccc;
        border-radius: 3px;
        background-color: #f9f9f9;
    }

    .pagination button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
</style>
