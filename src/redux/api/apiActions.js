import { createAction } from '@reduxjs/toolkit';

export const publicApi = createAction("api/public");
export const withLoginApi = createAction("api/withLogin");
export const adminApi = createAction("api/Admin");