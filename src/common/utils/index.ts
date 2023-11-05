import { Campaign } from "../types";

export function validate(campaignData: Campaign) {
  if (!campaignData.infomation.name) {
    return false;
  }
  return !campaignData.subCampaigns.some((subCampaign) => {
    if (!subCampaign.name || !subCampaign.ads.length) return true;
    return subCampaign.ads.some((item) => !item.name || item.quantity < 1);
  });
}

function getType(obj: Record<string, any>) {
  const map = {
    "[object Boolean]": "boolean",
    "[object Number]": "number",
    "[object String]": "string",
    "[object Function]": "function",
    "[object Array]": "array",
    "[object Date]": "date",
    "[object RegExp]": "regExp",
    "[object Undefined]": "undefined",
    "[object Null]": "null",
    "[object Object]": "object",
  } as const;
  const str = Object.prototype.toString.call(obj) as keyof typeof map;
  if (obj instanceof Element) {
    return "element";
  }
  return map[str];
}
//for array
function copyArray(
  ori: any[],
  type: ReturnType<typeof getType>,
  copy: any[] = []
) {
  ori.forEach((value, index) => {
    copy[index] = deepCopy(value);
  });

  return copy;
}

//for object
function copyObject(
  ori: Record<string, any>,
  type: ReturnType<typeof getType>,
  copy: Record<string, any> = {}
) {
  for (const [key, value] of Object.entries(ori)) {
    copy[key] = deepCopy(value);
  }
  return copy;
}

export function deepCopy<T = Campaign>(ori: T): T;
export function deepCopy(ori: any): any {
  const type = getType(ori);
  let copy;
  switch (type) {
    case "array":
      return copyArray(ori, type, copy);
    case "object":
      return copyObject(ori, type, copy);
    default:
      return ori;
  }
}

export const deepCompare = (source: any, target: any): boolean => {
  if (getType(source) !== getType(target)) {
    return false;
  }

  if (getType(source) === "array") {
    if (source.length !== target.length) {
      return false;
    }
    return (source as any[]).every((entry, index) =>
      deepCompare(entry, target[index])
    );
  } else if (getType(source) === "object") {
    if (Object.keys(source).length !== Object.keys(target).length) {
      return false;
    }

    return Object.keys(source).every((key) =>
      deepCompare(source[key], target[key])
    );
  }
  return source === target;
};
