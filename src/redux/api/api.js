import { createAction } from '@reduxjs/toolkit';

export const apiCallBegan = createAction("api/callBegan");
export const apiCallOrder = createAction("api/callOrder");
export const withLoginApiCallBegan = createAction("withLoginApi/callBegan");
export const withLoginApiCallOrder = createAction("withLoginApi/callOrder");
// export const apiCallSuccess = createAction("api/callSuccess");
// export const apiCallFailed = createAction("api/callFailed");