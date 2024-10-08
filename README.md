# Developer Notes
### 7/29
Implementing allowing user to make request.
To do this, the scheduling algorithm needs to know which `user_priority` is left to use.
- Make a scheduling algorithm to return unused `user_priority` for a given `user_id`.
    - To achieve this, we should update `priorirty_computed` in `request` table when approving requests.

### 7/30
- Right now the algorithm does not return all shifts but shifts with at least one request. I need to fix this so that the frontend day selection UI works properly.
  - Need to fix how the algorithm creates `monthdata` so that it creates for all days in the month not just days with requests.
  - Day selection UI works properly now.

- Add sending request to the backend function.
  - Send by list so that only one connection is established.
  - Once request is submitted, it is in `pending` status until computation is run.


### 7/31
- Upon submitting request, refresh the calendar.
- Subimtting request works. Should return users with requests left.


### 8/1
- Validation for 3 shifts per week in both FE and BE.
  - Grouping data by week and checking if there are more than 3 shifts in a week.
  - Checking for three request status, `approved`, `pending`, and `selected` was challenging.
- It is implemented in FE only as request only comes from FE. But if we were to allow more than 12 selections, BE should also have the validation.
- Convert getUnusedPriorities to a custom hook.
  - Each time selected user was changed, it had to manually get unused priorities. By converting this into a custom hook with other states as parameters, it can be automatically updated when the user is changed via useEffect hook inside the custom hook.

### 8/2
- Frontend
  - Design basic UI for nurses.
  - Shift detail panel is added.
  - Selection UI slightly changed.

### 8/3
- Frontend
  - Submit form is added.
- User API
  - Azure AD authentication is enabled.
  - Add user.
    - User must be added with required data with `ms_id` of `"0"`.
    - Managers must send invitation on Azure Entra ID.
    - When user accepts the invitation and logs in for the first time, the user is added to the database with the `ms_id` from the token.
  - Server token authentication.
  - Frontend UI

### 8/5
- Server token authentication.
  - Save `accessToken` to `sessionData` in `localStorage`.
  - Create a custom hook to get `accessToken` from `localStorage` and if not, request one.
    - This is a bad practice. Instead, create `useSignIn` custom hook to handle refresh.
  - `computeRoster` is fired when `isAuthenticated` is changed via `useEffect` hook.
- Get registered `user_id` upon login.
  - Changed default `user_id` to 0. When its falsy, change it to do nothing.

### 8/6
- Change selected user to contain all user data. This requires major refactoring.
  - Instead of changing `selectedUser`,`currentdUser` is added and it now contains all user data.
  - When `currentdUser` is first set by `useLogin()`, `selectedUser` is set to `currentdUser.user_id`.
  - `selectedUser` is only used by Manager view.

### 8/7
- Manager view
  - Using `currentUser` state, it determines which views to show.
  - Views to create/modify:
    - UserSelectionForm
    - Roster
      - Refactor to be reused for the manager view.
      - Show requests grouped by status.
        - Done by parent css className and different layout.
    
### 8/9
- Manager view
  - Refactor `Roster` to not show selected user's requests calendar.
    - Right now the manager view shows request status calendar (Yeweon manager shows Yeweon's requests).
  - Ability to disapprove requests.
  - Ability to manually select shifts for selected user.
  - UserList
    - Show all users.
    - Ability to invite user to the group.

### 8/10
- Manager view
  - UserList
    - Ability to change user's information.
    - Ability to delete user.
      - This will make user `inactive` and not show up in the user list.
      - Now this will make default user to `pending` status and when user logs in for the first time and `ms-id` is updated, change the status to `active`.
    - Currently invitation is made in frontend. Move this to backend so that it's more secure.
      - Now the invitation is sent from the backend. Credentials are stored in .env file for security.
- Fix JWT authorization in the backend.
  - Research and write about it.
```javascript
// 8-10 JWT Authorization middleware
app.use(
  expressjwt({
    secret: expressJwtSecret({
      jwksUri:
        "https://login.microsoftonline.com/" +
        process.env.TENANT_ID +
        "/discovery/v2.0/keys",
      }),
    audience: process.env.API_SCOPE,
    issuer: `https://sts.windows.net/${process.env.TENANT_ID}/`,
    algorithms: ["RS256"],
  }),
);
```

### 8/11
- Manager override manual shift assignment.
  - This must show rejected days to give suggestion. 
  - Changing request to `rejected` status causes duplicate error when request is sumitted on next round of computation.
    - Record computation record_id on each request.
    - Change the alogrithm to store computation result data each time it is run.
- Fix login bug.
  - Using the middleware above throws error. Probably have to do with getting token then sending.

### TODO
- User API
- Frontend
  - Cancel pending request
- Documentation on scheduling algorithm
- Bug fix when other month is selected.
  - Default values probably not set correctly.
- Manager view
- Server sequrity measures
- Deployment

### Backlog
- Scheduling algorithm records its computation result data each time it is run to `compute_record` table.


## Schedule Algorithm
