interface TypesHook {
    counter: number;
    visible: boolean;
    onVisibilityChange: (callback: (isVisible?: boolean) => void) => void;
}
export declare const useDocumentVisibility: () => TypesHook;
export {};
