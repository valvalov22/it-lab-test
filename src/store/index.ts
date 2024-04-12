import { defineStore } from "pinia";
import { Client, ClientFilterType } from "../components/types";

const CLIENTS_LOCAL_STORAGE_KEY = "clients";

const saveClientsToLocalStorage = (clients: any) => {
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

export const useClientStore = defineStore("client", {
    state: () => ({
        clients: loadClientsFromLocalStorage(),
        filterType: "all" as ClientFilterType,
        searchQuery: "" as string,
    }),
    actions: {
        setSearchQuery(query: string) {
            this.searchQuery = query;
        },
        setFilterType(type: "all" | "present" | "absent") {
            this.filterType = type;
        },
        addClient(client: Client) {
            this.clients.push(client);
            saveClientsToLocalStorage(this.clients);
        },
        loadClientsFromLocalStorage() {
            this.clients = loadClientsFromLocalStorage();
        },
        removeClient(id: number) {
            this.clients = this.clients.filter((client) => client.id !== id);
            this.clients.forEach((client, index) => {
                client.id = index + 1;
            });
            saveClientsToLocalStorage(this.clients);
        },
        updateClient(client: Client) {
            this.clients = this.clients.map((item) =>
                item.id === client.id ? client : item
            );
            saveClientsToLocalStorage(this.clients);
        },
    },
});
