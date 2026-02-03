import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  IconButton,
  InputAdornment,
  FormLabel,
} from "@mui/material";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../utils/validation";
import { Contact, X } from "lucide-react";
import toast from "react-hot-toast";

export default function LoginPopup({ open, onClose }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: "all",
  });

  const onSubmit = (data) => {
    console.log("Phone:", data.phoneNo);
    localStorage.setItem("cafe_user_phone", data.phoneNo);
toast.success("Login Success")
    onClose();
  };

  const handleClose = () => {
    localStorage.setItem("cafe_user_skipped_login", "true");
    onClose();
  };

  return (
    <Dialog open={open}>
      {/* TITLE + CLOSE */}
      <DialogTitle className="font-bold border flex justify-between items-center">
        <p className="text-center"> Welcome to ☕ Café Aroma</p>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          className="absolute"
        >
          <X />
        </IconButton>
      </DialogTitle>

      <DialogContent className="mt-2">
        <p className="text-sm text-gray-500 mb-3 text-center">
          Enter your mobile number to continue
        </p>
        <FormLabel>Phone Number:</FormLabel>
        <Controller
          name="phoneNo"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              size="small"
              error={!!errors.phoneNo}
              helperText={errors.phoneNo?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Contact />
                  </InputAdornment>
                ),
              }}
              placeholder="Enter your Number"
            />
          )}
        />
      </DialogContent>

      <DialogActions className="px-6 pb-4">
        <Button fullWidth variant="contained" onClick={handleSubmit(onSubmit)}>
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
}
