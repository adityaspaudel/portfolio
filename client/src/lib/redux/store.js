import { configureStore, combineReducers } from "@reduxjs/toolkit";
import themeReducer from "./slices/themeSlice";

import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import logger from "redux-logger";

// 🔗 Combine reducers
const rootReducer = combineReducers({
	theme: themeReducer,
});

// 💾 Persist config
const persistConfig = {
	key: "root",
	storage,
	whitelist: ["theme"], // persist only theme
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// 🏪 Store
export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}).concat(logger),
});

// ♻ Persistor
export const persistor = persistStore(store);
