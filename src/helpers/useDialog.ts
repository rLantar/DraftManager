import {cloneElement, ComponentProps, ReactElement, useState} from 'react';
import {Dialog} from "@material-ui/core";

function useDialog<T extends ComponentProps<typeof Dialog>>(
    dialog: ReactElement<T> | undefined,
    props?: Partial<T>,
) {
    const [open, setOpen] = useState<boolean>(!!props?.open || false);
    const [dialogPromiseWrapper, setDialogPromiseWrapper] = useState<{
        promise: Promise<boolean>;
        resolve: Function;
    }>();

    function openDialog(): Promise<boolean> {
        setOpen(true);
        if (dialogPromiseWrapper) return dialogPromiseWrapper.promise;
        let promiseWrapper: any = {};
        promiseWrapper.promise = new Promise<boolean>((resolve) => {
            promiseWrapper.resolve = resolve;
        });
        setDialogPromiseWrapper(promiseWrapper);
        return promiseWrapper.promise;
    }

    function closeDialog(confirmed?: boolean) {
        setOpen(false);
        dialogPromiseWrapper?.resolve(confirmed);
        setDialogPromiseWrapper(undefined);
    }

    return {
        close: closeDialog,
        open: openDialog,
        isOpen: open,
        dialog: dialog
            ? cloneElement(dialog, {
                close: () => {
                    closeDialog();
                },
                ...dialog.props,
                ...props,
                onClose: (e: any, reason: any) => {
                    closeDialog();
                    if (dialog?.props.onClose) dialog.props.onClose(e, reason);
                },
                open,
            })
            : null,
    };
}

export default useDialog;
