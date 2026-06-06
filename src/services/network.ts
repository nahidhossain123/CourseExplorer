import NetInfo from '@react-native-community/netinfo';

/**
 * Checks the current connection status.
 */
export const checkIsConnected = async (): Promise<boolean> => {
    const state = await NetInfo.fetch();
    return !!state.isConnected;
};

export const subscribeToConnectionChange = (
    callback: (isConnected: boolean) => void
): (() => void) => {
    return NetInfo.addEventListener((state) => {
        callback(!!state.isConnected);
    });
};
