import AsyncStorage from '@react-native-async-storage/async-storage';
import { sync } from './engine';
import NetInfo from '@react-native-community/netinfo';

const LAST_SYNC_KEY = '@last_sync_time';

export const syncController = {
    async getLastSync(): Promise<number | null> {
        const value = await AsyncStorage.getItem(LAST_SYNC_KEY);
        return value ? Number(value) : null;
    },

    async setLastSync(time: number) {
        await AsyncStorage.setItem(LAST_SYNC_KEY, String(time));
    },

    async runSync() {
        const lastSync = await this.getLastSync();

        await sync(null, lastSync);

        await this.setLastSync(Date.now());
    },

    listenNetwork() {
        return NetInfo.addEventListener((state) => {
            if (state.isConnected) {
                this.runSync();
            }
        });
    },
};