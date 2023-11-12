import type Pocketbase from 'pocketbase';
import type { Admin, Record } from 'pocketbase';

export function isAdmin(model: Record | Admin | null): model is Admin {
  return !!model && !(model as Record)?.collectionId;
}

export default function getAvatarUrl(
  pocketbase: Pocketbase,
  model: Record | Admin | null
) {
  if (!model) return undefined;
  if (isAdmin(model)) return undefined;
  if (typeof model.avatar !== 'string' || !model.avatar) return undefined;

  return pocketbase.getFileUrl(model, model.avatar);
}
