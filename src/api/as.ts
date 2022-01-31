function getKey<T extends object, U extends keyof T>(obj: T, value: T[U]): U| null {
  const key = (Object.keys(obj) as Array<U>).find(k => obj[k] === value)
  return key || null;
}

function patchField<
  T extends object,
  U extends keyof T,
  V extends T[U]
>(obj: T, field: U, val: V) {
}

patchField({ f: '3'} , 'f', '3');