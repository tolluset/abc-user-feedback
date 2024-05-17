/**
 * Copyright 2023 LINE Corporation
 *
 * LINE Corporation licenses this file to you under the Apache License,
 * version 2.0 (the "License"); you may not use this file except in compliance
 * with the License. You may obtain a copy of the License at:
 *
 *   https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 */
import { create } from 'zustand';

import client from '@/libs/client';
import type { Tenant } from './tenant.type';

type State = Tenant | null;

type Action = {
  setTenant: (tenant: Tenant) => void;
  refetchTenant: () => Promise<void>;
};

const initialState: State = null;

const tenantStore = create<{ state: State; actions: Action }>((set) => ({
  state: initialState,
  actions: {
    setTenant: (tenant) => set({ state: tenant }),
    refetchTenant: async () => {
      const { data } = await client.get({ path: '/api/admin/tenants' });
      set({ state: data });
    },
  },
}));

export const useTenantState = () => tenantStore(({ state }) => state);
export const useTenantActions = () => tenantStore(({ actions }) => actions);
