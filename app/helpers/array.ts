export const array2IdMap = (arr: any[], idKey: string = 'pk') => {
  const map: KeyMap<any> = {};
  const ids: Array<Id> = [];

  for (let i = 0; i < arr.length; i++) {
    const key = arr[i][idKey];
    map[key] = arr[i];
    ids.push(key);
  }

  return { map, ids };
};

export const arrayFromIdMap = (idMap: KeyMap<any>, ids: Array<Id>) => {
  return ids.map((id) => idMap[id]);
};
