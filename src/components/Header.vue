<script setup lang="ts">
    import { ref } from "vue";
    import { useClientStore } from "../store/index.ts";
    import ClientForm from "./ClientForm.vue";

    const clientStore = useClientStore();

    const searchQuery = ref("");
    const showAddClient = ref(false);

    const updateSearchQuery = () => {
        clientStore.setSearchQuery(searchQuery.value);
    };

    const totalVisitors = ref(280);
    const remainingVisitors = ref(35);

    const showAddClientPopup = () => {
        showAddClient.value = true;
    };

    const handleClosePopup = () => {
        showAddClient.value = false;
    };

    const clearSearchQuery = () => {
        searchQuery.value = "";
        updateSearchQuery();
    };
</script>

<template>
    <header class="header">
        <div class="header-left">
            <img src="../../public/logo.png" alt="Logo" class="logo" />
            <div class="search-container">
                <input
                    type="text"
                    v-model="searchQuery"
                    @input="updateSearchQuery"
                    placeholder="Поиск клиентов"
                />
                <span
                    class="clear-icon"
                    v-if="searchQuery"
                    @click="clearSearchQuery"
                    >&#10006;</span
                >
            </div>

            <button @click="showAddClientPopup" class="btn-add">
                Добавить
            </button>
        </div>
        <div class="header-right">
            <div class="visitors">
                <span>Посетители</span>
                <div class="visitors-count">
                    <span style="color: green">{{ totalVisitors }}</span>
                    <span>/</span>
                    <span style="color: red">{{ remainingVisitors }}</span>
                </div>
            </div>
        </div>
    </header>

    <teleport to="body">
        <div v-if="showAddClient" class="popup">
            <ClientForm :handleClose="handleClosePopup" />
        </div>
    </teleport>
</template>

<style scoped>
    .logo {
        margin-right: 2rem;
    }
    .search-container {
        position: relative;
    }
    input[type="text"] {
        padding: 8px 12px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 16px;
        outline: none;
        transition: border-color 0.3s;
        width: 350px;
        margin-right: 2rem;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    input[type="text"]:focus {
        border-color: #007bff;
    }
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        width: 1200px;
        padding-bottom: 30px;
    }

    .header-left {
        display: flex;
        align-items: center;
    }

    .btn-add {
        background-color: green;
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 4px;
        cursor: pointer;
        margin-left: 10px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .visitors {
        position: relative;
    }

    .visitors-count {
        display: block;
        text-align: right;
    }

    .visitors span {
        margin-right: 5px;
    }

    .popup {
        position: absolute;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.1);
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .clear-icon {
        cursor: pointer;
        position: absolute;
        right: 10%;
        top: 50%;
        transform: translateY(-50%);
        font-size: 16px;
        color: #777;
        transition: all 0.3s;
    }

    .clear-icon:hover {
        color: #9c9c9c;
        box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
    }

    .search-container {
        position: relative;
    }
</style>
