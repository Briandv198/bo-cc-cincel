import {
  TextField,
  Button,
  Link,
  Box,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import Aos from "aos";
import Logo from "../../../public/img/logo-cincel.svg";
import { Email, Visibility, VisibilityOff } from "@mui/icons-material";
import useAuth from "../../hooks/useAuth";
import useScrollToTopNavigation from "../../hooks/useScrollToTopNavigation";
import { useGlobalContext } from "../../Context/GlobalContext";

const Login = () => {
  const { showSnackbar } = useGlobalContext();
  const navigateTo = useScrollToTopNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const { authenticate } = useAuth();

  useEffect(() => {
    Aos.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Ingresa un correo electrónico válido")
      .required("Es necesario ingresar un correo para continuar"),
    password: Yup.string()
      .required("Es necesario ingresar una contraseña para continuar")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un carácter especial"
      ),
  });

  return (
    <div
      data-aos="fade-up"
      data-aos-delay="00"
      className="w-screen h-screen flex justify-center items-center p-4"
    >
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          authenticate(values)
            .then((message) => {
              navigateTo("/");
              showSnackbar(message);
            })
            .catch((error) => {
              showSnackbar(error.message);
            });
        }}
      >
        {({ errors, touched }) => (
          <Form
            className="card w-[600px] items-center mb-20"
            noValidate
            autoComplete="off"
          >
            <Box
              component="img"
              sx={{
                height: 60,
                display: { md: "flex" },
                mr: 1,
              }}
              alt="Logo"
              src={Logo}
            />
            <div className="w-full flex flex-col gap-4">
              <Field
                data-aos="fade-up"
                data-aos-delay="50"
                as={TextField}
                name="email"
                type="email"
                label="Correo electrónico"
                fullWidth
                required
                autoFocus
                error={touched.email && Boolean(errors.email)}
                helperText={<ErrorMessage name="email" />}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Email />
                    </InputAdornment>
                  ),
                }}
              />

              <Field
                data-aos="fade-up"
                data-aos-delay="100"
                as={TextField}
                name="password"
                type={showPassword ? "text" : "password"}
                label="Contraseña"
                fullWidth
                required
                error={touched.password && Boolean(errors.password)}
                helperText={<ErrorMessage name="password" />}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <div
                data-aos="fade-up"
                data-aos-delay="150"
                className="w-full flex justify-center"
              >
                <Link href="/forgot-password" variant="body2">
                  Olvide mi contraseña
                </Link>
              </div>
            </div>
            <div
              className="w-full mt-6"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Iniciar Sesión
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
