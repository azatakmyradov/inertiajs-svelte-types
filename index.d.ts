import type { Readable, Writable } from "svelte/store";
import type { AxiosProgressEvent } from "axios";
import type { SvelteComponent } from "svelte";
import type { HTMLAnchorAttributes } from "svelte/elements";

export type PageProps<T extends {} = {}> = {} & T;

export type Page<T extends {} = {}> = {
  component: string;
  props: PageProps<T>;
  rememberedState: object;
  scrollRegions: [];
  url: string;
  version: string;
};

type FormVisit<TData> = {
  cancelled: boolean;
  completed: boolean;
  data: TData;
  errorBag: string;
  except: [];
  forceFormData: boolean;
  headers: object;
  interrupted: boolean;
  method: FormMethods;
  only: string[];
  preserveScroll: boolean;
  preserveState: boolean;
  queryStringArrayFormat: string;
  replace: boolean;
};

type FormOptions<TData> = {
  preserveScroll?: boolean;
  preserveState?: boolean;
  onCancelToken?: (token: { cancel: () => void }) => void;
  onBefore?: (visit: FormVisit<TData>) => void;
  onStart?: (visit: FormVisit<TData>) => void;
  onProgress?: (event: AxiosProgressEvent & { percentage: number }) => void;
  onSuccess?: (page: Page) => void;
  onError?: (errors: { [K in keyof TData]: TData[K] | undefined }) => void;
  onCancel?: () => void;
  onFinish?: () => void;
};
type FormMethods = "get" | "post" | "put" | "patch" | "delete";

type Form = <TFormData>(data: TFormData) => Writable<
  TFormData & {
    submit: (
      method: FormMethods,
      url: string,
      options?: FormOptions<TFormData>,
    ) => void;
    get: (url: string, options?: FormOptions<TFormData>) => void;
    post: (url: string, options?: FormOptions<TFormData>) => void;
    put: (url: string, options?: FormOptions<TFormData>) => void;
    patch: (url: string, options?: FormOptions<TFormData>) => void;
    delete: (url: string, options?: FormOptions<TFormData>) => void;
    isDirty: boolean;
    errors: { [K in keyof TFormData]: TFormData[K] | undefined };
    hasErrors: boolean;
    progress: null | number;
    wasSuccessful: boolean;
    recentlySuccessful: boolean;
    processing: boolean;
    defaults: <TValue>(field: keyof TFormData, value: TValue) => void;
    reset: (...fields: (keyof TFormData)[]) => void;
    transform: (callback: (data: TFormData) => TFormData) => void;
    clearErrors: (...fields: (keyof TFormData)[]) => void;
  }
>;

type RouterOptions<TData> = {
  method?: FormMethods;
  data?: TData;
  replace?: boolean;
  only?: string[];
  headers?: object;
  errorBag?: object | null;
  forceFormData?: boolean;
} & FormOptions<TData>;

type Router = {
  get: <TData>(
    url: string,
    data: TData,
    options?: RouterOptions<TData>,
  ) => void;
  post: <TData>(
    url: string,
    data: TData,
    options?: RouterOptions<TData>,
  ) => void;
  put: <TData>(
    url: string,
    data: TData,
    options?: RouterOptions<TData>,
  ) => void;
  patch: <TData>(
    url: string,
    data: TData,
    options?: RouterOptions<TData>,
  ) => void;
  delete: (url: string, options?: RouterOptions<{}>) => void;
  reload: (options?: RouterOptions<{}>) => void;
  visit: <TData>(url: string, options?: RouterOptions<TData>) => void;
};

declare module "@inertiajs/svelte" {
  export const page: Readable<Page>;
  export const useForm: Form;
  export const router: Router;
  export const Link: typeof SvelteComponent<HTMLAnchorAttributes, any, any>;
}
