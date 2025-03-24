import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'products/:id',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      // 假设你有一个 API 或服务可以提供所有产品的 ID
      const productIds = [1, 2, 3, 4, 5]; // 示例数据，替换为实际的 ID 列表
      return productIds.map(id => ({ id: id.toString() }));
    }
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
