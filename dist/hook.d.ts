declare type Callback = (isVisible: boolean) => void;
interface TypesHook {
    counter: number;
    visible: boolean;
    onVisibilityChange: (callback: Callback) => void;
}
export declare const useDocumentVisibility: () => TypesHook;
export {};
