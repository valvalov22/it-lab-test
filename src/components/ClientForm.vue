<script setup lang="ts">
    import { defineProps, ref, onMounted } from "vue";
    import { useClientStore } from "../store/index.ts";
    import CustomSelect from "./CustomSelect.vue";
    import { Client } from "./types.ts";

    const props = defineProps<{
        handleClose: () => void;
        clientToEdit?: Client;
        isEditing?: boolean;
    }>();

    const clientStore = useClientStore();

    const formData = ref({
        fullname: "" as string,
        company: "" as string,
        group: "" as string,
        isPresence: false as boolean,
    });

    onMounted(() => {
        if (props.isEditing && props.clientToEdit) {
            formData.value.fullname = props.clientToEdit.fullname;
            formData.value.company = props.clientToEdit.company;
            formData.value.group = props.clientToEdit.group;
            formData.value.isPresence = props.clientToEdit.isPresence;
        }
    });

    const handleSubmit = () => {
        if (props.isEditing && props.clientToEdit) {
            const editedClient: Client = {
                id: props.clientToEdit.id,
                fullname: formData.value.fullname,
                company: formData.value.company,
                group: formData.value.group,
                isPresence: formData.value.isPresence,
            };

            clientStore.updateClient(editedClient);
        } else {
            const newClient: Client = {
                id:
                    clientStore.clients.length > 0
                        ? clientStore.clients[clientStore.clients.length - 1]
                              .id + 1
                        : 1,
                fullname: formData.value.fullname,
                company: formData.value.company,
                group: formData.value.group,
                isPresence: formData.value.isPresence,
            };

            clientStore.addClient(newClient);
        }

        props.handleClose();
    };

    const handleClose = () => {
        props.handleClose();
    };
</script>

<template>
    <form @submit.prevent="handleSubmit" class="add-client-form">
        <div class="close-icon" @click="handleClose">✕</div>
        <h2>{{ isEditing ? "Изменить клиента" : "Создать клиента" }}</h2>
        <div class="input-group">
            <label for="fullname">ФИО:</label>
            <input
                type="text"
                v-model="formData.fullname"
                id="fullname"
                placeholder="Введите ФИО"
                required
            />
        </div>
        <div class="input-group">
            <label for="company">Компания:</label>
            <input
                type="text"
                v-model="formData.company"
                id="company"
                placeholder="Введите название компании"
                required
            />
        </div>
        <div class="input-group">
            <label for="group">Группа:</label>
            <CustomSelect
                v-model="formData.group"
                :options="['Прохожий', 'Клиент', 'Партнер']"
                id="group"
                required
            />
        </div>
        <div class="input-group">
            <label for="presence">Присутствие:</label>
            <input
                type="checkbox"
                v-model="formData.isPresence"
                id="presence"
            />
        </div>
        <div class="form-actions">
            <button class="submit-button" type="submit">
                {{ isEditing ? "Сохранить" : "Добавить" }}
            </button>
            <button class="close-button" type="button" @click="handleClose">
                Закрыть
            </button>
        </div>
    </form>
</template>

<style scoped>
    .add-client-form {
        width: 70%;
        max-width: 500px;
        margin: 0 auto;
        background-color: #fff;
        padding: 30px;
        border-radius: 20px;
        position: relative;
    }

    .add-client-form h2 {
        text-align: center;
        margin-bottom: 20px;
    }

    .input-group {
        margin-bottom: 15px;
        display: flex;
        align-items: center;
    }

    .input-group label {
        width: 120px;
        margin-right: 10px;
    }

    .input-group input[type="text"],
    .input-group select,
    .input-group input[type="checkbox"] {
        padding: 8px;
        border-radius: 5px;
        border: 1px solid #ccc;
        width: 96%;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .form-actions {
        margin-top: 20px;
        display: flex;
        justify-content: center;
    }

    .form-actions button {
        padding: 10px 20px;
        border: none;
        cursor: pointer;
        margin-right: 40px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .form-actions button[type="submit"] {
        background-color: #007bff;
        color: white;
    }

    .form-actions button[type="button"] {
        background-color: #dc3545;
        color: white;
    }

    #presence {
        margin-right: 40rem;
        margin-left: 0;
        transform: scale(1.2);
    }

    .close-icon {
        position: absolute;
        top: 20px;
        right: 15px;
        font-size: 14px;
        cursor: pointer;
        color: #fff;
        background-color: #666;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: background-color 0.3s, color 0.3s;
    }

    .close-icon:hover {
        background-color: #919191;
        color: #000;
    }

    .submit-button,
    .close-button {
        transition: all 0.3s;
    }

    .submit-button:hover,
    .close-button:hover {
        filter: brightness(0.9);
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    }
</style>
