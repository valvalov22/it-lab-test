<script setup lang="ts">
    import { ref, defineProps } from "vue";
    import ClientForm from "./ClientForm.vue";
    import { useClientStore } from "../store/index";
    import { Client } from "./types";

    const clientStore = useClientStore();

    const props = defineProps<{
        clients: Client[];
        showPagination: boolean;
        currentPage: number;
    }>();

    const showEditClient = ref(false);
    const selectedClient = ref<Client | undefined>(undefined);

    const handleShowEditClientPopup = (client: Client) => {
        selectedClient.value = client;
        showEditClient.value = true;
    };

    const handleClosePopup = () => {
        showEditClient.value = false;
    };
</script>

<template>
    <table class="table">
        <thead>
            <tr>
                <th>Номер</th>
                <th>ФИО</th>
                <th>Компания</th>
                <th>Группа</th>
                <th>Присутствие</th>
            </tr>
        </thead>
        <tbody v-if="props.clients.length > 0">
            <tr v-for="client in clients" :key="client.id">
                <td
                    :class="{
                        'white-background': client.id % 2 === 0,
                        'light-background': client.id % 2 === 1,
                    }"
                    class="text-center"
                >
                    {{ client.id }}
                </td>
                <td
                    class="client-edit"
                    @click="handleShowEditClientPopup(client)"
                >
                    {{ client.fullname }}
                </td>
                <td>{{ client.company }}</td>
                <td>{{ client.group }}</td>
                <td
                    :class="{
                        presence: true,
                        true: client.isPresence,
                        false: !client.isPresence,
                    }"
                ></td>
                <td @click="clientStore.removeClient(client.id)">
                    <img
                        class="remove-client"
                        src="../../public/remove.png"
                        alt="Remove client"
                    />
                </td>
            </tr>
        </tbody>
        <tbody v-else>
            <tr>
                <td colspan="5">Результатов не найдено 🫥</td>
            </tr>
        </tbody>
    </table>

    <teleport to="body">
        <div v-if="showEditClient" class="popup">
            <ClientForm
                :handleClose="handleClosePopup"
                :clientToEdit="selectedClient"
                :isEditing="true"
            />
        </div>
    </teleport>
</template>

<style scoped>
    .table {
        width: 100%;
        text-align: left;
        border-collapse: collapse;
    }

    .table thead {
        text-align: left;
    }

    .table .table thead th {
        padding: 10px;
        border-bottom: 2px solid #ddd;
    }

    .table tbody td {
        margin: 10px;
        text-align: start;
    }

    .table tbody td:last-child {
        border-bottom: none;
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

    .client-edit {
        font-size: 14px;
        text-decoration: underline;
        cursor: pointer;
    }

    .client-edit:hover {
        color: #69cbf1;
    }

    .presence {
        width: 55px;
        height: 55px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: bold;
    }

    .presence.false {
        background-color: #ec5937;
        color: white;
    }

    .presence.true {
        background-color: #80bb00;
        color: white;
    }

    .table tbody tr:nth-child(odd) {
        background-color: #f9f9f9;
    }

    .divider {
        width: 1200px;
    }

    .text-center {
        padding-left: 20px;
    }

    .remove-client {
        width: 20px;
        height: 24px;
    }

    .remove-client:hover {
        cursor: pointer;
    }

    .no-result {
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
