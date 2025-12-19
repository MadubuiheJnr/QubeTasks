import {
  AlertDialog as Alert,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";

export const AlertDialog = ({
  title,
  description,
  isAlert,
  onAlertChange,
  onAlertAction,
  alertActionText,
}: {
  title: string;
  description: string;
  isAlert: boolean;
  onAlertChange: (alert: boolean) => void;
  onAlertAction: () => void;
  alertActionText: string;
}) => {
  return (
    <Alert open={isAlert} onOpenChange={onAlertChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onAlertAction}>
            {alertActionText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </Alert>
  );
};
