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
  Grid,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../utils/validation";
import { PhoneCall, User, X } from "lucide-react";
import toast from "react-hot-toast";
import { usePost } from "@/utils/useApi";
import API_ROUTES from "@/utils/constant";

export default function LoginPopup({ open, onClose }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: "all",
  });

  const handleClose = () => {
    localStorage.setItem("cafe_user_skipped_login", "true");
    onClose();
  };

  const { mutate, isPending } = usePost(API_ROUTES.createCustomer, {
    onSuccess: () => {
      console.log("Phone:", data.phoneNo, "Name:", data.name);
      localStorage.setItem("cafe_user_logged_in", data.phoneNo);
      toast.success("Success");
      onClose();
    },
  });

  const onSubmit = (data) => {
    mutate(data);
    console.log(data);
  };
  return (
    <Dialog open={open}>
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

      <form onClick={handleSubmit(onSubmit)}>
        <DialogContent className="m-2">
          <p className="text-sm text-gray-500 mb-3 text-center">
            Enter your details to continue
          </p>

          <Grid container spacing={3}>
            <Grid size={12}>
              <FormLabel>Name:</FormLabel>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    size="small"
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <User />
                        </InputAdornment>
                      ),
                    }}
                    placeholder="Enter your Name"
                  />
                )}
              />
            </Grid>
            <Grid size={12}>
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
                          <PhoneCall />
                        </InputAdornment>
                      ),
                    }}
                    placeholder="Enter your Number"
                  />
                )}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions className="px-6 pb-4">
          <Button
            fullWidth
            variant="contained"
            type="submit"
            disabled={isPending}
          >
            Continue
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
