import { createSelector } from "reselect";

const selectUser = state => state.user;

export const selectCurrentUser = createSelector(
  [selectUser],
  user => user.currentUser
);

export const selectUserError = createSelector([selectUser], user => user.error);

export const selectUserErrorMessage = createSelector(
  [selectUserError],
  userError => (userError ? userError.message : null)
);
