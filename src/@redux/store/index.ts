import rootReducer, {AppStore} from '../reducers';
import {createStore, Store} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: 'root',
    storage,
    whitelist: [
        'user',
    ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store: Store<AppStore> = createStore(persistedReducer);
persistStore(store);

