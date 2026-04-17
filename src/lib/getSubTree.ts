export function getSubTree(users: any[], rootId: string) {
  const childrenMap = new Map<string, any[]>();
  
  users.forEach(u => {
    if (!childrenMap.has(u.parentId)) {
      childrenMap.set(u.parentId, []);
    }
    childrenMap.get(u.parentId)!.push(u);
  });
  
  const result: any[] = [];
  const visited = new Set<string>();
  
  function dfs(id: string) {
    if (visited.has(id)) return;
    visited.add(id);
    
    const node = users.find(u => u.id === id);
    if (!node) return;
    
    result.push(node);
    
    const children = childrenMap.get(id) || [];
    children.forEach(child => dfs(child.id));
  }
  
  dfs(rootId);
  
  const ids = new Set(result.map(r => r.id));
  
  return result.map(n => ({
    ...n,
    parentId:
      n.id === rootId
        ? null
        : ids.has(n.parentId)
          ? n.parentId
          : null
  }));
}