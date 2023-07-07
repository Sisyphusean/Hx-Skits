//Extend the ServiceWorkerGlobalScope to include the __WB_MANIFEST property
export interface MyServiceWorkerGlobalScope extends ServiceWorkerGlobalScope {
    __WB_MANIFEST: any;
}
