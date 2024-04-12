<script setup lang="ts">
    import { useClientStore } from "./store/index";
    import { computed, ref } from "vue";
    import Header from "./components/Header.vue";
    import Filters from "./components/Filters.vue";
    import DataTable from "./components/DataTable.vue";
    import Pagination from "./components/Pagination.vue";

    const clientStore = useClientStore();
    const currentPage = ref(1);

    const filteredClients = computed(() => {
        const searchQuery = clientStore.searchQuery.toLowerCase();
        const filterType = clientStore.filterType;

        if (filterType === "present") {
            return clientStore.clients.filter(
                (client) =>
                    client.fullname.toLowerCase().includes(searchQuery) &&
                    client.isPresence
            );
        } else if (filterType === "absent") {
            return clientStore.clients.filter(
                (client) =>
                    client.fullname.toLowerCase().includes(searchQuery) &&
                    !client.isPresence
            );
        } else {
            return clientStore.clients.filter((client) =>
                client.fullname.toLowerCase().includes(searchQuery)
            );
        }
    });

    const currentPageClients = computed(() => {
        const start = (currentPage.value - 1) * 6;
        const end = start + 6;
        return filteredClients.value.slice(start, end);
    });

    const showPagination = computed(() => {
        return filteredClients.value.length > 6;
    });
</script>

<template>
    <div class="components">
        <Header />
        <DataTable
            :clients="currentPageClients"
            :showPagination="showPagination"
            :currentPage="currentPage"
        />
        <div class="footer">
            <Filters />
            <Pagination
                v-if="showPagination"
                :total-items="filteredClients.length"
                :items-per-page="6"
                :current-page="currentPage"
                @update:currentPage="currentPage = $event"
            />
        </div>
    </div>
</template>

<style scoped>
    .components {
        border: 1px solid #000;
        border-radius: 20px;
        padding: 40px;
    }
    .footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
</style>
