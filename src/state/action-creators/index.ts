import { ActionType } from '../action-types';
import {
  Action,
  UpdateCellAction,
  DeleteCellAction,
  InsertCellBeforeAction,
  MoveCellAction,
} from '../actions';

export const updateCell = (): UpdateCellAction => {};

export const deleteCell = (): DeleteCellAction => {};
export const moveCell = (): MoveCellAction => {};
export const insertCellBefore = (): InsertCellBeforeAction => {};
