import { IconButton, Slide, SlideProps, Snackbar, SnackbarOrigin, Typography, AlertColor } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { makeStyles, withStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

interface Props {
  open: boolean;
  message: string;
  autohideDuration?: number | null;
  handleClose?: () => void;
  action?: JSX.Element;
  severity?: AlertColor;
}

const useStyles = makeStyles({
  alert: {
    alignItems: 'center !important',
  },
  action: {
    padding: '0px 0px 0px 16px !important',
  },
});

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

type TransitionProps = Omit<SlideProps, 'direction'>;

function TransitionUp(props: TransitionProps) {
  return <Slide {...props} direction="up" />;
}

const StyledIcon = withStyles({
  root: {
    height: '20px !important',
    width: '20px !important',
  },
})(CloseIcon);

export const SnackBar = ({
  open,
  message,
  autohideDuration = 400000,
  handleClose,
  action,
  severity = 'info',
}: Props) => {
  const classes = useStyles();
  const [_open, _setOpen] = useState<boolean>(false);
  const alignment: SnackbarOrigin = { vertical: 'bottom', horizontal: 'center' };

  const _handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    _setOpen(false);
    handleClose?.();
  };

  useEffect(() => {
    _setOpen(open);
  }, [open]);

  return (
    <Snackbar
      anchorOrigin={alignment}
      open={_open}
      autoHideDuration={autohideDuration}
      onClose={_handleClose}
      TransitionComponent={TransitionUp}
    >
      <Alert
        action={
          action || (
            <IconButton>
              <StyledIcon />
            </IconButton>
          )
        }
        classes={{
          root: classes.alert,
          action: classes.action,
        }}
        onClose={handleClose}
        severity={severity}
        sx={{ width: '100%' }}
      >
        <Typography variant="h5">{message}</Typography>
      </Alert>
    </Snackbar>
  );
};
