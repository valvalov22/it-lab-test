import { defineStore } from "pinia";
import { Client, ClientFilterType } from "../components/types";
import { ref } from "vue";

const CLIENTS_LOCAL_STORAGE_KEY = "clients";

const saveClientsToLocalStorage = (clients: Client[]) => {
    localStorage.setItem(CLIENTS_LOCAL_STORAGE_KEY, JSON.stringify(clients));
};

const loadClientsFromLocalStorage = (): Client[] => {
    const storedClients = localStorage.getItem(CLIENTS_LOCAL_STORAGE_KEY);
    return storedClients
        ? JSON.parse(storedClients)
        : [
              {
                  id: 1,
                  fullname: "Зубенко Михаил Петрович",
                  company: "ООО 'Зубенко'",
                  group: "Клиент",
                  isPresence: true,
              },
              {
                  id: 2,
                  fullname: "Зубенко Михаил Петрович",
                  company: "ООО 'Зубенко'",
                  group: "Клиент",
                  isPresence: false,
              },
          ];
};

export const useClientStore = defineStore("client", () => {
    const clients = ref<Client[]>(loadClientsFromLocalStorage());
    const filterType = ref<ClientFilterType>("all");
    const searchQuery = ref<string>("");

    const setSearchQuery = (query: string) => {
        searchQuery.value = query;
    };

    const setFilterType = (type: "all" | "present" | "absent") => {
        filterType.value = type;
    };

    const addClient = (client: Client) => {
        clients.value.push(client);
        saveClientsToLocalStorage(clients.value);
    };

    const removeClient = (id: number) => {
        clients.value = clients.value
            .filter((client) => client.id !== id)
            .map((client, index) => {
                client.id = index + 1;
                return client;
            });
        saveClientsToLocalStorage(clients.value);
    };

    const updateClient = (client: Client) => {
        clients.value = clients.value.map((item) =>
            item.id === client.id ? client : item
        );
        saveClientsToLocalStorage(clients.value);
    };

    return {
        clients,
        filterType,
        searchQuery,
        setSearchQuery,
        setFilterType,
        addClient,
        removeClient,
        updateClient,
    };
});
