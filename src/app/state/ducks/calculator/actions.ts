import * as types from './types';
import { MinMaxBorders } from "./dtos";

export const updateBorders = (borders: Partial<MinMaxBorders>) => ({
    type: types.UPDATE_BORDERS,
    payload: {
        borders
    }
});
